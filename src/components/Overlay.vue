<template>
  <div
    class="overlay"
    @click="backdropClose"
  >
    <div class="overlay-header">
      <span />
      <span
        class="title"
        v-if="title"
        v-text="title"
        />
      <span
      class="close"
      v-if="preventClose !== true"
      @click="$emit('close')">
        &times;
      </span>
      <span v-else />
    </div>
    <div class="overlay-content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    listenKeyboard: {
      type: Boolean,
      required: false,
      default: true
    },
    preventClose: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    kbdControls(e) {
      switch(e.code) {
        case "Escape":
          if (this.preventClose !== true) {
            this.$emit("close");
          }
          break;
      }
    },
    backdropClose(e) {
      const itemClassList = e.target.classList;
      if (
        itemClassList.contains("overlay") ||
        itemClassList.contains("overlay-header") ||
        itemClassList.contains("overlay-content")
      ) {
        this.$emit("close");
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
  }
}
</script>
<style lang="scss" scoped>
@import "../scss/variables";

$transparency: .25;
$headerHeight: 2rem;

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  color: $schemeColor;
  background-color: transparentize($color: $lightSchemeBackground, $amount: $transparency);

  .overlay-header {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .title {
      font-size: $headerHeight * .6;
      margin: $headerHeight * .2 0;
    }

    .close {
      display: inline-block;
      width: $headerHeight;
      font-size: $headerHeight;
      text-align: center;
      cursor: pointer;
    }
  }

  .overlay-content {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: calc(100% - #{$headerHeight * 2});
    overflow: auto;
  }
}

@media (prefers-color-scheme: dark) {
  .overlay {
    background-color: transparentize($color: $darkSchemeBackground, $amount: $transparency);
  }
}
</style>
