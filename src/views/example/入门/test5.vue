
<!-- 钩子 -->

<!-- 保存更改:有两种方式,afterChange钩子发ajax通知后端,
或存在本地 设置persistentState: true 会解锁三个钩子-->

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
   
    console.log(this.$refs.hotTableComponent.hotInstance.persistentState.isEnabled());

    //获取这个组件 再.hotInstance就能得到core
    this.$refs.hotTableComponent.hotInstance.setDataAtCell([
        [1,1,999],
        [2,2,888],
    ])
  },
  data() {
    return {
      hotSettings: {
        data: [
          ["", "Tesla", "Nissan", "Toyota", "Honda", "Mazda", "Ford"],
          ["2017", 10, 11, 12, 13, 15, 16],
          ["2018", 10, 11, 12, 13, 15, 16],
          ["2019", 10, 11, 12, 13, 15, 16],
          ["2020", 10, 11, 12, 13, 15, 16],
          ["2021", 10, 11, 12, 13, 15, 16],
        ],
        startRows: 5,
        startCols: 5,
        height: "auto",
        width: "auto",
        colHeaders: true,
        minSpareRows: 1,
        licenseKey: "non-commercial-and-evaluation",
        persistentState: true,

        persistentStateSave:(str,mix)=>{
          console.log(str,mix);
        },
        //钩子的用法
        afterChange:(changes,source)=>{
          // console.log("changes:"+changes);
          // console.log("source:"+source);
        }
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