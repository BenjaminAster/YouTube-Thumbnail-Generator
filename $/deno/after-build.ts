
import {
	expandGlob,
	ensureDir,
	walk,
} from "https://deno.land/std@0.97.0/fs/mod.ts";


let sleep = async (ms: number): Promise<void> => {
	return new Promise((resolve: () => void) => {
		globalThis.setTimeout(resolve, ms);
	});
};

const waitTime: number = 20;
// const appDir: string = "_";
// const srcDir: string = "$";

const {
	version,
	timestamp,
	appDir,
	srcDir,
} = await (async () => {
	const _appDir = "_";
	return await JSON.parse(await Deno.readTextFile(`./static/${_appDir}/info.json`));
})();

// const basePath = await (async () => {
// 	const {default:config} = await import(`../svelte.config.js`);

// 	console.log(config);
// })();

await sleep(waitTime);

{

	await ensureDir("./.svelte-kit");

	await sleep(waitTime);

	await Deno.remove("./.svelte-kit", { recursive: true });

	await sleep(waitTime);

	await ensureDir("./node_modules");
	// await ensureDir("./node_modules/@sveltejs");

	await sleep(waitTime);

	await Deno.remove("./node_modules", { recursive: true });
	// await Deno.remove("./node_modules/@sveltejs", { recursive: true });
}

await sleep(waitTime);

// {
// 	let filePaths: string[] = [];
// 	for await (const entry of expandGlob("../**/*.html")) {
// 		if (!entry.path.includes("_svelte")) {
// 			filePaths = [...filePaths, entry.path];
// 		}
// 	}

// 	for await (const entry of expandGlob("../_app/**/*.js")) {
// 		filePaths = [...filePaths, entry.path];
// 	}

// 	for await (const entry of expandGlob("../_app/assets/**/*.css")) {
// 		filePaths = [...filePaths, entry.path];
// 	}

// 	const fromPath = "/.";
// 	// const toPath = "/test";
// 	const toPath = ".";

// 	for await (const path of filePaths) {
// 		let fileContent: string = await Deno.readTextFile(path);
// 		fileContent = fileContent.replace(
// 			new RegExp(`("|\\()(${fromPath})?/_app`, "g"),
// 			`"${toPath}/_app`,
// 		);
// 		if (path.endsWith(".html")) {
// 			fileContent = fileContent.replace(
// 				new RegExp(`"(${fromPath})?/_assets`, "g"),
// 				`"${toPath}/_assets`,
// 			).replace(
// 				new RegExp(`\\{"base":".{0,20}","assets":".{0,20}"\\}`),
// 				`{ base: "${toPath}/", assets: "${toPath}/" }`,
// 			).replace(
// 				new RegExp(`path:\\s?".{0,20}"`),
// 				`path: "${toPath}/"`,
// 			).replace(
// 				new RegExp(`\\t`, "g"),
// 				``,
// 			).replace(
// 				new RegExp(`\\n{2,20}`, "g"),
// 				`\n`,
// 			);
// 		}

// 		Deno.writeTextFile(path, fileContent);
// 	}
// }

// {
// 	// let filePaths: string[] = [];

// 	for await (const entry of expandGlob(`../${appDir}/start-*.js`)) {
// 		let fileContent = await Deno.readTextFile(entry.path);
// 		fileContent = fileContent.replace(
// 			`navigator.serviceWorker.register("/service-worker.js")`,
// 			// `navigator.serviceWorker.register("service-worker.js", {scope: "./")`,
// 			// `navigator.serviceWorker.register("./service-worker.js", { updateViaCache: "all", scope: "./" })`,
// 			// `navigator.serviceWorker.register("./service-worker.js")`,
// 			`navigator.serviceWorker.register("./service-worker.js",{scope:"./"})`,
// 		);
// 		Deno.writeTextFile(entry.path, fileContent);

// 		break;
// 	}
// }

await sleep(waitTime);

{
	// CREATE SOURCEMAP, MINIFY JSON & CREATE FILESTOCACHE.JSON

	let sourcePaths: string[] = [];
	const sourceMapName: string = "sourcemap.js.map";

	const filesToCacheFileName: string = "filestocache.json";
	let filesToCache: string[] = JSON.parse(await Deno.readTextFile(`./static/${appDir}/${filesToCacheFileName}`));

	for await (const entry of walk("../")) {
		if (
			entry.isFile
			&& !entry.path.includes(`\\v\\`)
		) {
			sourcePaths.push(entry.path.replace(/\\/g, "/"));

			// MINIFY JSON
			if (
				!entry.path.startsWith(`..\\${srcDir}\\`)
				&& !entry.path.startsWith(`..\\.vscode\\`)
			) {
				filesToCache.push(entry.path.replace(/\\/g, "/").replace(/^\.\.\//, "./").replace(/\/index\.html$/, "/"));

				if (
					entry.name.endsWith(".json")
					|| entry.name.endsWith(".webmanifest")
				) {
					let fileJSON = JSON.parse(await Deno.readTextFile(entry.path));

					if (entry.name.endsWith(".webmanifest")) {
						fileJSON.version = version.toString();
					}

					await Deno.writeTextFile(entry.path, JSON.stringify(fileJSON));
				}

				if (entry.name === "index.html") {
					let fileContent = await Deno.readTextFile(entry.path);
					fileContent = fileContent.replace(
						`navigator.serviceWorker.register('/service-worker.js')`,
						`navigator.serviceWorker.register("./service-worker.js", { scope: new URL(document.baseURI).pathname })`,
					);
					await Deno.writeTextFile(entry.path, fileContent);
				}
			}
		}
	}

	await Deno.writeTextFile(`../${appDir}/${filesToCacheFileName}`, JSON.stringify(filesToCache.sort()));

	sourcePaths = [
		`../${appDir}/${sourceMapName}`,
		...sourcePaths,
		"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.js",
		"https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.js",
		"https://cdnjs.cloudflare.com/ajax/libs/jszip/3.6.0/jszip.js",
		"https://cdnjs.cloudflare.com/ajax/libs/jszip-utils/0.1.0/jszip-utils.js",
	].sort()

	let sourceMap = {
		version: 3,
		mappings: "",
		sources: sourcePaths,
	}

	await Deno.writeTextFile(`../${appDir}/${sourceMapName}`, JSON.stringify(sourceMap, null, "\t"));
}

{
	// CONSOLE LOG

	console.log(
		`\n%c  ✔ FINISHED   %cby Benjamin Aster   %cVersion ${version}   %c(${new Date(timestamp).toLocaleString()})`,

		`color: lime;   font-weight: bold;`,
		`color: yellow; font-weight: bold;`,
		`color: aqua;   font-weight: bold;`,
		`color: orange; font-weight: bold;`,
	);

}

