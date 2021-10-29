// #


import { base } from "$app/paths";

import { browser } from "$app/env";

async function importScript(url: string): Promise<void> {
	return new Promise<void>((resolve: () => void) => {
		let el = document.createElement("script");
		el.src = url;
		el.addEventListener("load", resolve);
		document.head.append(el);
	});
}

export async function sleep(ms: number): Promise<void> {
	return new Promise((resolve: () => void) => {
		globalThis.setTimeout(resolve, ms);
	});
};

export function toStyleStr(obj: { [key: string]: (string | number) }) {
	return (
		Object.entries(obj)
			.map(([key, val]) => `${key}:${val}`)
			.join(";")
	);
}

export function copyText(text: string) {
	let el = document.createElement("input");
	el.value = text;
	document.body.appendChild(el);
	el.select();
	document.execCommand("copy");
	document.body.removeChild(el);
}

export function toMessageComment(messageArray: string[]): string {
	const maxLength: number = Math.max(
		...messageArray.map((val) => val.length)
	);
	const border: string = `${"#".repeat(maxLength + 10)}\n`;
	const innerMessageArray: string[] = messageArray.map(
		(val: string) =>
			`##   ${val}${" ".repeat(maxLength - val.length)}   ##\n`
	);

	return border + innerMessageArray.join("") + border;
}

export function toViewportStr(obj: { [key: string]: (string | number) }): string {
	return Object.entries(obj)
		.map(([key, val]) => `${key}=${val}`)
		.join(",");
}

function downloadFile(blob: Blob, fileName: string): void {
	let link = document.createElement("a");
	link.download = fileName;
	link.href = URL.createObjectURL(blob);

	link.click();

	URL.revokeObjectURL(link.href);
	return;
}

let fileScriptsImportet = false;

export async function zipFiles(): Promise<void> {

	if (!fileScriptsImportet) {
		await Promise.all([
			"/jszip.min.js",
			"/jszip-utils.min.js",
		].map(importScript));

		fileScriptsImportet = true;
	}

	let zip = new JSZip();

	const sources: string[] = (
		await (await window.fetch("./_/sourcemap.js.map")).json()
	).sources;

	let filePromises: Promise<void>[] = [];

	for await (let path of sources) {
		const absPath = path.replace(/^\.\.\//, `${base}/`);

		const filePath = ((): (string | false) => {
			if (path.startsWith("../")) {
				return path.replace(/^\.\.\//, "");
			}

			return false;
		})();

		if (filePath) {
			filePromises.push((async (): Promise<void> => {
				// @ts-ignore
				zip.file(filePath, await JSZipUtils.getBinaryContent(absPath));
			})());
		}
	}

	await Promise.all(filePromises);

	downloadFile(
		await zip.generateAsync({ type: "blob" }),
		`${location.host} - ${base.split("/").pop()}.zip`,
	);

	return;
}


export const colorTheme = {
	store() {
		window.setTimeout(() => {
			const isLight = document.querySelector<HTMLInputElement>("#theme-toggler").checked;

			localStorage.setItem("isLight", JSON.stringify(isLight));

			document.documentElement.style["colorScheme"] = isLight ? "light" : "dark";
		});
	},
	setInitial() {
		if (
			JSON.parse(localStorage.getItem("isLight"))
		) {
			document.documentElement.style["colorScheme"] = "light";

			document.body.classList.add("no-transition");

			document.querySelector<HTMLInputElement>("#theme-toggler").click();

		}

		function recursiveFrameRequest(depth: number) {
			if (depth <= 0) {
				document.body.classList.remove("no-transition");
				return;
			}
			window.requestAnimationFrame(() => recursiveFrameRequest(depth - 1));
		}

		recursiveFrameRequest(5);
	}
}



// ##################

export const pfns = { // PreFetch & NoScroll
	"sveltekit:prefetch": true,
	"sveltekit:noscroll": true,
};

export const pf = { // PreFetch
	"sveltekit:prefetch": true,
};

export const ns = { // PreFetch
	"sveltekit:noscroll": true,
};

