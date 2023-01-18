<template>
  <div class="box">
    <yn-spin :spinning="isLoading">
      <div class="container">
        <div class="search">
          <div class="input">
            <span class="searchLabel">搜索表单:</span>
            <yn-input v-model="formName">
              <yn-icon-svg
                size="large"
                slot="suffix"
                type="search"
                @click="onSearchForm"
                class="searchIcon"
              />
            </yn-input>
          </div>
          <div class="input">
            <span class="searchLabel">筛选维:</span>
            <yn-input v-model="filterDimension">
              <!-- <yn-icon-svg slot="suffix" type="search" /> -->
            </yn-input>
          </div>
          <div>
            <span class="searchLabel">结构:</span>
            <yn-select style="width: 80px" v-model="structureSelect">
              <yn-select-option value="failure">失效</yn-select-option>
              <yn-select-option value="noFailure">未失效</yn-select-option>
              <yn-select-option value="all">全部</yn-select-option>
            </yn-select>
          </div>
          <div>
            <span class="searchLabel">公式:</span>
            <yn-select style="width: 80px" v-model="formulaSelect">
              <yn-select-option value="failure">失效</yn-select-option>
              <yn-select-option value="noFailure">未失效</yn-select-option>
              <yn-select-option value="all">全部</yn-select-option>
            </yn-select>
          </div>
          <yn-button type="primary" @click="search(1)">查询</yn-button>
        </div>
        <div class="searchedTags">
          <span style="margin-right:15px;">选择的表单:</span>
          <yn-tag
            closable
            v-for="p in selectedForm"
            :key="p.bookId"
            @close="cancelSelection(p)"
            color="geekblue"
            >{{ p.bookName }}</yn-tag
          >
        </div>
        <div class="operation">
          <!-- <yn-button type="primary" @click="cacheVisible = true"
            >构建缓存</yn-button
          > -->
          <yn-button type="primary" @click="differencesVisible = true"
            >检测差异</yn-button
          >
          <yn-button type="primary" @click="releaseVisible = true"
            >发布</yn-button
          >
          <yn-button type="primary" @click="structuralFailure"
            >结构失效</yn-button
          >
          <yn-button type="primary" @click="formulaFailure">公式失效</yn-button>
          <yn-button type="primary" @click="deleteOperation">删除</yn-button>
          <!-- <yn-button type="primary" @click="test">TEST</yn-button> -->
        </div>
        <div class="display" ref="displayRef">
          <!-- 标题checkbox 是覆盖在pagelist上的 -->
          <yn-checkbox
            @change="onChangeAllCheckbox"
            v-model="isAllChecked"
            class="allCheckbox"
            v-show="isShowTitleCheckbox"
          ></yn-checkbox>
          <yn-page-list
            :tableConfig="tableConfig"
            rowKey="sheetId"
            @table_change="onTableChange"
            :dataPanelSkeleton="dataPanelSkeleton"
            :autoHeight="true"
            :tableDraggable="false"
          >
            <template slot="table.firstCol" slot-scope="text, record">
              <yn-checkbox
                @change="onChangeColumnsCheckbox($event, record)"
                v-model="isChecked[text]"
              ></yn-checkbox>
            </template>
            <template slot="table.structureSign" slot-scope="text">
              <!-- <yn-icon-svg type="check" v-show="text == 'true'" />
            <yn-icon-svg type="close" v-show="text != 'true'" /> -->
              <svg
                style="height:18px;width: 18px;"
                v-show="text == 'true'"
                t="1673340108012"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4323"
                width="200"
                height="200"
              >
                <path
                  d="M828.406 90.125H195.594c-58.219 0-105.469 47.25-105.469 105.469v632.812c0 58.219 47.25 105.469 105.469 105.469h632.812c58.219 0 105.469-47.25 105.469-105.469V195.594c0-58.219-47.25-105.469-105.469-105.469z m52.735 738.281c0 29.16-23.57 52.735-52.735 52.735H195.594c-29.11 0-52.735-23.575-52.735-52.735V195.594c0-29.11 23.625-52.735 52.735-52.735h632.812c29.16 0 52.735 23.625 52.735 52.735v632.812z"
                  p-id="4324"
                ></path>
                <path
                  d="M421.529 709.56a36.281 36.281 0 0 1-27.553-12.67L205.175 476.614a36.285 36.285 0 0 1 55.1-47.229L425.264 621.87l342.161-298.48a36.29 36.29 0 0 1 47.71 54.687L445.386 700.62a36.323 36.323 0 0 1-23.857 8.94z"
                  p-id="4325"
                ></path>
              </svg>
              <svg
                style="height:18px;width: 18px;"
                v-show="text != 'true'"
                t="1673340057297"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4183"
                width="200"
                height="200"
              >
                <path
                  d="M85.333333 170.24C85.333333 123.392 123.648 85.333333 170.24 85.333333h683.52C900.608 85.333333 938.666667 123.648 938.666667 170.24v683.52c0 46.890667-38.314667 84.906667-84.906667 84.906667H170.24C123.392 938.666667 85.333333 900.352 85.333333 853.76V170.24z m42.666667 42.88v597.76C128 857.898667 166.101333 896 213.12 896h597.76A85.12 85.12 0 0 0 896 810.88V213.12A85.12 85.12 0 0 0 810.88 128H213.12A85.12 85.12 0 0 0 128 213.12z"
                  fill="#444654"
                  p-id="4184"
                ></path>
              </svg>
            </template>
            <template slot="table.formulaSign" slot-scope="text">
              <!-- <yn-icon-svg type="check" v-show="text == 'true'" />
            <yn-icon-svg type="close" v-show="text != 'true'" /> -->
              <svg
                style="height:18px;width: 18px;"
                v-show="text == 'true'"
                t="1673340108012"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4323"
                width="200"
                height="200"
              >
                <path
                  d="M828.406 90.125H195.594c-58.219 0-105.469 47.25-105.469 105.469v632.812c0 58.219 47.25 105.469 105.469 105.469h632.812c58.219 0 105.469-47.25 105.469-105.469V195.594c0-58.219-47.25-105.469-105.469-105.469z m52.735 738.281c0 29.16-23.57 52.735-52.735 52.735H195.594c-29.11 0-52.735-23.575-52.735-52.735V195.594c0-29.11 23.625-52.735 52.735-52.735h632.812c29.16 0 52.735 23.625 52.735 52.735v632.812z"
                  p-id="4324"
                ></path>
                <path
                  d="M421.529 709.56a36.281 36.281 0 0 1-27.553-12.67L205.175 476.614a36.285 36.285 0 0 1 55.1-47.229L425.264 621.87l342.161-298.48a36.29 36.29 0 0 1 47.71 54.687L445.386 700.62a36.323 36.323 0 0 1-23.857 8.94z"
                  p-id="4325"
                ></path>
              </svg>
              <svg
                style="height:18px;width: 18px;"
                v-show="text != 'true'"
                t="1673340057297"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4183"
                width="200"
                height="200"
              >
                <path
                  d="M85.333333 170.24C85.333333 123.392 123.648 85.333333 170.24 85.333333h683.52C900.608 85.333333 938.666667 123.648 938.666667 170.24v683.52c0 46.890667-38.314667 84.906667-84.906667 84.906667H170.24C123.392 938.666667 85.333333 900.352 85.333333 853.76V170.24z m42.666667 42.88v597.76C128 857.898667 166.101333 896 213.12 896h597.76A85.12 85.12 0 0 0 896 810.88V213.12A85.12 85.12 0 0 0 810.88 128H213.12A85.12 85.12 0 0 0 128 213.12z"
                  fill="#444654"
                  p-id="4184"
                ></path>
              </svg>
            </template>
            <template slot="table.deleteSign" slot-scope="text">
              <!-- <yn-icon-svg type="check" v-show="text == 'true'" />
            <yn-icon-svg type="close" v-show="text != 'true'" /> -->
              <svg
                style="height:18px;width: 18px;"
                v-show="text == 'true'"
                t="1673340108012"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4323"
                width="200"
                height="200"
              >
                <path
                  d="M828.406 90.125H195.594c-58.219 0-105.469 47.25-105.469 105.469v632.812c0 58.219 47.25 105.469 105.469 105.469h632.812c58.219 0 105.469-47.25 105.469-105.469V195.594c0-58.219-47.25-105.469-105.469-105.469z m52.735 738.281c0 29.16-23.57 52.735-52.735 52.735H195.594c-29.11 0-52.735-23.575-52.735-52.735V195.594c0-29.11 23.625-52.735 52.735-52.735h632.812c29.16 0 52.735 23.625 52.735 52.735v632.812z"
                  p-id="4324"
                ></path>
                <path
                  d="M421.529 709.56a36.281 36.281 0 0 1-27.553-12.67L205.175 476.614a36.285 36.285 0 0 1 55.1-47.229L425.264 621.87l342.161-298.48a36.29 36.29 0 0 1 47.71 54.687L445.386 700.62a36.323 36.323 0 0 1-23.857 8.94z"
                  p-id="4325"
                ></path>
              </svg>
              <svg
                style="height:18px;width: 18px;"
                v-show="text != 'true'"
                t="1673340057297"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4183"
                width="200"
                height="200"
              >
                <path
                  d="M85.333333 170.24C85.333333 123.392 123.648 85.333333 170.24 85.333333h683.52C900.608 85.333333 938.666667 123.648 938.666667 170.24v683.52c0 46.890667-38.314667 84.906667-84.906667 84.906667H170.24C123.392 938.666667 85.333333 900.352 85.333333 853.76V170.24z m42.666667 42.88v597.76C128 857.898667 166.101333 896 213.12 896h597.76A85.12 85.12 0 0 0 896 810.88V213.12A85.12 85.12 0 0 0 810.88 128H213.12A85.12 85.12 0 0 0 128 213.12z"
                  fill="#444654"
                  p-id="4184"
                ></path>
              </svg>
            </template>
          </yn-page-list>
        </div>
        <yn-modal
          title="选择表单"
          v-model="visible"
          @ok="handleOk"
          class="selectFormModal"
        >
          <yn-list
            itemLayout="horizontal"
            :dataSource="searchFormData"
            rowKey="bookId"
            @rowSelectChange="onRowSelect"
            :rowSelection="true"
            ref="list"
          >
            <div slot="header">
              <yn-checkbox @change="setSelectAll">全选</yn-checkbox>
            </div>
            <yn-list-item slot="renderItem" slot-scope="item, index">
              <yn-list-item-meta>
                <span slot="title">{{ item.bookName }}</span>
              </yn-list-item-meta>
            </yn-list-item>
          </yn-list>
        </yn-modal>
        <!-- <yn-modal v-model="cacheVisible" @ok="buildCache">
          <p>确定要构建缓存吗?</p>
        </yn-modal> -->
        <yn-modal v-model="differencesVisible" @ok="detectDifferences">
          <p>确定要检测差异吗?</p>
        </yn-modal>
        <yn-modal v-model="releaseVisible" @ok="release">
          <p>确定要发布吗?</p>
        </yn-modal>
        <!-- <yn-spin tip="Loading..." v-show="isLoading" class="loading">
      </yn-spin> -->
      </div>
    </yn-spin>
  </div>
