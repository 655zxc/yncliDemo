
<!-- 钩子 主要分为before modify after-->



<template>
  <div class="app-container">
    <HotTable ref="hotTableComponent" :settings="hotSettings" class="hot" />
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
        data: Handsontable.helper.createSpreadsheetData(5, 10),
        startRows: 5,
        startCols: 5,
        // height: "auto",
        // width: 200,
        //大于这个宽度 就会生成滚轮 小于 则是多少就是多少
        colHeaders: true,
        rowHeaders: true,
        minSpareRows: 1,
        licenseKey: "non-commercial-and-evaluation",
        contextMenu: {
          items: {
            row_above: {
              name: "上面插入一行",
            },
          },
        },


        beforeRefreshDimensions: (
          previousDimensions,
          currentDimensions,
          actionPossible
        ) => {
          console.log(previousDimensions, currentDimensions, actionPossible);
        },
        //钩子 窗口改变时作用


      //   afterCreateRow:  (row, amount) => {
      //   console.log(`${amount} row(s) were created, starting at index ${row}`);
      // }
      },
    };
  },
  mounted() {


    //钩子 添加一行时作用
    this.$refs.hotTableComponent.hotInstance.addHook(
      "afterCreateRow",
      (row, amount) => {
        console.log(`${amount} row(s) were created, starting at index ${row}`);
      }
    );
    //也可以写在配置里


    //berfore钩子返回false 阻止这个操作
    this.$refs.hotTableComponent.hotInstance.addHook('beforeCreateRow', (row, amount) => {
      return false;
  })
  },
  components: {
    HotTable,
  },
};
</script>

<style scoped>
.hot {
  width: 100px;
}
</style>