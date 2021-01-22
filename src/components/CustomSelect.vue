<template>
  <div :class="{'custom-select': true, 'custom-select-small': small, 'custom-select-big': big}"
    :tabindex="tabindex"
    @blur="open = false"
  >
    <div class="selected" :class="{ open }"
      @click="open = !open"
      v-text="selectedValue"
    />
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options.filter(o => o.value !== selected)"
        :key="i"
        @click="onInput(option)"
        v-text="typeof option === 'object' ? option.display : option"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
    small: {
      type: Boolean,
      required: false,
      default: false
    },
    big: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      selected: this.default
        ? this.default
        : this.options.length > 0
        ? this.options[0]
        : null,
      open: false,
    };
  },
  computed: {
    selectedValue() {
      return typeof this.$props.options === "object"
        ? this.$props.options.find(o => o.value === this.selected).display
        : this.selected;
    }
  },
  methods: {
    onInput(option) {
      this.open = false;
      this.selected = typeof option === "object"
        ? option.value
        : option;

      this.$emit('input', this.selected);
    }
  },
  mounted() {
    const selected = this.selected;
    this.$emit("input", typeof selected === "object"
      ? selected.value
      : selected);
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variables";

$baseHeight: 1.8rem;
$sidesPadding: .5rem;

.custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: $baseHeight;
  line-height: $baseHeight;

  .selected {
    background-color: $schemeBackground;
    border-radius: .3rem;
    border: 1px solid desaturate($primaryColor, 20%);
    color: $schemeColor;
    padding-left: $sidesPadding;
    cursor: pointer;
    user-select: none;

    &.open {
      border: 1px solid $primaryColor;
      border-radius: .3rem .3rem 0 0;
    }

    &::after {
      position: absolute;
      content: "";
      top: $baseHeight / 2;
      right: $sidesPadding;
      width: 0;
      height: 0;
      border: $baseHeight / 5 solid transparent;
      border-color: $schemeColor transparent transparent transparent;
    }
  }

  .items {
    color: $schemeColor;
    border-radius: 0 0 .3rem .3rem;
    overflow: hidden;
    border: 1px solid $primaryColor;
    border-top-width: 0;
    position: absolute;
    background-color: $schemeBackground;
    left: 0;
    right: 0;
    z-index: 1;

    div {
      color: $schemeColor;
      padding-left: $sidesPadding;
      cursor: pointer;
      user-select: none;

      &:hover {
        background-color: $primaryColor;
        color: $darkSchemeColor;
      }
    }
  }

  &.custom-select-small {
    $baseHeight: $baseHeight * .75;
    $sidesPadding: $sidesPadding * .75;

    height: $baseHeight;
    line-height: $baseHeight;
    font-size: .75em;

    .selected {
      padding-left: $sidesPadding;

      &::after {
        top: $baseHeight / 2;
        right: $sidesPadding;
        border-width: $baseHeight / 5;
      }
    }

    .items div {
      padding-left: $sidesPadding;
    }
  }

  &.custom-select-big {
    $baseHeight: $baseHeight * 1.5;
    $sidesPadding: $sidesPadding * 1.5;

    height: $baseHeight;
    line-height: $baseHeight;

    .selected {
      padding-left: $sidesPadding;

      &::after {
        top: $baseHeight / 2;
        right: $sidesPadding;
        border-width: $baseHeight / 5;
      }
    }

    .items div {
      padding-left: $sidesPadding;
    }
  }
}

.selectHide {
  display: none;
}
</style>