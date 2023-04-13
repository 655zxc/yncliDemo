<template>
  <div class="container" ref="container">
    <div class="operation" ref="operation">
      <div class="leftBtn">
        <yn-button @click="showAddIP" type="primary">添加地址</yn-button>
        <yn-date-picker @change="onChange" :disabledDate="disabledRangeDate" />
        <yn-button type="primary" @click="download(true)">批量下载</yn-button>
      </div>
      <div style="margin-left:auto" class="rightBtn">
        <!-- <yn-button
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
        > -->
      </div>
    </div>
    <div class="list">
      <yn-table
        :columns="columns"
        :dataSource="data"
        :row-selection="rowSelection"
        :scroll="{ y: tableHeight }"
        :customRow="customRow"
      >
        <span
          slot="table.download"
          slot-scope="text, record"
          style="display:flex;justify-content:space-between"
        >
          <span
            class="yn-a-link action-margin"
            href="javascript:;"
            @click="download(false, record)"
            >下载</span
          >
        </span>
        <span
          slot="table.update"
          slot-scope="text, record"
          style="display:flex;justify-content:space-between"
        >
          <span
            class="yn-a-link action-margin"
            href="javascript:;"
            @click="changeIP(record)"
            >修改</span
          >
        </span>
        <span
          slot="table.delete"
          slot-scope="text, record"
          style="display:flex;justify-content:space-between"
        >
          <span
            class="yn-a-link action-margin"
            href="javascript:;"
            @click="deleteIP(record)"
            >删除</span
          >
        </span>
      </yn-table>
    </div>
    <yn-modal
      class="configure"
      v-model="addIPVisible"
      @ok="addIP"
      title="添加地址"
      :width="800"
    >
      <!-- <div class="copyInput">
        <yn-button type="primary" @click="copyInput">添加</yn-button>
      </div> -->
      地址示例：192.168.12.170:8090/ce，或 xxxx.cn/ce1、xxxx.cn/ce2
      <div class="input">
        <div
          v-for="(p, index) in addData"
          style="display:flex;align-items:center;"
        >
          <div style="width:30px;height:40px;line-height: 40px;">
            {{ index + 1 }}
          </div>
          <yn-input style="width:400px" v-model="p.value"></yn-input>

          <!-- v-show="index == addData.length - 1" -->
          <div class="copyIcon" @click="addInput">
            <yn-icon-svg type="plus-circle" />
          </div>
          <div class="copyIcon" @click="copyInput">
            <svg
              t="1675736796788"
              class="icon "
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2725"
              width="200"
              height="200"
            >
              <path
                d="M720 192h-544A80.096 80.096 0 0 0 96 272v608C96 924.128 131.904 960 176 960h544c44.128 0 80-35.872 80-80v-608C800 227.904 764.128 192 720 192z m16 688c0 8.8-7.2 16-16 16h-544a16 16 0 0 1-16-16v-608a16 16 0 0 1 16-16h544a16 16 0 0 1 16 16v608z"
                p-id="2726"
              ></path>
              <path
                d="M848 64h-544a32 32 0 0 0 0 64h544a16 16 0 0 1 16 16v608a32 32 0 1 0 64 0v-608C928 99.904 892.128 64 848 64z"
                p-id="2727"
              ></path>
              <path
                d="M608 360H288a32 32 0 0 0 0 64h320a32 32 0 1 0 0-64zM608 520H288a32 32 0 1 0 0 64h320a32 32 0 1 0 0-64zM480 678.656H288a32 32 0 1 0 0 64h192a32 32 0 1 0 0-64z"
                p-id="2728"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </yn-modal>
    <yn-modal
      v-model="changeVisible"
      @ok="modifyAddress"
      title="修改地址"
      :width="800"
    >
      <yn-input style="width:400px" v-model="changeData.ip"></yn-input>
    </yn-modal>
  </div>
</template>
<script>
import "yn-p1/libs/components/yn-date-picker/";
import "yn-p1/libs/components/yn-table/";
import "yn-p1/libs/components/yn-modal/";
import "yn-p1/libs/components/yn-input/";

import api from "@/api/api";
import UiUtils from "yn-p1/libs/utils/UiUtils";
import moment from "moment";

