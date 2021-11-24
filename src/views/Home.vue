<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <Slider :style="{ width: '800px', margin: '0 auto' }" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import HelloWorld from "@/components/TableDraggable.vue"; // @ is an alias to /src
import Slider from "@/components/Slider.vue"; // @ is an alias to /src
let sayings = new Map();
export default Vue.extend({
  name: "Home",
  components: {
    HelloWorld,
    Slider,
  },

  data() {
    return {};
  },
});
</script>
