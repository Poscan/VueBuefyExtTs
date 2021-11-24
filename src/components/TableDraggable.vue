<template>
  <div>
    <b-table
      :data="sortedItems"
      draggable
      custom-row-key="id"
      @dragstart="dragstart"
      @drop="drop"
      @dragover="dragover"
      @dragleave="dragleave"
    >
      <b-table-column v-slot="props" width="10px">
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
      </b-table-column>

      <b-table-column label="name" v-slot="props">{{
        props.row.name
      }}</b-table-column>

      <b-table-column label="scheduleOffset" v-slot="props" width="100px">
        {{ convertDay(props.row.scheduleOffset) }}
        <Slider :min="0" :max="1" v-model="props.row.scheduleOffset"
      /></b-table-column>

      <b-table-column label="scheduleDuration" width="500px" v-slot="props">
        {{ convertDate(props.row.scheduleDuration) }}
        <Slider :ticks="ticks" v-model="props.row.scheduleDuration"
      /></b-table-column>

      <b-table-column label="lastDayAvailableSlider" v-slot="props"
        >{{ convertTime(props.row.lastDayAvailableSlider) }}
        <Slider :min="0" :max="23" v-model="props.row.lastDayAvailableSlider" />
      </b-table-column>
    </b-table>
  </div>
</template>

<script lang="ts">
import lodash from "lodash";
import Slider from "@/components/Slider.vue";
import Vue, { VueConstructor } from "vue";
import { convertStringDate } from "@/components/helper/convertStringDate";
import { convertStringTime } from "@/components/helper/convertStringTime";
import Item from "@/store/models/Item";

export default (
  Vue as VueConstructor<
    Vue & {
      $refs: {
        side: InstanceType<typeof Slider>;
      };
    }
  >
).extend({
  components: {
    Slider,
  },

  props: {
    items: Array as () => Array<Item>,
  },

  data() {
    return {
      draggingRow: 0,
      draggingRowIndex: 0,
      ticks: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 28, 30, 31, 35, 42, 49, 56,
      ],
    };
  },

  computed: {
    sortedItems(): Item[] {
      return lodash.sortBy(this.items, (x: Item) => x.sortIndex);
    },
  },

  methods: {
    convertDate(value: string) {
      return convertStringDate(value);
    },

    convertTime(value: string) {
      return convertStringTime(value);
    },

    convertDay(value: string) {
      const day = parseInt(value);

      return day == 0 ? "сегодня" : "завтра";
    },

    down(payload: Item) {
      const item = this.items.find((x) => x.sortIndex == payload.sortIndex + 1);
      if (!item) return;

      item.sortIndex--;
      payload.sortIndex++;
    },

    up(payload: Item) {
      const item = this.items.find((x) => x.sortIndex == payload.sortIndex - 1);
      if (!item) return;

      item.sortIndex++;
      payload.sortIndex--;
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

      const sortIndexReplace = this.items.findIndex(
        (x) => x.sortIndex == droppedOnRowIndex
      );
      const dropsortIndexReplace = this.items.findIndex(
        (x) => x.sortIndex == this.draggingRowIndex
      );

      this.items[dropsortIndexReplace].sortIndex = droppedOnRowIndex;
      const id = this.items[sortIndexReplace].id;

      if (droppedOnRowIndex < this.draggingRowIndex) {
        this.items[sortIndexReplace].sortIndex++;

        this.items.forEach((x) => {
          if (
            x.sortIndex > droppedOnRowIndex &&
            x.id != id &&
            x.sortIndex < this.draggingRowIndex
          )
            x.sortIndex++;
        });
      }

      if (droppedOnRowIndex > this.draggingRowIndex) {
        this.items[sortIndexReplace].sortIndex--;

        this.items.forEach((x) => {
          if (
            x.sortIndex < droppedOnRowIndex &&
            x.id != id &&
            x.sortIndex > this.draggingRowIndex
          )
            x.sortIndex--;
        });
      }
    },
  },
});
</script>

<style scoped>
* >>> tr > td {
  vertical-align: middle !important;
  text-align: start;
}

.width {
  width: 700px;
}
</style>
