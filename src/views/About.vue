<template>
  <div id="app">
    <div>
      <h2>Stimulsoft Reports.JS Designer</h2>
      <div id="designer"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  },
  mounted: function () {
    var options = new window.Stimulsoft.Designer.StiDesignerOptions();
    options.appearance.fullScreenMode = false;

    var designer = new window.Stimulsoft.Designer.StiDesigner(
      options,
      "StiDesigner",
      false
    );

    var report = new window.Stimulsoft.Report.StiReport();

    report.loadFile("/reports/SimpleList.mrt");

    designer.report = report;

    designer.renderHtml("designer");
  },
};
</script>

<style>
</style>