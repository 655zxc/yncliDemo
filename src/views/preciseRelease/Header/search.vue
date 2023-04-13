<template>
  <div>
    <div class="tfContainer">
      <div class="tfSearchForm">
        <div style="width:80px">搜索表单:</div>
        <div class="menu-search" ref="menuSearch">
          <yn-input-search
            v-model="formName"
            realTimely
            placeholder="请输入表单名称"
            @change="onSearchForm('inputSearch')"
            @focus="onSearchForm"
            style="width:300px;margin-left:0px;margin-right:20px;"
          />
          <div v-show="showDropdown" class="menu-search-dropdown">
            <div>
              <div
                v-for="(p, index) in searchFormData"
                :key="p.bookId"
                class="menu-search-item"
                @click="onSelectForm(p)"
              >
                <span @click.stop="" style="margin-right:5px;">
                  <yn-checkbox
                    @change="onChange(p)"
                    v-model="isFormChecked[p.bookId]"
                  ></yn-checkbox>
                </span>
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
      </div>
      <yn-button @click="formGroup" style="margin-right:20px;" type="primary"
        >按分组添加表单</yn-button
      >
      <div class="tfFilterDimension">
        <div style="width:80px">搜索筛选维:</div>
        <div class="menu-search-filter" ref="menuSearchFilter">
          <yn-input-search
            v-model="dimensionName"
            realTimely
            placeholder="请输入筛选维名称"
            @change="onSearchDimension('inputSearch')"
            @focus="onSearchDimension"
            style="width:300px;margin-left:0px;margin-right:20px;"
          />
          <div
            v-show="showDimensionDropdown"
            class="menu-search-filter-dropdown"
          >
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
      <yn-button type="primary" @click="search">查询</yn-button>
      <!-- <div class="routerButton" style="margin-left: auto;">
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
        <yn-button
          @click="$router.push('/journal', () => {})"
          style="margin-left:8px"
          >日志下载</yn-button
        > 
      </div> -->
    </div>

    <div class="searchedTags">
      <span>选择的表单:</span>
      <yn-button
        type="text"
        v-show="formChecked.length != 0"
        @click="clearSelectedForm"
        style="height:26px;margin-right: 5px;margin-left: 5px;"
        >清除所有已选择表单</yn-button
      >
      <yn-tag
        closable
        v-for="p in formChecked"
        :key="p.bookId"
        @close="cancelSelection(p)"
        color="geekblue"
        >{{ p.bookName }}</yn-tag
      >
    </div>

    <yn-modal
      v-model="formGroupVisible"
      width="1300"
      class="selectGroup"
      @ok="addFormGroup"
    >
      <selectGroup ref="selectGroup" />
    </yn-modal>
  </div>
