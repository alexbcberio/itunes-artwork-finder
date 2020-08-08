'use strict';

import Vue from "vue";
import VueI18n from 'vue-i18n';

import en from "./locales/en.json";
import es from "./locales/es.json";
import eu from "./locales/eu.json";

import App from "./app.vue";

import ResultItem from "./components/ResultItem";
import OverlayImage from "./components/OverlayImage";

Vue.use(VueI18n);

const messages = {
    en,
    es,
    eu
}

const i18n = new VueI18n({
    locale: 'en',
    messages,
});

const app = new Vue({
    i18n,
    el: "#app",

    template: "<app/>",
    components: {
        app: App
    }
});
