<!-- # -->
<script lang="ts">
	import { copyText } from "$lib/utils";
	import { onMount } from "svelte";

	$: videoId = (() => {
		isCopied = false;

		return youtubeLink?.match(/[a-zA-Z0-9\-_]{11}/)?.[0] || "";
	})();

	$: imgSrc = (() => {
		if (videoId) {
			return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
		} else {
			return "";
		}
	})();

	let isCopied: boolean = false;

	let inputElement: HTMLInputElement;

	let youtubeLink: string = "";

	onMount(() => {
		inputElement.focus();
	});
</script>

<svelte:head>
	<title>YouTube Thumbnail Generator</title>
</svelte:head>

<h2>YouTube Thumbnail Image Generator</h2>

<input
	bind:value={youtubeLink}
	bind:this={inputElement}
	on:blur={() => window.setTimeout(() => inputElement.focus())}
	type="search"
	placeholder="Paste the video link here."
/>

<br />

<section hidden={!imgSrc}>
	<a href={imgSrc} rel="nofollow">
		<img src={imgSrc} alt="YouTube thumnail" />
	</a>

	<p>
		<a href={imgSrc} rel="nofollow">{imgSrc}</a>
		<button
			on:click={() => {
				copyText(imgSrc);
				isCopied = true;
			}}
			class="bi-clipboard{isCopied ? '-check' : ''}"
		/>
	</p>
</section>

<style lang="scss">
	@import "../styles/functions-mixins";

	input {
		background-color: var(--col-18);
		width: min(35rem, 90%);
		outline: none;

		padding: 0.8em;
		margin: 1em;

		border: none {
			radius: 0.4rem;
		}

		&:focus {
			box-shadow: 0 0 0.6em 0.2em var(--col-0);
			background-color: var(--col-2);
		}

		&::placeholder {
			color: var(--col-a);
		}

		&::-webkit-search-cancel-button {
			font-size: 2em;
		}
	}

	p {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.5em;

		a {
			// word-wrap: break-word;
			word-break: break-all;
		}

		button {
			display: flex;
			justify-content: center;
			align-items: center;

			font-size: 1.5em;

			background-color: var(--col-3);

			$width: 3rem;
			width: $width;
			height: $width;
			aspect-ratio: 1 / 1;

			transition: var(--transition-props), font-size 100ms ease;

			border: none {
				radius: 0.5rem;
			}

			@media not all and (hover: none) {
				&:hover {
					background-color: var(--col-4);
				}
			}

			&:active {
				background-color: var(--col-5);
				font-size: 2em;
			}
		}
	}

	img {
		width: min(90%, 35rem);
		border-radius: 0.4rem;
		aspect-ratio: 16 / 9;
	}
</style>
