<template>
	<div>
		<header ref="header">
			<div id="changeLocale">
				<custom-select
					v-if="showLocalesSelector"
					v-model="$i18n.locale"
					:options='$i18n.availableLocales.map(l => ({display: this.$i18n.messages[l].language, value: l}))'
					:default="this.$i18n.locale"
				/>
			</div>

			<h1 id="title" v-text="$t('terms.title')" />
		</header>

		<form
			action="javascript:"
			method="post"
			id="search-iTunes"
			@submit="submit"
			ref="form"
		>
			<input
				type="text"
				name="term"
				autofocus
				autocomplete="off"
				spellcheck="false"
				:placeholder="$t('terms.search-iTunes-form.term-placeholder')"
				:value="formData ? formData.get('term') : ''"
				:aria-label="$t('terms.search-iTunes-form.term-placeholder')"
				/>

			<input
				type="hidden"
				name="country"
				:value="formData ? formData.get('country') : $t('terms.search-iTunes-form.country-code')"
			/>
			<input
				type="hidden"
				name="offset"
				:value="numResults"
			/>

				<div class="inline">
					<select
						name="entity"
						:value="formData ? formData.get('entity') : defaults.entity"
						:aria-label="$t('terms.search-iTunes-form.entity-label')"
						ref="entity"
					>
						<optgroup label="Movie">
							<option value="movieArtist">Movie Artist</option>
							<option value="movie">Movie</option>
						</optgroup>

						<optgroup label="Podcast">
							<option value="podcastAuthor">Podcast Author</option>
							<option value="podcast">Podcast</option>
						</optgroup>

						<optgroup label="Music">
							<option value="musicArtist">Music Artist</option>
							<option value="musicTrack">Music Track</option>
							<option value="album">Album</option>
							<option value="musicVideo">Music Video</option>
							<option value="mix">Mix</option>
							<option value="song">Song</option>
						</optgroup>

						<optgroup label="Music Video">
							<option value="musicArtist">Music Artist</option>
							<option value="musicVideo">Music Video</option>
						</optgroup>

						<optgroup label="audiobook">
							<option value="audiobookAuthor">Audiobook Author</option>
							<option value="audiobook">Audiobook</option>
						</optgroup>

						<optgroup label="Short Film">
							<option value="shortFilmArtist">Short Film Artist</option>
							<option value="shortFilm">Short Film</option>
						</optgroup>

						<optgroup label="TV Show">
							<option value="tvEpisode">TV Episode</option>
							<option value="tvSeason">TV Season</option>
						</optgroup>

						<optgroup label="Software">
							<option value="software">Software</option>
							<option value="iPadSoftware">iPad Software</option>
							<option value="macSoftware">mac Software</option>
						</optgroup>

						<optgroup label="eBook">
							<option value="ebook">eBook</option>
						</optgroup>

						<optgroup label="all">
							<option value="movie">Movie</option>
							<option value="album">Album</option>
							<option value="allArtist">All Artist</option>
							<option value="podcast">Podcast</option>
							<option value="musicVideo">Music Video</option>
							<option value="mix">Mix</option>
							<option value="audiobook">Audiobook</option>
							<option value="tvSeason">TV Season</option>
							<option value="allTrack">All Track</option>
						</optgroup>
					</select>

					<input
						type="number"
						name="limit"
						min="1"
						max="200"
						:value="formData ? formData.get('limit') : defaults.limit"
						:placeholder="$t('terms.search-iTunes-form.result-limit')"
						:aria-label="$t('terms.search-iTunes-form.result-limit')"
						/>
				</div>

				<button
					type="submit"
					name="submit"
					v-text="$t('terms.search-iTunes-form.submit-text')"
				/>
		</form>

			<main :style="{display: resultsFound === null ? 'flex' : ''}" ref="main">
				<div id="welcome-guide" v-if="resultsFound === null">
					<div class="step-1">
						<img :src="icons.penIcon" alt="Pen icon">
						<h2 v-text="$t('terms.welcome-guide.step-1.title')" />
						<p v-text="$t('terms.welcome-guide.step-1.text')" />
					</div>
					<div class="step-2">
						<img :src="icons.searchIcon" alt="Search icon">
						<h2 v-text="$t('terms.welcome-guide.step-2.title')" />
						<p v-text="$t('terms.welcome-guide.step-2.text')" />
					</div>
					<div class="step-3">
						<img :src="icons.imageFileIcon" alt="Image file icon">
						<h2 v-text="$t('terms.welcome-guide.step-3.title')" />
						<p v-text="$t('terms.welcome-guide.step-3.text')" />
					</div>
				</div>
				<div id="response">
					<p
						class="not-found"
						v-if="!searching && resultsFound === false && results.length === 0"
						v-text="$t('terms.iTunes-search.not-found')"
					/>
					<result-item
						v-for="(result, i) in results"
						:key="i"
						:result="result"
						@preview="previewItem"
					/>

					<div class="separator" />

					<loader v-if="searching" />

					<a
						href="javascript:"
						class="load-more"
						v-if="results.length > 0 && !searching && resultsFound"
						@click="loadMore"
						ref="loadMore"
						v-text="$t('terms.load-more')"
					/>
				</div>

				<scroll-top v-show="displayToTop && !selectedItem.open" />
			</main>

			<overlay-image
				v-show="selectedItem.open"
				:title="selectedItem.title"
				:src="selectedItem.image"
				@close="selectedItem.open=false"
			/>

			<analytics-consent v-if="showAnalyticsConsent" @close="showAnalyticsConsent=false" />

			<footer ref="footer">
					<p v-html="$t('terms.footer', { githubUsername: 'alexbcberio', githubRepoName: 'itunes-artwork-finder'})" />
			</footer>
	</div>
