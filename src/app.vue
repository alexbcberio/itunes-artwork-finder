<template>
    <div>
        <header>
            <h1 id="title">{{ $t("terms.title") }}</h1>

            <select id="changeLocale" v-model="$i18n.locale">
                <option v-for="(lang, i) in $i18n.availableLocales" :key="`Lang${i}`" :value="lang" :checked="($i18n.locale == lang) ? true : false">{{ $i18n.messages[lang].language }}</option>
            </select>
        </header>

        <form action="javascript:" method="post" id="search-iTunes" @submit="submit">
            <input type="text" name="term" :placeholder="$t('terms.search-iTunes-form.term-placeholder')" :value="formData ? formData.get('term') : ''" autofocus autocomplete="off" spellcheck="false" />

            <input type="hidden" name="country" :value="formData ? formData.get('country') : $t('terms.search-iTunes-form.country-code')" />

            <div class="inline">
                <select name="entity" :value="formData ? formData.get('entity') : defaults.entity">
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

                <input type="number" name="limit" :value="formData ? formData.get('limit') : defaults.limit" min="1" max="200" :placeholder="$t('terms.search-iTunes-form.result-limit')"/>
            </div>

            <button type="submit" name="submit">
                {{ $t("terms.search-iTunes-form.submit-text") }}
            </button>
        </form>

        <main :style="{display: resultsFound === null ? 'flex' : ''}">
            <div v-if="resultsFound === null" id="welcome-guide" ve-html="">
                <div class="step-1">
                    <img src="img/pen-icon.svg" alt="Pen icon">
                    <h3>{{ $t("terms.welcome-guide.step-1.title") }}</h3>
                    <p>{{ $t("terms.welcome-guide.step-1.text") }}</p>
                </div>
                <div class="step-2">
                    <img src="img/search-icon.svg" alt="Search icon">
                    <h3>{{ $t("terms.welcome-guide.step-2.title") }}</h3>
                    <p>{{ $t("terms.welcome-guide.step-2.text") }}</p>
                </div>
                <div class="step-3">
                    <img src="img/image-file-icon.svg" alt="Image file icon">
                    <h3>{{ $t("terms.welcome-guide.step-3.title") }}</h3>
                    <p>{{ $t("terms.welcome-guide.step-3.text") }}</p>
                </div>
            </div>
            <div id="response">
                <p v-if="!searching && resultsFound === false" class="not-found">{{ $t("terms.iTunes-search.not-found") }}</p>
                <result-item v-for="(result, i) in results" :key="i" :result="result" @preview="previewItem" />

                <div style="width: 100%; height: 1rem;"></div>

                <loader v-if="searching"/>
            </div>
            <div id="scrollTop" v-if="displayToTop && !selectedItem.open" @click="toTop()">
                ↑
            </div>
        </main>

        <overlay-image v-show="selectedItem.open" :title="selectedItem.title" :src="selectedItem.image" @close="selectedItem.open=false" />

        <analytics-consent v-if="showAnalyticsConsent" @close="showAnalyticsConsent=false" />

        <footer v-html="$t('terms.footer')"></footer>
    </div>
</template>
<script>
    import swal from "sweetalert";

    import iTunesAPI from "./class/iTunesAPI";
    import NoTermException from "./exception/NoTermException";
    import NoNetworkException from "./exception/NoNetworkException";

    let api = new iTunesAPI();

    export default {
        data() {
            return {
                showAnalyticsConsent: !(localStorage.getItem("analyticsConsent")),// || navigator.doNotTrack),
                displayToTop: false,
                formData: null,
                defaults: {
                    entity: "album",
                    limit: 50
                },
                searching: false,
                results: [],
                resultsFound: null,
                selectedItem: {
                    open: false,
                    image: null,
                    title: null
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
                this.displayToTop = document.getElementById("search-iTunes").getBoundingClientRect().bottom <= 0;
            },
            toTop() {
                document.body.scrollIntoView({behavior: "smooth"});
            },
            setFirstMatchLocale() {
                let userLocales = navigator.languages;
                let locales = this.$i18n.availableLocales;

                for (let i in userLocales) {
                    if (userLocales[i].length === 2) {
                        if (locales.includes(userLocales[i])) {
                            this.$i18n.locale = userLocales[i];

                            return userLocales[i];
                        }
                    }
                }

                return undefined;
            },
            submit(e) {
                let formData = new FormData(e.target);
                formData.set("media", e.target.querySelector("[name=entity]").selectedOptions[0].parentNode.getAttribute("label").toLowerCase());

                this.results.splice(0);

                history.pushState({
                    "term": formData.get("term"),
                    "country": formData.get("country"),
                    "media": formData.get("media"),
                    "entity": formData.get("entity"),
                    "limit": isNaN(formData.get("limit")) ? 50 : Math.max(Math.min(formData.get("limit"), 200), 1)
                }, document.title, `?q=${encodeURIComponent(formData.get("term"))}&country=${encodeURIComponent(formData.get("country"))}&entity=${encodeURIComponent(formData.get("entity"))}&limit=${encodeURIComponent(formData.get("limit"))}`);

                this.search(formData);
            },
            async search(formData) {
                this.formData = formData;

                try {
                    this.searching = true;
                    this.resultsFound = false;
                    let res = await api.search(formData);

                    if (this.$matomo) {
                        this.$matomo.trackSiteSearch(formData.get("term"), formData.get("entity"), res.resultCount);
                    }

                    if (res && res.resultCount > 0) {
                        this.resultsFound = true;
                        this.results.push.apply(this.results, res.results);
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

            },
            popstate(e) {
                let data = e.state;
                let formData = new FormData();

                for (let input in data) {
                    let value = data[input];
                    formData.set(input, value);
                }

                this.results.splice(0);
                this.searching = true;

                if (formData.get("term")) {
                    this.search(formData);
                } else {
                    this.searching = false;
                }
            },
            setQueryParams() {
                const searchParams = new URLSearchParams(location.search);

                let formData = new FormData();
                formData.set("country", "us");
                formData.set("entity", "album");
                formData.set("limit", 50);

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
                            let limit = isNaN(value) ? 50 : Math.max(Math.min(value, 200), 1);
                            formData.set("limit", limit);
                            break;
                    }
                }

                if (formData.get("term")) {
                    this.search(formData);
                }
            },
            previewItem(title, artworkUrl) {
                this.selectedItem.open = true;

                this.selectedItem.title = title;
                this.selectedItem.image = artworkUrl;
            },
            initMainHeight() {
                const header = document.getElementsByTagName("header")[0].getClientRects()[0].height;
                const form = document.getElementById("search-iTunes").getClientRects()[0].height;
                const footer = document.getElementsByTagName("footer")[0].getClientRects()[0].height;

                document.getElementsByTagName("main")[0].style.minHeight = `calc(100vh - ${header + form + footer}px - 1rem)`;
            },
            trackPageView() {
                if (!this.$matomo) {
                    setTimeout(this.trackPageView, 250);
                } else {
                    this.$matomo.trackPageView();
                }
            }
        },
        mounted() {
            this.setFirstMatchLocale();
            this.initMainHeight();

            if (location.search) {
                this.setQueryParams();
            }

            window.addEventListener("popstate", this.popstate);
            document.addEventListener("scroll", this.scrollSpy);

            this.trackPageView();
        },
        beforeDestroy() {
            window.removeEventListener("popstate", this.popstate);
            document.removeEventListener("scroll", this.scrollSpy);
        }
    }
</script>
