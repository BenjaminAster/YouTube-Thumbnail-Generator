// #

import sveltePreprocess from "/Users/Benja/AppData/Roaming/npm/node_modules/svelte-preprocess/dist/index.js";
import adapter from "/Users/Benja/AppData/Roaming/npm/node_modules/@sveltejs/adapter-static/index.js";

const basePath = "/youtube-thumbnail";
const appDir = "_";

export default {
	preprocess: sveltePreprocess(),
	kit: {
		appDir: appDir,
		adapter: adapter({
			pages: "../",
		}),
		paths: {
			base: basePath,
		},
		prerender: {
			crawl: false,
		},
		trailingSlash: "always",
	},
};
