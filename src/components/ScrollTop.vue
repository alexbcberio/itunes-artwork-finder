<template>
  <transition enter-active-class="animated bounceInUp fast" leave-active-class="animated fadeOut fast">
    <div class="scrollTop" @click="toTop()">
        <img :src="icon" alt="Arrow pointing upwards" />
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
    toTop: () => {
      document.body.scrollIntoView({behavior: "smooth"});
    }
  }
}
</script>
<style lang="sass" scoped>
  @import "../scss/variables";

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
      filter: invert(1);
    }

    @media (prefers-color-scheme: dark) {
      & img {
        filter: invert(0);
      }
    }
}
</style>