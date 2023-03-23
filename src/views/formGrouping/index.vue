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
      @table_change="onTableChange"
      @tree_dragenter="onDragEnter"
      @tree_drop="onDrop"
      @tree_expand="onExpand"
      :pageSkeleton="pageSkeleton"
      :dataPanelSkeleton="dataPanelSkeleton"
      class="pageTreeList"
    >
      <div slot="treeTop.treeTopOptionsSlot">
        <!-- <yn-button @click="addGroupVisible = true" type="primary" size="small"
          >新建分组</yn-button
        > -->
        <yn-button type="primary" size="small" @click="onExpandorCollapse"
          >全部{{ expandorCollapse == "expand" ? "展开" : "折叠" }}</yn-button
        >
      </div>
      <!-- 插槽,每个node加个操作 -->
      <span slot="tree.custom" slot-scope="obj">
        <span v-if="showNodeOperate">
          {{ obj.title }}
          <yn-dropdown
            placement="bottomLeft"
            overlayClassName="tree-menu-dropdown"
            :trigger="['click']"
          >
            <yn-icon-button type="more" @click.stop size="small" />
            <yn-menu slot="overlay">
              <yn-menu-item
                v-for="item in nodeOperate"
                class="nodeOperate"
                :key="item.key"
                @click="handleNodeOperate(item, $event, obj)"
                :disabled="obj.parentId == 0 && item.key != 'addSon'"
              >
                {{ item.label }}
              </yn-menu-item>
            </yn-menu>
          </yn-dropdown>
        </span>
        <span v-else>
          {{ obj.title }}
        </span>
      </span>

      <template slot="tools.inputSlot">
        <yn-input
          placeholder="请输入表单名称"
          v-model="inputSearchForm"
          style="width:400px;"
          @pressEnter="searchForm"
        />
      </template>
      <template slot="tools.buttonSlot1">
        <yn-button @click="searchForm" type="primary">查询表单</yn-button>
        <yn-button
          @click="onClickAddForm"
          type="primary"
          style="margin-left:8px;margin-right:8px"
          >添加表单</yn-button
        >
      </template>

      <template slot="tools.dividerSlot">
        <yn-divider type="vertical" style="height:32px;" />
      </template>

      <template slot="tools.buttonSlot2">
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
      </template>

      <template slot="table.action" slot-scope="text, record">
        <a
          class="yn-a-link action-margin"
          href="javascript:;"
          @click="deleteForm(record)"
          >删除</a
        >
      </template>
    </yn-page-tree-list>
    <yn-modal v-model="addGroupVisible" title="新建分组" @ok="addGroup">
      <yn-row>
        <yn-col :span="4" style="line-height:32px">分组名称:</yn-col>
        <yn-col :span="20"><yn-input v-model="addGroupValue"/></yn-col>
      </yn-row>
    </yn-modal>
    <yn-modal v-model="renameVisible" title="重命名" @ok="renameNode">
      <yn-row>
        <yn-col :span="4" style="line-height:32px">组名:</yn-col>
        <yn-col :span="20"><yn-input v-model="renameValue"/></yn-col>
      </yn-row>
    </yn-modal>
    <yn-modal v-model="addSonVisible" title="新建子级分组" @ok="addSonNode">
      <yn-row>
        <yn-col :span="4" style="line-height:32px">组名:</yn-col>
        <yn-col :span="20"><yn-input v-model="addSonValue"/></yn-col>
      </yn-row>
    </yn-modal>
    <yn-modal
      v-model="addSiblingVisible"
      title="新建子级分组"
      @ok="addSiblingNode"
    >
      <yn-row>
        <yn-col :span="4" style="line-height:32px">组名:</yn-col>
        <yn-col :span="20"><yn-input v-model="addSiblingValue"/></yn-col>
      </yn-row>
    </yn-modal>
    <yn-modal v-model="deleteVisible" title="删除" @ok="deleteNode">
      确定要删除该分组吗?
    </yn-modal>
    <yn-modal
      title="添加表单"
      v-model="addFormVisible"
      @ok="addForm"
      :width="800"
      :bodyStyle="{
        height: '500px',
        overflow: 'scroll'
      }"
    >
      <yn-tree
        :treeData="treeDataAddForm"
        showIcon
        :loadData="onLoadDataAddForm"
        @select="onSelectAddForm"
        :key="treeKey"
        checkable
        v-model="checkedKeys"
        @check="onCheck"
      >
        <!-- 在tree的标签内部通过插槽,插入到相应的节点 -->
        <img
          slot="scene"
          src="./images/page-color-scene3.90d481ce.svg"
          alt=""
          class="file-menu-type-icon"
        />
        <img
          slot="formFolder"
          src="./images/page-color-folder3.1650ed33.svg"
          class="file-menu-type-icon"
        />
        <img
          slot="form"
          src="./images/page-color-form3.6b28f205.svg"
          alt=""
          class="file-menu-type-icon"
        />
        <svg
          slot="formulaForm"
          t="1657073832680"
          width="0.875rem"
          height="0.875rem"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="17253"
          class="iconfont"
          style=" margin-top: 0.65rem;margin-right: 0.3125rem;"
        >
          <path
            d="M742.4 64a42.666667 42.666667 0 0 1 28.032 10.496l3.669333 3.626667 192 213.333333a42.666667 42.666667 0 0 1 10.666667 23.296l0.298667 5.248v554.666667a85.333333 85.333333 0 0 1-78.933334 85.12l-6.4 0.213333h-597.333333a85.333333 85.333333 0 0 1-85.12-78.933333L209.066667 874.666667v-72.576l-85.333334 0.042666a76.8 76.8 0 0 1-76.544-70.485333L46.933333 725.333333V362.666667a76.8 76.8 0 0 1 76.8-76.8l85.333334-0.042667V149.333333a85.333333 85.333333 0 0 1 78.933333-85.12L294.4 64h448z m-106.666667 85.333333h-341.333333v136.490667l192 0.042667a76.8 76.8 0 0 1 76.544 70.485333l0.256 6.314667V725.333333a76.8 76.8 0 0 1-76.8 76.8l-192-0.042666V874.666667h597.333333v-512h-213.333333a42.666667 42.666667 0 0 1-42.368-37.674667L635.733333 320v-170.666667z m-149.333333 204.8H123.733333a8.533333 8.533333 0 0 0-8.533333 8.533334V725.333333c0 4.693333 3.84 8.533333 8.533333 8.533334h362.666667a8.533333 8.533333 0 0 0 8.533333-8.533334V362.666667a8.533333 8.533333 0 0 0-8.533333-8.533334zM251.733333 426.666667l50.517334 64.128L352.768 426.666667h85.333333l-93.226666 118.272 93.226666 118.314666h-85.333333l-50.56-64.128L251.733333 663.253333h-85.333333l93.184-118.272L166.4 426.666667h85.333333z m471.68-277.333334H721.066667v128h117.546666l-115.2-128z"
            p-id="17254"
            fill="#2BB291"
          ></path>
        </svg>
      </yn-tree>
    </yn-modal>
  </div>
