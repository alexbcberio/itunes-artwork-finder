import Vue from "vue";

Vue.component('Overlay', {
  props: [
    "title",
    "listenKeyboard",
    "preventClose"
  ],
  methods: {
    kbdControls: function(e) {
      switch(e.code) {
        case "Escape":
          if (this.preventClose !== true) {
            this.$emit("close");
          }
          break;
      }
    }
  },
  mounted() {
    if (this.listenKeyboard) {
      document.addEventListener("keydown", this.kbdControls);
    }
  },
  beforeDestroy() {
    if (this.listenKeyboard) {
      document.removeEventListener("keydown", this.kbdControls);
    }
  },
  template: `
  <div class="overlay">
    <div class="overlay-header">
        <span></span>
        <span v-if="title" class="title">{{ title }}</span>
        <span v-if="preventClose !== true" class="close" @click="$emit('close')">&times;</span>
        <span v-else></span>
    </div>
    <div class="overlay-content">
      <slot></slot>
    </div>
  </div>
  `
});
