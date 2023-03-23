<template>
  <div class="tree-list-demo">
    <yn-page-tree-list
      :treeConfig="treeConfig"
      :treePanelSkeleton="treePanelSkeleton"
      :treeTopSearchConfig="treeTopSearchConfig"
      :treeTopOptions="treeTopOptions"
      :tableConfig="tableConfig"
      :toolsConfig="toolsConfig"
      @tree_select="onSelect"
      @tree_expand="onExpand"
      :pageSkeleton="pageSkeleton"
      :dataPanelSkeleton="dataPanelSkeleton"
      class="pageTreeList"
    >
      <!-- @table_change="onTableChange" -->
      <div slot="treeTop.treeTopOptionsSlot">
        <yn-button type="primary" size="small" @click="onExpandorCollapse"
          >全部{{ expandorCollapse == "expand" ? "展开" : "折叠" }}</yn-button
        >
      </div>
      <template slot="table.checkbox" slot-scope="text, record">
        <div style="display:flex;align-items:center;height: 21px;">    
          <div @click.stop style="height:16px;width:16px;display:flex;align-items:center;justify-content:center;"> 
            <yn-checkbox 
              @change="onChange($event, record)"
              v-model="isChecked[text][0]"
            ></yn-checkbox>
          </div>
        </div>
      </template>
      <template slot="tools.radio">
        <yn-radio-group @change="onChangeRadio" v-model="radioValue">
          <yn-radio :value="1">本组及子组</yn-radio>
          <yn-radio :value="2">仅本组</yn-radio>
        </yn-radio-group>
        <span
          >已选择{{ totalDataNum }}条数据,共计{{ totalFormsNum }}条表单</span
        >
      </template>
    </yn-page-tree-list>
  </div>
</template>
<script>
import "yn-p1/libs/components/yn-radio-group/";
import "yn-p1/libs/components/yn-page-tree-list";
import "yn-p1/libs/components/yn-input";
import "yn-p1/libs/components/yn-button";
import "yn-p1/libs/components/yn-switch";
import "yn-p1/libs/components/yn-date-picker";
import "yn-p1/libs/components/yn-divider/";
import "yn-p1/libs/components/yn-row/";
import "yn-p1/libs/components/yn-col/";
import api from "../../../api/api";
import UiUtils from "yn-p1/libs/utils/UiUtils";

