<script lang="ts">
	import { browser } from "$app/env";

	const importStyles: string[] = ["/css/bootstrap-icons.css"];

	const styleHTML: string = `\n\u003Cstyle\u003E\n${importStyles
		.map(
			//
			(val: string) => `\t@import url(${JSON.stringify(val)});`,
		)
		.join(
			"\n",
		)}\n\u003C/style\u003E\n`;
</script>

{#each importStyles as importStyle, i}
	{i ? "\n" : ""}<link rel="preload" as="style" href={importStyle} />
{/each}

{@html styleHTML}
