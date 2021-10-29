<!-- # -->
<script context="module" lang="ts">
	import { browser } from "$app/env";

	import { colorTheme } from "$lib/utils";

	export async function load({ page, fetch, session, context }) {
		const baseFolder = browser ? "./" : "/";
		const renderInfo = await (await fetch(`${baseFolder}_/info.json`)).json();

		return {
			props: {
				renderInfo,
			},
		};
	}
</script>

<script lang="ts">
	import "../styles/global.scss";
	import { onMount } from "svelte";

	import GlobalHead from "$lib/GlobalHead/index.svelte";

	import { PWA } from "$lib/pwa/";

	import { onMountFunction } from "$lib/global";

	import NoScript from "$lib/NoScript.svelte";

	export let renderInfo;

	onMount(async () => {
		await onMountFunction();
	});
</script>

<svelte:head>
	{#if !browser}
		<GlobalHead {renderInfo} />
	{/if}
</svelte:head>

<!-- svelte-ignore missing-declaration -->

<!-- # -->

<input type="checkbox" id="theme-toggler" hidden />

<div id="actual-content">
	<NoScript />

	<nav>
		<button
			title="pop out window"
			class="bi-box-arrow-up-right"
			on:click={async () => {
				window.open(location.href, "_blank", "location=yes");
			}}
		/>

		<button
			title="clear cache & reload"
			class="bi-arrow-clockwise"
			on:click={PWA.clearCacheAndReload}
		/>

		<label
			for="theme-toggler"
			title="toggle light/dark theme"
			class="bi-moon-fill"
			id="theme-toggler-label"
			tabindex="0"
			on:click={colorTheme.store}
		/>
	</nav>

	<main>
		<slot />
	</main>

	<footer>
		Made with <span style="color:red">❤</span> by Benjamin Aster
	</footer>
</div>

<style lang="scss">
	@import "../styles/functions-mixins";

	#actual-content {
		background-color: var(--col-08);

		position: absolute;
		top: 0;
		left: 0;
		right: 0;

		width: 100vw;

		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		text-align: center;
		flex-grow: 1;

		padding: 1rem;
	}

	nav {
		display: flex;
		flex-wrap: wrap;
		max-width: 100%;
		justify-content: center;
		gap: 3px;

		padding: 1rem {
			bottom: 0;
		}

		button,
		label {
			background-color: var(--col-2);
			font-size: 1.2em;
			padding: 0.4em 0.55em;

			white-space: nowrap;

			border: none {
				radius: 0;
			}

			$radius: 0.6em;
			&:first-child {
				border-top-left-radius: $radius;
				border-bottom-left-radius: $radius;
				padding-left: 0.7em;
			}

			&:last-child {
				border-top-right-radius: $radius;
				border-bottom-right-radius: $radius;
				padding-right: 0.7em;
			}

			@media not all and (hover: none) {
				&:hover {
					background-color: var(--col-3);
				}
			}

			&:active {
				background-color: var(--col-4);
			}
		}
	}

	footer {
		padding: 0.5em;
		background-color: var(--col-1);
		text-align: center;
	}
</style>
