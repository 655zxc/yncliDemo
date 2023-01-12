<template>
  <div class="father">
    <div class="box" ref="hotTableComponent"></div>
  </div>
</template>

<script>
import "yn-p1/libs/components/yn-input/";
import Handsontable from "yn-handsontable";
import "../../../node_modules/yn-handsontable/dist/handsontable.full.css"; // 样式

export default {
  data() {
    return {
      hotSettings: {
        data:
          // Handsontable.helper.createSpreadsheetData(1000, 1000),
          Array(1000)
          .fill(null)
          .map((x) => Array(1000).fill(null)),
        colHeaders: true,
        rowHeaders: true,
        width: 600,
        height: 600,
        colWidths: "80px",
        rowHeights: "80px",
        viewportRowRenderingOffset: 24,
        viewportColumnRenderingOffset:24,
      },
      hot: null,
      lastRender: [], //上一次的渲染区索引
      lastBuffer: [], //上一次的缓冲区索引
      tableData: [], //本次滚动后，表格渲染区和缓存区的所有数据
      tableHeight: 1000, //表格高度
      tableWidth: 1000, //表格宽度
      BufferLength: 24 //缓冲距离
    };
  },

  mounted() {
    this.$set(
      this,
      "hot",
      new Handsontable(this.$refs.hotTableComponent, this.hotSettings)
    );
    this.init();
    this.hot.onVirtualScrollFetch = this.onVirtualScrollFetch;
  },

  methods: {
    //求区域移动时,交叉区域
    computeArea(A, B, C, D, E, F, G, H) {
      //ABCD分别是一个矩形的左下角X1 Y1 右上角X2 Y2 , EFGH同理

      // 不重叠的情况 C<=E即矩形的右边小于另一个矩形的左边 其他同理
      if (C <= E || G <= A || D <= F || H <= B) {
        return -1;
      }

      //有重叠,则重叠区域的X1 是 左边的边(AE)中大的,Y1 是 下面的边(BF)中大的
      var left = [E > A ? E : A, F > B ? F : B];
      //X2 是 右边的边(CG)中小的,Y2 是 上面的边(DH)中小的
      var right = [C > G ? G : C, D > H ? H : D];

      //按照Y1 Y2 X1 X2格式输出
      let area = [left[1], right[1], left[0], right[0]];
      return area;
    },
    //防抖
    cancelRequest() {
      if (typeof this.source === "function") {
        this.source("终止请求");
      }
    },
    //数据初始化
    init() {
      axios({
        method: "get",
        url: `/mdd/tabledata2?id1=${0}&id2=${24}&id3=${0}&id4=${9}` //默认0 24 0 9 最好根据表宽高来生成
      }).then((p) => {
        this.tableData = p.data;
        this.hot.setDataAtCell(p.data.flat());
        // this.hot.render();
      });

      this.lastRender = [0, 24, 0, 9];
      this.lastBuffer = [0, 24, 0, 9];
    },
    //滚动钩子函数
    onVirtualScrollFetch(rowsCalc, columnsCalc) {
      console.log("onVirtualScrollFetch");
      let nowRender = []; //当前渲染区的索引
      let nowBuffer = []; //当前缓冲区的索引


      nowRender = [
        rowsCalc.startRow,
        rowsCalc.endRow,
        columnsCalc.startColumn,
        columnsCalc.endColumn
      ];
      nowBuffer = [
        rowsCalc.startRow - this.BufferLength >= 0
          ? rowsCalc.startRow - this.BufferLength
          : 0,
        rowsCalc.endRow + this.BufferLength <= this.tableHeight
          ? rowsCalc.endRow + this.BufferLength
          : this.tableHeight - 1,
        columnsCalc.startColumn - this.BufferLength >= 0
          ? columnsCalc.startColumn - this.BufferLength
          : 0,
        columnsCalc.endColumn + this.BufferLength <= this.tableWidth
          ? columnsCalc.endColumn + this.BufferLength
          : this.tableWidth - 1
      ];

      // console.log(
      //   "上次的渲染区:",
      //   this.lastRender,
      //   "上次的缓冲区:",
      //   this.lastBuffer
      // );
      // console.log("现在的渲染区:", nowRender, "现在的缓冲区:", nowBuffer);
      // console.log("=============================");
      // console.log({"上次滚动的索引":this.lastBuffer,"本次滚动的索引":nowBuffer});

      let that = this;
      this.cancelRequest();
      axios({
        method: "get",
        url: `/mdd/tabledata2?id1=${nowBuffer[0]}&id2=${nowBuffer[1]}&id3=${nowBuffer[2]}&id4=${nowBuffer[3]}`,
        cancelToken: new axios.CancelToken(function (c) {
          that.source = c;
        })
      }).then(
        (p) => {
          //现在 在这个地方 有现在的数据p.data 和 this.tableData上次的数据
          //通过nowBuffer 和 this.lastBuffer 可以从里面取值
          //然后在下面更新和删除

          //左下角X1 Y1 右上角X2 Y2
          //我的排列 Y1 Y2 X1 X2
          let area = this.computeArea(
            nowBuffer[2],
            nowBuffer[0],
            nowBuffer[3],
            nowBuffer[1],
            this.lastBuffer[2],
            this.lastBuffer[0],
            this.lastBuffer[3],
            this.lastBuffer[1]
          );
          //得到两个缓冲区相交坐标

          if (area != -1) {
            //再次计算新增和删除部分
            //已经得到八个点的坐标 很容易计算出来
            // console.log(
            //   `有重叠,重叠区上边${area[0]},下边${area[1]},左边${area[2]},右边${area[3]}`
            // );
            let lastData = [];
            for (let i = 0; i < this.tableData.length; i++) {
              for (let j = 0; j < this.tableData[i].length; j++) {
                if (
                  !(
                    this.tableData[i][j][0] >= area[0] &&
                    this.tableData[i][j][0] <= area[1] &&
                    this.tableData[i][j][1] >= area[2] &&
                    this.tableData[i][j][1] <= area[3]
                  )
                ) {
                  //遍历上次缓存区的数据,如果不在交叉区里,说明要被删除

                  lastData.push([...this.tableData[i][j]]);
                  lastData[lastData.length - 1][2] = null;
                }
              }
            }

            // console.log("应该被删除的数据:", lastData);
            this.hot.setDataAtCell(lastData); //删除上次缓存区中不在交叉区的单元格

            let newData = [];
            for (let i = 0; i < p.data.length; i++) {
              for (let j = 0; j < p.data[i].length; j++) {
                if (
                  !(
                    p.data[i][j][0] >= area[0] &&
                    p.data[i][j][0] <= area[1] &&
                    p.data[i][j][1] >= area[2] &&
                    p.data[i][j][1] <= area[3]
                  )
                ) {
                  newData.push([...p.data[i][j]]);
                }
              }
            }

            this.hot.setDataAtCell(newData);
            // console.log({"应该被删除的数据":lastData,"应该新添加的数据":newData});
          } else {
            console.log("无重叠");
            let lastData = [];
            lastData = JSON.parse(JSON.stringify(this.tableData.flat()));
            for (let i = 0; i < lastData.length; i++) {
              lastData[i][2] = null;
            }
            // console.log("应该被删除的数据:", lastData);
            this.hot.setDataAtCell(lastData); //删除上次缓存区的所有数据

            let newData = [];
            newData = p.data.flat();
            // console.log("应该新添加的数据:", newData);
            this.hot.setDataAtCell(newData); //加载所有新数据
          }


          // console.log({ "上次滚动的数据": this.tableData, "本次滚动的数据": p.data });
          
          // console.log("表格所有有数据的地方:",this.hot.getData());
          this.hot.render();//不加这句话也行?
          this.lastRender = nowRender;
          this.lastBuffer = nowBuffer;
          this.tableData = p.data;
        },
        (e) => {
          console.log(e);
        }
      );
    }
  }
};
</script>

<style>
/* .box {
  margin: 0 auto;
  margin-top: 50px;

  width: 600px;
  height: 600px;
  overflow: auto;
} */

/* .father {
  margin: 0 auto;
  margin-top: 50px;

  width: 600px;
  height: 600px;



} */
</style>
