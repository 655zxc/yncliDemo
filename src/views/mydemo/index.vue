<template>
  <div>
    <div class="buttons">
      <!-- <div class="buttonrow">
        <yn-button type="primary" @click="initialization">更换数据</yn-button
        >&nbsp;
        <yn-button type="primary" @click="rowReadOnly">第一行只读</yn-button
        >&nbsp;
        <yn-button type="primary" @click="colReadOnly">第一列只读</yn-button
        >&nbsp;
        <yn-button type="primary" @click="colHide">隐藏第二列</yn-button>&nbsp;
      </div>
      <yn-divider /> -->
      <div class="buttonrow">
        <span style="font-size: 20px">行列: </span>
        <yn-button type="primary" @click="initialization2"
          >拖动,调整大小,拉伸,列菜单,填充</yn-button
        >&nbsp;
        <yn-button type="primary" @click="changeWidth">冻结</yn-button
        >&nbsp;
        <yn-button type="primary" @click="rowShow">{{ show }}行</yn-button
        >&nbsp;
        <yn-button type="primary" @click="rowTrim">{{ show_trim }}行</yn-button
        >&nbsp;
        <yn-button type="primary" @click="nestedHeaders">嵌套标题</yn-button
        >&nbsp;
        <yn-button type="primary" @click="nestedRows">嵌套行</yn-button>&nbsp;
      </div>
      <yn-divider />
      <div class="buttonrow">
        <span style="font-size: 20px">数据操作: </span>
        <yn-button type="primary" @click="initialization3">排序,过滤</yn-button
        >&nbsp;
        <!-- <yn-button type="primary" @click="calculations">汇总计算</yn-button
        >&nbsp;  -->
        <yn-button type="primary" @click="search">查询</yn-button>&nbsp;
        <div class="divinput">
          <yn-input v-model="search_value" />
        </div>
        <!-- <input type="text" v-model="search_value" />&nbsp; -->
      </div>
      <yn-divider />
      <div class="buttonrow">
        <span style="font-size: 20px">单元格特征: </span>
        <yn-button type="primary" @click="initialization4">填充,合并</yn-button
        >&nbsp; <yn-button type="primary" @click="align">对齐</yn-button>&nbsp;
        <yn-button type="primary" @click="rowReadOnly">第一行只读</yn-button
        >&nbsp;
        <yn-button type="primary" @click="colReadOnly">第一列只读</yn-button
        >&nbsp;
      </div>
      <yn-divider />
      <div class="buttonrow">
        <span style="font-size: 20px">样式: </span>
        <yn-button type="primary" @click="initialization5">更换数据</yn-button
        >&nbsp;
        <yn-button type="primary" @click="formatting">格式(渲染器)</yn-button
        >&nbsp;
        <yn-button type="primary" @click="cssformatting">格式(类名)</yn-button
        >&nbsp;
        <yn-button type="primary" @click="getdata">获取选择数据</yn-button
        >&nbsp;
        <yn-button type="primary" @click="borders">自定义边框</yn-button>&nbsp;
      </div>
      <yn-divider />
      <div class="buttonrow">
        <span style="font-size: 20px">工具: </span>
        <yn-button type="primary" @click="initialization6"
          >配置上下文菜单</yn-button
        >&nbsp;
        <yn-button type="primary" @click="deleterow">删除选中行</yn-button
        >&nbsp;
        <yn-button type="primary" @click="comments">注释</yn-button>&nbsp;
        <yn-button type="primary" @click="copycut">选中B2并剪贴</yn-button
        >&nbsp;
      </div>
      <yn-divider />
      <div class="buttonrow">
        <span style="font-size: 20px">单元格类型: </span>
        <yn-button type="primary" @click="initialization7">单元格类型</yn-button
        >&nbsp;
      </div>
      <yn-divider />
      <div class="buttonrow">
        <span style="font-size: 20px">案例: </span>
        <yn-button type="primary" @click="case1">案例</yn-button>&nbsp;
        <yn-button type="primary" @click="case2">关联表案例</yn-button>&nbsp;
        <yn-button type="primary" @click="case3">下拉框案例</yn-button>&nbsp;
      </div>
    </div>
    <div class="ex">
      <HotTable ref="hotTableComponent" :settings="hotSettings" class="myhot" />
    </div>
    <div class="ex">
      <HotTable
        ref="hotTableComponent2"
        :settings="hotSettings2"
        class="myhot"
      />
    </div>
    <div class="bottom"></div>
  </div>
