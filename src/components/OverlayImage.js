import Vue from "vue";

Vue.component('OverlayImage', {
  props: [
    "src",
    "title"
  ],
  methods: {
    /*
     * adapted from https://davidwalsh.name/javascript-download
     */
    downloadImage: async function() {
      const a = document.createElement("a");
      a.style.display = "none";
      document.body.appendChild(a);

      let res = await fetch(this.src);
      let blob = await res.blob();
      a.href = window.URL.createObjectURL(blob);

      a.setAttribute("download", `${this.title}.${blob.type.split("/").pop()}`);
      a.click();

      window.URL.revokeObjectURL(a.href);
      document.body.removeChild(a);
    }
  },
  template: `
  <transition enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut">
    <div class="overlay">
      <div class="overlay-header">
          <span></span>
          <span v-if="title" class="title">{{ title }}</span>
          <span class="close" @click="$emit('close')">&times;</span>
      </div>
      <div class="overlay-content">
          <div class="image" :style="{backgroundImage: 'url(' + src + ')'}" @click="downloadImage" :title="$t('terms.iTunes-search.download-image.download')"></div>
      </div>
    </div>
  </transition>
  `
});
