<template>
  <div class="container" ref="container">
    <div class="head" ref="head">
      <div class="input">
        LinkId:
        <yn-input
          style="width:400px;margin-left: 20px;"
          v-model="linkid"
          @pressEnter="search"
        />
        <yn-button style="margin-left: 20px;" @click="search" type="primary"
          >查询</yn-button
        >
      </div>

      <div class="btn">
        <yn-button @click="downVisible = true" type="primary"
          >日志下载</yn-button
        >
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
    <yn-table
      :columns="columns"
      :dataSource="data"
      :scroll="{ y: tableHeight }"
      :pagination="pagination"
      @change="change"
    >
      <span
        class="yn-a-link action-margin"
        slot="table.node"
        slot-scope="text, record"
        @click="download(record)"
      >
        {{ text }}
      </span>
    </yn-table>

    <yn-modal
      v-model="downVisible"
      @ok="downVisible = false"
      width="1300"
      class="downloadbyNode"
    >
      <downloadbyNode />
    </yn-modal>
  </div>
</template>
<script>
import api from "@/api/api";
import UiUtils from "yn-p1/libs/utils/UiUtils";
import downloadbyNode from "./downloadbyNode/index";
export default {
  data() {
    return {
      downloaded: {}, //记录已下载的数据
      downVisible: false,
      linkid: "",
      tableHeight: 300,
      data: [],
      columns: [
        {
          title: "linkid",
          key: "linkid",
          width: "20%",
          dataIndex: "linkid"
          // width: 200
        },
        {
          title: "任务类型",
          key: "mission",
          width: "16%",
          dataIndex: "mission"
        },
        {
          title: "节点标识",
          key: "node",
          width: "16%",
          dataIndex: "node",
          scopedSlots: {
            customRender: "node"
          }
        },
        {
          title: "taskid",
          key: "taskid",
          width: "20%",
          dataIndex: "taskid"
        },
        {
          title: "开始时间",
          key: "time",
          width: "16%",
          dataIndex: "time"
        },
        {
          title: "下载进度",
          key: "progress",
          width: "12%",
          dataIndex: "progress"
          // scopedSlots: {
          //   customRender: "progress"
          // }
        }
      ],
      pagination: {
        current: 1,
        pageSize: 20, //这里会被init中的setPageSize修改
        showQuickJumper: true,
        total: 200,
        pageSizeOptions: ["10", "20", "30", "50", "100", "200", "500"],
        showSizeChanger: true,
        showTotal: total => {
          return "总计" + total + "条数据";
        }
      }
    };
  },
  methods: {
    search() {
      console.log(this.linkid);
      this.getData();
      UiUtils.successMessage("查询成功");
    },
    change(info) {
      //   console.log(info);
      this.pagination = info.pagingInfo;
      this.getData();
    },
    async download(record) {
      console.log(record);
      let res = await api.download(
        record.address,
        // "192.168.60.130:8060/ce",
        new Date().toLocaleDateString().replaceAll("/", "-"),
        this,
        record
      );
      record.progress = record.progress.replace("正在下载", "下载完成");
      const link = document.createElement("a"); //创建一个a标签
      const blob = new Blob([res.data]); //实例化一个blob出来
      link.style.display = "none";
      link.href = URL.createObjectURL(blob); //将后端返回的数据通过blob转换为一个地址
      //   link.download = ip.replaceAll(".", "-").replaceAll(":", "-") + ".zip";
      link.download =
        record.node.replaceAll(".", "-").replaceAll(":", "-") +
        "-" +
        Date.now() +
        ".zip";
      document.body.appendChild(link);
      link.click(); //下载该文件
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);

      this.$set(this.downloaded, record.taskid, record.progress); //记录已下载数据
    },
    async getData() {
      let res = await api.getLinkIdRecord(
        this.linkid,
        this.pagination.current,
        this.pagination.pageSize
      );

      let data = res.data.data;
      console.log(data.linkIdRecords);
      //根据this.downloaded的数据 设置progress
      let arr = [];
      data.linkIdRecords.forEach(p => {
        let obj = {
          address: p.address,
          key: p.taskId,
          linkid: p.linkId,
          taskid: p.taskId,
          node: p.nodeMark,
          mission: p.taskType,
          time: p.beginTime,
          progress: ""
        };

        //获取下载记录
        if (this.downloaded[p.taskId]) {
          obj.progress = this.downloaded[p.taskId];
        }

        arr.push(obj);
      });
      this.data = arr;
      this.pagination.total = data.total;
      //设置this.pagination的total
    },
    getTableHeight() {
      setTimeout(() => {
        this.tableHeight =
          this.$refs["container"].clientHeight -
          this.$refs["head"].clientHeight -
          144;
      }, 0);
    }
  },
  mounted() {
    this.getTableHeight();
  },
  components: {
    downloadbyNode
  }
};
</script>
<style scoped>
.downloadbyNode :deep .ant-modal-body {
  height: 500px;
}
.btn {
  margin-left: auto;
}
.head {
  display: flex;
  margin-bottom: 20px;
}

.input {
  display: flex;
  line-height: 32px;
}

.container {
  padding: 20px;
  height: 100%;
}
</style>