</template>
<script>
import "yn-p1/libs/components/yn-page-list/";
import "yn-p1/libs/components/yn-list/";
import "yn-p1/libs/components/yn-list-item/";
import "yn-p1/libs/components/yn-list-item-meta/";
import DsUtils from "yn-p1/libs/utils/DsUtils";
import UiUtils from "yn-p1/libs/utils/UiUtils";
import api from "./js/api";
export default {
  name: "preciseRelease",
  data() {
    return {
      formName: "",
      filterDimension: "",
      isShowTitleCheckbox: false,
      //已经加载过的数据
      //key是sheetId,值是三个checkbox
      data: {},
      //list数据源
      tableConfig: {
        columns: [
          {
            title: "",
            dataIndex: "sheetId", //这一列的数据来源与data中的key
            //这里应该不重要
            // width:100,
            width: "10%",
            align: "center",
            scopedSlots: {
              customRender: "firstCol" //这一列提供插槽,名为table.key
            }
          },
          {
            title: "表单名称",
            dataIndex: "bookName",
            // width:200,
            width: "30%"
          },
          {
            title: "筛选维",
            dataIndex: "dimension",
            // width:200,
            width: "30%"
          },
          {
            title: "结构失效",
            dataIndex: "structureSign",
            // width:100,
            width: "10%",
            align: "center",
            scopedSlots: {
              customRender: "structureSign"
            }
          },
          {
            title: "公式失效",
            dataIndex: "formulaSign",
            // width:100,
            width: "10%",
            align: "center",
            scopedSlots: {
              customRender: "formulaSign"
            }
          },
          {
            title: "删除标识",
            dataIndex: "deleteSign",
            // width:100,
            width: "10%",
            align: "center",
            scopedSlots: {
              customRender: "deleteSign"
            }
          }
        ],
        dataSource: [],
        pagination: {
          current: 1,
          pageSize: 15, //这里会被init中的setPageSize修改
          showQuickJumper: true,
          total: 12
          // pageSizeOptions: ["5", "10", "15", "20", "30", "40", "50", "100"],
          // showSizeChanger: true
        },
        loading: false
        // scroll:{ y: 400 }
      },
      //判断每一项是否被选中
      isChecked: {},
      //仅在本次搜索中选择的表单
      preSelectedForm: [],
      //所有选择的表单
      selectedForm: [],
      visible: false,
      searchFormData: [],
      selectAll: false,
      dataPanelSkeleton: {
        loading: false
      },
      cacheVisible: false,
      releaseVisible: false,
      differencesVisible: false,
      isLoading: false,
      structureSelect: "all",
      formulaSelect: "all",
      //是否通过点击实现全选
      isAllChecked: false,
      //上一次搜索的条件
      searchInfo: {
        
      },
    };
  },
  computed: {
    displayHeight() {}

    // checkboxLeft() {
    //   console.log("触发");
    //   let title = document.querySelector(".resizable");
    //   if (title) {
    //     return title.getBoundingClientRect().width / 2 + 32 - 8 + "px";
    //   }
    //   else {
    //     return "0px"
    //   }

    // },
    // checkboxTop() {

    // }
  },
  methods: {
    search(flag) {
      //flag 0:跳页 1:查询
      this.tableConfig.loading = true;
      //search 默认请求第一页
      let arr = [];
      this.selectedForm.forEach(p => {
        arr.push(p.bookId);
      });
      let formPageSize = this.tableConfig.pagination.pageSize; //默认每页数量
      if (localStorage.getItem("preciseReleasePageSize")) {
        formPageSize = parseInt(localStorage.getItem("preciseReleasePageSize")); //根据缓存更新每页数量
      }

      let publishFlag =
        this.structureSelect == "all"
          ? ""
          : this.structureSelect == "failure"
          ? "false"
          : "true";
      let formulaFlag =
        this.formulaSelect == "all"
          ? ""
          : this.formulaSelect == "failure"
          ? "false"
          : "true";

      // let pageNum

      // if (flag == 0) {
      //   pageNum = this.tableConfig.pagination.current
      // }

      //查询时,当前页数重置为 1
      if (flag == 1) {
        this.tableConfig.pagination.current = 1;
      }
      //跳页时,在其它地方修改当前页数

      let pageNum = this.tableConfig.pagination.current;

      let obj = {
        bookIds: arr,
        pageDimFilter: this.filterDimension,
        publishFlag: publishFlag,
        formulaFlag: formulaFlag,
        pageNum: pageNum,
        pageSize: formPageSize
      };

      this.searchInfo = obj

      DsUtils.post(`${api.getSearchList}`, obj)
        .then(res => {
          if (res.data.success) {
            let data = res.data.data;
            let total = data.total;
            this.tableConfig.pagination.total = total;

            // console.log(data);
            //根据total 创建一个长度为total的数组 用于分页
            let arrData = [];

            data.sheetInfos.forEach(p => {
              //布尔值转为字符串
              //且结构和失效要置反
              let sheetPublishFlag = p.publishFlag == true ? "false" : "true";
              let sheetFormulaFlag = p.formulaFlag == true ? "false" : "true";
              let sheetToDeleteFlag = p.toDeleteFlag == true ? "true" : "false";

              let arrobj = {
                key: p.sheetId,
                bookId: p.bookId,
                sheetId: p.sheetId,
                bookName: p.bookName,
                dimension: p.pageDimName,
                structureSign: sheetPublishFlag,
                formulaSign: sheetFormulaFlag,
                deleteSign: sheetToDeleteFlag
              };

              //将已加载的数据记录到this.data中
              if (Object.keys(this.data).indexOf(p.sheetId) == -1) {
                this.$set(this.data, p.sheetId, arrobj);
              }

              arrData.push(this.data[p.sheetId]);
              //this.tableConfig.dataSource使用的都是this.data里的数据
              //由于使用的是同一个地址
              //structuralFailure在修改this.tableConfig.dataSource时,也会修改对应this.data里的数据
            });

            this.tableConfig.dataSource = arrData;

            //这里要等到页面出来后
            //才能获取到title 可是为什么nextTick没用?之前用本地数据时可以
            // this.$nextTick(() => {

            if (flag == 1) {
              //清空
              this.isChecked = {};
            }
            setTimeout(() => {
              this.init();
            }, 0);
            // });
          } else {
            UiUtils.errorMessage(res.data.message);
          }
        })
        .catch(err => {
          UiUtils.errorMessage("error");
          console.log(err);
        })
        .finally(() => {
          this.tableConfig.loading = false;
        });
    },
    detectDifferences() {
      this.differencesVisible = false;

      let bookIds = [];
      this.selectedForm.forEach(p => {
        bookIds.push(p.bookId);
      });

      let publishFlag =
        this.structureSelect == "all"
          ? ""
          : this.structureSelect == "failure"
          ? "false"
          : "true";
      let formulaFlag =
        this.formulaSelect == "all"
          ? ""
          : this.formulaSelect == "failure"
          ? "false"
          : "true";

      this.isLoading = true;



      //调用searchInfo 注意pageNum不需要调用
      let obj = {
        bookIds: bookIds,
        pageDimFilter: this.filterDimension,
        publishFlag: publishFlag,
        formulaFlag: formulaFlag,
        pageNum: this.tableConfig.pagination.current,
        pageSize: this.tableConfig.pagination.pageSize,

        selectAll: this.isAllChecked,
        selectSheetInfos: []
      };

      //这里统计勾选的sheet,在已加载的data里去找
      if (!this.isAllChecked) {
        for (let key in this.data) {
          if (this.isChecked[this.data[key].sheetId]) {
            let formulaFlag =
              this.data[key].formulaSign == "true" ? false : true;
            let publishFlag =
              this.data[key].structureSign == "true" ? false : true;
            let toDeleteFlag =
              this.data[key].deleteSign == "true" ? true : false;
            let o = {
              bookId: this.data[key].bookId,
              bookName: this.data[key].bookName,
              formulaFlag: formulaFlag,
              pageDimName: this.data[key].dimension,
              publishFlag: publishFlag,
              sheetId: this.data[key].sheetId,
              toDeleteFlag: toDeleteFlag
            };
            obj.selectSheetInfos.push(o);
          }
        }
      }

      DsUtils.post(`${api.detectDifferences}`, obj)
        .then(res => {
          if (res.data.success) {
            console.log(res.data.data.sheetInfos);

            this.data = {}; //清空已加载数据,防止复用旧数据,跳页时会加载新数据

            this.clearChecked()

            this.search(0)

            //更新当前页 检测差异的表
            //不需要管this.data
            //因为下次切换到这页时,会把这页数据存入this.data
            //这里更新this.tableConfig.dataSource只是临时的
            //下次切回来还会重新请求后端
            // res.data.data.sheetInfos.forEach(p => {
            //   this.tableConfig.dataSource.forEach((q, index) => {
            //     if (p.sheetId == q.sheetId) {
            //       let sheetPublishFlag =
            //         p.publishFlag == true ? "false" : "true";
            //       let sheetFormulaFlag =
            //         p.formulaFlag == true ? "false" : "true";
            //       let sheetToDeleteFlag =
            //         p.toDeleteFlag == true ? "true" : "false";

            //       // this.tableConfig.dataSource[index]是一个对象,可以直接修改值类型
            //       this.tableConfig.dataSource[
            //         index
            //       ].structureSign = sheetPublishFlag;
            //       this.tableConfig.dataSource[
            //         index
            //       ].formulaSign = sheetFormulaFlag;
            //       this.tableConfig.dataSource[
            //         index
            //       ].deleteSign = sheetToDeleteFlag;
            //     }
            //   });
            // });

            UiUtils.successMessage("检测差异完成");
          } else {
            UiUtils.errorMessage(res.data.message);
          }
        })
        .catch(err => {
          UiUtils.errorMessage("error");
          console.log(err);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    release() {
      this.releaseVisible = false;

      let bookIds = [];
      this.selectedForm.forEach(p => {
        bookIds.push(p.bookId);
      });

      let publishFlag =
        this.structureSelect == "all"
          ? ""
          : this.structureSelect == "failure"
          ? "false"
          : "true";
      let formulaFlag =
        this.formulaSelect == "all"
          ? ""
          : this.formulaSelect == "failure"
          ? "false"
          : "true";

      this.isLoading = true;

      let obj = {
        bookIds: bookIds,
        pageDimFilter: this.filterDimension,
        publishFlag: publishFlag,
        formulaFlag: formulaFlag,
        pageNum: this.tableConfig.pagination.current,
        pageSize: this.tableConfig.pagination.pageSize,

        selectAll: this.isAllChecked,
        selectSheetInfos: []
      };

      //这里统计勾选的sheet,在已加载的data里去找
      if (!this.isAllChecked) {
        for (let key in this.data) {
          if (this.isChecked[this.data[key].sheetId]) {
            let formulaFlag =
              this.data[key].formulaSign == "true" ? false : true;
            let publishFlag =
              this.data[key].structureSign == "true" ? false : true;
            let toDeleteFlag =
              this.data[key].deleteSign == "true" ? true : false;
            let o = {
              bookId: this.data[key].bookId,
              bookName: this.data[key].bookName,
              formulaFlag: formulaFlag,
              pageDimName: this.data[key].dimension,
              publishFlag: publishFlag,
              sheetId: this.data[key].sheetId,
              toDeleteFlag: toDeleteFlag
            };
            obj.selectSheetInfos.push(o);
          }
        }
      }
      DsUtils.post(`${api.accuratePublish}`, obj)
        .then(res => {
          if (res.data.success) {
            console.log(res.data.data);
            this.data = {}; //清空已加载数据,防止复用旧数据,跳页时会加载新数据

            this.clearChecked()
            this.search(0)

            UiUtils.successMessage("发布完成");
          } else {
            UiUtils.errorMessage(res.data.message);
          }
        })
        .catch(err => {
          UiUtils.errorMessage("error");
          console.log(err);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    searchAfterRelease() {
      this.dataPanelSkeleton.loading = true;
      let arr = [];
      this.selectedForm.forEach(p => {
        arr.push(p.bookId);
      });
      let formPageSize = this.tableConfig.pagination.pageSize; //默认每页数量
      if (localStorage.getItem("preciseReleasePageSize")) {
        formPageSize = parseInt(localStorage.getItem("preciseReleasePageSize")); //根据缓存更新每页数量
      }

      let publishFlag =
        this.structureSelect == "all"
          ? ""
          : this.structureSelect == "failure"
          ? "false"
          : "true";
      let formulaFlag =
        this.formulaSelect == "all"
          ? ""
          : this.formulaSelect == "failure"
          ? "false"
          : "true";

      let obj = {
        bookIds: arr,
        pageDimFilter: this.filterDimension,
        publishFlag: publishFlag,
        formulaFlag: formulaFlag,
        pageNum: 1,
        pageSize: formPageSize
      };

      DsUtils.post(`${api.getSearchList}`, obj)
        .then(res => {
          if (res.data.success) {
            let data = res.data.data;
            // let total = data.sheetInfos.length;
            // this.tableConfig.pagination.total = total;

            // console.log(data);
            //根据total 创建一个长度为total的数组 用于分页
            let arrData = [];

            data.sheetInfos.forEach(p => {
              //布尔值转为字符串
              //且结构和失效要置反
              let sheetPublishFlag = p.publishFlag == true ? "false" : "true";
              let sheetFormulaFlag = p.formulaFlag == true ? "false" : "true";
              let sheetToDeleteFlag = p.toDeleteFlag == true ? "true" : "false";

              let arrobj = {
                key: p.sheetId,
                bookId: p.bookId,
                sheetId: p.sheetId,
                bookName: p.bookName,
                dimension: p.pageDimName,
                structureSign: sheetPublishFlag,
                formulaSign: sheetFormulaFlag,
                deleteSign: sheetToDeleteFlag
              };
              arrData.push(arrobj);
            });

            //在这里
            //遍历this.tableConfig.dataSource
            //如果勾选,则去arrData里找相同sheetId的数据
            //修改this.tableConfig.dataSource
            //找不到,则删除这条数据

            this.tableConfig.dataSource.forEach(p => {
              if (this.isChecked[p.sheetId]) {
                let flag = false;
                arrData.forEach(q => {
                  if (q.sheetId == p.sheetId) {
                    //修改this.tableConfig.dataSource中的这条数据
                    flag = true;
                  }
                });

                //如果没找到 则删除this.tableConfig.dataSource中的这条数据
                if (!flag) {
                }
              }
            });
          } else {
            UiUtils.errorMessage(res.data.message);
          }
        })
        .catch(err => {
          UiUtils.errorMessage("error");
          console.log(err);
        })
        .finally(() => {
          this.dataPanelSkeleton.loading = false;
        });
    },
    structuralFailure() {
      //对被选中的数据的 structureSign 置反
      this.tableConfig.dataSource.forEach((p, index) => {
        if (this.isChecked[p.sheetId]) {
          if (p.structureSign == "true") {
            this.$set(
              this.tableConfig.dataSource[index],
              "structureSign",
              "false"
            );
          } else {
            this.$set(
              this.tableConfig.dataSource[index],
              "structureSign",
              "true"
            );
            //如果结构失效 公式也要一起失效
            this.$set(
              this.tableConfig.dataSource[index],
              "formulaSign",
              "true"
            );
          }
        }
      });
    },
    formulaFailure() {
      this.tableConfig.dataSource.forEach((p, index) => {
        if (this.isChecked[p.sheetId]) {
          if (p.formulaSign == "true") {
            this.$set(
              this.tableConfig.dataSource[index],
              "formulaSign",
              "false"
            );
            //如果公式不再失效 结构也不再失效
            this.$set(
              this.tableConfig.dataSource[index],
              "structureSign",
              "false"
            );
          } else {
            this.$set(
              this.tableConfig.dataSource[index],
              "formulaSign",
              "true"
            );
          }
        }
      });
    },
    deleteOperation() {
      this.tableConfig.dataSource.forEach((p, index) => {
        if (this.isChecked[p.sheetId]) {
          if (p.deleteSign == "true") {
            this.$set(
              this.tableConfig.dataSource[index],
              "deleteSign",
              "false"
            );
          } else {
            this.$set(this.tableConfig.dataSource[index], "deleteSign", "true");
          }
        }
      });
    },
    onChangeColumnsCheckbox(e, record) {
      // console.log(e, record);
    },
    //改变分页器触发
    onTableChange(info) {
      this.$set(this.tableConfig, "pagination", info.pagingInfo);
      localStorage.setItem(
        "preciseReleasePageSize",
        this.tableConfig.pagination.pageSize
      );

      //在这里 调用getSearchForm
      //直接调search吧?
      this.search(0);
    },
    //创建数据控制checkbox
    createIsChecked() {
      this.tableConfig.dataSource.forEach(p => {
        // 如果没有这条数据的checkbox状态记录 则创建
        if (Object.keys(this.isChecked).indexOf(p.sheetId) == -1) {
          //根据是否全选 决定状态
          if (this.isAllChecked) {
            this.$set(this.isChecked, `${p.sheetId}`, true);
          } else {
            this.$set(this.isChecked, `${p.sheetId}`, false);
          }
        }
      });
    },
    //创建标题的checkbox
    createTitleCheckbox() {
      //获取pagelist中标题最左的dom
      let title = document.querySelector("[key='sheetId']");
      let checkbox = document.querySelector(".allCheckbox");
      // console.log(title);
      checkbox.style.left = title.getBoundingClientRect().width / 2 - 8 + "px";
      checkbox.style.top =
        title.getBoundingClientRect().height / 2 - 8 - 2 + "px";
      //再计算display,计算差额

      this.isShowTitleCheckbox = true;
    },
    //全选
    onChangeAllCheckbox(e) {
      if (e) {
        for (let key in this.isChecked) {
          this.isChecked[key] = true;
        }
      } else {
        for (let key in this.isChecked) {
          this.isChecked[key] = false;
        }
      }
    },
    setPageSize() {
      if (localStorage.getItem("preciseReleasePageSize")) {
        this.tableConfig.pagination.pageSize = parseInt(
          localStorage.getItem("preciseReleasePageSize")
        );
      } else {
        localStorage.setItem(
          "preciseReleasePageSize",
          this.tableConfig.pagination.pageSize
        );
      }
    },
    //搜索表单
    onSearchForm() {
      DsUtils.get(`${api.getSearchForm}?formName=${this.formName}`)
        .then(res => {
          if (res.data.success) {
            this.searchFormData = res.data.data;
            if (res.data.data.length == 0) {
              UiUtils.infoMessage("无对应表单");
              //无数据 不打开modal
            } else {
              this.visible = true;
            }
          } else {
            UiUtils.errorMessage(res.data.message);
          }
        })
        .catch(err => {
          UiUtils.errorMessage("请求错误");
          console.log(err);
        });
    },
    //取消tags
    cancelSelection(p) {
      this.$nextTick(() => {
        let formIndex = null;
        this.selectedForm.forEach((q, index) => {
          if (p.bookId == q.bookId) {
            formIndex = index;
          }
        });
        this.selectedForm.splice(formIndex, 1);
        // this.selectedForm.splice(this.selectedForm.indexOf(p), 1);
        //这里p是对象 也可以用indexOf吗
        //此处可以 地址是相同的?
      });
    },
    //确认本次选择的表单
    handleOk() {
      this.visible = false;
      //将搜索中选中的表push进总数据里
      let arr = [];
      this.preSelectedForm.forEach(p => {
        let flag = this.selectedForm.some(q => {
          return p.bookId == q.bookId;
        });
        if (!flag) {
          arr.push(p);
        }
      });
      this.selectedForm.push(...arr);
    },
    //选择表单
    onRowSelect(selectData, index) {
      let arr = [];
      selectData.forEach(p => {
        arr.push(p);
      });

      this.preSelectedForm = arr;
    },
    //list提供的全选
    setSelectAll() {
      this.selectAll = !this.selectAll;
      this.$refs.list.setSelectAll(this.selectAll);
    },
    //清空勾选
    clearChecked() {
      this.isAllChecked = false
      Object.keys(this.isChecked).forEach(p => {
        this.isChecked[p] = false
      })
    },
    //在返回数据后 需要做的一些操作
    init() {
      this.createTitleCheckbox();
      this.createIsChecked();
      this.setPageSize();
    }
  },
  mounted() {}
};
</script>
<style>
.box {
  height: 100%;
  overflow: hidden;
  /* 解决塌陷 */
}

.container {
  width: 100%;
  position: relative;

  height: 100%;
  display: flex;
  flex-direction: column;
}

.search,
.operation {
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 20px;
}

.search > * {
  margin-right: 20px;
}

.operation > * {
  margin-right: 20px;
}

.searchedTags {
  border-left: 20px solid white;
  border-right: 20px solid white;
  margin-top: 20px;
  height: 58px;
  overflow: auto;
}

.ant-tag {
  margin-top: 3px;
}

.display {
  margin-top: 20px;
  position: relative;
  height: 500px;
  flex: 1;
}

.input {
  width: 350px;
  display: flex;
}

/* 对input设置display:flex无效,无法覆盖原本的inline-block 需要!important*/
.ant-input-affix-wrapper {
  display: flex !important;
  align-items: center !important;
}

span {
  white-space: nowrap;
}

.searchLabel {
  line-height: 32px;
  margin-right: 5px;
}

.allCheckbox {
  position: absolute;
  z-index: 999;
}

.searchIcon {
  cursor: pointer;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
}

.searchIcon:hover {
  background-color: rgb(245, 247, 250);
}

.selectFormModal .ant-modal-body {
  height: 400px;
}

.ant-list-header {
  padding-left: 8px !important;
}

/* loading样式 */
.ant-skeleton {
  height: 100%;
}
/* .loading{
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -31px;
  margin-top: -16px;
} */

.ant-spin-nested-loading {
  height: 100%;
}

.ant-spin-container {
  height: 100%;
}

.ypl-data-panel {
  padding-left: 0 !important;
  padding-right: 0 !important;
  padding-top: 0 !important;
}
</style>
