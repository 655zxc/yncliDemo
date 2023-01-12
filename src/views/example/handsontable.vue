
<!-- 在单元格和标题呈现HTML -->

<template>
  <div id="example1">
    <hot-table ref="wrapper" :settings="hotSettings"></hot-table>
    <!-- <el-button @click="fun">click</el-button> -->
  </div>
</template>

<script>
import Vue from "vue";
import { HotTable, HotColumn } from "@handsontable/vue";
import { registerAllModules } from "handsontable/registry";
import Handsontable from "handsontable";
registerAllModules();

export default {
  name: "handsontable",
  data() {
    let that = this;
    // Handsontable.renderers.registerRenderer("myrenderer", this.myrenderer);
    return {
      hotSettings: {
        data: [
          ["", "Tesla", "Nissan", "Toyota", "Honda"],
          ["2017", -5, "", 12, 13],
          ["2018", "", -11, 14, 13],
          ["2019", "", 15, -12, "readOnly"],
        ],
        rowHeaders: true,
        colHeaders: true,
        stretchH: "all",
        className: "custom-table",
        // columns: [
        //   {},
        //   {
        // renderer(instance, td, row, col, prop, value, cellProperties) {
        //   td.innerHTML = `<h1>${value}</h1>`
        //   // return td;
        // },
        //   },
        //   {},
        //   {},
        //   {}
        // ],

        cells(row, col) {
          let a = {};
          if (row == 0) {
            // a.renderer = "myrenderer";
            a.renderer = "firstRowRenderer";
          } else {
            a.renderer = "negativeValueRenderer";
          }

          return a;
        },
        height: "auto",
        licenseKey: "non-commercial-and-evaluation",
      },
    };
  },
  created() {
    Handsontable.renderers.registerRenderer("myrenderer", this.myrenderer);
    Handsontable.renderers.registerRenderer(
      "firstRowRenderer",
      this.firstRowRenderer
    );
    Handsontable.renderers.registerRenderer(
      "negativeValueRenderer",
      this.negativeValueRenderer
    );
  },
  mounted() {},
  methods: {
    fun() {},
    //自定义渲染器 让这个格子放大字体
    myrenderer(instance, td, row, col, prop, value, cellProperties) {
      td.innerHTML = `<h1>${value}</h1>`;
      // return td;
    },
    //提供的渲染器 让这个格子变色(感觉和自定义渲染器没区别?)
    firstRowRenderer(instance, td, row, col, prop, value, cellProperties) {
      Handsontable.renderers.TextRenderer.apply(this, arguments);
      //如果不加这句话 内容会消失 因为没设置td的内容
      td.style.fontWeight = "bold";
      td.style.color = "green";
      td.style.background = "#CEC";
    },
    //提供的渲染器 格子小于0变红 没有值变灰
    negativeValueRenderer(instance, td, row, col, prop, value, cellProperties) {
      Handsontable.renderers.TextRenderer.apply(this, arguments);

      // if row contains negative number
      if (parseInt(value, 10) < 0) {
        // add class "negative"
        td.className = "make-me-red";
      }

      if (!value || value === "") {
        td.style.background = "#EEE";
      } else {
        if (value === "Nissan") {
          td.style.fontStyle = "italic";
        }

        td.style.background = "";
      }
    },
  },
  components: {
    HotTable,
  },
};
</script>

<style >
.make-me-red {
  color: red;
}
</style>