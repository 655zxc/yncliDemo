<template>
  <div>
    <div class="box" ref="hotTableComponent"></div>
    <!-- 表格 -->



    <yn-button id="button" @click="doAction">表外按钮</yn-button>
    <yn-m-checkbox v-model="checked1" shape="square" id="checkbox"
      >复选框</yn-m-checkbox
    >
    <yn-select :options="options" style='width: 80px' id="select">
    </yn-select>
    <yn-modal title="Basic Modal" v-model="visible" @ok="handleOk">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </yn-modal>
  </div>
</template>
  
  <script>
import Handsontable from "yn-handsontable";
import "../../../node_modules/yn-handsontable/dist/handsontable.full.css"; // 样式
import "yn-p1/libs/components/yn-m-checkbox/";
import "yn-p1/libs/components/yn-modal/";
import "yn-p1/libs/components/yn-select/";

export default {
  data() {
    return {
      hotSettings: {
        data: [
          ["", "Tesla", "Volvo", "Toyota", "Ford"],
          ["2019", 10, 11, 12, 13],
          ["2020", 20, 11, 14, 13],
          ["2021", 30, 15, 12, 13]
        ],
        // colHeaders: true,
        // rowHeaders: true,
        width: 600,
        height: 600,
        colWidths: "100px",
        rowHeights: "100px",
        contextMenu: true,
        // cells: this.RowRenderer,
        cell: [
          {
            readOnly: true,
            row: 1,
            col: 1,
            renderer: this.hotBtns,
            className: "center"
          },
          {
            readOnly: true,
            row: 1,
            col: 1,
            renderer: this.myBtns,
            className: "center"
          },
          {
            readOnly: true,
            row: 1,
            col: 2,
            renderer: this.myCheckBox,
            className: "center"
          },
          {
            readOnly: true,
            row: 1,
            col: 3,
            renderer: this.mySelect,
            className: "center"
          }
        ]
      },
      hot: null,
      checked1: true,
      visible: false,
      options: [{
                        label: "jack",
                        value: "jack"
                    },
                    {
                        label: "lucy",
                        value: "lucy"
                    }
                ]
    };
  },
  methods: {
    firstRowFormater(instance, td, row, col, prop, value, cellProperties) {
      Handsontable.renderers.TextRenderer.apply(this, arguments);
      td.style.fontWeight = "bold";
      td.style.color = "green";
      td.style.background = "#CEC";
      return value;
    },

    RowRenderer(row, col) {
      var cellProperties = {};
      // if (row == 0) {
      //   cellProperties.renderer = this.firstRowFormater;
      // } else if (row == 1) {
      //   cellProperties.renderer = this.myBtns;
      // }
      if (row == 1 && col == 1) {
        cellProperties.renderer = this.myBtns
        cellProperties.className = "center"
      }
      else if (row == 1 && col == 2) {
        cellProperties.renderer = this.myCheckBox     
        cellProperties.className = "center"   
      }
      else if (row == 1 && col == 3) {
        cellProperties.renderer = this.mySelect        
        cellProperties.className = "center"
      }

      return cellProperties;
    },

    hotBtns(instance, td, row, col, prop, value, cellProperties) {
      //原生是修改td 这里是return子节点
      let a = document.createElement("button");
      a.innerText = value;
      a.addEventListener("click", this.doAction);
      return a
    },

    myBtns(instance, td, row, col, prop, value, cellProperties) {
      // Handsontable.renderers.TextRenderer.apply(this, arguments);
      // td.innerHTML = `<button @click="doAction" >${value}</button>`//不可以 只能用原生js语法
      // let a = document.createElement("yn-button");
      // a.innerText = value;
      // a.addEventListener("click", this.doAction);
      // td.innerText = "";
      // td.appendChild(a);
      // return td
      let button = document.querySelector("#button");

      // button.innerHTML = value
      // let buttonCopy = button.cloneNode(true)
      // buttonCopy.innerHTML = value
      // buttonCopy.addEventListener("click", this.doAction);
      // td.appendChild(button)
      // return buttonCopy;
      button.innerHTML = value;
      return button;
    },

    myCheckBox(instance, td, row, col, prop, value, cellProperties) {
      let checkbox = document.querySelector("#checkbox");
      // let checkCopy = checkbox.cloneNode(true) //虚拟dom?
      // checkCopy.children[1].innerHTML = value
      // return checkCopy
      checkbox.children[1].innerHTML = value;
      return checkbox;
    },

    mySelect(instance, td, row, col, prop, value, cellProperties) {
      let select = document.querySelector("#select");
      return select;
    },

    doAction() {
      this.visible = true;
    },

    handleOk(e) {
      this.visible = false;
    }
  },
  mounted() {
    this.$set(
      this,
      "hot",
      new Handsontable(this.$refs.hotTableComponent, this.hotSettings)
    );
  }
};
</script>
  
<style>
td.newRow {
  background-color: #37bc6c;
}
.handsontable .myRow {
  background: #c5d8f7;
}
.handsontable .myErase {
  background: #fff;
}

.handsontable .center {
  /* display: flex;
  justify-content: center;
  align-items: center; */
  position: relative;
}

.handsontable .center > button,
.handsontable .center > div
{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
  