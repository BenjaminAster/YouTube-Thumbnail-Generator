<!-- 
	@component

	GlobalHead
 -->
<script lang="ts">
	import { base as basePath } from "$app/paths";
	import { page } from "$app/stores";

	import { toMessageComment, toViewportStr } from "$lib/utils";

	import ImportScripts from "./ImportScripts.svelte";
	import ImportStyles from "$lib/GlobalHead/ImportStyles.svelte";

	export let renderInfo;
</script>

<base href="{basePath}/" />

{@html `\n\<\!\-\-\n\n${toMessageComment([
	``,
	`Relative page:`,
	`  .${$page.path}`,
	``,
	`Base URI:`,
	`  ${basePath}/`,
	``,
	`Absolute path:`,
	`  ${basePath + $page.path}`,
	``,
	`Server-rendered at:`,
	`  ${renderInfo.timestampString}`,
	``,
	`Version:`,
	`  ${renderInfo.version}`,
	``,
	`Directories (see Sources in DevTools):`,
	`  - App directory: ./${renderInfo.appDir}/`,
	`  - Development directory: ./${renderInfo.srcDir}/`,
	``,
	`+-----------------------+`,
	`| © 2021 Benjamin Aster |`,
	`+-----------------------+`,
	``,
])}\n\-\-\>\n`}

<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta
	name="viewport"
	content={toViewportStr({
		"width": "device-width",
		"initial-scale": 1,
		"shrink-to-fit": "no",
	})}
/>

<link rel="icon" href="./_/logo.png" />
<link rel="apple-touch-icon" href="./_/logo.png" />
<link rel="manifest" href="./manifest.webmanifest" />
<meta name="theme-color" content="#000000" />

<meta name="robots" content="all" />
<meta name="description" content="Get the thumbnail of a YouTube video" />
<meta name="og:site_name" content="YouTube Thumbnail" />
<meta name="og:image" content="{basePath}/_/logo.png" />
<meta name="author" content="Benjamin Aster" />

<ImportScripts />

<ImportStyles />
