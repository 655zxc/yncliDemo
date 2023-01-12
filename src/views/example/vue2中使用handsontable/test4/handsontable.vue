<template>
  <div id="v-model-example">
    <label for="mainInput">List of row indexes (starting from 0):</label><br>
      <input id="mainInput" maxlength="2" v-model="highlightedRows"/>
      <!-- 输入框绑定父组件的highlightedRows -->

      <br><br>

      <hot-table :settings="hotSettings" :row-headers="true" :col-headers="true">
        <hot-column :width="50">
          <custom-renderer hot-renderer></custom-renderer>
          <!-- 渲染器 实现高亮效果 -->
          <!-- 每列有10条数据 因此这个组件会被使用10次 -->
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
  name:"handsontable",
    data() {
    return {
      hotSettings: {
        data: Handsontable.helper.createSpreadsheetData(10, 1)  ,
        licenseKey: 'non-commercial-and-evaluation',
        autoRowSize: false,
        autoColumnSize: false,
        height: 'auto',
      },
      highlightedRows: '1'
    }
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