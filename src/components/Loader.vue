<template>
  <div class="loader">
    <span />
    <span />
    <span />
    <span />
  </div>
</template>
<style lang="scss">
@import "../scss/variables";

$loaderBaseDelay: .15s;
$grow: 1.8;

.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  height: #{$grow}rem;
  padding: 1.3rem 0;

  span {
    display: inline-block;
    width: .3rem;
    height: 1rem;
    background-color: $primaryColor;
    animation: grow 1s ease-in-out infinite;
    margin: 0 .15rem;

    @for $i from 2 through 4 {
      &:nth-child(#{$i}) {
        animation-delay: #{$loaderBaseDelay * ($i - 1)};
      }
    }
  }
}

@keyframes grow {
  0%, 100% {
    transform: scaleY(1);
  }

  50% {
    transform: scaleY($grow);
  }
}
</style>