<template>
  <div>
    <h2>Stimulsoft Reports.JS Designer</h2>
    <div id="designer"></div>
  </div>
</template>

<script>
export default {
  name: "app",

  props: ["report"],

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

    designer.report = this.report;

    designer.renderHtml("designer");
  },
};
</script>