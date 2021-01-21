<template>
  <transition
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    @before-enter="visible = true"
    @after-leave="visible = false"
    >
    <overlay
      :listenKeyboard=true
      :title="title"
      @close="$emit('close')"
    >
      <loader v-if="!imgPreloaded" />
      <img
        class="artwork"
        draggable="false"
        v-else
        :src="src"
        :title="$t('terms.iTunes-search.download-image.download')"
        @click="downloadImage"
      />
    </overlay>
  </transition>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      visible: false,
      imgPreloaded: false
    };
  },
  watch: {
    src() {
      this.imgPreloaded = false;
      this.preloadImage();
    }
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
    preloadImage() {
      const img = new Image();
      img.style.display = "none";
      document.body.appendChild(img);

      img.src = this.src;

      img.onload = () => {
        this.imgPreloaded = true;
        document.body.removeChild(img);
      };
    },
  }
}
</script>
<style lang="scss" scoped>
img.artwork {
  display: flex;
  max-width: 80%;
  max-height: 80%;
  cursor: pointer;
}
</style>