<template>
  <div>
    <demo2 />
    <!-- <scrollTest /> -->
  </div>
</template>

<script>
import demo1 from "./demo1.vue"
import demo2 from "./demo2.vue"
import scrollTest from "./scrollTest.vue"
export default {
  name: "VirtualList",
  data() {
    return {
      // rowCount: 1000,//表格宽度
      // colCount: 1000,//表格列数
      // colWidths: 70, // 列宽度
      // rowHeights: 70, // 行高度      
    };
  },
  mounted() {
    // console.log(this.tableData());
  },
  methods: {

  },
  components: {
    demo1,
    demo2,
    scrollTest,
  }
};
</script>


<style scoped>
</style>