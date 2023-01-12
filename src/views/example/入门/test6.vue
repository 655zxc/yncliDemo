
<!-- 选项 -->



<template>
  <div class="app-container">
    <HotTable ref="hotTableComponent" :settings="hotSettings" />
    <button @click="fun">click</button>
  </div>
</template>

<script>
import Handsontable from "handsontable";
import { HotTable } from "@handsontable/vue";
import "../../node_modules/handsontable/dist/handsontable.full.css"; // 样式
import "handsontable/languages"; // 语言设置
export default {
  name: "handsontable",
  data() {
    return {
      hotSettings: {
        // data: [
        //   ["", "Tesla", "Nissan", "Toyota", "Honda", "Mazda", "Ford"],
        //   ["2017", 10, 11, 12, 13, 15, 16],
        //   ["2018", 10, 11, 12, 13, 15, 16],
        //   ["2019", 10, 11, 12, 13, 15, 16],
        //   ["2020", 10, 11, 12, 13, 15, 16],
        //   ["2021", 10, 11, 12, 13, 15, 16],
        // ],
        data: Handsontable.helper.createSpreadsheetData(5, 10),
        startRows: 5,
        startCols: 5,
        height: "auto",
        width: "auto",
        colHeaders: true,
        rowHeaders: true,
        minSpareRows: 1,
        licenseKey: "non-commercial-and-evaluation",
        // readOnly: false,
        // columns配置每个列，没写的不显示
        // columns: [
        //   {},
        //   {},
        //   {
        //     readOnly: true,
        //   },
        //   {},
        // ],

        //也可以写成一个函数 参数index是第几列
        // columns(index) {
        //   return {
        //     readOnly: index === 3 
        //   }
        // }

        //行操作
        // cells(row, col, prop) {
        //   if (row === 1 || row === 2) {
        //     return {
        //       // row options, apply to each cell of the first row
        //       // and to each cell of the fourth row
        //       readOnly: true,
        //     };
        //   }
        // }


        //写成对象是cell，不是cells
        cell:[
          {
            // cell options, apply only to a cell with coordinates (0, 0)
            row: 1,
            col: 1,
            readOnly: true,
          },
        ]
      },
    };
  },
  methods:{
    fun(){
      // 有个bug 在readOnly改变后 实际上变了 但是不会变色 点击一下才变
      console.log(this.$refs.hotTableComponent.hotInstance.getCellMeta(1,1).readOnly);
      //返回1，1的readOnly的值
      this.$refs.hotTableComponent.hotInstance.setCellMeta(1, 1, 'readOnly', false);
      console.log(this.$refs.hotTableComponent.hotInstance.getCellMeta(1,1).readOnly);
      this.$refs.hotTableComponent.hotInstance.setCellMeta(2, 2, 'readOnly', true);
      //没变色 但是2.2确实只读了
    }
  },
  components: {
    HotTable,
  },
};
</script>

<style scoped>
</style>