export default {
  data() {
    return {
      totalDataNum: 0,
      totalFormsNum: 0,
      radioValue: 2,
      selectedKeys: [],
      defaultSelectedKeys: [],
      expandorCollapse: "expand",
      expandedKeys: [], //展开的节点
      selectNodeKey: "",
      treePanelSkeleton: {
        loading: false
      },
      //这个配置可以设置标题 但是会强制添加一个搜素框 在css将其隐藏
      treeTopSearchConfig: {
        treeTitle: "表单分组选择",
        events: {
          // P1组件事件
          search(val) {
            // console.log(val);
            // that.onSearch(val);
            // that.method(); // 调用当前组件方法
          }
        },
        props: {
          placeholder: "input search text"
        }
      },
      treeTopOptions: [
        // 不隐藏的操作需要指定类型
        { slotName: "treeTopOptionsSlot" /*插槽name*/ }
      ],
      treeConfig: { 
        noFound: false, //不清楚
        treeData: [],
        defaultSelectedKeys: [],
        expandedKeys: [],
        // defaultExpandAll:true,
        // selectedKeys:[]
      }, 
      toolsConfig: {
        title: "",
        options: [
          [
            {
              slotName: "radio"
            }
          ]
        ]
      },
      tableConfig: {
        noFound: false,
        tableDraggable: true,
        // pagination: {
        //   // pagingInfo: { current: 1, pageSize: 20 },
        //   current: 1,
        //   pageSize: 20,
        //   showQuickJumper: true,
        //   total: 1,
        //   pageSizeOptions: ["10", "15", "20", "50", "100", "200"],
        //   showSizeChanger: true,
        //   showTotal: total => {
        //     return "总计" + total + "条数据";
        //   }
        // },
        columns: [
          {
            title: "勾选",
            dataIndex: "key",
            width: 50,
            scopedSlots: {
              customRender: "checkbox"
            }
          },
          {
            title: "所属分组",
            dataIndex: "group",
            width: 200
          },
          {
            title: "表单路径",
            width: 200,
            dataIndex: "path"
          },
          {
            title: "表单名称",
            width: 200,
            dataIndex: "name"
          }
        ],
        dataSource: []
      },
      pageSkeleton: {
        loading: false
      },
      dataPanelSkeleton: {
        loading: false
      },
      isChecked: {}
    };
  },
  watch: {
    //检测ischecked
    isChecked: {
      handler(newData, oldData) {
        console.log("改变了");
        let dataNum = 0;
        for (let i in this.isChecked) {
          if (this.isChecked[i][0]) {
            dataNum++;
          }
        }
        this.totalDataNum = dataNum;

        let obj = {};
        for (let i in this.isChecked) {
          if (!obj[this.isChecked[i][2]] && this.isChecked[i][0]) {
            this.$set(obj, this.isChecked[i][2], true);
          }
        }
        let formsNum = 0;
        for (let i in obj) {
          formsNum++;
        }

        this.totalFormsNum = formsNum;

        //遍历一次ischecked 提取出所有id 再进行去重,遍历一次,借助对象统计
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    onChangeRadio(e) {
      this.selectForms(e.target.value);
    },
    //为获取到的数据创建isChecked
    createIsChecked() {
      this.isChecked = {};
      this.tableConfig.dataSource.forEach(p => {
        this.$set(this.isChecked, p.key, [false, p.name, p.id]);
      });
    },
    //点击checkbox
    onChange(e, record) {
      // console.log(e, record);
    },
    //获取数据 应该在切换node,查询表单,分页器改变时调用
    //以及删除,添加表单后调用
    //获取数据 用于修改dataSource 以及 分页器
    //参数应该为 分页器数据 选择的节点 查询表单参数
    async getData(flag) {
      // console.log("发送请求");
      // let pageSize = this.tableConfig.pagination.pageSize;
      // let pageNum = this.tableConfig.pagination.current;

      let res = await api.getForm({
        targetId: this.selectNodeKey,
        // pageNum,
        // pageSize,
        searchByFormName: this.inputSearchForm,
        pageFlag: false
        //this.inputSearchForm只有在修改input内容 以及切换节点时会更改
      });
      res = res.data.data;
      let forms = [];
      res.groupForms.forEach(p => {
        forms.push({
          key: p.id,
          group: p.groupPath,
          inGroupCode: "",
          path: p.scenePath,
          name: p.formName,
          id: p.formId,
          action: "删除",
          tagId: p.tagId
        });
      });
      // this.tableConfig.pagination.total = res.total;
      this.tableConfig.dataSource = forms;
      this.createIsChecked(); //将ischecked的数据全部替换为当前请求数据,并设置为false
      if (flag) {
        this.selectForms(this.radioValue);
        //首次加载或点击节点时,选择本组表单
      }
    },
    //选择本组或本组及子组
    selectForms(flag) {
      if (flag == 2) {
        //选择本组
        this.radioValue = 2;
        this.tableConfig.dataSource.forEach(p => {
          if (p.tagId == this.selectNodeKey) {
            this.$set(this.isChecked[p.key], 0, true);
          } else {
            this.$set(this.isChecked[p.key], 0, false);
          }
        });
      } else if (flag == 1) {
        //选择本组及子组
        this.radioValue = 1;
        this.tableConfig.dataSource.forEach(p => {
          this.$set(this.isChecked[p.key], 0, true);
        });
      }
    },
    //点击节点
    async onSelect(selectedKeys, info) {
      // console.log("点击节点",selectedKeys, info);
      // this.tableConfig.pagination.current = 1;
      if (selectedKeys == "") {
        //如果取消选择节点
        return;
      }
      this.selectNodeKey = selectedKeys[0];
      // this.pageSkeleton.loading = true;
      await this.getData(true);
      // this.pageSkeleton.loading = false;
    },
    //展开节点
    onExpand(expandedKeys, nodeInfo) {
      // console.log(expandedKeys, nodeInfo);
      this.treeConfig.expandedKeys = expandedKeys;
    },
    //获取节点
    async getNode() {
      // 更新treeConfig的treeData
      // 修改treeConfig的defaultExpandedKeys,使其展开与上次相同
      // 不用了,展开节点默认保留
      let fun = function(obj) {
        //把数据处理成相同的格式;
        obj.forEach(item => {
          item.title = item.tagName;
          item.key = item.id;
          item.scopedSlots = {
            title: "custom"
          };
          if (item["children"] && item["children"].length > 0) {
            fun(item["children"]); //如果是多维数组 需要递归自调用
          }
        });
        return obj;
      };

      let res = await api.getGroupTree();
      if (res.data.success) {
        this.treeConfig.treeData = fun(res.data.data);
      } else {
        UiUtils.errorMessage(res.data.message);
      }
    },
    //改变分页
    async onTableChange(data) {
      let { current, pageSize } = data.pagingInfo;
      this.tableConfig.pagination.current = current;
      this.tableConfig.pagination.pageSize = pageSize;
      await this.getData();
    },
    //全部展开/折叠
    onExpandorCollapse() {
      this.treeConfig.expandedKeys = [];
      if (this.expandorCollapse == "expand") {
        //遍历treeData
        this.getAllNodeKey(this.treeConfig.treeData);
        this.expandorCollapse = "collapse";
      } else if (this.expandorCollapse == "collapse") {
        this.treeConfig.expandedKeys = [];
        this.expandorCollapse = "expand";
      }
    },
    //加载根数据,虽然可以设置默认选中node,但无法触发事件,需要手动加载根目录数据
    async getRootData() {
      this.selectNodeKey = this.treeConfig.treeData[0].key; //获取根节点
      await this.getData(true);
      this.treeConfig.defaultSelectedKeys.push(this.selectNodeKey);
    },
    //获取所有非叶node的key
    getAllNodeKey(arr) {
      arr.forEach(p => {
        if (p.children && p.children.length != 0) {
          this.treeConfig.expandedKeys.push(p.key);
          this.getAllNodeKey(p.children);
        }
      });
    },
    //table 行操作
    customRow(record, index) {
      return {
        style: {
          cursor: "pointer"
        },
        on: {
          click: event => {
            // console.log("点击了我", record, index, event);
            this.$set(
              this.isChecked[record.key],
              0,
              !this.isChecked[record.key][0]
            );
          }
        }
      };
    }
  },
  async mounted() {
    this.$set(this.tableConfig, "customRow", this.customRow);
    await this.getNode();
    await this.getRootData();
    this.onExpandorCollapse() 
  }
};
</script>
<style scoped>
::v-deep .yn-page-list-tools-options .btn-group {
  float: left;
}
.tree-list-demo {
  height: 100%;
}

::v-deep .yn-tree-menu-operate-wrapper .ynicon-button-search {
  display: none;
}

.pageTreeList .yn-page-tree-list-left .ynicon-button-search {
  display: none;
}

/* 下面是修改tree node的css */

/* 隐藏按钮 */
.tree-list-demo .ant-tree-title > span:first-child .ynicon-button-more {
  display: none;
  color: #1890ff;
}

/* hover时显示按钮 */
.tree-list-demo
  .ant-tree
  li
  .ant-tree-node-content-wrapper:hover
  .ynicon-button-more {
  display: inline-block;
}

/* 点击会改变li的class 因此可以选中点击行的按钮 并显示*/
.tree-list-demo
  .ant-tree
  li.ant-tree-treenode-selected
  span.ant-tree-node-selected
  .ynicon-button-more {
  display: inline-block;
}

/* 浮动 移动到最右边 */
.tree-list-demo span.ynicon-button.ant-dropdown-trigger {
  margin-top: 0.125rem;
  float: right;
}

.file-menu-type-icon {
  width: 0.875rem;
  margin-right: 0.3125rem;
}

.tree-list-demo ::v-deep .yn-flex-item-0 {
  width: 10px !important;
}

::v-deep
  .ant-tree-treenode-disabled
  .ant-tree-checkbox-disabled
  .ant-tree-checkbox-inner {
  display: none;
}

::v-deep .ant-tree-treenode-disabled .ant-tree-checkbox-disabled {
  width: 16px;
}
</style>
