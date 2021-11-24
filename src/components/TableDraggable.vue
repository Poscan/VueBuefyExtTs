<template>
  <div>
    <b-table
      :data="sortedData"
      draggable
      custom-row-key="id"
      @dragstart="dragstart"
      @drop="drop"
      @dragover="dragover"
      @dragleave="dragleave"
    >
      <b-table-column v-slot="props" width="10px">
        <div class="is-flex is-flex-direction-column">
          <b-button
            class="mb-1"
            size="is-small"
            type="is-warning"
            icon-right="chevron-up"
            @click="up(props.row)"
          />
          <b-button
            size="is-small"
            type="is-warning"
            icon-right="chevron-down"
            @click="down(props.row)"
          />
        </div>
      </b-table-column>

      <b-table-column label="id" v-slot="props">
        {{ props.row.first_name }}
        <Sidebar ref="side" v-model="props.row.first_name"
      /></b-table-column>

      <b-table-column label="id" v-slot="props">{{
        props.row.id
      }}</b-table-column>

      <b-table-column label="last name" v-slot="props"
        >{{ props.row.last_name }}
      </b-table-column>
    </b-table>
  </div>
</template>

<script lang="ts">
import lodash from "lodash";
import Sidebar from "@/components/Slider.vue";
import Vue, { VueConstructor } from "vue";

class Item {
  constructor(
    id: number,
    first_name: number,
    last_name: string,
    date: string,
    gender: string,
    index: number
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.date = date;
    this.gender = gender;
    this.index = index;
  }

  id: number;
  first_name: number;
  last_name: string;
  date: string;
  gender: string;
  index: number;
}

export default (
  Vue as VueConstructor<
    Vue & {
      $refs: {
        side: InstanceType<typeof Sidebar>;
      };
    }
  >
).extend({
  components: {
    Sidebar,
  },

  data() {
    return {
      data: new Array<Item>(),
      draggingRow: 0,
      draggingRowIndex: 0,
    };
  },

  computed: {
    sortedData() {
      console.log(this.data);
      return lodash.sortBy(this.$data.data, (x: Item) => x.index);
    },
  },

  methods: {
    down(payload: Item) {
      var item = this.data.find((x) => x.index == payload.index + 1);
      if (!item) return;

      item.index--;
      payload.index++;
    },

    up(payload: Item) {
      var item = this.data.find((x) => x.index == payload.index - 1);
      if (!item) return;

      item.index++;
      payload.index--;
    },

    dragstart(payload: any) {
      this.draggingRow = payload.row;
      this.draggingRowIndex = payload.index;
      payload.event.dataTransfer.effectAllowed = "copy";
    },
    dragover(payload: any) {
      payload.event.dataTransfer.dropEffect = "copy";
      payload.event.target.closest("tr").classList.add("is-selected");
      payload.event.preventDefault();
    },
    dragleave(payload: any) {
      payload.event.target.closest("tr").classList.remove("is-selected");
      payload.event.preventDefault();
    },
    drop(payload: any) {
      payload.event.target.closest("tr").classList.remove("is-selected");
      const droppedOnRowIndex = payload.index;

      var indexReplace = this.data.findIndex(
        (x) => x.index == droppedOnRowIndex
      );
      var dropIndexReplace = this.data.findIndex(
        (x) => x.index == this.draggingRowIndex
      );

      this.data[dropIndexReplace].index = droppedOnRowIndex;
      var id = this.data[indexReplace].id;

      if (droppedOnRowIndex < this.draggingRowIndex) {
        this.data[indexReplace].index++;

        this.data.forEach((x) => {
          if (
            x.index > droppedOnRowIndex &&
            x.id != id &&
            x.index < this.draggingRowIndex
          )
            x.index++;
        });
      }

      if (droppedOnRowIndex > this.draggingRowIndex) {
        this.data[indexReplace].index--;

        this.data.forEach((x) => {
          if (
            x.index < droppedOnRowIndex &&
            x.id != id &&
            x.index > this.draggingRowIndex
          )
            x.index--;
        });
      }
    },
  },

  created() {
    this.data = [
      new Item(1, 1, "Simmons", "2016-10-15 13:43:27", "Male", 0),
      new Item(2, 2, "Jacobs", "2016-12-15 06:00:53", "Male", 1),
      new Item(3, 1, "Gilbert", "2016-04-26 06:26:28", "Female", 2),
      new Item(4, 4, "Flores", "2016-04-10 10:28:46", "Male", 3),
    ];

    console.log(this.data);
  },
});
</script>

<style scoped>
* >>> tr > td {
  vertical-align: middle !important;
}
</style>
