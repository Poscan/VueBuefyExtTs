<template>
  <b-slider
    :value="value"
    :min="minBorder"
    :max="maxBorder"
    :tooltip="false"
    @input="(value) => input(value)"
  >
    <b-slider-tick v-for="val in ticksArray" :key="val" :value="val" />
  </b-slider>
</template>

<script lang="ts">
import Vue from "vue";
import range from "lodash/range";

export default Vue.extend({
  props: {
    value: Number,
    ticks: Array as () => Array<number>,
    min: Number,
    max: Number,
  },

  model: {
    prop: "value",
    event: "input",
  },

  computed: {
    minBorder(): number {
      if (this.min) return this.min;
      if (this.ticks) return this.ticks[0];

      return 0;
    },

    maxBorder(): number {
      if (this.max) return this.max;
      if (this.ticks) return this.ticks[this.ticks.length - 1];

      return 0;
    },

    ticksArray(): number[] {
      return this.ticks ? this.ticks : range(this.min, this.max + 1);
    },
  },

  methods: {
    input(value: number) {
      if (typeof value == typeof Number) return;

      if (this.ticksArray.includes(value)) {
        this.$emit("input", new Number(value));
        return;
      }

      var closestElement = this.ticks.filter((x) => x >= value)[0];
      var nextIndex = this.ticks.findIndex((x) => x == closestElement);

      var nextValue = this.ticks[nextIndex];
      var lastValue = this.ticks[nextIndex - 1];

      var subLast = value - lastValue;
      var subNext = nextValue - value;

      this.$emit("input", subLast <= subNext ? lastValue : nextValue);
    },
  },
});
</script>
