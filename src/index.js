'use strict';

import Vue from "vue";
import VueI18n from 'vue-i18n';
import VueMatomo from 'vue-matomo';

import en from "./locales/en.json";
import es from "./locales/es.json";
import eu from "./locales/eu.json";

import App from "./app.vue";

import AnalyticsConsent from "./components/AnalyticsConsent";
import Loader from "./components/Loader";
import Overlay from "./components/Overlay";
import OverlayImage from "./components/OverlayImage";
import ResultItem from "./components/ResultItem";

Vue.use(VueI18n);

Vue.use(VueMatomo, {
    host: "https://matomo.alexbcberio.eus",
    siteId: 3,
    requireConsent: true,
    enableHeartBeatTimer: true,
    hearBeatTimerInterval: 60
});

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
