


<template>
  <div id="example1">
    <hot-table ref="wrapper" :settings="hotSettings"></hot-table>
    <el-button @click="fun">click</el-button>
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
    return {
      hotSettings: {
        data: Handsontable.helper.createSpreadsheetData(20, 20),
        rowHeaders: true,
        colHeaders: true,
        contextMenu: ["copy", "cut"],
        height: "auto",
        licenseKey: "non-commercial-and-evaluation",
        mergeCells: [
          { row: 1, col: 1, rowspan: 3, colspan: 3 },
          { row: 3, col: 4, rowspan: 2, colspan: 2 },
          { row: 5, col: 6, rowspan: 3, colspan: 3 },
        ],
        cell: [
          { row: 0, col: 0, className: "htRight" },
          { row: 1, col: 1, className: "htLeft htMiddle" },
          { row: 3, col: 4, className: "htLeft htBottom" },
        ],
      },
    };
  },
  mounted() {
    // this.$refs.wrapper.hotInstance.updateSettings({
    //     mergeCells:[
    //       { row: 2, col: 1, rowspan: 3, colspan: 3 },
    //     ]
    // })
  },
  methods: {
    fun() {},
  },
  components: {
    HotTable,
  },
};
</script>

<style src="../../node_modules/handsontable/dist/handsontable.full.css"></style>