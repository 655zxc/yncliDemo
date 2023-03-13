<template>
  <div class="tfContainer">
    <div class="tfSearchForm">
      <div style="width:100px">搜索表单:</div>
      <div class="menu-search" ref="menuSearch">
        <yn-input-search
          v-model="formName"
          realTimely
          placeholder="请输入表单名称"
          @change="onSearchForm('inputSearch')"
          @focus="onSearchForm"
          style="width:700px;margin-left:0px;margin-right:20px;"
        /> 
        <span>已选择表单:{{ selectedForm.bookName }}</span> 
        <div v-show="showDropdown" class="menu-search-dropdown">
          <div>
            <div
              v-for="(p, index) in searchFormData"
              :key="p.bookId"
              class="menu-search-item"
              @click="onSelectForm(p)"
            >
              {{ p.bookName }}
            </div>
          </div>
          <yn-divider /> 
          <yn-pagination
            v-model="searchPage.current"
            showQuickJumper
            :total="searchPage.total"
            :pageSize="searchPage.pageSize"
            @change="onSearchForm"
            :showTotal="total => '总计' + total + ' 条'"
          >
          </yn-pagination>
        </div>
      </div>

      <div style="margin-left: auto;">
        <yn-button
          @click="$router.push('/preciseRelease', () => {})"
          style="margin-left:8px"
          >精准发布</yn-button
        >
        <yn-button
          @click="$router.push('/formTag', () => {})"
          style="margin-left:8px"
          >表单分组</yn-button
        >
        <yn-button
          @click="$router.push('/trackingFormula', () => {})"
          style="margin-left:8px"
          >公式追踪</yn-button
        >
      </div>
    </div>
    <div class="tfFilterDimension">
      <div style="width:100px">搜索筛选维:</div>
      <div class="menu-search-filter" ref="menuSearchFilter">
        <yn-input-search
          v-model="dimensionName"
          realTimely
          placeholder="请输入筛选维名称"
          @change="onSearchDimension('inputSearch')"
          @focus="onSearchDimension"
          style="width:700px;margin-left:0px;margin-right:20px;"
        />  
        <span>已选择筛选维:{{ selectedDim }}</span> 
        <div v-show="showDimensionDropdown" class="menu-search-filter-dropdown">
          <div>
            <div
              v-for="(p, index) in searchDimensionData"
              :key="index"
              class="menu-search-filter-item"
              @click="onSelectDimension(p)"
            >
              {{ p }}
            </div>
          </div>
          <yn-divider />  
          <yn-pagination
            v-model="DimensionPage.current"
            showQuickJumper
            :total="DimensionPage.total"
            :pageSize="DimensionPage.pageSize"
            @change="onSearchDimension"
            :showTotal="total => '总计' + total + ' 条'"
          >
          </yn-pagination>
        </div>
      </div>
    </div>
    <div class="tfSearchFormula">
      <div style="width:100px">公式:</div>
      <yn-input
        v-model="formula"
        @pressEnter="search"
        placeholder="请输入公式,回车查询" 
        style="width:700px;margin-left:0px;margin-right:20px;"
      >
        <yn-icon-svg
          size="large"
          slot="suffix"
          type="search"
          @click="search"
          class="searchIcon"
        />
      </yn-input>
      = {{ formulaResult }}
    </div>
    <div class="tfSpin">
      <yn-table
        :columns="treeColumns"
        :dataSource="treeTableData"
        :loadData="treeLoadData"
        :key="treeKey + 'tree'"
        class="treeTable"
        :loading="spinning"
        :bordered="true"
      >
        <span
          slot="reference"
          slot-scope="text, record"
          :style="record.traced ? (record.result==record.calcResult?'':'color:red;') : 'color: rgb(188,193,204);'"
        >
          {{ text }} 
        </span>
        <!-- <span
          slot="multiReference"
          slot-scope="text, record"
          :style="record.traced ? (record.result==record.calcResult?'':'color:red;') : 'color: rgb(188,193,204);'"
        >
          {{ text }} 
        </span>
        <span 
          slot="form"
          slot-scope="text, record"
          :style="record.traced ? (record.result==record.calcResult?'':'color:red;') : 'color: rgb(188,193,204);'"
        >
          {{ text }} 
        </span> -->
        <span
          slot="formula"
          slot-scope="text, record"
          :style="record.traced ? (record.result==record.calcResult?'':'color:red;') : 'color: rgb(188,193,204);'"
        >
          {{ text }}
        </span>
        <span
          slot="result"
          slot-scope="text, record"
          :style="record.traced ? (record.result==record.calcResult?'':'color:red;') : 'color: rgb(188,193,204);'"
        >
          {{ text }}
        </span>
        <span
          slot="calcResult" 
          slot-scope="text, record"
          :style="record.traced ? (record.result==record.calcResult?'':'color:red;') : 'color: rgb(188,193,204);'"
        >
          {{ text }}
        </span>
      </yn-table>
    </div>
  </div>
