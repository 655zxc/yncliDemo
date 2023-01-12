<template>
  <div class="box">
    <yn-button type="primary" @click="btnClick" v-show="show"
      >第一个渲染器</yn-button
    >
    <span v-show="!show">{{ value }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hotInstance: null,
      TD: null,
      row: null,
      col: null,
      prop: null,
      value: null,
        cellProperties: null,

    };
  },
  methods: {
    btnClick() {
      alert("行:" + this.row + ",列:" + this.col);
      },
    //   setTdClass() {
    //     if (this.row >= 3 && this.row <= 6) {
    //     this.TD.setAttribute("class", "tdRenderClass");
    //     }
    // }
  },
    mounted() {
    // window.addEventListener('resize', this.setTdClass);
    // // console.log(this.hotInstance,this.TD,this.row,this.col,this.prop,this.value,this.cellProperties);
    // if (this.row >= 3 && this.row <= 6) {
    //   this.TD.setAttribute("class", "tdRenderClass");
    // }
  },
  computed: {
    show() {
      if (this.row >= 3 && this.row <= 6) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style >
/* .box{  
    margin-top: 30px;
} */
</style>