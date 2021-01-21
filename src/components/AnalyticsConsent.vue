<template>
  <overlay
    id="analytics-consent"
    :preventClose=true
    :title="this.$i18n.t('terms.analytics-consent.title')"
    >
    <div class="body">
      <p v-text="$i18n.t('terms.analytics-consent.body')" />
      <p>
        {{ this.$i18n.t('terms.analytics-consent.let-us') }}
        <a
          href="javascript:"
          class="more-info"
          @click="showMoreInfo = true" v-text="$i18n.t('terms.analytics-consent.show-more-info')"
          />
      </p>

      <transition enter-active-class="animated zoomIn">
        <div
          class="analytics-details"
          v-if="showMoreInfo"
          v-html="$t('terms.analytics-consent.more-info', { mail: 'info@alexbcberio.eus' })"
          />
      </transition>

      <div>
        <button
          class="analytics-consent-deny"
          @click="denyConsent"
          v-text="$i18n.t('terms.analytics-consent.deny-button')"
          />
        <button
          class="analytics-consent-accept"
          @click="acceptConsent"
          v-text="$i18n.t('terms.analytics-consent.accept-button')"
          />
      </div>
    </div>
  </overlay>
</template>

<script>
export default {
  data() {
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
  }
}
</script>
<style lang="scss" scoped>
#analytics-consent {
  .overlay-content .body {
    max-width: 60%;

    .analytics-details {
      display: inline-block;
      margin-bottom: 1rem;
    }

    .analytics-consent-deny:hover {
      background-color: #f44336;
    }

    .analytics-consent-accept:hover {
      background-color: #388E3C;
    }
  }
}
</style>