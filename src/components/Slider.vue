<template>
  <b-slider
    :value="value"
    :min="min"
    :max="max"
    :tooltip="false"
    @input="(value) => input(value)"
  >
    <b-slider-tick v-for="val in interval" :key="val" :value="val" />
  </b-slider>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    value: {
      type: Number,
    },
  },

  model: {
    prop: "value",
    event: "input",
  },

  data() {
    return {
      interval: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 28, 30, 31, 35, 42, 49, 56,
      ],
      min: 0,
      max: 0,
      editValue: 0,
    };
  },

  methods: {
    input(value: number) {
      if (!value) return;

      if (this.interval.includes(value)) {
        this.$emit("input", new Number(value));
        return;
      }

      var closestElement = this.interval.filter((x) => x >= value)[0];
      var nextIndex = this.interval.findIndex((x) => x == closestElement);

      var nextValue = this.interval[nextIndex];
      var lastValue = this.interval[nextIndex - 1];

      var subLast = value - lastValue;
      var subNext = nextValue - value;

      this.$emit("input", subLast <= subNext ? lastValue : nextValue);
    },
  },

  mounted() {
    this.min = this.min ? this.min : this.interval[0];
    this.max = this.max ? this.max : this.interval[this.interval.length - 1];
  },
});
</script>
