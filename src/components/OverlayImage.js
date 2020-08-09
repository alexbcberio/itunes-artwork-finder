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
    kbdControls: function(e) {
      if (this.visible) {
        switch(e.code) {
          case "Escape":
            this.$emit("close");
            break;
        }
      }
    }
  },
  watch: {
    "src": function() {
      this.imgPreloaded = false;
      this.preloadImage();
    }
  },
  mounted() {
    document.addEventListener("keydown", this.kbdControls);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.kbdControls);
  },
  template: `
  <transition enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut" @before-enter="visible = true" @after-leave="visible = false">
    <div class="overlay">
      <div class="overlay-header">
          <span></span>
          <span v-if="title" class="title">{{ title }}</span>
          <span class="close" @click="$emit('close')">&times;</span>
      </div>
      <div class="overlay-content">
          <div class="image" :style="{backgroundImage: imgPreloaded ? 'url(' + src + ')' : ''}" @click="downloadImage" :title="$t('terms.iTunes-search.download-image.download')">
            <loader v-if="!imgPreloaded" />
          </div>
      </div>
    </div>
  </transition>
  `
});
