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
        language: "zh-CN", // 语言设置
        licenseKey: "non-commercial-and-evaluation", // 隐藏版权文字
        width: "auto", // 表格宽度
        height: "300", // 表格高度、设置以后才会出现scroll
        // data: Handsontable.helper.createSpreadsheetData(10, 26), // 列表初始化数据
        data:   [
                    ['', 'Tesla', 'Volvo', 'Toyota', 'Ford'],
                    ['2019', 10, 11, 12, 13],
                    ['2020', 20, 11, 14, 13],
                    ['2021', 30, 15, 12, 13]
                ], // 表格数据也可根据实际项目需要进行设置
                  // 按照二维数组的方式存放
        startRows: 1, // 初始化行数,无data属性时生效(该值小于minRows时,以minRows为准)
        startCols: 3, // 初始化列数,无data属性时生效(该值小于minCols时,以minCols为准)
        minRows: 1, // 最少行数(当初始化数据小于该值时,以该值为准)
        minCols: 3, // 最少列数(当初始化数据小于该值时,以该值为准)
        minSpareCols: 0, // 列的最小留白数
        minSpareRows: 0, // 行的最小留白数 行至少会有minSpareRows行空白
        colHeaders: true, // 是否展示列表头,默认是A,B,C等字母,可以['列1','列2']进行自定义展示
        // colHeaders: ["V", "Ti（NTM）", "Ti（ETM）"], // 自定义表格的表头
        rowHeaders: true, // 是否展示行表头,默认是1,2,3等数据,可以['行1','行2']进行自定义展示
        colWidths: 150, // 列宽度 不设置列会被文字撑开
        rowHeights: 80, // 行高度
        dropdownMenu: false, // ? 表头展示下拉菜单,可以自定义展示
        className: "htCenter", // 单元格文字对齐方式(htLeft,htRight,htCenter)
        currentRowClassName: "my-selectRow", // ? 给选中行添加自定义class类名
        currentColClassName: "my-selectCol", // 给选中列添加自定义class类名
        autoWrapRow: true, // ? 文字是否自动换行(当没有设置colWidths时生效)
        fixedRowsTop: 0, // ? 列表内容从上面开始,固定定位的行数(不包含行表头)
        fixedColumnsLeft: 1, // ? 列表内容从左面开始,固定定位的列数(不包含列表头)
        fillHandle: true, // ? 是否开启拖拽复制操作(true,false,'horizontal'水平复制,'vertical'垂直复制)
        contextMenu: {
          // 单元格右击展示菜单
          items: {
            row_above: {
              name: "上面插入一行",
            },
            row_below: {
              name: "下面插入一行",
            },
            col_left: {
              name: "左侧插入一列",
            },
            col_right: {
              name: "右侧插入一列",
            },
            remove_row: {
              name: "移除本行",
            },
            remove_col: {
              name: "移除本列",
            },
            alignment: {
              name: "对齐方式",
            },
            make_read_only: {
              name: "只读",
            },
            // ?
            // borders:{
            //   name: '边框'
            // },
            copy: {
              name: "复制",
            },
            cut: {
              name: "剪切",
            },
            separator: Handsontable.plugins.ContextMenu.SEPARATOR,
            //分割线
            clear_custom: {
              name: "清空所有单元格数据",
              callback: function () {
                this.clear();
              },
            },
          },
        },
      },
    };
  },
  components: {
    HotTable,
  },
  created() {
    //创建10*26的表单 并读取数据
    // this.hotSettings.data = Handsontable.helper.createSpreadsheetData(10, 26);
  },
};
</script>

<style scoped>

</style>