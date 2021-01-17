'use strict';

import Vue from "vue";
import VueI18n from 'vue-i18n';
import VueMatomo from 'vue-matomo';
import appView from "./app.vue";

import en from "./locales/en.json";
import es from "./locales/es.json";
import eu from "./locales/eu.json";

const components = require.context(
    "./components",
    true,
    /[A-Z]\w+\.vue$/
);

components.keys().forEach(filename => {
    const config = components(filename);
    const componentName = filename
        .split("/")
        .pop()
        .replace(/\.\w+$/, "");

    Vue.component(
        componentName,
        config.default || config
    )
});

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

    render: h => h(appView)
});
