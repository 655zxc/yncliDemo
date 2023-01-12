<template>
<div id="example1">
  <hot-table :id="id" :class="className" :style="style" :settings="hotSettings"></hot-table>
</div>
</template>

<script>
import Vue from "vue";
import { HotTable, HotColumn } from "@handsontable/vue";
import { registerAllModules } from "handsontable/registry";
import Handsontable from "handsontable";
registerAllModules();


export default {
  name:"handsontable",
     data() {
    return {
      hotSettings: {
        startRows: 5,
        startCols: 5,
        colHeaders: true,
        stretchH: 'all',
        licenseKey: 'non-commercial-and-evaluation'
      },


      //data里设置id/class/style 再通过prop传过去
      id: 'my-custom-id',
      className: 'my-custom-classname',
      style: 'height: 142px; overflow: hidden; border: 1px solid red;'
    }
  },
  components: {
    HotTable,
    HotColumn,
  },
};
</script>

<style src="../../node_modules/handsontable/dist/handsontable.full.css"></style>