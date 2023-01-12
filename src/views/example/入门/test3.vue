
<!-- 动态绑定数据 -->

<template>
  <div class="app-container">
    <HotTable ref="hotTableComponent" :settings="hotSettings" />
  </div>
</template>

<script>
import Handsontable from "handsontable";
import { HotTable } from "@handsontable/vue";
import "../../node_modules/handsontable/dist/handsontable.full.css"; // 样式
import "handsontable/languages"; // 语言设置
export default {
  name: "handsontable",
  mounted(){
    // console.log(this.hotSettings.columns(0));
  },
  data() {
    return {
      hotSettings: {


        // data: [
        //     { id: 1, name: {first: 'Ted', last: 'Right'}, address: 'a' },
        //     { id: 2, address: 'a' },// HOT will create missing properties on demand
        //     { id: 3, name: {first: 'Joan', last: 'Well'}, address: 'a' },
        // ],
        colHeaders: true,
        height: 'auto',
        width: 'auto',
        // 怎么用?
        // columns: function(column) {
        //     let columnMeta = {};

        //     if (column === 0) {
        //     columnMeta.data = 'id';
        //     } else if (column === 1) {
        //     columnMeta.data = 'name.first';
        //     } else if (column === 2) {
        //     columnMeta.data = 'name.last';
        //     } else if (column === 3) {
        //     columnMeta.data = 'address';
        //     } else {
        //     columnMeta = null;
        //     }
        //     return columnMeta;
        // },

        //控制列怎么排
        // columns: [
            
        //     { data: 'name.first' },
        //     { data: 'name.last' },
        //     { data: 'address' },
        //     { data: 'id' },
        // ],


        minSpareRows: 1,
        licenseKey: 'non-commercial-and-evaluation'
      },
    };
  },
  components: {
    HotTable,
  },
};
</script>

<style scoped>
</style>