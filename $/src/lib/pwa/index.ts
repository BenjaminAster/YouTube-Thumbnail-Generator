
import { base } from "$app/paths";


interface _BeforeInstallPromptEvent extends Event {
	prompt: () => void;
	userChoice: { outcome: string };
}

let deferredPrompt: _BeforeInstallPromptEvent;

function postChangeMessage(isInstalled: boolean): void {
	window.postMessage({
		msg: "installedStatusChange",
		isInstalled,
	});
	return;
}


function reloadWhenReady() {

	function checkReadyState(): boolean {
		if (document.readyState === "complete") {
			window.setTimeout(() => location.reload(), 250);
			return true;
		}
		return false;
	};

	if (!checkReadyState()) {
		document.addEventListener("readystatechange", (): void => {
			checkReadyState();
		});
	}
}

async function downloadUncachedFiles(): Promise<void> {

	const filesToCache: string[] = await (async () => {

		let urls: string[] = await (await window.fetch("./_/filestocache.json")).json();

		urls = urls.map((url: string) => new URL(url, `${location.origin}${base}/`).href);

		return urls;
	})();

	const cachedFiles: string[] = await (async () => {

		let urls: string[] = [];

		for await (const cacheName of await window.caches.keys()) {
			urls = [...urls, ...((
				await (await window.caches.open(cacheName)).keys()
			).map(
				({ url }) => url
			))];
		}

		return urls;
	})();

	const filesToDownload = filesToCache.filter(
		(val: string) => !cachedFiles.includes(val)
	);

	const fetchPromises: Promise<Response>[] = filesToDownload.map(
		(file: string) => window.fetch(file)
	);

	await Promise.all(fetchPromises);

	return;
}

export const PWA = {
	async clearCacheAndReload() {

		try {
			await (await navigator.serviceWorker?.getRegistration?.())?.unregister?.();
		} catch { }

		await fetch(`/clear-site-data/?random=${Math.floor(Math.random() * 1e10)}`);

		for await (let cacheName of await window.caches.keys()) {
			await window.caches.delete(cacheName);
		}

		localStorage.setItem("afterReload", "reloadAgain");
		reloadWhenReady();

		return;
	},
	async installAppOrDownload() {
		if (deferredPrompt?.prompt) {
			deferredPrompt.prompt();
		} else {
			window.localStorage.setItem("afterReload", "downloadFiles");
			window.setTimeout(() => location.reload());
		}
		return;
	},
	async preparePwa() {
		{
			switch (localStorage.getItem("afterReload")) {
				case ("downloadFiles"): {
					localStorage.removeItem("afterReload");

					await downloadUncachedFiles();
					break;
				}
				case ("reloadAgain"): {
					if (JSON.parse(localStorage.getItem("isInstalled"))) {
						localStorage.setItem("afterReload", "downloadFiles");
					} else {
						localStorage.setItem("afterReload", "reloadThirdTime");
					}

					reloadWhenReady();
					break;
				}
				case ("reloadThirdTime"): {
					localStorage.removeItem("afterReload");

					reloadWhenReady();

					break;
				}
			}
		}

		{
			// event listeners
			window.addEventListener("beforeinstallprompt", async (evt: Event) => {
				evt.preventDefault();

				postChangeMessage(false);

				localStorage.removeItem("isInstalled");

				deferredPrompt = evt as _BeforeInstallPromptEvent;

			});

			window.addEventListener("appinstalled", async (evt: Event) => {

				postChangeMessage(true);

				window.localStorage.setItem("afterReload", "downloadFiles");

				localStorage.setItem("isInstalled", JSON.stringify(true));

				window.setTimeout(() => location.reload());
			});
		}

		return;
	}
}





