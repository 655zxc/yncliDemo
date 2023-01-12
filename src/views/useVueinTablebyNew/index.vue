<template>
  <div id="renderer-example" ref="hot">
    <!-- <hot-table :settings="hotSettings" ref="hotTableComponent">
      <hot-column :width="250" :settings = "firstColSettings" >
        <testRenderer hot-renderer></testRenderer>
      </hot-column>
      <hot-column :width="250" :settings = "secondColSettings" >
        <testRenderer2 hot-renderer></testRenderer2>
      </hot-column>
      <hot-column :width="250"  title="col3">
      </hot-column>

    </hot-table> -->
  </div>
</template>

<script>
import Handsontable from "handsontable";
// import { HotTable, HotColumn } from "@handsontable/vue";
import "../../../node_modules/handsontable/dist/handsontable.full.css"; // 样式
import "handsontable/languages"; // 语言设置
import testRenderer from "./testRender.vue";
import testRenderer2 from "./testRender2.vue" ;

export default {
  data() {
    return {
      hot:null,
      parentStr:"这是父组件的值",
      hotSettings: {
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        autoRowSize: false,
        autoColumnSize: false,
        height: "auto",
        licenseKey: "non-commercial-and-evaluation",
        colWidths: 50, // 列宽度
        rowHeights: 80, // 行高度
        cells(row, col, prop) {
          let a = {
              readOnly:true
            }
          if (row >= 3 && row <= 6 && (col == 0 | col == 1)) {
            return a
          }
    
        },
        // 使用列组件，也可以用以前的写法
        afterRenderer(TD,row,column,prop,value,cellProperties) {
          if (row >= 3 && row <= 6 && column == 0) {
            TD.setAttribute("class", "tdRenderClass");
          }
          else if(row >= 3 && row <= 6 && column == 1){
            TD.setAttribute("class", "tdRenderClass2");
          }
        },
        
      },
      // firstColSettings: {
      //   title:"col1",
      //   className: "firstCol",
      // },
      // secondColSettings: {
      //   title:"col2",
      //   className:"secondCol"
      // },
    };
  },
  mounted() {
    this.hot = new Handsontable(this.$refs.hot, this.hotSettings);
  },
  methods: {
   
  },
  components: {
    testRenderer,
    testRenderer2
  }
};
</script>

<style>
#renderer-example {
  width: 1000px;
  height: 1000px;
  margin: 0 auto;
  margin-top: 50px;
  overflow:auto;
}

td.tdRenderClass{
  /* display: flex;
  justify-content: center;
  align-items: center; */
  position: relative;
}

td.tdRenderClass2{
  /* display: flex;
  justify-content: center;
  align-items: center; */
  position: relative;
}

td.tdRenderClass div{
  position:absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

td.tdRenderClass2 div{
  position:absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
/* 给第二列设置flex会崩 */
</style>