</template>
<script>
	import swal from "sweetalert";

	import iTunesAPI from "./class/iTunesAPI";
	import NoTermException from "./exception/NoTermException";
	import NoNetworkException from "./exception/NoNetworkException";

	import penIcon from "./img/pen-icon.svg";
	import searchIcon from "./img/search-icon.svg";
	import imageFileIcon from "./img/image-file-icon.svg";

	const api = new iTunesAPI();

	export default {
		data() {
			return {
				showLocalesSelector: false,
				showAnalyticsConsent: !(localStorage.getItem("analyticsConsent") || navigator.doNotTrack),
				displayToTop: false,
				formData: null,
				defaults: {
					county: "us",
					entity: "album",
					limit: 20
				},
				searching: false,
				results: [],
				numResults: 0,
				resultsFound: null,
				selectedItem: {
					open: false,
					image: "",
					title: ""
				},
				icons: {
					penIcon,
					searchIcon,
					imageFileIcon
				}
			}
		},
		watch: {
			"$i18n.locale": function(val, oldVal) {
				document.title = this.$i18n.messages[val].terms.title;
				document.documentElement.lang = this.$i18n.messages[val].code;
			}
		},
		methods: {
			scrollSpy() {
					this.displayToTop = this.$refs.form.getBoundingClientRect().bottom <= 0;

					if (
							this.$refs.loadMore &&
							window.innerHeight - this.$refs.loadMore.getBoundingClientRect().bottom > - 100
					) {
						this.loadMore();
					}
			},
			setFirstMatchLocale() {
				const userLocales = navigator.languages;
				const locales = this.$i18n.availableLocales;

				for (let i in userLocales) {
					if (userLocales[i].length === 2) {
						if (locales.includes(userLocales[i])) {
							this.$i18n.locale = userLocales[i];
							this.showLocalesSelector = true;

							return;
						}
					}
				}

				this.showLocalesSelector = true;
			},
			async submit(e) {
				const formData = new FormData(this.$refs.form);

				formData.set("media", this.$refs.entity.selectedOptions[0].parentNode.getAttribute("label").toLowerCase());
				formData.set("offset", 0);

				this.results.splice(0);
				this.numResults = 0;

				const title = `?q=${encodeURIComponent(formData.get("term"))}
					&country=${encodeURIComponent(formData.get("country"))}
					&entity=${encodeURIComponent(formData.get("entity"))}
					&limit=${encodeURIComponent(formData.get("limit"))}
				`;

				history.pushState({
					"term": formData.get("term"),
					"country": formData.get("country"),
					"media": formData.get("media"),
					"entity": formData.get("entity"),
					"limit": formData.get("limit")
				}, document.title, title);

				const results = await this.search(formData);

				this.results.push.apply(this.results, results);
			},
			async search(formData) {
				if (formData.has("limit")) {
					formData.set("limit", Math.max(Math.min(formData.get("limit"), 200), 1));
				}

				const results = [];
				this.formData = formData;

				try {
					this.searching = true;
					this.resultsFound = false;

					const res = await api.search(formData);

					if (this.$matomo) {
						this.$matomo.trackSiteSearch(formData.get("term"), formData.get("entity"), res.resultCount);
					}

					if (res) {
						this.numResults += res.resultCount;

						if (this.results.length === 0) {
							if (res.resultCount === 0) {
								this.resultsFound = false;

							} else if (res.resultCount <= parseInt(formData.get("limit"))) {
								this.resultsFound = true;
							}

							results.push.apply(results, res.results);

						} else {
							const currentArtworks = this.results.map(r => r.artworkUrl60);

							for (const result of res.results) {
								if (!currentArtworks.includes(result.artworkUrl60)) {
									this.resultsFound = true;
									results.push(result);
								}
							}
						}
					}

				} catch (e) {
					let errorTitle;
					let errorText;

					switch (e.constructor) {
						case NoTermException:
							errorTitle = this.$i18n.t("terms.iTunes-search.errors.no-term.title");
							errorText = this.$i18n.t("terms.iTunes-search.errors.no-term.text");
							break;
						case NoNetworkException:
							errorTitle = this.$i18n.t("terms.iTunes-search.errors.no-network.title");
							errorText = this.$i18n.t("terms.iTunes-search.errors.no-network.text");
							break;
						default:
							errorTitle = "Error";
							errorText = "Unknown error";
					}

					swal({
						title: errorTitle,
						text: errorText,
						icon: "error"
					});

				} finally {
					this.searching = false;
				}

				return results;
			},
			async loadMore() {
				const results = await this.search(new FormData(this.$refs.form));

				this.results.push.apply(this.results, results);
			},
			async popstate(e) {
				const data = e.state;
				const formData = new FormData();

				for (let input in data) {
					formData.set(input, data[input]);
				}

				this.results.splice(0);
				this.numResults = 0;
				this.searching = true;

				if (formData.get("term")) {
					const results = await this.search(formData);

					this.results.push.apply(this.results, results);

				} else {
					this.searching = false;
				}
			},
			async setQueryParams() {
				const searchParams = new URLSearchParams(location.search);
				const formData = new FormData();

				formData.set("country", this.defaults.country);
				formData.set("entity", this.defaults.entity);
				formData.set("limit", this.defaults.limit);

				for (let param of searchParams.entries()) {
					const [name, value] = param;

					switch (name) {
						case "q":
							formData.set("term", unescape(value));
							break;
						case "media":
						case "entity":
						case "country":
							formData.set(name, value);
							break;
						case "limit":
							if (!isNaN(value)) {
								formData.set(name, value);
							}
							break;
					}
				}

				if (formData.get("term")) {
					const results = await this.search(formData);

					this.results.push.apply(this.results, results);
				}
			},
			previewItem(title, artworkUrl) {
				this.selectedItem.open = true;
				this.selectedItem.title = title;
				this.selectedItem.image = artworkUrl;
			},
			initMainHeight() {
				setTimeout(() => {
					const header = this.$refs.header.offsetHeight;
					const form = this.$refs.form.offsetHeight;
					const footer = this.$refs.footer.offsetHeight;

					this.$refs.main.style.minHeight = `calc(100vh - ${header + form + footer}px)`;
				}, 0);
			},
			trackPageView() {
				if (!this.$matomo) {
					setTimeout(this.trackPageView, 250);
				} else {
					this.$matomo.trackPageView();
				}
			},
			async startServiceWorker() {
				if (!("serviceWorker" in navigator)) {
					console.log("Browser does not support service worker.");
					return;
				}

				const reg = await navigator.serviceWorker.register("./serviceworker.js");
				let sw;

				if (reg.installing) {
					sw = reg.installing;
					this.swState("installing");
				} else if (reg.waiting) {
					sw = reg.waiting;
					this.swState("waiting");
				} else if (reg.active) {
					sw = reg.active;
					this.swState("active");
				}

				sw.addEventListener("statechange", this.swState);
			},
			async swState(e) {
				if (typeof e !== "string") {
					e = e.target.state;
				}

				console.log(`Service worker status: ${e}`);

				if (e === "redundant") {
					const reload = await swal({
						title: this.$t("terms.update.title"),
						text: this.$t("terms.update.text"),
						icon: "info",
						buttons: {
							cancel: {
								text: this.$t("terms.update.cancelButton"),
								value: false,
								visible: true
							},
							confirm: {
								text: this.$t("terms.update.confirmButton"),
								value: true,
								visible: true
							}
						}
					});

					if (reload) {
						location.reload();
					}
				}
			},
			removePreload() {
				const loader = document.getElementById("appLoading");

				if (loader) {
					if (loader.classList.contains("hidden")) {
						loader.remove()
						return;
					}

					loader.classList.add("animated", "fadeOut", "faster");
					loader.onanimationend = () => {
						loader.remove();
					}
				}
			}
		},
		async mounted() {
			this.setFirstMatchLocale();
			this.initMainHeight();

			window.addEventListener("popstate", this.popstate);
			document.addEventListener("scroll", this.scrollSpy);

			this.startServiceWorker();
			this.trackPageView();

			this.removePreload();

			if (location.search) {
				await this.setQueryParams();
			}
		},
		beforeDestroy() {
			window.removeEventListener("popstate", this.popstate);
			document.removeEventListener("scroll", this.scrollSpy);
		}
	}
