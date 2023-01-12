<template>
<div><i style="color: #a9a9a9">Row: {{row}}, column: {{col}},</i> value: {{value}}</div>
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
      cellProperties: null
    }
  }
};
</script>

<style src="../../node_modules/handsontable/dist/handsontable.full.css"></style>