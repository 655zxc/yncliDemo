<template>
  <div id="custom-renderer-example">
    <hot-table :settings="hotSettings">
      <hot-column :width="250">
        <custom-renderer hot-renderer></custom-renderer>
        <!-- 添加custom-renderer 该列的内容都变为custom-renderer的内容 -->
        <!-- hot column会把这列的数据都传过去? -->
        <!-- 要将组件标记为 Handsontable 渲染器，只需为其添加一个hot-renderer属性。 -->
      </hot-column>
    </hot-table>
  </div>
</template>

<script>
import Vue from "vue";
import { HotTable, HotColumn } from "@handsontable/vue";
import { registerAllModules } from "handsontable/registry";
import Handsontable from "handsontable";
// import { createSpreadsheetData } from "./helpers";
import CustomRenderer from '@/components/CustomRenderer'

// register Handsontable's modules
registerAllModules();


export default {
  data() {
    return {
      hotSettings: {
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        autoRowSize: false,
        autoColumnSize: false,
        height: 'auto',
        licenseKey: 'non-commercial-and-evaluation',
      }
    };
  },
  components: {
    HotTable,
    HotColumn,
    CustomRenderer
    //引入CustomRenderer组件
  },
};
</script>

<style src="../../node_modules/handsontable/dist/handsontable.full.css"></style>