</template>
<script>
import "yn-p1/libs/components/yn-tree/";
import "yn-p1/libs/components/yn-tree-node/";
import "yn-p1/libs/components/yn-directory-tree/";
import DsUtils from "yn-p1/libs/utils/DsUtils";
import UiUtils from "yn-p1/libs/utils/UiUtils";
import api from "../../../api/api";
import selectGroup from "../selectGroup/index.vue";
export default {
  name: "search",
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

      isFormChecked: {}, //统计表单是否被选中
      formChecked: [], //统计已选中的表单的信息
      formGroupVisible: false
    };
  },
  components: {
    selectGroup
  },
  methods: {
    formGroup() {
      if (this.$refs.selectGroup) {
        // this.$refs.selectGroup.createIsChecked()
        //没点开selectGroup是没有这个组件的,要点开一次后才有
      }
      this.formGroupVisible = true;
    },
    //添加 表单分组 中的表单
    addFormGroup() {
      this.formGroupVisible = false;

      let data = this.$refs.selectGroup.isChecked;
      let arr = []; //装需要push的表单

      for (let i in data) {
        if (data[i][0]) {
          let flag = false;
          this.formChecked.forEach(p => {
            if (p.bookId == data[i][2]) {
              flag = true;
            }
            //检查有没有这个表单
          });
          if (!flag) {
            //没有则push 进formChecked
            arr.push({
              bookId: data[i][2],
              bookName: data[i][1]
            });
            //并且设置isFormChecked
            this.$set(this.isFormChecked, data[i][2], true);
          }
        }
      }

      // 去重
      let arr2 = [];
      let obj2 = {};
      arr.forEach(p => {
        if (!obj2[p.bookId]) {
          arr2.push(p);
          obj2[p.bookId] = true;
        }
      });
      this.formChecked.push(...arr2);
    },
    search() {
      //传递选择表单筛选维参数
      //调用父组件的查询
      //   console.log(this.formChecked,this.dimensionName);

      this.$emit("subSearch", this.formChecked, this.dimensionName);
    },
    //清除已选择表单
    clearSelectedForm() {
      this.isFormChecked = {};
      let _this = this;
      UiUtils.confirm({
        title: "确定要清除已选择表单?",
        onOk() {
          _this.formChecked = [];
        },
        onCancel() {},
        class: "test"
      });
    },
    //取消tags
    cancelSelection(p) {
      this.$nextTick(() => {
        this.DimensionPage.current = 1;
        let formIndex = null;
        this.formChecked.forEach((q, index) => {
          if (p.bookId == q.bookId) {
            formIndex = index;
          }
        });
        this.formChecked.splice(formIndex, 1);

        this.isFormChecked[p.bookId] = false;
      });
    },
    //统计已选择表单数据 点击item或checkbox会触发
    changeChecked(p) {
      this.DimensionPage.current = 1;
      this.$set(this.formChecked, p.bookId, p);
      //   console.log(this.isFormChecked[p.bookId]); //是否被选中
      if (this.isFormChecked[p.bookId]) {
        //选中
        //   this.$set(this.formChecked, p.bookId, p);
        this.formChecked.push(p);
      } else {
        //未选中
        // this.$delete(this.formChecked, p.bookId);
        let index = 0;
        for (let i = 0; i < this.formChecked.length; i++) {
          if (this.formChecked[i].bookId == p.bookId) {
            index = i;
            break;
          }
        }
        this.formChecked.splice(index, 1);
      }
    },
    //点击checkbox
    onChange(p) {
      //   console.log("触发checkbox");
      this.changeChecked(p);
    },
    //搜索表单 (聚焦,输入,跳页时触发)
    async onSearchForm(flag) {
      //清空筛选维
      if (flag == "inputSearch") {
        //搜索时跳到第一页
        this.searchPage.current = 1;
      }

      DsUtils.get(
        `${api.getSearchForm}?formName=${this.formName}&pageNum=${this.searchPage.current}&pageSize=${this.searchPage.pageSize}`
      )
        .then(res => {
          //   console.log(res);
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
          //   console.log(err);
        });
    },
    //选择表单
    onSelectForm(p) {
      //清空筛选维
      //   console.log("触发item");

      this.$set(this.isFormChecked, p.bookId, !this.isFormChecked[p.bookId]);
      this.changeChecked(p);
    },
    //搜索筛选维 (聚焦,输入,跳页时触发)
    async onSearchDimension(flag) {
      if (flag == "inputSearch") {
        //搜索时跳到第一页
        this.DimensionPage.current = 1;
      }
      let arr = [];
      this.formChecked.forEach(p => {
        arr.push(p.bookId);
      });
      let obj = {
        bookIds: arr,
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
      this.dimensionName = p;
      this.showDimensionDropdown = false;
    }
  },
  mounted() {
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
.ant-divider-horizontal {
  margin: 0.25rem 0;
}
.ant-pagination {
  float: right;
}
.searchedTags {
  border-left: 20px solid white;
  border-right: 20px solid white;
  margin-top: 20px;
  height: 58px;
  overflow: auto;
}

.tfSearchForm,
.tfFilterDimension,
.routerButton {
  display: flex;
  align-items: center;
}
.tfContainer {
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 20px;
  display: flex;
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

.selectGroup ::v-deep .ant-modal-body {
  height: 600px;
}
</style>
