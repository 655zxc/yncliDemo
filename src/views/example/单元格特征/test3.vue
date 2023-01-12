


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
    let that = this
    return {
      hotSettings: {
        
        data: [
          { car: 'Tesla', year: 2017, chassis: 'black', bumper: 'black' },
          { car: 'Nissan', year: 2018, chassis: 'blue', bumper: 'blue' },
          { car: 'Chrysler', year: 2019, chassis: 'yellow', bumper: 'black' },
          { car: 'Volvo', year: 2020, chassis: 'white', bumper: 'gray' }
        ],
        colHeaders: ['Car', 'Year', 'Chassis color', 'Bumper color'],
        height: 'auto',
        licenseKey: 'non-commercial-and-evaluation',
        cells(row, col) {
          const cellProperties = {};
          
            //这里用this出错????
          if (that.$refs.wrapper.hotInstance.getData()[row][col] === 'Nissan') {
            cellProperties.readOnly = true;
          }

          return cellProperties;
        }
      },
    };
  },
  mounted() {
    // let that = this
    // this.$refs.wrapper.hotInstance.updateSettings({
    //   cells(row, col) {
    //     const cellProperties = {};
        
    //       //这里用this出错????
    //     if (that.$refs.wrapper.hotInstance.getData()[row][col] === 'Nissan') {
    //       cellProperties.readOnly = true;
    //     }

    //     return cellProperties;
    //   }
    // });

       
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