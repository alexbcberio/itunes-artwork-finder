<template>
  <transition
    enter-active-class="animated bounceInUp fast"
    leave-active-class="animated fadeOut fast"
  >
    <div
      class="scrollTop"
      @click="toTop()"
    >
      <img
      alt="Arrow pointing upwards"
      :src="icon"
      />
    </div>
  </transition>
</template>

<script>
import icon from "../img/arrow-up.svg";
export default {
  data: () => {
    return {
      icon
    };
  },
  methods: {
    toTop() {
      document.body.scrollIntoView({behavior: "smooth"});
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../scss/variables";

$scrolltopBackground: transparentize($primaryColor, .4);

.scrollTop {
  position: fixed;
  bottom: 1.2rem;
  right: 1.2rem;
  z-index: 10;
  display: flex;
  width: 3rem;
  height: 3rem;
  align-items: center;
  justify-content: center;
  border-radius: .5rem;
  text-align: center;
  cursor: pointer;
  background-color: $scrolltopBackground;
  font-size: 1.2rem;
  box-shadow: 0 0 .5rem black;
  transition: .3s;

  &:hover {
    background-color: opacify($scrolltopBackground, .4);
  }

  img {
    width: 60%;
    filter: invert(0);

    @media (prefers-color-scheme: dark) {
      & {
        filter: invert(1);
      }
    }
  }
}
</style>