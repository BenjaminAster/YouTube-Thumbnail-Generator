<!-- # -->

<noscript>
	<input type="checkbox" id="javascript-banner-x" hidden />
	<section>
		<strong class="message">
			For a better experience on this site, please enable JavaScript.
		</strong>
		<label for="javascript-banner-x">
			<span class="bi-x-lg x" />
		</label>
		<style>
			.no-transition,
			.no-transition * {
				transition: var(--transition-props);
			}
		</style>
	</section>
</noscript>

<style lang="scss">
	@import "../styles/functions-mixins";

	section {
		display: flex;
		align-items: center;
		text-align: center;
		padding: 0.2em;
		background-color: darkLight(tomato, firebrick);
		color: var(--col-0);

		.message {
			width: 100%;
			letter-spacing: 0.3px;
		}

		* {
			color: inherit;
		}

		#javascript-banner-x:checked ~ & {
			display: none;
		}

		label {
			$width: 1.2em;
			width: $width;
			height: $width;
			display: flex;
			aspect-ratio: 1/1;
			align-items: center;
			justify-content: center;
			background-color: var(--col-f);
			border-radius: 50%;
			margin-left: 0.5em;
			// padding-top: 0.05em;

			.x {
				font-size: 0.7em;
				// padding-top: .1em;
			}

			@media not all and (hover: none) {
				&:hover {
					background-color: var(--col-c);
				}
			}

			&:active {
				background-color: var(--col-9);
			}
		}
	}
</style>