</template>
<script>
import "yn-p1/libs/components/yn-input/";
import "yn-p1/libs/components/yn-divider/";


// import Handsontable from "handsontable";
// import { HotTable } from "@handsontable/vue";
// import "../../../node_modules/handsontable/dist/handsontable.full.css";


import Handsontable from "yn-handsontable";
import { HotTable } from "@handsontable/vue";
import "../../../node_modules/yn-handsontable/dist/handsontable.full.css";


export default {
  name: "mydemo",
  data() {
    return {
      flag: 0,
      flag_trim: 0,
      search_value: "",
      hotSettings: {
        // rowHeaders: true,
        // colHeaders: ["Category", "Artist", "Title", "Album", "Label"],
        // nestedRows: true,
        // data: [
        //   {
        //     category: "Best Rock Performance",
        //     artist: null,
        //     title: null,
        //     label: null,
        //     __children: [
        //       {
        //         title: "Don't Wanna Fight",
        //         artist: "Alabama Shakes",
        //         label: "ATO Records"
        //       },
        //       {
        //         title: "What Kind Of Man",
        //         artist: "Florence & The Machine",
        //         label: "Republic"
        //       },
        //       {
        //         title: "Something From Nothing",
        //         artist: "Foo Fighters",
        //         label: "RCA Records"
        //       },
        //       {
        //         title: "Ex's & Oh's",
        //         artist: "Elle King",
        //         label: "RCA Records"
        //       },
        //       {
        //         title: "Moaning Lisa Smile",
        //         artist: "Wolf Alice",
        //         label: "RCA Records/Dirty Hit"
        //       }
        //     ]
        //   },
        // ],
        licenseKey: "non-commercial-and-evaluation"
      },
      hotSettings2: {
        data: [],
        licenseKey: "non-commercial-and-evaluation"
      }
    };
  },
  methods: {
    initialization() {
      this.$refs.hotTableComponent.hotInstance.updateSettings({
        data: [
          ["", "Tesla", "Nissan", "Toyota", "Honda", "Mazda", "Ford"],
          ["2017", 10, 11, 12, 13, 14, 15],
          ["2018", 10, 11, 12, 13, 14, 15],
          ["2019", 10, 11, 12, 13, 14, 15],
          ["2020", 10, 11, 12, 13, 14, 15],
          ["2021", 10, 11, 12, 13, 14, 15]
        ],

        startRows: 5,
        startCols: 5,
        // height: "auto",
        // width: "auto",
        colHeaders: true,
        rowHeaders: true,
        minSpareRows: 1,
        licenseKey: "non-commercial-and-evaluation",

        columns(index) {
          return {};
        },

        cells(row, col, prop) {}
      });
    },
    rowReadOnly() {
      this.$refs.hotTableComponent.hotInstance.updateSettings({
        cells(row, index, prop) {
          if (row == 0) {
            return {
              readOnly: true
            };
          }
        }
      });
    },
    colReadOnly() {
      this.$refs.hotTableComponent.hotInstance.updateSettings({
        columns(index) {
          if (index == 0) {
            return {
              readOnly: true
            };
          } else {
            return {};
          }
        }
      });
    },
    //会冲突 把之前写的columns覆盖了
    //这里的隐藏原理和后面不一样
    //解决方案:写一个变量做一个判断，看这个函数调用没，调用了就在这个函数内加上相应配置?
    colHide() {
      this.$refs.hotTableComponent.hotInstance.updateSettings({
        columns: [
          { data: 0 },
          // skip the second column
          { data: 2 },
          { data: 3 },
          { data: 4 },
          { data: 5 },
          { data: 6 }
        ]
      });
    },
    //展示行列基础功能
    //冻结,拖动,调整大小,拉伸,菜单冻结,列菜单
    initialization2() {
      this.$refs.hotTableComponent.hotInstance.updateSettings({
        colHeaders: true,
        rowHeaders: true,
        data: Handsontable.helper.createSpreadsheetData(50, 5),
        fixedColumnsLeft: 1,
        manualColumnResize: true,
        manualRowResize: true,
        manualColumnMove: true,
        manualRowMove: true,
        minSpareRows: 1,
        filters: true,
        stretchH: "all",
        contextMenu: true,
        manualColumnFreeze: true,
        bindRowsWithHeaders: "strict",
        hiddenRows: {
          indicators: true
        },
        dropdownMenu: [
          "---------",
          "make_read_only",
          "---------",
          "alignment",
          "---------",
          // "col_left"
        ],
        columns(index) {
          return {};
        },
        cells(row, col, prop) {
          var cellProperties = {};
          // cellProperties.renderer = "defaultValueRenderer";
          return cellProperties;
        }
      });

      this.$refs.hotTableComponent.hotInstance.addHook(
        "beforeChange",
        (changes) => {
          console.log(changes);
          let tpl = ["填充1", "填充2", "填充3"];
          var instance = this.$refs.hotTableComponent.hotInstance,
            ilen = changes.length, //changes改变的单元格的信息,每个改变的单元格都是一个数组
            clen = instance.countCols(),//列数
            rowColumnSeen = {},
            rowsToFill = {},
            i,
            c;

          //循环每个改变的单元格
          for (i = 0; i < ilen; i++) {
            // change[i][2]是旧值 change[i][3]是新值
            // 如果发生更改
            if (changes[i][2] === null && changes[i][3] !== null) {
              if (this.isEmptyRow(instance, changes[i][0])) {
                rowColumnSeen[changes[i][0] + "/" + changes[i][1]] = true;
                rowsToFill[changes[i][0]] = true;
                //记录改变信息
              }
            }
          }

          
          for (var r in rowsToFill) {
            if (rowsToFill.hasOwnProperty(r)) {
              for (c = 0; c < clen; c++) {
                // 如果用户未更改，则从模板中获取值 
                if (!rowColumnSeen[r + "/" + c]) {
                  changes.push([r, c, null, tpl[c]]);
                  // 加入改变的行 原有模板行起始没有变
                }
              }
            }
          }
        }
      );
    },
    //判断单元格是否为空
    isEmptyRow(instance, row) {
      var rowData = instance.countRows();

      for (var i = 0, ilen = rowData.length; i < ilen; i++) {
        if (rowData[i] !== null) {
          return false;
        }
      }
      return true;
    },
    //渲染器
    defaultValueRenderer(instance, td, row, col, prop, value, cellProperties) {
      let tpl = ["填充1", "填充2", "填充3"];
      var args = arguments;
      //args[5]是value
      if (args[5] === null && this.isEmptyRow(instance, row)) {
        args[5] = tpl[col];
        td.style.color = "#999";
        //只是颜色不同 实际上单元格有值
        //若value为空,则value值为col
      } else {
        td.style.color = "";
      }
      Handsontable.renderers.TextRenderer.apply(this, args);
      //注册渲染器
    },
    changeWidth() {
      this.$refs.hotTableComponent.hotInstance.updateSettings({
        data: Handsontable.helper.createSpreadsheetData(50, 100)
      });
    },
    //隐藏
    rowShow() {
      let plugin =
        this.$refs.hotTableComponent.hotInstance.getPlugin("hiddenRows");
      if (this.flag == 0) {
        plugin.hideRow(3, 5, 9);
        this.flag = 1;
      } else {
        plugin.showRow(3, 5, 9);
        this.flag = 0;
      }
      this.$refs.hotTableComponent.hotInstance.render();
    },
    //修剪
    rowTrim() {
      const plugin =
        this.$refs.hotTableComponent.hotInstance.getPlugin("trimRows");

      if (this.flag_trim == 0) {
        plugin.trimRows([0, 1]);
        this.flag_trim = 1;
      } else {
        plugin.untrimRows([0, 1]);
        this.flag_trim = 0;
      }
      this.$refs.hotTableComponent.hotInstance.render();
    },
    //嵌套标题 折叠列
    nestedHeaders() {
      this.$refs.hotTableComponent.hotInstance.updateSettings({
        data: Handsontable.helper.createSpreadsheetData(50, 10),
        nestedHeaders: [
          ["A", { label: "B", colspan: 8 }, "C"],
          ["D", { label: "E", colspan: 4 }, { label: "F", colspan: 4 }, "G"],
          [
            "H",
            { label: "I", colspan: 2 },
            { label: "J", colspan: 2 },
            { label: "K", colspan: 2 },
            { label: "L", colspan: 2 },
            "M"
          ],
          ["N", "O", "P", "Q", "R", "S", "T", "U", "V", "W"]
        ]
        // collapsibleColumns: [
        //   {row: -4, col: 1, collapsible: true},
        //   {row: -3, col: 1, collapsible: true},
        //   {row: -2, col: 1, collapsible: true},
        //   {row: -2, col: 3, collapsible: true}
        // ]
      });
    },
    //嵌套行 有问题?只有在data里配置才可以
    nestedRows() {
      let arr = [
        {
          category: "Best Rock Performance",
          artist: null,
          title: null,
          label: null,
          __children: [
            {
              title: "Don't Wanna Fight",
              artist: "Alabama Shakes",
              label: "ATO Records"
            },
            {
              title: "What Kind Of Man",
              artist: "Florence & The Machine",
              label: "Republic"
            },
            {
              title: "Something From Nothing",
              artist: "Foo Fighters",
              label: "RCA Records"
            },
            {
              title: "Ex's & Oh's",
              artist: "Elle King",
              label: "RCA Records"
            },
            {
              title: "Moaning Lisa Smile",
              artist: "Wolf Alice",
              label: "RCA Records/Dirty Hit"
            }
          ]
        }
      ];
      this.$refs.hotTableComponent.hotInstance.updateSettings({
        data: arr,
        rowHeaders: true,
        colHeaders: ["Category", "Artist", "Title", "Album", "Label"],
        nestedRows: true,
        contextMenu: true
      });
    },
    //初始化3
    initialization3() {
      this.$refs.hotTableComponent.hotInstance.updateSettings({
        colHeaders: true,
        rowHeaders: true,
        data: [
          [1, 3, 4, 6, 3],
          [6, 9, 6, 4, 2],
          [1, 5, 3, 4, 5],
          [5, 4, 3, 5, 6],
          [6, 4, 6, 2, 4],
          [null]
        ],
        columnSorting: true,
        search: true,
        columns(index) {
          return {};
        },
        cells(row, col, prop) {},
        filters: true,
        dropdownMenu: true
      });
    },
    search() {
      var search = this.$refs.hotTableComponent.hotInstance.getPlugin("search");
      var queryResult = search.query(this.search_value);

      console.log(queryResult);
      this.$refs.hotTableComponent.hotInstance.render();
    },
    calculations() {
      console.log(this.$refs.hotTableComponent.hotInstance.getData());
      this.$refs.hotTableComponent.hotInstance.updateSettings({
        columnSummary: [
          {
            destinationRow: 5,
            destinationColumn: 0,
            type: "min"
          },
          {
            destinationRow: 5,
            destinationColumn: 1,
            type: "max"
          }
        ]
      });
      this.$refs.hotTableComponent.hotInstance.render();
    },
    initialization4() {
      this.$refs.hotTableComponent.hotInstance.updateSettings({
        colHeaders: true,
        rowHeaders: true,
        minSpareRows: 3,
        stretchH: "all",
        data: Handsontable.helper.createSpreadsheetData(5, 10),
        columns(index) {
          return {};
        },
        cells(row, col, prop) {},
        mergeCells: [
          { row: 1, col: 1, rowspan: 3, colspan: 3 },
          { row: 3, col: 4, rowspan: 2, colspan: 2 }
        ]
      });
    },
    align() {
      this.$refs.hotTableComponent.hotInstance.updateSettings({
        className: "htCenter",
        cell: [
          { row: 0, col: 0, className: "htRight" },
          { row: 1, col: 1, className: "htLeft htMiddle" },
          { row: 3, col: 4, className: "htLeft htBottom" }
        ]
      });
    },
    initialization5() {
      this.$refs.hotTableComponent.hotInstance.updateSettings({
        colHeaders: true,
        rowHeaders: true,
        minSpareRows: 3,
        currentRowClassName: "currentRow",
        currentColClassName: "currentCol",
        outsideClickDeselects: false,
        stretchH: "all",
        data: [
          ["", "Tesla", "Nissan", "Toyota", "Honda"],
          ["2017", -5, "", 12, 13],
          ["2018", "", -11, 14, 13],
          ["2019", "", 15, -12, "readOnly"]
        ]
        // columns(index) {
        //   return {};
        // },
        // cells(row, col, prop) {},
      });
    },
    //格式
    formatting() {
      let that = this;
      this.$refs.hotTableComponent.hotInstance.updateSettings({
        cells: function (row, col) {
          var cellProperties = {};
          var data = that.$refs.hotTableComponent.hotInstance.getData();

          if (data[row][col] === "readOnly") {
            cellProperties.readOnly = true; // make cell read-only if it is first row or the text reads 'readOnly'
          }
          if (row === 0) {
            cellProperties.renderer = "firstRowRenderer"; // uses function directly
          } else {
            cellProperties.renderer = "negativeValueRenderer"; // uses lookup map
          }

          return cellProperties;
        }
      });
    },
    //格式
    cssformatting() {
      this.$refs.hotTableComponent.hotInstance.updateSettings({
        className: "custom-table",
        cell: [
          {
            row: 0,
            col: 0,
            className: "custom-cell"
          }
        ]
      });
    },
    //渲染器函数 将第一行变绿
    firstRowRenderer(instance, td, row, col, prop, value, cellProperties) {
      Handsontable.renderers.TextRenderer.apply(this, arguments);
      td.style.fontWeight = "bold";
      td.style.color = "green";
      td.style.background = "#CEC";
    },
    //渲染器函数
    negativeValueRenderer(instance, td, row, col, prop, value, cellProperties) {
      Handsontable.renderers.TextRenderer.apply(this, arguments);

      // 小于0 变红
      if (parseInt(value, 10) < 0) {
        td.className = "red";
      }

      //空字符串 变灰
      if (!value || value === "") {
        td.style.background = "#EEE";
      } else {
        if (value === "Nissan") {
          td.style.fontStyle = "italic";
        }
        td.style.background = "";
      }
    },
    //获取数据
    getdata() {
      //selected返回选择的数据,可以按住ctrl多选,每个数据有四个数字,即起始和终止
      var selected = this.$refs.hotTableComponent.hotInstance.getSelected();
      // console.log(selected);
      var data = [];
      //有几个选择框 就有几个循环
      for (var i = 0; i < selected.length; i += 1) {
        var item = selected[i];
        //item是一个有四个数字的数组
        data.push(
          //根据item的坐标 通过getdata获取对应数据
          this.$refs.hotTableComponent.hotInstance.getData.apply(
            this.$refs.hotTableComponent.hotInstance,
            item
          )
        );
        //通过范围获取数据
      }
      console.log(data);
    },
    borders() {
      this.$refs.hotTableComponent.hotInstance.updateSettings({
        customBorders: [
          {
            range: {
              from: {
                row: 1,
                col: 1
              },
              to: {
                row: 2,
                col: 2
              }
            },
            top: {
              width: 2,
              color: "#5292F7"
            },
            left: {
              width: 2,
              color: "orange"
            },
            bottom: {
              width: 2,
              color: "red"
            },
            right: {
              width: 2,
              color: "magenta"
            }
          }
          // {
          //   row: 2,
          //   col: 2,
          //   left: {
          //     width: 2,
          //     color: "red"
          //   },
          //   right: {
          //     width: 1,
          //     color: "green"
          //   }
          // }
        ]
      });
    },
    initialization6() {
      this.$refs.hotTableComponent.hotInstance.updateSettings({
        colHeaders: true,
        rowHeaders: true,
        stretchH: "all",
        outsideClickDeselects: false,
        data: Handsontable.helper.createSpreadsheetData(10, 5),
        contextMenu: {
          callback(key, selection, clickEvent) {
            //菜单的回调函数 点击就会触发这条
            console.log(key, selection, clickEvent);
          },
          items: {
            row_above: {
              name: "上方插入行",
              disabled() {
                // `disabled` 返回一个布尔值 决定这个选项能不能用
                // console.log(this);
                //这里的this不是vm 是core
                return this.getSelectedLast()[0] === 0; // `this` === hot
              }
            },
            // A separator line can also be added like this:
            // 'sp1': { name: '---------' }
            // and the key has to be unique
            sp1: "---------",
            row_below: {
              name: "下方插入行" // Set custom text for predefined option
            },
            about: {
              // 自定义选项 about是自己写的
              name() {
                // `name` can be a string or a function
                return "<b>弹出alert</b>"; // Name can contain HTML
              },
              hidden() {
                // `hidden` can be a boolean or a function
                // 右键第一列时不显示这个选项 getSelectedLast()[1]选择的最后一个单元格的列
                return this.getSelectedLast()[1] == 0; // `this` === hot
              },
              //点击自定义选项 callback里面代表要执行的函数
              callback(key, selection, clickEvent) {
                // Callback for specific option
                setTimeout(() => {
                  alert("Hello world!"); // Fire alert after menu close (with timeout)
                }, 0);
              }
            },
            colors: {
              // Own custom option
              name: "颜色",
              submenu: {
                //子选项
                // Custom option with submenu of items
                items: [
                  {
                    // Key must be in the form 'parent_key:child_key'
                    key: "colors:red",
                    name: "红色",
                    //点击子选项会发生的事情
                    callback(key, selection, clickEvent) {
                      setTimeout(() => {
                        alert("点击红色!");
                      }, 0);
                    }
                  },
                  { key: "colors:green", name: "绿色" },
                  { key: "colors:blue", name: "蓝色" }
                ]
              }
            }
            // credits: {
            //   // Own custom property
            //   // Custom rendered element in the context menu
            //   renderer(hot, wrapper, row, col, prop, itemValue) {
            //     const elem = document.createElement("marquee");

            //     elem.style.cssText = "background: lightgray;";
            //     elem.textContent = "Brought to you by...";

            //     return elem;
            //   },
            //   disableSelection: true, // Prevent mouseoever from highlighting the item for selection
            //   isCommand: false, // Prevent clicks from executing command and closing the menu
            // },
          }
        }
      });
    },
    //删除选中行
    deleterow() {
      let hot = this.$refs.hotTableComponent.hotInstance;
      let arr = hot.getSelected();
      for (let i = arr[0][0]; i <= arr[0][2]; i++) {
        hot.alter("remove_row", arr[0][0]);
        //这里删除的始终是选中的起始行,因为上一行删了,下一行会上来
      }
    },
    //注释
    comments() {
      this.$refs.hotTableComponent.hotInstance.updateSettings({
        // language: "zh-CN", // 语言设置
        contextMenu: true,
        comments: true,
        cell: [
          { row: 1, col: 1, comment: { value: "默认注释" } },
          {
            row: 2,
            col: 2,
            comment: {
              value: "设置注释样式",
              style: { width: 200, height: 200 }
            }
          }
        ]
      });
    },
    //剪贴
    copycut() {
      Handsontable.hooks.add("afterCut", () => {
        alert("剪贴成功");
      });
      let hot = this.$refs.hotTableComponent.hotInstance;
      hot.selectCell(1, 1);
      document.execCommand("cut");
    },
    initialization7() {
      this.$refs.hotTableComponent.hotInstance.updateSettings({
        data: [
          {
            num: 10,
            date: "2022/08/21",
            time: "12:00:00",
            checkbox: "",
            select: "1",
            dropdown: "选项1",
            autocomplete: "自动填充",
            password: "123456789ABCDEFG"
          }
        ],
        colHeaders: [
          "数字",
          "日期",
          "时间",
          "复选框",
          "选择框",
          "下拉框",
          "自动填充",
          "密码"
        ],
        rowHeaders: ["示例"],
        columns: [
          //数字
          {
            data: "num",
            type: "numeric",
            //默认格式
            numericFormat: {
              pattern: "$0,0.00"
            },
            allowEmpty: false
          },
          //日期
          {
            data: "date",
            type: "date",
            dateFormat: "YYYY/MM/DD",
            correctFormat: true, //自动修正错误格式
            defaultDate: "2022/01/01",
            culture: "zh-CN",
            // 日历控件的附加选项 (see https://github.com/dbushell/Pikaday#configuration)
            datePickerConfig: {
              // First day of the week (0: Sunday, 1: Monday, etc)
              firstDay: 0,
              showWeekNumber: true,
              numberOfMonths: 3, //可选月数
              disableDayFn: function (date) {
                // 周末不可选取
                return date.getDay() === 0 || date.getDay() === 6;
              }
            }
          },
          //时间
          {
            data: "time",
            type: "time",
            timeFormat: "h:mm:ss",
            // timeFormat: 'h:mm:ss a',
            correctFormat: true
          },
          //复选框 data中对应地方不能有数据
          {
            // data:"checkbox",
            type: "checkbox",
            // checkedTemplate: 'yes',
            // uncheckedTemplate: 'no',
            label: {
              position: "before",
              // value:"label" //直接设置label字符串
              property: "time" //数据来源于data的time
            }
          },
          //选择 不建议使用 这是用编辑器实现的?
          //只能选择
          {
            data: "select",
            editor: "select",
            defaultDate: "选择框",
            selectOptions: ["1", "2", "3", "4"]
          },
          //下拉框
          //相比上面,还可以输入
          {
            data: "dropdown",
            type: "dropdown",
            source: ["选项1", "选项2", "选项3"]
          },
          //自动填充:懒惰模式
          //用户可以选择建议的选项之一，也可以输入未包含的自定义值。
          {
            data: "autocomplete",
            type: "autocomplete",
            source: ["BMW", "Chrysler", "Nissan", "Suzuki", "Toyota", "Volvo"],
            strict: false
          },
          //密码
          {
            data: "password",
            type: "password"
          }
        ]
      });
    },
    //渲染器 用于case1 在单元格里实现按钮的作用
    myBtns(instance, td, row, col, prop, value, cellProperties) {
      Handsontable.renderers.TextRenderer.apply(this, arguments);
      let a = document.createElement("button");
      a.innerText = value;
      a.addEventListener("click", this.doAction);
      td.innerText = "";
      td.appendChild(a);
    },
    doAction() {
      alert("Action made");
    },
    //案例1
    case1() {
      let hot = this.$refs.hotTableComponent.hotInstance;
      hot.updateSettings({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        licenseKey: "non-commercial-and-evaluation",
        width: 584,
        height: 320,
        colWidths: 100,
        contextMenu: true,
        rowHeaders: true,
        colHeaders: true,
        cells(row, col, prop) {
          let a = {
            // className: row % 2 === 0 ? 'even' : 'odd',
          };
          if (row == 1) {
            a.validator = /^[\w][\d]$/gm;
          }
          if (row == 2) {
            a.renderer = "myBtns";
          }
          return a;
        },

        //新添加行变色
        afterCreateRow(index) {
          setTimeout(() => {
            for (let i = 0; i < hot.countCols(); i++) {
              this.setCellMeta(index, i, "className", "newRow");
            }
            this.render();
          }, 50);
        },
        //鼠标移入行变色
        //在用户将光标移到单元格上，但在与其相关的所有计算之前触发
        beforeOnCellMouseOver(e, coords, td) {
          if (coords.row < 0) {
            return;
          }
          let index = coords.row;
          for (let i = 0; i < this.countCols(); i++) {
            if (coords.col >= 0) {
              this.setCellMeta(index, i, "className", "myRow");
            }
          }
          this.render();
        },
        beforeOnCellMouseOut(e, coords, td) {
          let index = coords.row;
          for (let i = 0; i < this.countCols(); i++) {
            if (coords.col >= 0) {
              this.setCellMeta(index, i, "className", "myErase");
            }
          }
        },
        //第一行只能输入数字
        beforeKeyDown(event) {
          const reg = /^\d+$/;
          //event.key输入值
          if (reg.test(event.key) || hot.getSelected()[0][0] != 0) {
            return;
          }
          event.preventDefault();
          //阻止事件
        }
      });
    },
    //关联表
    case2() {
      let hot = this.$refs.hotTableComponent.hotInstance;
      let hot2 = this.$refs.hotTableComponent2.hotInstance;
      hot.updateSettings({
        data: [
          {
            car: "VW Passat",
            year: 2001,
            price_usd: 7000
          },
          {
            car: "Hyundai Coupe",
            year: 2002,
            price_usd: 8330
          },
          {
            car: "VW Polo",
            year: 1996,
            price_usd: 3900
          }
        ],
        licenseKey: "non-commercial-and-evaluation",
        colHeaders: true,
        rowHeaders: true,
        readOnly: true,
        columns: [
          {
            data: "car",
            title: "Car"
          },
          {
            type: "numeric",
            data: "year",
            title: "Year"
          },
          {
            type: "numeric",
            data: "price_usd",
            title: "Price USD",
            numericFormat: {
              pattern: {
                output: "currency",
                mantissa: 2
              },
              culture: "en-US" // this is the default culture, set up for USD
            }
          }
        ],
        outsideClickDeselects: false,
        //在选择一个或多个单元格后触发
        afterSelection(r, c, r2, c2) {
          //根据选择行 设置另一个表的data
          if (r === 0) {
            hot2.updateSettings({
              data: [
                ["orange", true],
                ["red", false],
                ["blue", false]
              ]
            });
          } else if (r === 1) {
            hot2.updateSettings({
              data: [["black", true]]
            });
          } else if (r === 2) {
            hot2.updateSettings({
              data: [
                ["green", false],
                ["blue", false],
                ["red", true],
                ["black", true]
              ]
            });
          }
        }
      });
      hot2.updateSettings({
        colHeaders: true,
        columns: [
          {
            title: "Chassis color",
            readOnly: true
          },
          {
            type: "checkbox",
            title: "ABS"
          }
        ]
      });
    },
    //下拉框
    case3() {
      let hot = this.$refs.hotTableComponent.hotInstance;
      //2015 对应一个返回数组['2015-1', '2015-2', '2015-3']的函数
      const OPTIONS = new Map([
        ['2015', () => ['2015-1', '2015-2', '2015-3']],
        ['2016', () => ['2016-1', '2016-2', '2016-3']],
        ['2017', () => ['2017-1', '2017-2', '2017-3', '2017-4']],
      ]);
      hot.updateSettings({
        data: [
          {
            car: "1",
            year: "2015",
            // ownersByYear: {
            //   2013: "Micheal Pattinson",
            //   2014: "John Smith",
            //   2015: "James Anthon"
            // },
            owner: "2015-1",
            // cleared: false
          },          
        ],
        columns: [
          {
            data: "car",
            title: "id"
          },
          {
            data: "year",
            title: "下拉框1",
            type: "dropdown",
            source: ["2015", "2016", "2017"]
          },
          {
            data: "owner",
            title: "下拉框2",
            type: "dropdown",
            source: [
              "2015-1",
              "2015-2",
              "2015-3",
            ]
          }
        ],
        licenseKey: "non-commercial-and-evaluation",
        colHeaders: true,
        colWidths: [100, 170, 250],
        fillHandle: false,
        //选项更改 id 下拉框1 下拉框2更改都会触发
        //第一次加载触发afterChange的是loadData
        //第二次加载触发afterChange的是edit
        afterChange(changes, source) {
          console.log(source );
          if (
            source === "loadData" ||
            source === "internal" ||
            changes.length > 1
          ) {
            return;
          }
          //判断修改源

          const [row, prop, oldValue, newValue] = changes[0];
          //获取修改的单元格地址和值

          if (prop !== "year") {
            return;
          }
          if (!OPTIONS.has(newValue)) {
            return;
          }
          //如果修改的不是第二列 或 修改的值不在我们设置范围里 则不做操作

          const option = OPTIONS.get(newValue)();
          //OPTIONS.get(newValue)() 获取newValue对应的函数并执行,获得数组

          this.setCellMeta(row, this.propToCol("owner"), "source", option);
          //设置这个格子的setting中的source propToCol返回与给定属性对应的列索引
          this.setDataAtRowProp(row, "owner", option[0]);
          //为单元格设置新值 
        }
      });
    }
  },
  created() {
    //注册
    Handsontable.renderers.registerRenderer(
      "negativeValueRenderer",
      this.negativeValueRenderer
    );
    Handsontable.renderers.registerRenderer(
      "firstRowRenderer",
      this.firstRowRenderer
    );
    Handsontable.renderers.registerRenderer(
      "defaultValueRenderer",
      this.defaultValueRenderer
    );
    Handsontable.renderers.registerRenderer("myBtns", this.myBtns);
  },
  components: {
    HotTable
  },
  computed: {
    show() {
      return this.flag == 0 ? "隐藏" : "显示";
    },
    show_trim() {
      return this.flag_trim == 0 ? "修剪" : "恢复";
    }
  }
};
</script>
<style>
.bottom {
  width: 200px;
  height: 200px;
}
.ex {
  width: 800px;
  margin: 0 auto;
  height: 400px;
  overflow: auto;
  margin-top: 10px;
  /* border: 1px solid red; */
}
.buttons {
  width: 800px;
  margin: 0 auto;
  margin-top: 20px;
  /* height: 600px; */
}
.red {
  color: red;
}
.divinput {
  display: inline-block;
  width: 200px;
}

td.custom-cell {
  color: #fff;
  background-color: #37bc6c;
}
.custom-table thead th:nth-child(even),
.custom-table tbody tr:nth-child(odd) th {
  background-color: #d7f1e1;
}
.buttonrow>span:first-child{
  display: inline-block;
  width: 110px;
}
td.newRow {
  background-color: #37bc6c;
}

.handsontable .myRow {
  background: #c5d8f7;
}
.handsontable .myErase {
  background: #fff;
}
</style>
