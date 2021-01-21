<template>
  <div class="collectionElement">
    <p class="collection-name" v-text="result.collectionName" />
    <div class="albumart-download-links">
      <a
        class="albumart-download-link"
        target="_blank"
        rel="noreferrer"
        :href="result.artworkUrl60.replace('60x60', '500x500')"
        @click="emitPreview"
        v-text="$t('terms.iTunes-search.download-image.standard-resolution')"
      />
      <a
        class="albumart-download-link"
        target="_blank"
        rel="noreferrer"
        :href="result.artworkUrl60.replace('60x60', '5000x5000')"
        @click="emitPreview"
        v-text="$t('terms.iTunes-search.download-image.high-resolution')"
      />
    </div>
      <img
        class="albumart"
        :src="result.artworkUrl60.replace('60x60', '300x300')"
      />
    </div>
</template>

<script>
export default {
  props: {
    result: {
      type: Object,
      required: true
    }
  },
  methods: {
    emitPreview(e) {
      e.preventDefault();
      this.$emit("preview", this.result.collectionName, e.target.href);
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../scss/variables";

.collectionElement {
  width: 90%;
  margin: auto;
  padding: 0 .5rem;
  transition: width 1s;

  @media screen {
    @media (min-width: 512px) {
      & {
          width: 45%;
      }
    }
    @media (min-width: 600px) {
      & {
          width: 30%;
      }
    }
    @media (min-width: 1020px) {
      & {
          width: 22%
      }
    }
    @media (min-width: 1400px) {
      & {
          width: 15%;
      }
    }
    @media (min-width: 1920px) {
      & {
          width: 19rem;
      }
    }
  }

  .collection-name {
    width: 100%;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .albumart-download-links {
    display: flex;
    align-items: center;
    margin-bottom: .5rem;
  }

  .albumart-download-link {
    display: inline-block;
    width: 50%;
    text-align: center;
    text-decoration: underline dotted;
    color: $schemeColor;

    &:hover {
      text-decoration: none;
      color: $primaryColor;
    }
  }

  .albumart {
    display: block;
    width: 100%;
    margin: auto;
    transition: box-shadow .3s, filter .3s;
    filter: brightness(.6);

    &:hover {
      box-shadow: 0 0 .5rem $schemeColor;
      filter: brightness(1);
    }
  }
}
</style>
