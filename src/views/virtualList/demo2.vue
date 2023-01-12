<template>
  <div class="out">
    <div ref="box" class="container" @scroll="scrollEvent($event)">
      <div class="phantom"></div>
      <div ref="con" class="hot" :style="{ transform: getTransform }"></div>
      <div ref="conTop" class="hotTop" :style="{ transform: getTransformTop }"></div>
      <div ref="conLeft" class="hotLeft" :style="{ transform: getTransformLeft }"></div>
    </div>
  </div>
</template>

<script >
// import axios from "_axios@0.19.2@axios";
import Handsontable from "yn-handsontable";
import "../../../node_modules/yn-handsontable/dist/handsontable.full.css";
export default {
  name: "VirtualList",
  data() {
    return {
      hot: null,
      hotTop: null,
      scrollTop:0,
      settings: {
        data: [],
        autoRowSize: false,
        autoColumnSize: false,
        height: "auto",
        licenseKey: "non-commercial-and-evaluation",
        // width: '100%',
        // height: '100%',
        width: 1680,
        // height:630,
        // height: 600,
        colWidths: 70, // 列宽度
        rowHeights: 70 // 行高度
      },
      settingsTop: {
        data: Handsontable.helper.createSpreadsheetData(24, 9),
        autoRowSize: false,
        autoColumnSize: false,
        height: "auto",
        licenseKey: "non-commercial-and-evaluation",
        width: 630,
        colWidths: 70, 
        rowHeights: 70 
      },


      listHeight: 70000, //总高度
      itemWidth: 70, //item宽
      itemHeight: 70, //item高

      startTopOffset: 0, //竖偏移量
      startTop: 0, //竖起点
      endTop: null, //竖终点
      startLeftOffset: 0, //横偏移量
      startLeft: 0, //横起点
      endLeft: null, //横终点

      screenHeight: 0, //视口高度
      screenWidth: 0, //视口宽度

      extraForm: 16,
      //额外的表格 用于缓冲 , 展示8*8 设置为16 则生成24*24的表格

    };
  },
  methods: {
    //滚动事件
    scrollEvent(e) {
      //当前滚动位置
      // this.scrollTop = this.$refs.box.scrollTop
      let scrollTop = this.$refs.box.scrollTop;
      //起始位置


  


      //超出滚轮范围，就不再更新索引了
      if (scrollTop <= 699440)
      {
        this.startTop = Math.floor(scrollTop / this.itemHeight);
        //此时的结束索引
        this.endTop = this.startTop + this.visibleTopCount;
        //此时的偏移量
        // this.startTopOffset = scrollTop - (scrollTop % this.itemHeight);
      }

      let scrollLeft = this.$refs.box.scrollLeft;

      if (scrollLeft <= 69440)
      {
        this.startLeft = Math.floor(scrollLeft / this.itemWidth);
        this.endLeft = this.startLeft + this.visibleLeftCount;
        // this.startLeftOffset = scrollLeft - (scrollLeft % this.itemWidth);
      }

  

      //bug调整
      if (this.endTop == 10000) {
        this.endTop--;
        this.startTop--;
      }

      if (this.endLeft == 1000) {
        this.endLeft--;
        this.startLeft--;
      }
      console.log("===========================");
      console.log(
        "scrollTop:",
        scrollTop,
        ",scrollLeft:",
        scrollLeft,
        ",start-end:",
        this.startTop,
        this.endTop,
        this.startLeft,
        this.endLeft
      );

      let that = this;
      this.cancelRequest();
      //取消axios
      axios({
        method: "get",
        url: `/mdd/tabledata?id1=${this.startTop}&id2=${this.endTop}&id3=${this.startLeft}&id4=${this.endLeft}&extraForm=${this.extraForm}`,
        cancelToken: new axios.CancelToken(function (c) {
          that.source = c;
        })
      }).then(
        (p) => {

          console.log(p.data[0]);
          this.hot.loadData(p.data[0]);
          this.hotTop.loadData(p.data[1]);
              this.startTopOffset = scrollTop - (scrollTop % this.itemHeight);
              this.startLeftOffset = scrollLeft - (scrollLeft % this.itemWidth);
        },
        (e) => {
          console.log(e);
        }
      );

    },


    cancelRequest() {
      if (typeof this.source === "function") {
        this.source("终止请求");
      }
    }
  },
  computed: {
    //偏移量
    getTransform() {
      // if (this.scrollTop > 699440) {
      //   return `translate3d(${this.startLeftOffset}px,${699440}px,0)`;
      // }
      return `translate3d(${this.startLeftOffset}px,${this.startTopOffset}px,0)`;
    },
    //表格上方缓存表格的偏移量  height是this.startTopOffset-这个表格高度，width和视口表格相同
    getTransformTop() {
      return `translate3d(${this.startLeftOffset}px,${this.startTopOffset-1680}px,0)`;
    },
    getTransformLeft() {
      return `translate3d(${this.startLeftOffset-1680}px,${this.startTopOffset}px,0)`;
    },
    //可显示的列表项数 竖向
    visibleTopCount() {
      return Math.ceil(this.screenHeight / this.itemHeight);
    },
    //可显示的列表项数 横向
    visibleLeftCount() {
      return Math.ceil(this.screenWidth / this.itemWidth);
    }
  },
  mounted() {
    //设置视口高度 因该取哪个dom?
    this.screenHeight = 560;
    this.screenWidth = 560;
    // console.log( this.$el.clientHeight);
    this.startTop = 0;
    this.endTop = this.startTop + this.visibleTopCount;
    this.startLeft = 0;
    this.endLeft = this.startLeft + this.visibleLeftCount;
    //初始化start end

    this.hot = new Handsontable(this.$refs.con, this.settings);
    this.hotTop = new Handsontable(this.$refs.conTop, this.settingsTop);


    //改成axios 在mounted中初始化数据
    let that = this;
    this.cancelRequest();
    axios({
      method: "get",
      url: `/mdd/tabledata?id1=${this.startTop}&id2=${this.endTop}&id3=${this.startLeft}&id4=${this.endLeft}&extraForm=${this.extraForm}`,
      cancelToken: new axios.CancelToken(function (c) {
        that.source = c;
      })
    }).then(
      (p) => {
        //写在回调里 否则渲染先于axios执行
        this.hot.loadData(p.data[0]);
        this.hotTop.loadData(p.data[1]);
      },
      (e) => {
        console.log(e);
      }
    );
  }
};
</script>


<style scoped>
/* 撑开父容器 形成滚动条 */
/* 假设有10000*1000条数据 */
.phantom {
  height: 700000px;
  width: 70000px;
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
}
.out {
  height: 2000px;
}

.hotTop{
  left: 0;
  right: 0;
  top: 0;
  position: absolute;  
  /* width: 560px;
  height: 1680px;
  background-color: coral; */
}


.hotLeft{
  left: 0;
  right: 0;
  top: 0;
  position: absolute;  
  width: 1680px;
  height: 630px; 
  background-color: coral;
}
</style>