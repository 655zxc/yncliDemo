
<!-- 数据 -->

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
        data: [
          { id: 2, name: "Frank Honest", other: "other", address: "address" },
          { id: 1, name: "Ted Right", address: "address", other: "other" },
          //对象数组为data时,按照第一个对象规定每列是什么?
          { id: 3, name: "Joan Well", address: "" },
          { id: 4, name: "Gail Polite", address: "" },
          { id: 5, name: "Michael Fair", address: "address" },
        ],
        startRows: 5,
        startCols: 5,
        height: "auto",
        width: "auto",
        colHeaders: true,
        minSpareRows: 1,
        licenseKey: "non-commercial-and-evaluation",
        // columns: [

        //控制排列
        //   { data: 6 },
        //   { data: 0 },
        //   // 跳过了第一列数据 不显示
        //   { data: 2 },
        //   { data: 3 },
        //   { data: 4 },
        //   { data: 5 },
        // ],
      },
      hotRef: null,
    };
  },
  components: {
    HotTable,
  },
};
</script>

<style scoped>
</style>