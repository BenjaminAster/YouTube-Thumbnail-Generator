<script lang="ts">
	import { base as basePath } from "$app/paths";

	const moduleImportScripts: string[] = [
		"/firebase/app.js",
		// "/firebase/database.js",
		"/firebase/analytics.js",
		"/firebase/init.js",
	];

	const preconnectURLs: string[] = [
		// "https://storage.googleapis.com",
		// "https://cdnjs.cloudflaire.com",
	];

	// \u0023 = #
	// \u003C = <
	// \u003E = >

	const scriptHTML = `\n\u003Cscript type="module"\u003E\n${
		moduleImportScripts
			.map((val: string) => `\timport ${JSON.stringify(val)};\n`)
			.join("") //
	}\n\n\t//\u0023 sourceMappingURL=${basePath}/_/sourcemap.js.map\n\u003C/script\u003E\n`;
</script>

{#each preconnectURLs as preconnectURL, i}
	{i ? "\n" : ""}<link rel="preconnect" href={preconnectURL} />
{/each}

{#each moduleImportScripts as importScript, i}
	{i ? "\n" : ""}<link rel="modulepreload" href={importScript} />
{/each}

{@html scriptHTML}