</script>
<style lang="scss" scoped>
@import "./scss/variables";

$inputWidth: 5rem;
$inputMargin: 2rem;

.hidden {
	display: none !important;
}

header {
	#changeLocale {
		width: 11em;
		padding: .5rem;
		margin-left: auto;
	}

	#title {
		margin: 0;
		padding: 0 1rem;
		text-align: center;
		font-size: 2rem;
		color: $schemeColor;
	}
}

.loader {
	width: 100%;
}

#search-iTunes {
	padding: 1rem 5%;
	margin: auto;

	input,
	button,
	select {
		color: $schemeColor;
		border-color: $schemeColor;
		background-color: $schemeBackground;
	}

	select * {
		background-color: $schemeBackground;
	}

	.inline {
		display: flex;
		justify-content: space-between;

		select {
			width: calc(100% - #{$inputWidth + $inputMargin});
		}

		input {
			width: $inputWidth;
		}
	}
}

#welcome-guide {
	width: 80%;
	margin: auto;

	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
	text-align: center;

	& > div {
		margin: auto;
		padding: 0px 2rem;
		color: $schemeColor;

		& > h2 {
			font-size: 1.15rem;
		}
	}

	img {
		height: 3rem;

		@media (prefers-color-scheme: dark) {
			& {
				filter: invert(1);
			}
		}
	}
}

#response {
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
	align-items: stretch;
	margin-bottom: 1rem;
	color: $schemeColor;

	.separator {
		width: 100%;
		height: 1rem;
	}

	.not-found {
		width: 80%;
		margin: auto;
		text-align: center;
	}

	.load-more {
		margin: auto;
	}
}

footer {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100px;
	background-color: $primaryColor;
	color: white;
	border-top: .15em solid $schemeColor;

	p {
		margin: 0 .5rem;
		text-align: center;

		a {
			text-decoration: underline;

			&:hover {
				text-decoration: none;
			}
		}
	}
}
</style>
