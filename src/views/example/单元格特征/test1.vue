


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
        data: Handsontable.helper.createSpreadsheetData(5, 5),
        rowHeaders: true,
        colHeaders: true,
        contextMenu: ["copy", "cut"],
        height: "auto",
        licenseKey: "non-commercial-and-evaluation",
        // afterCut:(data, coords)=>{
        //   console.log(data, coords);
        // }
      },
    };
  },
  mounted(){
    // this.$refs.wrapper.hotInstance.selectCell(1, 1)
    // this.$refs.wrapper.hotInstance.addHook('afterCut', (data, coords)=>{
    //       console.log('XXXX');
    //     });
  },
  methods: {
    fun(){
      // console.log(this.$refs.wrapper.hotInstance.getSourceData());
      // console.log(this.$refs.wrapper.hotInstance.getData(1,1));
    
      
    }
  },
  components: {
    HotTable,
  },
};
</script>

<style src="../../node_modules/handsontable/dist/handsontable.full.css"></style>