</template>
<script>
import "yn-p1/libs/components/yn-page-tree-list";
import "yn-p1/libs/components/yn-input";
import "yn-p1/libs/components/yn-button";
import "yn-p1/libs/components/yn-switch";
import "yn-p1/libs/components/yn-date-picker";
import "yn-p1/libs/components/yn-divider/";
import "yn-p1/libs/components/yn-row/";
import "yn-p1/libs/components/yn-col/";
import api from "../../api/api.js";
import UiUtils from "yn-p1/libs/utils/UiUtils";
 

export default {
  data() {
    let _this = this;
    return {
      selectedKeys: [],
      defaultSelectedKeys: [],
      checkedNodesPath: [],
      checkedKeys: [],
      treeKey: "treeKey",
      treeDataAddForm: [],
      addFormVisible: false,
      expandorCollapse: "expand",
      expandedKeys: [], //展开的节点
      clickNode: "",
      deleteVisible: false,
      addSonValue: "",
      addSiblingVisible: false,
      addSiblingValue: "",
      addSonVisible: false,
      renameValue: "",
      renameVisible: false,
      addGroupValue: "",
      addGroupVisible: false,
      inputSearchForm: "",
      showNodeOperate: true,
      selectNodeKey: "",
      treePanelSkeleton: {
        loading: false
      },
      nodeOperate: [
        {
          key: "rename",
          label: "重命名"
        },
        {
          key: "addSon",
          label: "新建子分组"
        },
        {
          key: "addSibling",
          label: "新建同级分组"
        },
        {
          key: "moveup",
          label: "上移"
        },
        {
          key: "movedown",
          label: "下移"
        },
        {
          key: "delete",
          label: "删除"
        }
      ],
      toolsConfig: {
        // title: "表格标题",
        // moreOptions: [{
        //     key: "key-1",
        //     label: "操作1"
        // }],
        // exportOptions: [{
        //     key: "key1",
        //     label: "按列表导出"
        // }],
        // defaultOptions: ["more", "divider", "import", "export", "setting"],
        //默认设置,生成图标
        options: [
          [
            {
              slotName: "inputSlot"
            },
            {
              slotName: "buttonSlot1"
            },
            {
              slotName: "dividerSlot"
            },

            {
              slotName: "buttonSlot2"
            }
          ]
        ]
      },
      //这个配置可以设置标题 但是会强制添加一个搜素框 在css将其隐藏
      treeTopSearchConfig: {
        treeTitle: "表单分组管理",
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
        defaultExpandedKeys: [], //默认展开
        noFound: false, //不清楚
        draggable: true, //tree的拖拽
        treeData: [],
        defaultSelectedKeys: [],
        expandedKeys: []
        // selectedKeys:[]
      },
      tableConfig: {
        noFound: false,
        tableDraggable: true,
        pagination: {
          // pagingInfo: { current: 1, pageSize: 20 },
          current: 1,
          pageSize: 20,
          showQuickJumper: true,
          total: 1, 
          pageSizeOptions: ["10", "15","20", "50", "100", "200"],
          showSizeChanger: true,
          showTotal: total => {
            return "总计" + total + "条数据";
          }
        },
        columns: [
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
          },
          {
            title: "表单代码",
            width: 220,
            dataIndex: "id"
          },
          {
            title: "操作",
            width: 60,
            dataIndex: "action",
            scopedSlots: {
              customRender: "action"
            }
          }
        ],
        dataSource: []
      },
      pageSkeleton: {
        loading: false
      },
      dataPanelSkeleton: {
        loading: false
      }
    };
  },
  methods: {
    onSelectAddForm(keys, e) {
      console.log(keys, e);
      console.log(e.node.dataRef.parentKey);
    },
    async onClickAddForm() {
      if (this.selectNodeKey == "") {
        UiUtils.errorMessage("请先选择分组");
        return;
      }
      this.checkedKeys = []; //重置选择树

      //await 请求数据
      this.treeKey = new Date().getTime();
      let res = await api.getSceneForm();
      res = res.data.data;
      console.log(res);
      let node = [];
      res.forEach(p => {
        node.push({
          title: p.elementName,
          key: p.elementId,
          scopedSlots: {
            icon: p.elementType
          },
          isLeaf: p.hasChildren != "true",
          parentKey: [p.elementName],
          disabled: p.elementType != "formulaForm"
        });
      });
      this.treeDataAddForm = node;
      this.addFormVisible = true;
    },
    onLoadDataAddForm(treeNode) {
      //treeNode.dataRef 是属性
      // console.log(treeNode.dataRef);
      return new Promise(async resolve => {
        //有子元素 不请求
        if (treeNode.dataRef.children) {
          resolve();
          return;
        }
        //无子元素 请求
        let node = [];
        let res = await api.getSceneChildForm(treeNode.dataRef.key);
        res.data.data.forEach(p => {
          node.push({
            title: p.elementName,
            key: p.elementId,
            scopedSlots: {
              icon: p.elementType
            },
            isLeaf: p.hasChildren != "true",
            parentKey: [...treeNode.dataRef.parentKey, p.elementName],
            disabled: p.elementType != "formulaForm"
          });
        });
        // console.log(res);
        treeNode.dataRef.children = node;
        this.treeDataAddForm = [...this.treeDataAddForm];
        resolve();
      });
    },
    onCheck(checkedKeys, e) {
      this.checkedNodesPath = [];
      e.checkedNodes.forEach(p => {
        this.checkedNodesPath.push(p.data.props.parentKey);
      });
      console.log("onCheck", checkedKeys, this.checkedNodesPath);
      this.checkedKeys = checkedKeys;
    },
    //点击node菜单
    handleNodeOperate(item, e, info) {
      // console.log(item, e, info);
      this.clickNode = info.dataRef;
      switch (item.key) {
        case "rename":
          this.renameValue = "";
          this.renameVisible = true;
          break;
        case "addSon":
          this.addSonValue = "";
          this.addSonVisible = true;
          break;
        case "addSibling":
          this.addSiblingValue = "";
          this.addSiblingVisible = true;
          break;
        case "moveup":
          this.moveupNode(info.key);
          break;
        case "movedown":
          this.movedownNode(info.key);
          break;
        case "delete":
          this.deleteVisible = true;
          break;
        default:
          console.log("noMatches");
      }
    },
    async renameNode() {
      this.renameVisible = false;
      console.log(this.clickNode, this.renameValue);
      let obj = {
        tagName: this.renameValue,
        targetId: this.clickNode.id
      };
      await api.rename(obj);
      this.getNode();
    },
    async addSonNode() {
      this.addSonVisible = false;
      let obj = {
        tagName: this.addSonValue,
        targetId: this.clickNode.id,
        parentId: this.clickNode.id
      };
      await api.addGroup(obj);
      this.getNode();
    },
    async addSiblingNode() {
      this.addSiblingVisible = false;
      let obj = {
        tagName: this.addSiblingValue,
        targetId: this.clickNode.id,
        parentId: this.clickNode.parentId
      };
      await api.addGroup(obj);
      this.getNode();
    },
    async moveupNode(key) {
      let lastNodeKey = "";
      let loop = (data, key) => {
        data.forEach((item, index, arr) => {
          if (item.key === key) {
            //找到目标点
            if (index - 1 >= 0) {
              lastNodeKey = arr[index - 1].key;
            }
          }
          if (item.children) {
            return loop(item.children, key);
          }
        });
      };
      loop(this.treeConfig.treeData, key);

      if (lastNodeKey == "") {
        UiUtils.errorMessage("分组已处于最上层");
      } else {
        await api.moveGroup(key, lastNodeKey, "up");
        this.getNode();
      }
    },
    async movedownNode(key) {
      let nextNodeKey = "";
      let loop = (data, key) => {
        data.forEach((item, index, arr) => {
          if (item.key === key) {
            //找到目标点
            if (data.length > index + 1) {
              nextNodeKey = arr[index + 1].key;
            }
          }
          if (item.children) {
            return loop(item.children, key);
          }
        });
      };
      loop(this.treeConfig.treeData, key);

      if (nextNodeKey == "") {
        UiUtils.errorMessage("分组已处于最下层");
      } else {
        await api.moveGroup(key, nextNodeKey, "down");
        this.getNode();
      }
    },
    async deleteNode() {
      this.deleteVisible = false;
      let _this = this;
      if (!this.clickNode.leaf) {
        UiUtils.confirm({
          title:
            "该分组含有子分组,删除会导致所有的子分组也被删除,确定要继续删除吗?",
          content: "",
          async onOk() {
            console.log(_this.clickNode, "删除");
            await api.deleteGroup(_this.clickNode.id);
            _this.tableConfig.dataSource = [];
            _this.getNode();
          },
          onCancel() {},
          class: "test"
        });
      } else {
        console.log(this.clickNode, "删除");
        await api.deleteGroup(this.clickNode.id);
        this.tableConfig.dataSource = [];
        this.getNode();
      }
    },
    //新建分组
    addGroup() {
      //新建分组 应该向后端发送请求 并调用getNode更新node
      //可能需要存储已展开节点 在更新node后再调用展开
      console.log(this.addGroupValue);
      this.addGroupVisible = false;

      this.treeConfig.treeData.push({
        title: this.addGroupValue,
        key: "xxxxx",
        scopedSlots: {
          title: "custom"
        }
      });
    },

    //删除表单
    async deleteForm(record) {
      let _this = this;
      UiUtils.confirm({
        title: `确定要删除分组 【${record.group}】 下的表单 【${record.name}】 吗`,
        content: "",
        async onOk() {
          let res = await api.deleteForm(record.key);
          if (res.data.success) {
            UiUtils.successMessage(res.data.data);
          } else {
            UiUtils.errorMessage("删除失败");
          }
          await _this.getData();
        },
        onCancel() {},
        class: "test"
      });
    },
    test() {
      console.log("test");
    },
    //查询表单
    //修改dataSource 以及 分页器
    async searchForm() {
      this.tableConfig.pagination.current = 1;
      await this.getData();
      UiUtils.successMessage("查询成功");
    },
    async addForm() {
      this.addFormVisible = false;
      let formList = [];
      for (let i = 0; i < this.checkedKeys.length; i++) {
        formList.push({
          formId: this.checkedKeys[i],
          scenePath: this.checkedNodesPath[i].join("/")
        });
      }
      let obj = {
        targetId: this.selectNodeKey,
        formList: formList
      };
      let res = await api.addForm(obj);
      if (res.data.success) {
        UiUtils.successMessage(res.data.data);
      } else {
        UiUtils.errorMessage("添加失败");
      }
      this.pageSkeleton.loading = true;
      await this.getData();
      this.pageSkeleton.loading = false;

      //请求添加
      //请求新数据
    },
    //获取数据 应该在切换node,查询表单,分页器改变时调用
    //以及删除,添加表单后调用
    //获取数据 用于修改dataSource 以及 分页器
    //参数应该为 分页器数据 选择的节点 查询表单参数
    async getData() {
      console.log("发送请求"); 
      let pageSize = this.tableConfig.pagination.pageSize;
      let pageNum = this.tableConfig.pagination.current;

      let res = await api.getForm({
        targetId: this.selectNodeKey,
        pageNum,
        pageSize,
        searchByFormName: this.inputSearchForm,
        pageFlag:true
        //this.inputSearchForm只有在修改input内容 以及切换节点时会更改
      });
      res = res.data.data;
      console.log(res);
      let forms = [];
      res.groupForms.forEach(p => {
        forms.push({
          key: p.id,
          group: p.groupPath,
          inGroupCode: "",
          path: p.scenePath,
          name: p.formName,
          id: p.formId,
          action: "删除"
        });
      });
      this.tableConfig.pagination.total = res.total;
      this.tableConfig.dataSource = forms;
    },
    //点击节点
    async onSelect(selectedKeys, info) {
      this.inputSearchForm = ""; //清空筛选条件
      this.tableConfig.pagination.current = 1;

      if (selectedKeys == "") {
        //如果取消选择节点
        return;
      }
      this.selectNodeKey = selectedKeys[0];
      // this.pageSkeleton.loading = true;
      await this.getData();
      // this.pageSkeleton.loading = false;
    },
    //展开节点
    onExpand(expandedKeys, nodeInfo) {
      console.log(expandedKeys, nodeInfo);
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
      localStorage.setItem(
        "formTagPageSize",
        this.tableConfig.pagination.pageSize
      );
      await this.getData();
    },
    //拖拽节点 进入节点时触发
    onDragEnter(info) {
      console.log("drop进入节点", info);
      // this.expandedKeys = info.expandedKeys;
    },
    //拖拽节点 拖拽完成时调用
    async onDrop(info) {
      console.log("drop完成", info);
      const dropKey = info.node.eventKey; //目标位置的key
      const dragKey = info.dragNode.eventKey; //拖动node的key
      const dropPos = info.node.pos.split("-");
      // 这里计算的差值 上面分析了info.dropPosition的含义   dropPosition有3种情况
      // =0 表示拖拽到目标元素上
      // =1 表示拖拽到目标元素下面   那么放置拖拽元素的时候  应该放到这个目标位置+1的位置上
      // =-1 表示拖拽到目标元素上面   那么放置拖拽元素的时候 直接放到这个目标位置即可
      let dropPosition =
        info.dropPosition - Number(dropPos[dropPos.length - 1]);

      dropPosition =
        dropPosition == 0 ? "under" : dropPosition == 1 ? "down" : "up";
      console.log(dragKey, dropKey, dropPosition);

      console.log(
        "拖拽点",
        info.dragNode.dataRef.title,
        "目标点",
        info.node.dataRef.title,
        dropPosition
      );

      let isBrather = false;

      let loop = (data, dragKey, dropKey) => {
        let flag = 0;
        data.forEach((item, index, arr) => {
          if (item.key == dragKey || item.key == dropKey) {
            //找到目标点
            flag++;
          }

          if (item.children) {
            loop(item.children, dragKey, dropKey);
          }
        });
        if (flag == 2) {
          isBrather = true;
        }
      };

      loop(this.treeConfig.treeData, dragKey, dropKey);

      let isParent = false;
      info.node.dataRef.children.forEach(p => {
        //还有一种情况 dropPosition == "under" isBrather = false,但是移动到父亲内部
        //这种情况不需要弹出
        if (p.key == info.dragNode.dataRef.key) {
          isParent = true;
        }
      });

      // console.log("isParent",isParent,info.node);
      //两种情况
      //1.拖拽点和目标点不是兄弟的操作,且不是拖拽到父亲的内部
      //2.拖拽点和目标点是兄弟的操作,但是移动到内部
      if (
        (!isBrather && !(isParent && dropPosition == "under")) ||
        (isBrather && dropPosition == "under")
      ) {
        //移动到组外 需要弹框
        //移动到兄弟内部 需要弹框
        let _this = this;
        UiUtils.confirm({
          title: "目标点为非同级节点,确定要继续移动吗?",
          content: "",
          async onOk() {
            if (info.node.dataRef.parentId == "0" && dropPosition != "under") {
              UiUtils.errorMessage("不可移动至根节点外");
              return;
            } else {
              await api.moveGroup(dragKey, dropKey, dropPosition);
              await _this.getNode();
              await _this.getData(); 
            }
          },
          onCancel() {}, 
          class: "test"
        });
      } else {
        if (info.node.dataRef.parentId == "0" && dropPosition != "under") {
          UiUtils.errorMessage("不可移动至根节点外");
          return;
        } else {
          await api.moveGroup(dragKey, dropKey, dropPosition);
          await this.getNode();
          await this.getData(); 
        }
      }
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
      this.selectNodeKey = this.treeConfig.treeData[0].key;
      await this.getData();
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
        props: {
          draggable: "true"
        },
        style: {
          cursor: "pointer"
        },
        on: {
          click: event => {
            console.log("点击了我", record, index, event);
          },
          // 鼠标移入
          mouseenter: event => {
            // 兼容IE
            let ev = event || window.event;
            ev.target.draggable = true;
          },
          // 开始拖拽
          dragstart: event => {
            // 兼容IE
            let ev = event || window.event;
            // 阻止冒泡
            ev.stopPropagation();  
            // 得到源目标数据
            this.sourceObj = record;
            // console.log(record);
            // console.log("拖拽数据",this.sourceObj);
          },
          mouseleave: (event) => {
            //当鼠标在table外的地方松开时,不会触发drop,导致高亮未消失 
            //但一定会触发mouseleave,因此在mouseleave中清除所有高亮
            const node = document.querySelectorAll(".targetTop,.targetBottom")
            if (node.length) { 
              //如果已经有某行高亮 则去除
              if (node[0].classList.contains('targetTop')) {
                node[0].classList.remove("targetTop"); 
              }
              if (node[0].classList.contains('targetBottom')) {
                node[0].classList.remove("targetBottom"); 
              } 
            }   
          },   
          // 拖动元素经过的元素
          dragover: event => {
            // 兼容 IE
            let ev = event || window.event;
            // 阻止默认行为
            ev.preventDefault(); 

            const list = document.getElementsByClassName("ant-table-row");//获取所有行
            const node = document.querySelectorAll(".targetTop,.targetBottom")
 
            if (node.length) { 
              //如果已经有某行高亮 则去除
              if (node[0].classList.contains('targetTop')) {
                node[0].classList.remove("targetTop"); 
              }
              if (node[0].classList.contains('targetBottom')) {
                node[0].classList.remove("targetBottom"); 
              } 
            }   
  

            //计算鼠标在该行的哪一个位置 
            let top = list[index].getBoundingClientRect().top
            let bottom = list[index].getBoundingClientRect().bottom
            if (ev.y >= (top + bottom) / 2) {
              //下部高亮
              list[index].classList.add("targetBottom")
            } 
            else {
              //上部高亮
              list[index].classList.add("targetTop")
            }


            // console.log(ev); 
          },
          // 鼠标松开 
          // 注意,移动到table外不会触发drop,只会触发mouseleave
          drop: async event => {
            // 兼容IE
            var ev = event || window.event;
            // 阻止冒泡
            ev.stopPropagation();
            // 得到目标数据
            this.targetObj = record;
            console.log(
              "拖拽数据",
              this.sourceObj,
              "目标数据",
              this.targetObj,
              "目标事件",
              ev
            );

            let direction = "down"
            const node = document.querySelectorAll(".targetTop,.targetBottom")
            if (node.length) { 
              //如果已经有某行高亮 则去除
              if (node[0].classList.contains('targetTop')) {
                node[0].classList.remove("targetTop"); 
                //根据class 决定方向
                direction = "up"
              }
              if (node[0].classList.contains('targetBottom')) {
                node[0].classList.remove("targetBottom"); 
                direction = "down"
              } 
            }    
            //去除已有高亮

            try {
              let res = await api.moveForm(this.sourceObj.key, this.targetObj.key, direction);
              if (res.data.success) {
                UiUtils.successMessage(res.data.data)
              } 
              else {
                UiUtils.errorMessage(res.data.data)
              }
            }
            catch {
               
            }
            this.getData();
          }
        } 
      };
    },
    setPageSize() {
      if (localStorage.getItem("formTagPageSize")) {
        this.tableConfig.pagination.pageSize = parseInt(
          localStorage.getItem("formTagPageSize")
        );
      } else {
        localStorage.setItem(
          "formTagPageSize", 
          this.tableConfig.pagination.pageSize
        );
      }
    }, 
  },
  async mounted() {
    this.setPageSize()
    this.$set(this.tableConfig, "customRow", this.customRow);
    await this.getNode();
    await this.getRootData();
    this.onExpandorCollapse() 
  }
};
</script>
<style scoped>
/* 设置边框样式实现高亮,而不是添加dom */  
:deep(.ant-table-tbody > tr.targetTop > td) {
  border-top: 2px rgb(19,119,235) solid;
}
 
:deep(.ant-table-tbody > tr.targetBottom > td) {
  border-bottom: 2px rgb(19,119,235) solid;
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
