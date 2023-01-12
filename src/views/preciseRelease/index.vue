<template>
  <div class="box">
    <div class="container">
      <div class="search">
        <div class="input">
          <span class="searchLabel">表单名称:</span>
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
        <yn-checkbox @change="onChangeStructure" v-model="structureCheckbox"
          >结构失效</yn-checkbox
        >
        <yn-checkbox @change="onChangeFormula" v-model="formulaCheckbox"
          >公式失效</yn-checkbox
        >
        <yn-button type="primary" @click="search">查询</yn-button>
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
        <yn-button type="primary" @click="buildCache">构建缓存</yn-button>
        <yn-button type="primary" @click="detectDifferences"
          >检测差异</yn-button
        >
        <yn-button type="primary" @click="release">发布</yn-button>
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
          :checked="isAllChecked"
          class="allCheckbox"
          v-show="isShowTitleCheckbox"
        ></yn-checkbox>
        <yn-page-list
          :tableConfig="tableConfig"
          rowKey="name"
          @table_change="onTableChange"
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
      <yn-modal title="选择表单" v-model="visible" @ok="handleOk">
        <yn-list itemLayout="horizontal" :dataSource="searchFormData" rowKey="bookId" @rowSelectChange="onRowSelect" :rowSelection="true">
          <yn-list-item slot="renderItem" slot-scope="item, index">
            <yn-list-item-meta
            >
              <span slot="title">{{ item.bookName }}</span>
            </yn-list-item-meta>
          </yn-list-item>
        </yn-list>
      </yn-modal>
    </div>
  </div>
