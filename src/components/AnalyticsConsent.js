import Vue from 'vue';
import swal from 'sweetalert';

Vue.component("AnalyticsConsent", {
  data: function() {
    return {
      showMoreInfo: false
    };
  },
  methods: {
    denyConsent() {
      if (this.$matomo) {
        this.$matomo.forgetConsentGiven();
        localStorage.setItem("analyticsConsent", "deny");
      }

      this.$emit("close");
    },
    acceptConsent() {
      if (this.$matomo) {
        this.$matomo.rememberConsentGiven();
        localStorage.setItem("analyticsConsent", "accept");
      }

      this.$emit("close");
    }
  },
  template: `
  <overlay :preventClose=true id="analytics-consent" :title="this.$i18n.t('terms.analytics-consent.title')">
    <div class="body">
      <p>
        {{ this.$i18n.t('terms.analytics-consent.body') }}
      </p>
      <p>
        {{ this.$i18n.t('terms.analytics-consent.let-us') }} <a href="javascript:" class="more-info" @click="showMoreInfo = true">{{ this.$i18n.t('terms.analytics-consent.show-more-info') }}</a>
      </p>

      <transition enter-active-class="animated zoomIn">
        <div class="analytics-details" v-if="showMoreInfo" v-html="this.$i18n.t('terms.analytics-consent.more-info', { mail: 'info@alexbcberio.eus' })"></div>
      </transition>

      <div>
        <button class="analytics-consent-deny" @click="denyConsent">{{ this.$i18n.t('terms.analytics-consent.deny-button') }}</button>
        <button class="analytics-consent-accept" @click="acceptConsent">{{ this.$i18n.t('terms.analytics-consent.accept-button') }}</button>
      </div>
    </div>
  </overlay>
  `
});