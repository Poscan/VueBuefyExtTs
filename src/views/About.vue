<template>
  <div id="app">
    <StimulsoftDesigner :report="report" />
  </div>
</template>

<script>
import Vue from "vue";
import StimulsoftDesigner from "@/components/StimulsoftDesigner.vue";

export default Vue.extend({
  components: {
    StimulsoftDesigner,
  },

  name: "app",
  data() {
    return {};
  },

  computed: {
    report() {
      var report = new window.Stimulsoft.Report.StiReport();
      report.loadFile("/reports/SimpleList.mrt");
      return report;
    },
  },
});
</script>