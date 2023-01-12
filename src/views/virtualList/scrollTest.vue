<template>
    <div class="out">
      <div ref="box" class="container" >
        <div class="phantom"></div>
        <div ref="con" class="hot"></div>
        <div class="hotRight"></div>
      </div>
    </div>
  </template>
  
  <script >
  import Handsontable from "yn-handsontable";
  import "../../../node_modules/yn-handsontable/dist/handsontable.full.css";
  export default {
    name: "VirtualList",
    data() {
      return {
  
      };
    },
    methods: {
  
    },
    computed: {

    },
    mounted() {
     
    }
  };
  </script>
  
  
  <style scoped>
  /* 撑开父容器 形成滚动条 */
  /* 假设有10000*1000条数据 */
  .phantom {
    height: 600px;
    width: 600px;
    background-color: cornflowerblue;
  }
  .container {
    width: 580px;
    height: 580px;
    margin: 0 auto;
    margin-top: 50px;
    border: 5px #ff7f97 solid;
    overflow: auto;
    position: relative;
  }
  
  /* 表格 */
  .hot {
    left: 0;
    right: 0;
    top: 0;
    position: absolute;
    width: 200px;
    height: 200px;
    background-color: aqua;
  }
  .out {
    height: 2000px;
  }
  
  
  
  .hotRight{
    left: 580px;
    right: 0;
    top: 0;
    position: absolute;  
    width: 560px;
    height: 560px; 
    background-color: coral;
  }
  </style>