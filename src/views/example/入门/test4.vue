
<!-- 如果您的数据源data包含一行,Handsontable 将根据第一行计算出数据结构。

在从空数据源开始的场景中,您需要为dataSchema添加到网格的任何新行提供包含数据结构的选项。
下面的示例显示了具有空数据源的自定义数据模式 -->

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
  mounted() {
    // console.log(this.hotSettings.columns(0));
  },
  data() {
    return {
      hotSettings: {
        dataSchema: {
          id: null,
          name: { first: null, last: null },
          address: null,
        },
        // 数据为空 根据这个计算出表的结构
        startRows: 5,
        startCols: 4,
        colHeaders: ["ID", "First Name", "Last Name", "Address"],
        height: "auto",
        width: "auto",
        columns: [
          { data: "id" },
          { data: "name.first" },
          { data: "name.last" },
          { data: "address" },
        ],
        minSpareRows: 1,
        licenseKey: "non-commercial-and-evaluation",
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