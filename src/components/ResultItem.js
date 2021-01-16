import Vue from "vue";

Vue.component('ResultItem', {
  props: ['result'],
  methods: {
    emitPreview: function(e) {
      e.preventDefault();
      this.$emit('preview', this.result.collectionName, e.target.href);
    }
  },
  template: `
  <div class="collectionElement">
        <p class="collection-name">{{ result.collectionName }}</p>
        <div class="albumart-download-links">
            <a :href="result.artworkUrl60.replace('60x60', '500x500')" rel="noreferrer" class="albumart-download-link" target="_blank" @click="emitPreview">{{ $t("terms.iTunes-search.download-image.standard-resolution") }}</a>
            <a :href="result.artworkUrl60.replace('60x60', '5000x5000')" rel="noreferrer" class="albumart-download-link" target="_blank" @click="emitPreview">{{ $t("terms.iTunes-search.download-image.high-resolution") }}</a>
        </div>
        <img :src="result.artworkUrl60.replace('60x60', '300x300')" class="albumart" />
    </div>
  `
});
