
<!-- css -->

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
    return {
      hotSettings: {
        data: Handsontable.helper.createSpreadsheetData(5, 5),
        rowHeaders: true,
        colHeaders: true,
        stretchH: "all",
        className: "custom-table",
        cell: [
          {
            row: 0,
            col: 0,
            className: "custom-cell",
          },
        ],
        height: "auto",
        licenseKey: "non-commercial-and-evaluation",
      },
    };
  },
  mounted() {},
  methods: {
    fun() {},
  },
  components: {
    HotTable,
  },
};
</script>

<style >
td.custom-cell {
  color: #fff;
  background-color: #37bc6c;
}
.custom-table thead th:nth-child(even),
.custom-table tbody tr:nth-child(odd) th {
  background-color: #d7f1e1;
}

/* td.custom-table {
  background-color: #37bc6c;
} */
</style>