export default {
  data() {
    const rowSelection = {
      selectedRowKeys: [],
      onChange: (selectedRowKeys, selectedRows) => {
        this.selectedRows = selectedRows;

        let arr = [];
        selectedRows.forEach(p => {
          arr.push(p.key);
        });
        this.selectedRowsKeys = arr;
      },
      onSelect: (record, selected, selectedRows) => {
        this.selectedRows = selectedRows;

        let arr = [];
        selectedRows.forEach(p => {
          arr.push(p.key);
        });
        this.selectedRowsKeys = arr;
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        this.selectedRows = selectedRows;

        let arr = [];
        selectedRows.forEach(p => {
          arr.push(p.key);
        });
        this.selectedRowsKeys = arr;
      }
    };

    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        ip: i,
        key: i
      });
    }

    const customRow = function(record, index) {
      return {
        style: {
          cursor: "pointer"
        },
        on: {
          click: event => {
            // console.log("点击了我", record, index, event.target.className);
            if (event.target.className != "yn-a-link action-margin") {
              document
                .querySelectorAll(
                  `.ant-table .ant-table-row:nth-child(${index +
                    1}) .ant-checkbox-input`
                )[0]
                .click();
            }
          }
        }
      };
    };

    return {
      downloadInfo: {}, //存储每条ip,已下载的日期以及信息
      //每次getdata还要请求这个数据
      changeData: { ip: null },
      changeVisible: false,
      addData: [
        {
          value: null
        }
      ],
      customRow: customRow,
      date: null,
      tableHeight: 100,
      selectedRowsKeys: [],
      selectedRows: [],
      addIPVisible: false,
      rowSelection,
      columns: [
        {
          title: "序号",
          key: "index",
          width: "8%",
          dataIndex: "index"
          // width: 200
        },
        {
          title: "地址",
          key: "ip",
          width: "26%",
          dataIndex: "ip"
          // width: 200
        },
        {
          title: "添加日期",
          key: "createDate",
          width: "26%",
          dataIndex: "createDate"
        },
        {
          title: "修改",
          key: "update",
          width: "8%",
          scopedSlots: {
            customRender: "update"
          }
        },
        {
          title: "删除",
          key: "delete",
          width: "8%",
          scopedSlots: {
            customRender: "delete"
          }
        },
        {
          title: "下载",
          key: "download",
          width: "8%",
          scopedSlots: {
            customRender: "download"
          }
        },
        {
          title: "下载进度",
          key: "progress",
          width: "16%",
          dataIndex: "progress"
          // scopedSlots: {
          //   customRender: "progress"
          // }
        }
      ],
      data: null
    };
  },
  methods: {
    showAddIP() {
      (this.addData = [
        {
          value: null
        }
      ]),
        (this.addIPVisible = true);
    },
    disabledRangeDate(current) {
      return current > moment().endOf("day");
    },
    copyInput() {
      let value = this.addData[this.addData.length - 1].value;
      this.addData.push({
        value: value
      });
    },
    addInput() {
      this.addData.push({
        value: null
      });
    },
    changeIP(record) {
      // console.log("change", record);
      this.changeData = { ...record };
      this.changeVisible = true;
    },
    async modifyAddress() {
      this.changeVisible = false;
      let res = await api.modifyAddress(
        this.changeData.ip,
        this.changeData.createDate,
        this.changeData.key
      );
      if (res.data.success) {
        UiUtils.successMessage(res.data.data);
      }
      this.getData();
    },
    //根据selectedkeys,返回相应data
    getSelectedData() {
      let arr = [];
      this.selectedRowsKeys.forEach(p => {
        this.data.forEach(q => {
          if (p == q.key) {
            arr.push(q);
          }
        });
      });
      return arr;
    },
    deleteIP(record) {
      // console.log("delete", record);
      let _this = this;
      UiUtils.confirm({
        title: "确定要删除该地址吗?",
        content: "",
        async onOk() {
          let res = await api.delAddress(record.key);
          if (res.data.success) {
            UiUtils.successMessage(res.data.data);

            //删除后,selectRow需要手动更新
            let index = null;
            for (let i = 0; i < _this.selectedRows.length; i++) {
              if (_this.selectedRows[i].key == record.key) {
                index = i;
              }
            }
            if (index != null) {
              _this.selectedRows.splice(index, 1);
            }

            //手动更新selectRowKey
            let index2 = null;
            for (let i = 0; i < _this.selectedRowsKeys.length; i++) {
              if (_this.selectedRowsKeys[i] == record.key) {
                index2 = i;
              }
            }
            if (index2 != null) {
              _this.selectedRowsKeys.splice(index2, 1);
            }
          }
          _this.getData();
        },
        onCancel() {},
        class: "test"
      });
    },
    onChange(date, dateString) {
      // console.log(date, dateString);
      this.date = dateString;
      // for (let i = 0; i < this.data.length; i++) {
      //   this.data[i].progress = "";
      // }
      this.isDownloaded();
    },
    async addIP() {
      this.addIPVisible = false;
      let arr = [];
      this.addData.forEach(p => {
        if (p.value) {
          arr.push(p.value);
        }
      });
      // console.log(arr);
      let res = await api.addAddress(arr);
      if (res.data.success) {
        UiUtils.successMessage(res.data.data);
      }
      this.getData();
    },
    //切换日期，增删改查(即调用getdata)时，根据已下载信息this.downloadInfo，更新当前data所有数据的progress
    isDownloaded() {
      // console.log(this.downloadInfo);

      for (let i = 0; i < this.data.length; i++) {
        this.data[i].progress = this.downloadInfo[this.data[i].key][this.date];
      }
    },
    async down(ip, record) {
      let res = await api.download(ip, this.date, this, record);
      record.progress = record.progress.replace("正在下载", "下载完成");
      const link = document.createElement("a"); //创建一个a标签
      const blob = new Blob([res.data]); //实例化一个blob出来
      link.style.display = "none";
      link.href = URL.createObjectURL(blob); //将后端返回的数据通过blob转换为一个地址
      link.download = ip.replaceAll(".", "-").replaceAll(":", "-") + ".zip";
      document.body.appendChild(link);
      link.click(); //下载该文件
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);

      //更新下载信息
      this.$set(this.downloadInfo[record.key], this.date, record.progress);
    },
    async download(flag, record) {
      if (this.date) {
        if (!flag) {
          await this.down(record.ip, record);
        } else {
          let arr = this.getSelectedData();
          for (let i = 0; i < arr.length; i++) {
            await this.down(arr[i].ip, arr[i]);
          }

          // for (let i = 0; i < this.selectedRows.length; i++) {
          //   await this.down(this.selectedRows[i].ip, this.selectedRows[i]);
          // }
        }
      } else {
        UiUtils.errorMessage("请先选择日期");
      }
    },
    getTableHeight() {
      setTimeout(() => {
        this.tableHeight =
          this.$refs["container"].clientHeight -
          this.$refs["operation"].clientHeight -
          80;
      }, 0);
    },
    async getData() {
      let res = await api.getAllAddress();
      if (res.data.success) {
        let arr = [];
        res.data.data.forEach((p, index) => {
          arr.push({
            index: index + 1,
            ip: p.address,
            key: p.objectId,
            createDate: p.createDate,
            progress: ""
          });
          //如果这条数据还未被记录,则记录到downloadInfo中
          if (!this.downloadInfo[p.objectId]) {
            this.$set(this.downloadInfo, p.objectId, {});
          }
        });
        this.data = arr;
      }

      //设置是否已下载
      this.isDownloaded();
    }
  },
  mounted() {
    this.getTableHeight();
    this.getData();
  }
};
</script>
<style scoped>
.addBtn {
  margin-left: 8px;
  /* position:absolute;
  left: 640px;    */
}
.container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.operation {
  height: 80px;
  display: flex;
  align-items: center;
}

.operation > .leftBtn > * {
  margin-right: 20px;
}

.list {
  flex: 1;
}

.configure :deep .ant-modal-body {
  height: 500px;
}

.configure :deep .ant-modal-body .input {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.copyIcon {
  cursor: pointer;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  margin-left: 5px;
}
.copyIcon:hover {
  background-color: rgb(192, 205, 223);
}
</style>
