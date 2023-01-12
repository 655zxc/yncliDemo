
<!-- 在vuex中存储 -->

<template>
  <div id="example1">
    <div id="example-preview">
      <div id="toggle-boxes">
        <br />
        <input
          v-on:click="toggleReadOnly"
          checked
          id="readOnlyCheck"
          type="checkbox"
        />
        <label for="readOnlyCheck">
          Toggle <code>readOnly</code> for the entire table</label
        >
      </div>
      <br />
      <hot-table ref="wrapper" :settings="hotSettings"></hot-table>
    </div>
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
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        colHeaders: true,
        rowHeaders: true,
        readOnly: true,
        height: "auto",
        afterChange: () => {
          if (this.hotRef) {
            this.$store.commit("updateData", this.hotRef.getSourceData());
            //更改之后 提交数据到vuex 数据为getSourceData()
          }
        },
        licenseKey: "non-commercial-and-evaluation",
      },
      hotRef: null,
      //存当前的.hotInstance 即core
    };
  },
  mounted() {
    this.hotRef = this.$refs.wrapper.hotInstance;
    //获取core
    this.$store.subscribe((mutation, state) => {
      // this.updateVuexPreview();
      // 自己写的更新函数 被我删了
    });
    //会在每个 mutation 完成后调用，接收 mutation 和经过 mutation 后的状态作为参数
    this.$store.commit("updateData", this.hotRef.getSourceData());
    //存vuex
  },
  methods: {
    toggleReadOnly(event) {
      //点击 导致readonly改变
      this.hotSettings.readOnly = event.target.checked;
      // this.$store.commit("updateSettings", {
      //   prop: "readOnly",
      //   value: this.hotSettings.readOnly,
      // });
      this.$store.commit("updateSettings", this.hotSettings.readOnly);
    },
  },
  components: {
    HotTable,
    HotColumn,
  },
};
</script>

<style src="../../node_modules/handsontable/dist/handsontable.full.css"></style>