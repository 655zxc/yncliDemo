<template>
  <div v-bind:style="{ backgroundColor: bgColor }">{{ value }}</div>
  <!-- 渲染:样式加上value值 -->
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
      // We'll need to define properties in our data object,
      // corresponding to all of the data being injected from
      // the BaseEditorComponent class, which are:
      // - hotInstance (instance of Handsontable)
      // - row (row index)
      // - col (column index)
      // - prop (column property name)
      // - TD (the HTML cell element)
      // - cellProperties (the cellProperties object for the edited cell)
      hotInstance: null,
      TD: null,
      row: null,
      col: null,
      prop: null,
      value: null,
      cellProperties: null,
    };
  },
  computed: {
    bgColor() {
      return this.$parent.$parent.$parent.highlightedRows.includes(this.row)? "#40b882": "#fff";
      //根据handsontable的highlightedRows计算高亮样式
      // handsontable包了三层 hot-table hot-column 然后才是 custom-renderer 因此通过三个$parent才能访问到handsontable
      //可以在devtools中清楚看到结构
      //this.$root 是 root
      //因此通过this.$root.$children[0].$children[0].highlightedRows)也可访问到handsontable
    },
    // 根据父组件的data.highlightedRows 决定渲染结果
  },
};
</script>

<style src="../../node_modules/handsontable/dist/handsontable.full.css"></style>