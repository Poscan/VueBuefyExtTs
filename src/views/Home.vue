<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <TableDraggable :items="items" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TableDraggable from "@/components/TableDraggable.vue";
import Item from "@/store/models/Item";

export default Vue.extend({
  name: "Home",
  components: {
    TableDraggable,
  },

  data() {
    return {
      items: [
        new Item(1, "Simmons", 1, 0, 10, 0),
        new Item(2, "Jacobs", 2, 1, 12, 1),
        new Item(3, "Gilbert", 1, 1, 22, 2),
        new Item(4, "Flores", 4, 1, 1, 3),
      ],
    };
  },

  methods: {},
});
</script>
