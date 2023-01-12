
<!-- 大小 -->



<template>
  <div class="app-container">
    <HotTable ref="hotTableComponent" :settings="hotSettings" class="hot"/>
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
        
        
        data: Handsontable.helper.createSpreadsheetData(50, 100),
        startRows: 5,
        startCols: 5,
        // height: "auto",
        // width: 200,
        //大于这个宽度 就会生成滚轮 小于 则是多少就是多少
        colHeaders: true,
        rowHeaders: true,
        minSpareRows: 1,
        licenseKey: "non-commercial-and-evaluation",

        beforeRefreshDimensions:(previousDimensions, currentDimensions, actionPossible)=>{
          console.log(previousDimensions, currentDimensions, actionPossible);
        }
        //钩子 窗口改变时作用
      },
    };
  },
  methods:{
    fun(){
      
    }
  },
  components: {
    HotTable,
  },
};
</script>

<style scoped>
.hot{
  width: 100px;
}
</style>