</template>
<script>
import "yn-p1/libs/components/yn-page-list/";
import "yn-p1/libs/components/yn-list/";
import "yn-p1/libs/components/yn-list-item/";
import "yn-p1/libs/components/yn-list-item-meta/";
import DsUtils from "yn-p1/libs/utils/DsUtils";
import UiUtils from "yn-p1/libs/utils/UiUtils";
import api from "./js/api"
export default {
  name: "preciseRelease",
  data() {
    return {
      formName: "",
      filterDimension: "",
      structureCheckbox: false,
      formulaCheckbox: false,
      isShowTitleCheckbox: false,
      //list数据源
      tableConfig: {
        columns: [],
        dataSource: [],
        pagination: {}
      },
      //判断每一项是否被选中
      isChecked: {},
      //仅在本次搜索中选择的表单
      preSelectedForm: [],
      //所有选择的表单
      selectedForm: [],
      visible: false,
      searchFormData: [],
      
    };
  },
  computed: {
    isAllChecked() {
      //isAllChecked 一开始必须是false 否则会有闪烁效果 因为计算要时间?
      let result = false;
      let flag = true;
      for (let key in this.isChecked) {
        //发现有未选中的 则
        if (!this.isChecked[key]) {
          flag = false;
        }
        result = flag;
      }
      return result;
    }
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
    onChangeStructure() {},
    onChangeFormula() {},
    search() {
      //注意发送selectedForm不是formName



      
      let columns = [
        {
          title: "",
          dataIndex: "key", //这一列的数据来源与data中的key
          width: 100,
          align: "center",
          scopedSlots: {
            customRender: "firstCol" //这一列提供插槽,名为table.key
          }
        },
        {
          title: "表单名称",
          dataIndex: "name",
          width: 200
        },
        {
          title: "筛选维",
          dataIndex: "dimension",
          width: 200
        },
        {
          title: "结构失效",
          dataIndex: "structureSign",
          width: 100,
          align: "center",
          scopedSlots: {
            customRender: "structureSign"
          }
        },
        {
          title: "公式失效",
          dataIndex: "formulaSign",
          width: 100,
          align: "center",
          scopedSlots: {
            customRender: "formulaSign"
          }
        },
        {
          title: "删除标识",
          dataIndex: "deleteSign",
          width: 100,
          align: "center",
          scopedSlots: {
            customRender: "deleteSign"
          }
        }
      ];
      let data = [
        {
          //key用于checkbox列,这样选择时才知道选了哪个
          key: "key1",
          name: "表单1",
          dimension: "筛选维A",
          structureSign: "true",
          formulaSign: "false",
          deleteSign: "true"
        },
        {
          key: "key2",
          name: "表单2",
          dimension: "筛选维A",
          structureSign: "true",
          formulaSign: "false",
          deleteSign: "true"
        },
        {
          key: "key3",
          name: "表单3",
          dimension: "筛选维A",
          structureSign: "true",
          formulaSign: "false",
          deleteSign: "true"
        },
        {
          key: "key4",
          name: "表单4",
          dimension: "筛选维B",
          structureSign: "true",
          formulaSign: "false",
          deleteSign: "true"
        },
        {
          key: "key5",
          name: "表单5",
          dimension: "筛选维B",
          structureSign: "true",
          formulaSign: "false",
          deleteSign: "true"
        },
        {
          key: "key6",
          name: "表单6",
          dimension: "筛选维C",
          structureSign: "true",
          formulaSign: "false",
          deleteSign: "true"
        },
        {
          key: "key7",
          name: "表单7",
          dimension: "筛选维C",
          structureSign: "true",
          formulaSign: "false",
          deleteSign: "true"
        },
        {
          key: "key8",
          name: "表单8",
          dimension: "筛选维C",
          structureSign: "true",
          formulaSign: "false",
          deleteSign: "true"
        },
        {
          key: "key9",
          name: "表单9",
          dimension: "筛选维C",
          structureSign: "true",
          formulaSign: "false",
          deleteSign: "true"
        },
        {
          key: "key10",
          name: "表单10",
          dimension: "筛选维D",
          structureSign: "true",
          formulaSign: "false",
          deleteSign: "true"
        },
        {
          key: "key11",
          name: "表单11",
          dimension: "筛选维D",
          structureSign: "true",
          formulaSign: "false",
          deleteSign: "true"
        },
        {
          key: "key12",
          name: "表单12",
          dimension: "筛选维E",
          structureSign: "true",
          formulaSign: "false",
          deleteSign: "true"
        }
      ];
      let page = {
        current: 1,
        pageSize: 10, //这里会被init中的setPageSize修改
        showQuickJumper: true,
        total: 12,
        pageSizeOptions: ["5", "10", "20", "30", "40", "50"],
        showSizeChanger: true
      };
      setTimeout(() => {
        this.tableConfig.columns = columns;
        this.tableConfig.dataSource = data;
        this.tableConfig.pagination = page;
        this.$nextTick(() => {
          this.init();
        });
      }, 1000);
    },
    buildCache() {},
    detectDifferences() {
      //更新this.tableConfig.dataSource
    },
    release() {},
    structuralFailure() {
      //对被选中的数据的 structureSign 置反
      this.tableConfig.dataSource.forEach((p, index) => {
        if (this.isChecked[p.key]) {
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
          }
        }
      });
    },
    formulaFailure() {
      this.tableConfig.dataSource.forEach((p, index) => {
        if (this.isChecked[p.key]) {
          if (p.formulaSign == "true") {
            this.$set(
              this.tableConfig.dataSource[index],
              "formulaSign",
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
        if (this.isChecked[p.key]) {
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
    },
    //创建数据控制checkbox
    createIsChecked() {
      this.tableConfig.dataSource.forEach(p => {
        this.$set(this.isChecked, `${p.key}`, false);
      });
    },
    //创建标题的checkbox
    createTitleCheckbox() {
      //获取pagelist中标题最左的dom
      let title = document.querySelector(".resizable");
      let checkbox = document.querySelector(".allCheckbox");
      checkbox.style.left =
        title.getBoundingClientRect().width / 2 + 32 - 8 + "px";
      checkbox.style.top =
        title.getBoundingClientRect().height / 2 + 12 - 8 - 2 + "px";
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
      DsUtils.get(
          `${api.getSearchForm}?formName=${this.formName}`
      ).then(res => {
        if (res.data.success) {
          this.searchFormData = res.data.data
          if (res.data.data.length == 0) {
            UiUtils.infoMessage("无对应表单")
            //无数据 不打开modal
          }
          else {
            this.visible = true;
          }
        }
        else {
          UiUtils.errorMessage(res.data.message);
        }
      }).catch(err => {
        UiUtils.errorMessage("请求错误");
        console.log(err);
      })
    },
    //取消tags
    cancelSelection(name) {
      this.$nextTick(() => {
        this.selectedForm.splice(this.selectedForm.indexOf(name), 1);
      });
    },
    //确认本次选择的表单
    handleOk() {
      this.visible = false;
      //将搜索中选中的表push进总数据里
      let arr = []
      this.preSelectedForm.forEach(p => {
        let flag = this.selectedForm.some(q => {
          return p.bookId == q.bookId
        })
        if (!flag) {
          arr.push(p)
        }
      })
      this.selectedForm.push(...arr)
    },
    //选择表单
    onRowSelect(selectData, index) {
      let arr = []
      selectData.forEach(p => {
        arr.push(p)
      })

      this.preSelectedForm = arr
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
  padding-left: 160px;
  padding-right: 160px;
}

.container {
  width: 80%;
  /* height: 600px; */
  border: 1px solid rgb(215, 210, 209);
  margin: 0 auto;
  /* padding: 20px; */
  /* border-radius: 10px; */

  /* display: flex;
  flex-direction: column;
  justify-content: space-between; */
}

.search,
.operation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 20px;
}

.searchedTags {
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 20px;
}

.ant-tag {
  margin-top: 3px;
}

.display {
  margin-top: 20px;
  position: relative;
  height: 500px;
}

.input {
  width: 250px !important;
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
  margin-right: 15px;
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

.ant-modal-body{
  height:600px;
}
</style>
