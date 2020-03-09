<template>
    <div>
        <h1 id="title">{{ $t("terms.title") }}</h1>

        <form action="javascript:" method="post" id="search-iTunes" @submit="submit">
            <input type="text" name="term" :placeholder="$t('terms.search-iTunes-form.term-placeholder')" :value="formData ? formData.get('term') : ''" autofocus autocomplete="off" spellcheck="false" />

            <input type="hidden" name="country" :value="formData ? formData.get('country') : $t('countryCode')"/>

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

        <select id="changeLocale" v-model="$i18n.locale">
            <option v-for="(lang, i) in $i18n.availableLocales" :key="`Lang${i}`" :value="lang" :checked="($i18n.locale == lang) ? true : false">{{ $i18n.messages[lang].language }}</option>
        </select>

        <div id="scrollTop" v-if="displayToTop && !scrollingTop" @click="toTop()">
            ↑
        </div>

        <div id="response">
            <result-item v-for="result in results" v-bind:result="result" />

            <template v-if="searching">
                <div style="width: 100%; height: 1rem;"></div>
                <div id="loader">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </template>
        </div>

        <footer>
            Made by <a href="https://github.com/alexbcberio" target="_blank">alexbcberio</a>, view the <a href="https://github.com/alexbcberio/itunes-artwork-finder" target="_blank">source code</a> on GitHub
        </footer>
    </div>
</template>
<script>
    import iTunesAPI from "./assets/js/iTunesAPI";
    let api;

    export default {
        data() {
            return {
                scrollingTop: false,
                displayToTop: false,
                formData: null,
                defaults: {
                    entity: "album",
                    limit: 50
                },
                searching: false,
                results: []
            }
        },
        watch: {
            "$i18n.locale": function(val, oldVal) {
                document.title = this.$i18n.messages[val].terms.title;
                document.documentElement.lang = this.$i18n.messages[val].code;
            }
        },
        methods: {
            spyToTop() {
                this.displayToTop = document.getElementById("search-iTunes").getBoundingClientRect().bottom <= 0;

                if (!this.displayToTop) {
                    this.scrollingTop = false;
                }
            },
            toTop() {
                this.scrollingTop = true;
                document.body.scrollIntoView({behavior: "smooth"});
            },
            setFirstMatchLocale() {
                let userLocales = navigator.languages;
                let locales = this.$i18n.availableLocales;

                for (let i in userLocales) {
                    if (userLocales[i].length === 2) {
                        for (let j in locales) {
                            if (locales.includes(userLocales[i])) {
                                this.$i18n.locale = userLocales[i];

                                return userLocales[i];
                            }
                        }
                    }
                }

                return undefined;
            },
            submit(e) {
                let formData = new FormData(e.target);
                formData.set("media", e.target.querySelector("[name=entity]").selectedOptions[0].parentNode.getAttribute("label").toLowerCase());

                this.results.splice(0);
                this.searching = true;

                history.pushState({
                    "term": formData.get("term"),
                    "country": formData.get("country"),
                    "media": formData.get("media"),
                    "entity": formData.get("entity"),
                    "limit": isNaN(formData.get("limit")) ? 50 : Math.max(Math.min(formData.get("limit"), 200), 1)
                }, document.title, `?q=${formData.get("term")}&country=${formData.get("country")}&entity=${formData.get("entity")}&limit=${formData.get("limit")}`);

                this.search(formData);
            },
            async search(formData) {
                this.formData = formData;

                let res = await api.search(formData);

                this.searching = false;

                if (res && res.resultCount > 0) {
                    this.results.push.apply(this.results, res.results);
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

                this.search(formData);
            },
            setQueryParams() {
                let params = location.search.substr(1).split("&");

                let formElement = document.getElementById("search-iTunes");
                let formData = new FormData();
                formData.set("country", "us");
                formData.set("entity", "album");
                formData.set("limit", 50);

                for (let param of params) {
                    let data = param.split("=");

                    if (data.length == 2) {
                        switch (data[0]) {
                            case "q":
                                formData.set("term", data[1]);
                                break;
                            case "media":
                            case "entity":
                            case "country":
                                formData.set(data[0], data[1]);
                                break;
                            case "limit":
                                let limit = isNaN(data[1]) ? 50 : Math.max(Math.min(data[1], 200), 1);
                                formData.set("limit", limit);
                                break;
                        }
                    }
                }

                if (formData.get("term")) {
                    this.search(formData);
                }
            }
        },
        mounted() {
            api = new iTunesAPI(this.$i18n);
            this.setFirstMatchLocale();

            if (location.search) {
                this.setQueryParams();
            }

            window.addEventListener("popstate", this.popstate);
            document.addEventListener("scroll", this.spyToTop);
        }
    }
</script>
