<template>
  <button class="btn" @click="$emit('click')" />
</template>

<style lang="scss" scoped>
  @import "../scss/variables";

  .btn {
    min-width: 6rem;
    padding: .4rem .2rem;
    border: .1rem solid;
		border-color: $schemeColor;
    border-radius: .3rem;
    background-color: $schemeBackground;
    font-size: 1rem;
    color: $schemeColor;
    cursor: pointer;
    transition:
      background .2s ease-in,
      color .2s ease-in;

    &:hover,
    &:focus {
      background-color: $primaryColor;
      color: $darkSchemeColor;
    }
  }
</style>