<template>
  <Hot-table :settings="hotSettings">
    <Hot-column title="First column header"> </Hot-column>
    <Hot-column :settings="secondColumnSettings" read-only="true"> </Hot-column>
    <!-- 对每一列单独配置 -->
  </Hot-table>
</template>

<script>
import Vue from "vue";
import { HotTable, HotColumn } from "@handsontable/vue";
import { registerAllModules } from "handsontable/registry";
import Handsontable from "handsontable";
// import { createSpreadsheetData } from "./helpers";

// register Handsontable's modules
registerAllModules();

export default {
  data() {
    return {
      hotSettings: {
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        height: "auto",
        licenseKey: "non-commercial-and-evaluation",
      },
      secondColumnSettings: {
        title: "Second column header",
        // readOnly:true,
        //也可以写在组件上
        //可以单独传递，也可以封装为settings属性,就像您对待 hot-table.
      },
    };
  },
  components: {
    HotTable,
    HotColumn,
    //引入两个组件
  },
};
</script>

<style src="../../node_modules/handsontable/dist/handsontable.full.css"></style>