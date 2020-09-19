import Vue from "vue";

Vue.component('OverlayImage', {
  props: [
    "src",
    "title"
  ],
  data: function() {
    return {
      visible: false,
      imgPreloaded: false
    };
  },
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

      return a.href;
    },
    preloadImage: function() {
      const img = new Image();
      img.style.display = "none";
      document.body.appendChild(img);

      img.src = this.src;

      img.onload = () => {
        this.imgPreloaded = true;
        document.body.removeChild(img);
      }
    },
  },
  watch: {
    "src": function() {
      this.imgPreloaded = false;
      this.preloadImage();
    }
  },
  template: `
  <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" @before-enter="visible = true" @after-leave="visible = false">
    <overlay :title="title" :listenKeyboard=true @close="$emit('close')">
      <div class="image" :style="{backgroundImage: imgPreloaded ? 'url(' + src + ')' : ''}" @click="downloadImage" :title="$t('terms.iTunes-search.download-image.download')">
        <loader v-if="!imgPreloaded" />
      </div>
    </overlay>
  </transition>
  `
});
