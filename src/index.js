'use strict';

import Vue from "vue";
import VueI18n from 'vue-i18n';
import VueMatomo from 'vue-matomo';
import appView from "./app.vue";

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
    host: "https://matomo.alexbcberio.com",
    siteId: 3,
    requireConsent: true,
    disableCookies: true,
    enableHeartBeatTimer: true,
    hearBeatTimerInterval: 30,
});

const locales = require.context(
	"./locales",
	false,
	/[a-z]{2}\.json$/
);
const messages = {}

locales.keys().forEach(locale => {
	const filename = locale
		.split("/")
		.pop()
		.replace(/\.json/, "");

	messages[filename] = {
		...locales(locale),
		...{ code: filename }
	};
});

const i18n = new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages,
});

const app = new Vue({
    i18n,
    el: "#app",

    render: h => h(appView)
});
