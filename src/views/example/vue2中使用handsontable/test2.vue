<template>
  <div id="example2">
    <hot-table :data="hotData" :settings="settings">
      <hot-column title="ID" data="id"> </hot-column>
      <hot-column :settings="secondColumnSettings" read-only="true" data="name"></hot-column>
      <hot-column title="Price" data="payment.price"> </hot-column>
      <hot-column title="Currency" data="payment.currency"> </hot-column>
      <!-- 对hotData里的四列进行配置 可以单独传递，也可以封装为settings属性-->
      <!-- 当table的data设置为对象数组,hot column的data等于hot table的data里的对象的键 -->
    </hot-table>
  </div>
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
      // 对象数组
      hotData: [
        {
          id: 1,
          name: "Table tennis racket",
          payment: { price: 13, currency: "PLN" },
        },
        {
          id: 2,
          name: "Outdoor game ball",
          payment: { price: 14, currency: "USD" },
        },
        {
          id: 3,
          name: "Mountain bike",
          payment: { price: 300, currency: "USD" },
        },
      ],
      secondColumnSettings: {
        title: "Second column header",
      },
      settings: {
        height: "auto",
        licenseKey: "non-commercial-and-evaluation",
      },
    };
  },
  components: {
    HotTable,
    HotColumn,
    //引入两个组件
  },
};
</script>

<style src="../../node_modules/handsontable/dist/handsontable.full.css"></style>