</template>
<script>
import "yn-p1/libs/components/yn-tree/";
import "yn-p1/libs/components/yn-tree-node/";
import "yn-p1/libs/components/yn-directory-tree/";
import DsUtils from "yn-p1/libs/utils/DsUtils";
import UiUtils from "yn-p1/libs/utils/UiUtils";
import api from "../../api/api.js"; 
export default {
  name: "trackingFormula",
  data() {
    return {
      //表单和筛选维的分页
      searchPage: {
        current: 1,
        total: 50,
        pageSize: 5,
        pageSizeOptions: ["5", "10", "20", "30", "50", "100"]
      },
      DimensionPage: {
        current: 1,
        total: 50,
        pageSize: 5,
        pageSizeOptions: ["5", "10", "20", "30", "50", "100"]
      },
      //表单和筛选维下拉框的显示
      showDimensionDropdown: false,
      showDropdown: false,
      //表单和筛选维下拉框的数据
      searchFormData: [],
      searchDimensionData: [],
      //表单和筛选维的输入框的内容
      formName: "",
      dimensionName: "",
      //已选择的表单和筛选维
      selectedForm: {
        bookId: "",
        bookName: ""
      },
      selectedDim:"",
      //根据表单,筛选维查到的sheet
      selectedSheet: {},

      //其它
      treeColumns: [
        {
          title: "引用",
          dataIndex: "reference",
          key: "reference",
          scopedSlots: {
            customRender: "reference"
          },
          width: "24%"
        },
        // {
        //   title: "多维引用",
        //   dataIndex: "multiReference",
        //   key: "multiReference",
        //   scopedSlots: {
        //     customRender: "multiReference"
        //   },
        //   width: "10%"
        // },
        // {
        //   title: "所属表单",
        //   dataIndex: "form",
        //   key: "form",
        //   scopedSlots: {
        //     customRender: "form"
        //   },
        //   width: "10%" 
        // },
        {
          title: "公式",
          dataIndex: "formula",
          key: "formula",
          scopedSlots: {
            customRender: "formula"
          },
          width: "60%"  
        },
        {
          title: "缓存值",
          dataIndex: "result",
          key: "result",
          scopedSlots: {
            customRender: "result"
          },
          width: "8%"
        },
        {
          title: "计算值",
          dataIndex: "calcResult",
          key: "calcResult",
          scopedSlots: {
            customRender: "calcResult"
          },
          width: "8%"
        }
      ],
      treeTableData: [],
      taskId: "",
      formulaResult: "",
      formula: "",
      spinning: false,
      treeKey: "12345",
      rowSelection: {
        type: "radio"
      }
    };
  },
  methods: {
    //搜索表单 (聚焦,输入,跳页时触发)
    async onSearchForm(flag) {
      //清空筛选维
      if (flag == "inputSearch") {
        //搜索时跳到第一页
        this.searchPage.current = 1;
        this.dimensionName = "";
      }

      DsUtils.get(
        `${api.getSearchForm}?formName=${this.formName}&pageNum=${this.searchPage.current}&pageSize=${this.searchPage.pageSize}`
      )
        .then(res => {
          // console.log(res);
          if (res.data.success) {
            // console.log(res);
            this.searchFormData = res.data.data.bookInfos;
            this.searchPage.total = res.data.data.total;
            this.showDropdown = true;
          } else {
            UiUtils.errorMessage(res.data.message);
            this.showDropdown = true;
          }
        })
        .catch(err => {
          UiUtils.errorMessage("请求错误");
          // console.log(err);
        });
    },
    //选择表单
    onSelectForm(p) {
      //清空筛选维
      // this.dimensionName = ""; 
      // console.log(p);
      this.selectedForm = p;
      this.formName = p.bookName;
      this.showDropdown = false;  
    },
    //搜索筛选维 (聚焦,输入,跳页时触发)
    async onSearchDimension(flag) {
      if (flag == "inputSearch") {
        //搜索时跳到第一页
        this.DimensionPage.current = 1;
      }
      if (this.formName == "") {
        UiUtils.errorMessage("请先选择表单");
        return;
      }
      let obj = {
        bookIds: [this.selectedForm.bookId],
        pageDimFilter: this.dimensionName,
        pageNum: this.DimensionPage.current,
        pageSize: this.DimensionPage.pageSize
      };

      let res = await api.searchPageDim(obj);
      res = res.data.data;

      this.DimensionPage.total = res.total;
      this.searchDimensionData = res.pageDims;
      this.showDimensionDropdown = true;
    },
    //选择筛选维
    onSelectDimension(p) {
      this.selectedDim = p; 
      this.dimensionName = p
      this.showDimensionDropdown = false;
      //得到表单和筛选维，接下来进行查询
      //点击时才执行
      let obj = {
        bookIds: [this.selectedForm.bookId],
        pageDimFilter: this.selectedDim,
        precisePublish: "",
        publishFlag: "",
        formulaFlag: "",
        calcFlag: "",
        toDeleteFlag: "",
        pageNum: 1,
        pageSize: 500
      };

      DsUtils.post(`${api.getSearchList}`, obj).then(res => {
        if (res.data.success) {
          // console.log(res);
          // this.selectedSheet = res.data.data.sheetInfos[0];
          res.data.data.sheetInfos.forEach(p => {
            if (p.pageDimName == this.dimensionName) {
              this.selectedSheet = p
            }
          })


        } else {
          UiUtils.errorMessage(res.data.message);
        }
      });
    },
    //搜索追踪公式
    async search() {
      if (this.selectedForm.bookName == "") {
        UiUtils.errorMessage("请先选择表单");
        return;
      }
      if (this.selectedDim == "") {
        UiUtils.errorMessage("请先选择筛选维");
        return;
      }
      if (this.formula == "") {
        UiUtils.errorMessage("请先输入公式");
        return;
      }

      this.treeKey = new Date().getTime();
      this.spinning = true;
      this.treeTableData = [];

      // console.log(this.selectedSheet.sheetId, this.formula);

      try {
        let res = await api.getFormulaTrace(
          this.selectedSheet.sheetId,
          this.formula
        );

        res = res.data.data;

        this.taskId = res.taskId;
        this.formulaResult = res.result;
        let treeTableArr = [];
        res.itemList.forEach(p => {
          //给treeTable设置数据
          let treeTableObj = {
            key: p.location,
            reference: p.reference,
            multiReference: "test", 
            form:"test",
            formula: p.formula,
            result: p.value,
            parentKey: [p.location],
            traced: p.traced, 
            calcResult: p.calcValue  
          };
          if (p.hasChild) {
            treeTableObj.children = [];
          }
          treeTableArr.push(treeTableObj);
        });
        this.treeTableData = treeTableArr;
 
        UiUtils.successMessage("查询完成");
        this.spinning = false;
      } catch (err) {
        console.log(err);
        this.spinning = false;
      }
    },
    //加载树
    treeLoadData(treeNode) {
      // console.log(this.taskId, treeNode.parentKey);
      //treeNode.data.parentKey是[展开]节点的路径
      //注意和添加表单的[点击]获取节点路段不同
      return new Promise(async resolve => {
        //如果已经加载孩子了 则不需要再加载
        // if (treeNode.dataRef.children) {
        //   resolve();
        //   return;
        // }
        //否则在这里根据this.taskId, treeNode.dataRef.parentKey请求数据
        let obj = {
          taskId: this.taskId,
          tracePath: treeNode.parentKey
        };
        let res = await api.expandFormulaTrace(obj);
        res = res.data.data;
        let treeTableArr = [];
        res.itemList.forEach(p => {
          let treeTableObj = {
            key: p.location + [...treeNode.parentKey],
            reference: p.reference,
            multiReference: "test",
            form:"test", 
            formula: p.formula,
            result: p.value,
            traced: p.traced,
            parentKey: [...treeNode.parentKey, p.location],
            calcResult: p.calcValue 
          };
          // console.log(treeTableObj);
          if (p.hasChild) {
            treeTableObj.children = [];
          }
          treeTableArr.push(treeTableObj);
        });
        resolve({
          hasMore: false,
          data: treeTableArr
        });
      });
    }
  },
  mounted() {
    //挂载点击事件,关闭下拉框
    window.onclick = e => {
      if (this.$refs.menuSearch && !this.$refs.menuSearch.contains(e.target)) {
        this.showDropdown = false; 
      }
      if (
        this.$refs.menuSearchFilter &&
        !this.$refs.menuSearchFilter.contains(e.target)
      ) {
        this.showDimensionDropdown = false;
      }
    };
  }
};
</script>

