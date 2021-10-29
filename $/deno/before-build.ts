
import {
	ensureDir,
	copy,
} from "https://deno.land/std@0.97.0/fs/mod.ts";

const nmDir = "C:/Users/Benja/AppData/Roaming/npm/node_modules";

let sleep = async (ms: number): Promise<void> => {
	return new Promise((resolve: () => void) => {
		globalThis.setTimeout(resolve, ms);
	});
};

const waitTime: number = 20;
const appDir: string = "_";
const srcDir: string = "$";

{
	// DELETE AND ADD FOLDERS

	await ensureDir(`../${appDir}`);
	await sleep(waitTime);
	await Deno.remove(`../${appDir}`, { recursive: true });
	await sleep(waitTime);

	await ensureDir("./.svelte-kit");
	await sleep(waitTime);
	await Deno.remove("./.svelte-kit", { recursive: true });
	await sleep(waitTime);
}

{
	// CHANGE VERSION
	let fileName = "info.json";
	const fileJSON = JSON.parse(await Deno.readTextFile(`./static/${appDir}/${fileName}`));

	fileJSON.version++;

	const date = new Date();
	fileJSON.timestamp = date.getTime();
	fileJSON.timestampString = date.toLocaleString("uk", {
		timeZoneName: "short",
		timeZone: "CET",
	});
	fileJSON.appDir = appDir;
	fileJSON.srcDir = srcDir;

	await Deno.writeTextFile(`./static/${appDir}/${fileName}`, JSON.stringify(fileJSON, null, "\t"));

	// fileName = "version.css";
	// await Deno.writeTextFile(`./static/${appDir}/${fileName}`, `.version-display::after{content:"${fileJSON.version}"}`);
}
