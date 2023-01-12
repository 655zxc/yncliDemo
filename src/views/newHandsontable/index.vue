<template>
  <div class="box" ref="con"></div>
</template>

<script>
import Handsontable from "yn-handsontable";
import { HotTable, HotColumn } from '@handsontable/vue';
import "../../../node_modules/handsontable/dist/handsontable.full.css"; // 样式

export default {
  data() {
    return {
      data: [
        ["", "Ford", "Tesla", "Toyota", "Honda"],
        ["2017", 10, 11, 12, 13],
        ["2018", 20, 11, 14, 13],
        ["2019", 30, 15, 12, 13]
      ],
      hot: null
    };
  },

  mounted() {
    this.hot = new Handsontable(this.$refs.con, {
      data: this.data,
      rowHeaders: true,
      colHeaders: true,
      filters: true,
      dropdownMenu: true,
      beforeOnCellDblClick(event, coords, elem) {
        console.log(event);
      }
    });

    console.log(this.hot);//core
    console.log(this.$refs.con);//dom
    console.log(this.$refs.con.hotInstance);//undefined
  },

  created() {},

  methods: {},
  components: {}
};
</script>

<style>