<style scoped>
.ant-divider-horizontal{
    margin: 0.25rem 0;
}  
.ant-pagination{
  float: right;
}
.menu-search-item:hover,
.menu-search-filter-item:hover {
  background: #f0f4fe;
}

.menu-search-dropdown,
.menu-search-filter-dropdown {
  width: 700px;
  /* height: 400px; */
  position: absolute;
  z-index: 99;
  overflow: scroll;
  background-color: white;
  box-shadow: 0 2px 5rem 0 rgba(22, 24, 35, 0.2);
  border-radius: 5px;
  padding: 10px;
}

.menu-search-dropdown .ant-pagination,
.menu-search-filter-dropdown .ant-pagination {
  margin-top: 10px;
}

.menu-search-item,
.menu-search-filter-item {
  line-height: 40px;
  height: 40px;
  cursor: pointer;
  padding: 0 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 5px;
}
.tfBox {
  display: flex;
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

.tfContainer {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;

  /* 缩放至75%,并调整位置 */
  transform: scale(0.75);
  width: 133%;
  transform-origin: 0 0;
  position: absolute;
}

.tfSpin {
  /* flex: 1; */
  /* height: 100%; */
  position: relative;
  height: 200px;
  flex: 1;
}

.tfBox .separateBox {
  width: 100px;
}

.tfSearchForm,
.tfFilterDimension,
.tfSearchFormula {
  display: flex;
  line-height: 32px;
}

.tfFilterDimension,
.tfSearchFormula,
.tfSpin {
  margin-top: 20px;
}

.selectFormDataModal ::v-deep .ant-modal-body {
  height: 550px;
}
</style>
