<template>
  <div class="prBox">
    <yn-spin :spinning="isLoading">
      <div class="container">
        <headerSearch @subSearch="subSearch"/>
        <div class="search">
          <div>
            <span class="searchLabel">精准:</span>
            <yn-select style="width: 80px" v-model="accurateSelect">
              <yn-select-option value="failure">不参与</yn-select-option>
              <yn-select-option value="noFailure">参与</yn-select-option>
              <yn-select-option value="all">全部</yn-select-option> 
            </yn-select>
          </div>
          <div>
            <span class="searchLabel">锁定:</span>
            <yn-select style="width: 80px" v-model="lockSelect">
              <yn-select-option value="failure">否</yn-select-option>
              <yn-select-option value="noFailure">是</yn-select-option>
              <yn-select-option value="all">全部</yn-select-option> 
            </yn-select>
          </div>
          <div>
            <span class="searchLabel">结构:</span>
            <yn-select style="width: 80px" v-model="structureSelect">
              <yn-select-option value="failure">失效</yn-select-option>
              <yn-select-option value="noFailure">有效</yn-select-option>
              <yn-select-option value="all">全部</yn-select-option>
            </yn-select>
          </div>
          <div>
            <span class="searchLabel">公式:</span>
            <yn-select style="width: 80px" v-model="formulaSelect">
              <yn-select-option value="failure">失效</yn-select-option>
              <yn-select-option value="noFailure">有效</yn-select-option>
              <yn-select-option value="all">全部</yn-select-option>
            </yn-select>
          </div>
          <div>
            <span class="searchLabel">计算:</span>
            <yn-select style="width: 80px" v-model="computeSelect">
              <yn-select-option value="failure">失效</yn-select-option>
              <yn-select-option value="noFailure">有效</yn-select-option>
              <yn-select-option value="all">全部</yn-select-option>
            </yn-select>
          </div>
          <div>
            <span class="searchLabel">删除:</span>
            <yn-select style="width: 80px" v-model="deleteSelect">
              <yn-select-option value="failure">需删除</yn-select-option>
              <yn-select-option value="noFailure">有效</yn-select-option>
              <yn-select-option value="all">全部</yn-select-option>
            </yn-select>
          </div>
        </div>
        <div class="operation">
          <span>检测</span>
          <yn-button type="primary" @click="differencesVisible = true"
            >检测差异</yn-button
          >
          <yn-divider type="vertical" style="height:32px;" />
          <span>发布表单/Form</span>
          <yn-button type="primary" @click="releaseFormVisible = true"
            >发布</yn-button
          >
          <yn-button type="primary" @click="releaseDraftVisible = true"
            >草稿版
            <svg
              t="1677740621139"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2748"
              width="200"
              height="200"
            >
              <path
                d="M885.113 489.373L628.338 232.599c-12.496-12.497-32.758-12.497-45.254 0-12.497 12.497-12.497 32.758 0 45.255l203.3 203.3H158.025c-17.036 0-30.846 13.811-30.846 30.846 0 17.036 13.811 30.846 30.846 30.846h628.36L583.084 746.147c-12.497 12.496-12.497 32.758 0 45.255 6.248 6.248 14.438 9.372 22.627 9.372s16.379-3.124 22.627-9.372l256.775-256.775a31.999 31.999 0 0 0 0-45.254z"
                fill=""
                p-id="2749"
              ></path>
            </svg>
            正式版</yn-button
          >
          <yn-divider type="vertical" style="height:32px;" />
          <span>发布实例/Sheet</span>
          <yn-button type="primary" @click="releaseVisible = true"
            >发布</yn-button
          >
          <yn-button type="primary" @click="computeVisible = true"
            >计算</yn-button
          >
          <yn-button type="primary" @click="releaseandComputeVisible = true"
            >发布并计算</yn-button
          >
          <yn-divider type="vertical" style="height:32px;" />
          <span>失效</span>
          <yn-button type="primary" @click="accurateDetectionVisible = true"
            >精准检测</yn-button
          >
          <yn-button type="primary" @click="structuralFailureVisible = true"
            >结构失效</yn-button
          >
          <yn-button type="primary" @click="downstreamFailureVisible = true"
            >结构及下游公式失效</yn-button
          >
          <yn-button type="primary" @click="formulaFailureVisible = true"
            >公式失效</yn-button
          >
          <yn-button type="primary" @click="deleteOperationVisible = true"
            >删除</yn-button
          >
          <yn-button type="primary" @click="lockVisible = true"
            >锁定</yn-button
          >
          <yn-button type="primary" @click="unlockVisible = true"
            >解锁</yn-button
          >
        </div>
        <div class="display" ref="displayRef">
          <yn-popover
            placement="rightBottom"
            title="跨页全选勾选框"
            trigger="hover"
            :visible="hovered"
            @visibleChange="handleHoverChange"
          >
            <yn-checkbox
              @change="onChangeAllCheckbox"
              v-model="isAllChecked"
              v-show="isShowTitleCheckbox"
              class="allCheckbox"
            ></yn-checkbox>
          </yn-popover>
          <yn-page-list
            :tableConfig="tableConfig"
            rowKey="sheetId"
            @table_change="onTableChange"
            :dataPanelSkeleton="dataPanelSkeleton"
            :autoHeight="true"
            :tableDraggable="true"
          >
            <!-- <template slot="table.customTitle" slot-scope="text">
              <div>
                xxxxxxxxx
              </div>
            </template> -->
            <template slot="table.firstCol" slot-scope="text, record">
              <div @click.stop>
                <yn-checkbox
                  @change="onChangeColumnsCheckbox($event, record)"
                  v-model="isChecked[text]"
                ></yn-checkbox>
              </div>
            </template>
            <template slot="table.draftSign" slot-scope="text">
              <yn-tag color="white" v-if="text == true">正式版</yn-tag>
              <yn-tag color="volcano" v-else="">草稿版</yn-tag>
            </template>
            <template slot="table.accurateDetectionSign" slot-scope="text">
              <yn-tag color="white" v-if="text == true">参与</yn-tag>
              <yn-tag color="volcano" v-else="">不参与</yn-tag>
            </template>
            <template slot="table.lock" slot-scope="text">
              <yn-tag color="volcano" v-if="text == true">是</yn-tag>
              <yn-tag color="white" v-else="">否</yn-tag> 
            </template>
            <template slot="table.structureSign" slot-scope="text">
              <yn-tag color="volcano" v-if="text == true">失效</yn-tag>
              <yn-tag color="white" v-else="">有效</yn-tag>
            </template>
            <template slot="table.formulaSign" slot-scope="text">
              <yn-tag color="volcano" v-if="text == true">失效</yn-tag>
              <yn-tag color="white" v-else="">有效</yn-tag>
            </template>
            <template slot="table.calculationSign" slot-scope="text">
              <yn-tag color="volcano" v-if="text == true">失效</yn-tag>
              <yn-tag color="white" v-else="">有效</yn-tag>
            </template>
            <template slot="table.deleteSign" slot-scope="text">
              <yn-tag color="volcano" v-if="text == true">需删除</yn-tag>
              <yn-tag color="white" v-else="">有效</yn-tag>
            </template>
          </yn-page-list>
        </div>
        <yn-modal
          title="选择表单"
          v-model="visible"
          @ok="handleOk"
          class="selectFormModal"
          :width="1000"
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
              <yn-checkbox @change="setSelectAll" v-model="selectAll"
                >全选</yn-checkbox
              >
            </div>
            <yn-list-item
              slot="renderItem"
              slot-scope="item, index"
              @click="clickListItem(item, index, $event)"
            >
              <yn-list-item-meta>
                <span slot="title">{{ item.bookName }}</span>
              </yn-list-item-meta>
            </yn-list-item>
          </yn-list>
        </yn-modal>
        <yn-modal v-model="differencesVisible" @ok="detectDifferences">
          <p>确定要检测差异吗?</p>
        </yn-modal>
        <yn-modal v-model="releaseVisible" @ok="release">
          <p>确定要发布吗?</p>
        </yn-modal>
        <yn-modal v-model="releaseDraftVisible" @ok="releaseDraft">
          <p>确定要将草稿版转化为正式版吗?</p>
        </yn-modal>
        <yn-modal v-model="releaseFormVisible" @ok="releaseForm">
          <p>确定要发布Form吗?</p>
        </yn-modal>
        <yn-modal v-model="computeVisible" @ok="compute">
          <p>确定要计算吗?</p>
        </yn-modal>
        <yn-modal v-model="releaseandComputeVisible" @ok="releaseandCompute">
          <p>确定要发布并计算吗?</p>
        </yn-modal>
        <yn-modal v-model="accurateDetectionVisible" @ok="accurateDetection">
          <p>确定要将选择的实例的精准检测置反吗?</p>
        </yn-modal>
        <yn-modal v-model="structuralFailureVisible" @ok="structuralFailure">
          <p>确定要将选择的实例置为结构失效吗?</p>
        </yn-modal>
        <yn-modal v-model="downstreamFailureVisible" @ok="downstreamFailure">
          <p>确定要将选择的实例以及下游表单置为结构失效吗?</p>
        </yn-modal>
        <yn-modal v-model="formulaFailureVisible" @ok="formulaFailure">
          <p>确定要将选择的实例置为公式失效吗?</p>
        </yn-modal>
        <yn-modal v-model="deleteOperationVisible" @ok="deleteOperation">
          <p>确定要删除选择的实例吗?</p>
        </yn-modal>
        <yn-modal v-model="lockVisible" @ok="lock">
          <p>确定要锁定选择的实例吗?</p>
        </yn-modal>
        <yn-modal v-model="unlockVisible" @ok="unlock">
          <p>确定要锁定选择的实例吗?</p>
        </yn-modal>

        <yn-modal title="进度" v-model="progressVisible">
          <div class="progress">
            <yn-progress type="line" :percent="percent" />
          </div>
          <template slot="footer">
            <div></div>
          </template>
        </yn-modal>
        <yn-modal
          v-model="showFormResultVisible"
          @ok=""
          class="showFormResultModal"
          :width="1300"
        >
          <yn-table
            :columns="detectDifferencesResultColumns"
            :dataSource="detectDifferencesResultTable"
            :scroll="{ x: '100%', y: 500 }"
            bordered
          >
            <div
              slot="table.copyIcon"
              class="copyIcon"
              slot-scope="text, record"
              @click="copyResult(text, record)"
            >
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
          </yn-table>
          <template slot="footer">
            <yn-button @click="copyAllResult" type="primary"
              >复制全部信息</yn-button
            >
            <yn-button @click="showFormResultVisible = false" type="primary"
              >确定</yn-button
            >
          </template>
        </yn-modal>
        <yn-modal
          v-model="showReleaseResultVisible"
          @ok=""
          class="showReleaseResultModal"
          :width="1300"
        >
          <p>公式预编译错误!</p>
          <yn-divider />
          <!-- 正式版本 -->
          <p v-for="(p, index) in releaseErrorFormulas" :key="p.formId">
            {{ index + 1 }}、formId：{{ p.formId }}，formName：{{
              p.formName
            }}，错误信息：{{ p.message }}
          </p>
          <!-- <yn-divider />
          草稿版本
          <p v-for="(p,index) in preReleaseErrorFormulas" :key="'pre-'+p.formId">{{ index+1 }}、formId：{{ p.formId }}，formName：{{ p.formName }}，错误信息：{{ p.message }}</p> -->
          <template slot="footer">
            <!-- <yn-button @click="copyAllResult" type="primary"
              >复制全部信息</yn-button
            > -->
            <yn-button @click="showReleaseResultVisible = false" type="primary"
              >确定</yn-button
            >
          </template>
        </yn-modal>
        <yn-modal
          v-model="showReleaseFormResultVisible"
          @ok=""
          class="showReleaseFormResultModal"
          :width="1000"
        >
          <yn-table
            :columns="releaseFormResultColumns"
            :dataSource="releaseFormResultTable"
            :scroll="{ x: '100%', y: 500 }"
            bordered
          >
            <template slot="table.progress" slot-scope="text, record">
              <span v-show="record.key == 0"
                >{{ releaseFormFinishandError }}&nbsp;/&nbsp;{{
                  releaseFormTotal
                }}</span
              >
              <yn-progress
                type="line"
                :percent="text"
                size="small"
                v-show="record.key != 0 && record.state != 'error'"
              />
              <div v-show="record.state == 'error'" style="color:red;">
                发生错误:{{ record.stateInfo }}
              </div>
            </template>
          </yn-table>
          <template slot="footer">
            <yn-button
              @click="showReleaseFormResultVisible = false"
              type="primary"
              >确定</yn-button
            >
          </template>
        </yn-modal>
        <yn-modal
          v-model="showReleaseDraftVisible"
          @ok="showReleaseDraftVisible = false"
          class="showReleaseDraft"
          :width="1300"
        >
          <template slot="title">
            <p>
              草稿版
              <svg
                t="1677740621139"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2748"
                width="200"
                height="200"
              >
                <path
                  d="M885.113 489.373L628.338 232.599c-12.496-12.497-32.758-12.497-45.254 0-12.497 12.497-12.497 32.758 0 45.255l203.3 203.3H158.025c-17.036 0-30.846 13.811-30.846 30.846 0 17.036 13.811 30.846 30.846 30.846h628.36L583.084 746.147c-12.497 12.496-12.497 32.758 0 45.255 6.248 6.248 14.438 9.372 22.627 9.372s16.379-3.124 22.627-9.372l256.775-256.775a31.999 31.999 0 0 0 0-45.254z"
                  fill=""
                  p-id="2749"
                ></path>
              </svg>
              正式版
            </p>
          </template>

          <!-- 正式版本 -->
          <p>错误表单</p>
          <p v-for="(p, index) in releaseDraftError" :key="p.formId">
            {{ index + 1 }}、formId：{{ p.formId }}，formName：{{
              p.formName
            }}，错误信息：{{ p.message }}
          </p>
          <yn-divider />
          <p>成功表单</p>
          <p v-for="(p, index) in releaseDraftSuccess" :key="p.formId">
            {{ index + 1 }}、formId：{{ p.formId }}，formName：{{
              p.formName
            }}，成功信息：{{ p.message }}
          </p>
        </yn-modal>
      </div>
    </yn-spin>
  </div>
</template>
<script>
import "yn-p1/libs/components/yn-page-list/";
import "yn-p1/libs/components/yn-list/";
import "yn-p1/libs/components/yn-list-item/";
import "yn-p1/libs/components/yn-progress/";
import "yn-p1/libs/components/yn-list-item-meta/";
import DsUtils from "yn-p1/libs/utils/DsUtils";
import UiUtils from "yn-p1/libs/utils/UiUtils";
import api from "../../api/api.js";
import headerSearch from "./Header/search"
export default {
  name: "preciseRelease",
  data() {
    const customRender1 = (value, row, index) => {
      const obj = {
        children: value,
        attrs: {}
      };
      if (row.detectDifferencesSuccess == false) {
        obj.attrs.colSpan = 8;
        obj.children = row.errorDetailMessage;
      }
      return obj;
    };

    const customRender2 = (value, row, index) => {
      const obj = {
        children: value,
        attrs: {}
      };
      if (row.detectDifferencesSuccess == false) {
        obj.attrs.colSpan = 0;
      }
      return obj;
    };

    const customRenderIndex = (value, row, index) => {
      const obj = {
        children: value,
        attrs: {}
      };
      if (row.key == 0) {
        obj.attrs.colSpan = 2;
      }
      return obj;
    };

    const customRenderName = (value, row, index) => {
      const obj = {
        children: value,
        attrs: {}
      };
      if (row.key == 0) {
        obj.attrs.colSpan = 0;
      }
      return obj;
    };

    return {
      //筛选维搜索相关
      showDimensionDropdown: false,
      searchDimensionData: [],
      DimensionPage: {
        current: 1,
        total: 50,
        pageSize: 5,
        pageSizeOptions: ["5", "10", "20", "30", "50", "100"]
      }, 


      
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
            width: 70,
            // width: "6%",
            align: "center",
            fixed: "left",
            scopedSlots: {
              customRender: "firstCol" //这一列提供插槽
              // title: 'title'
              // filterIcon: 'filterIcon',
            },
            slots: { title: "customTitle" }
          },
          {
            title: "表单名称",
            dataIndex: "bookName",
            width: 363
            // width: "32%"
          },
          {
            title: "筛选维",
            dataIndex: "dimension",
            width: 363
            // width: "32%"
          },
          {
            title: "草稿/正式",
            dataIndex: "draftSign",
            width: 94,
            // width: "10%",
            align: "center",
            fixed: "right",
            scopedSlots: {
              customRender: "draftSign"
            }
          },
          {
            title: "精准检测",
            dataIndex: "accurateDetectionSign",
            width: 90,
            // width: "10%",
            align: "center",
            fixed: "right",
            scopedSlots: {
              customRender: "accurateDetectionSign"
            }
          },
          {
            title: "是否锁定",
            dataIndex: "lock", 
            width: 90,
            // width: "10%",
            align: "center",
            fixed: "right",
            scopedSlots: {
              customRender: "lock"
            }
          },
          {
            title: "结构失效",
            dataIndex: "structureSign",
            width: 90,
            // width: "10%",
            align: "center",
            fixed: "right",
            scopedSlots: {
              customRender: "structureSign"
            }
          },
          {
            title: "公式失效",
            dataIndex: "formulaSign",
            width: 90,
            // width: "10%",
            align: "center",
            fixed: "right",
            scopedSlots: {
              customRender: "formulaSign"
            }
          },
          {
            title: "计算失效",
            dataIndex: "calculationSign",
            width: 90,
            // width: "10%",
            align: "center",
            fixed: "right",
            scopedSlots: {
              customRender: "calculationSign"
            }
          },
          {
            title: "删除标识",
            dataIndex: "deleteSign",
            width: 90,
            // width: "10%",
            align: "center",
            fixed: "right",
            scopedSlots: {
              customRender: "deleteSign"
            }
          }
        ],
        // rowSelection:{
        //   onChange: (selectedRowKeys, selectedRows) => {
        //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        //   },
        //   onSelect: (record, selected, selectedRows) => {
        //     console.log(record, selected, selectedRows);
        //   },
        //   onSelectAll: (selected, selectedRows, changeRows) => {
        //     console.log(selected, selectedRows, changeRows);
        //   },
        // },
        dataSource: [],
        pagination: {
          current: 1,
          pageSize: 20, //这里会被init中的setPageSize修改
          showQuickJumper: true,
          total: 12,
          pageSizeOptions: ["10", "20", "30", "50", "100", "200", "500"],
          showSizeChanger: true,
          showTotal: total => {
            return "总计" + total + "条数据";
          }
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
      releaseFormVisible: false,
      differencesVisible: false,
      isLoading: false,
      accurateSelect: "all",
      lockSelect:"all", 
      structureSelect: "all",
      formulaSelect: "all",
      computeSelect: "all",
      deleteSelect: "all",
      //是否通过点击实现全选
      isAllChecked: false,
      //上一次搜索的条件
      searchInfo: {
        bookIds: [],
        pageDimFilter: "",
        precisePublish: "",
        publishFlag: "",
        formulaFlag: "",
        calcFlag: "",
        toDeleteFlag: "",
        pageNum: 1,
        pageSize: 15
      },
      percent: 0,
      progressVisible: false,
      timer: null,
      falseList: [], //记录全选状态下,取消的数据
      //是否进行了全选并修改标识
      structuralFailureVisible: false,
      downstreamFailureVisible: false,
      formulaFailureVisible: false,
      deleteOperationVisible: false,
      showFormResultVisible: false,
      showReleaseFormResultVisible: false,
      accurateDetectionVisible: false,
      releaseDraftVisible: false,
      computeVisible: false,
      showReleaseDraftVisible: false,
      releaseandComputeVisible: false,
      lockVisible: false,
      unlockVisible:false,
      detectDifferencesResult: {}, //检测差异后的详细信息
      releaseDraftError: [],
      releaseDraftSuccess: [],

      detectDifferencesResultColumns: [
        //序号/汇总
        {
          title: "序号",
          dataIndex: "index",
          key: "index",
          customRender: customRenderIndex,
          width: "5%"
        },
        //表单名/汇总
        {
          title: "表单/Form",
          dataIndex: "name",
          key: "name",
          customRender: customRenderName,
          width: "18%"
        },
        {
          title: "检测前合计",
          dataIndex: "beforeDetectTotalSheetCount",
          key: "beforeDetectTotalSheetCount",
          customRender: customRender1,
          width: "7%"
        },
        {
          title: "检测后新增",
          dataIndex: "afterDetectAddSheetCount",
          key: "afterDetectAddSheetCount",
          customRender: customRender2,
          width: "7%"
        },
        {
          title: "删除",
          dataIndex: "afterDetectDelSheetCount",
          key: "afterDetectDelSheetCount",
          customRender: customRender2,
          width: "7%"
        },
        {
          title: "变化",
          dataIndex: "afterDetectChangeSheetCount",
          key: "afterDetectChangeSheetCount",
          customRender: customRender2,
          width: "7%"
        },
        {
          title: "无变化",
          dataIndex: "afterDetectNoChangeSheetCount",
          key: "afterDetectNoChangeSheetCount",
          customRender: customRender2,
          width: "7%"
        },
        {
          title: "影响表单",
          dataIndex: "affectRelyFormCount",
          key: "affectRelyFormCount",
          customRender: customRender2,
          width: "7%"
        },
        {
          title: "影响实例",
          dataIndex: "affectRelySheetCount",
          key: "affectRelySheetCount",
          customRender: customRender2,
          width: "7%"
        },
        {
          title: "累计用时(ms)",
          dataIndex: "costTime",
          key: "costTime",
          customRender: customRender2,
          width: "9%"
        },
        {
          title: "完成时间",
          dataIndex: "finishTime",
          key: "finishTime",
          // customRender: customRender2,
          width: "15%"
        },
        {
          title: "复制",
          dataIndex: "copy",
          key: "copy",
          // width: 60,
          scopedSlots: {
            customRender: "copyIcon"
          },
          align: "center",
          width: "4%"
        }
      ],
      detectDifferencesResultTable: [], //检测差异后的详细信息(table)
      showReleaseResultVisible: false,
      releaseErrorFormulas: [], //预编译错误的表单(正式)
      preReleaseErrorFormulas: [], //(草稿)
      hovered: false,
      checkboxTimer: null,

      releaseFormResultColumns: [
        {
          title: "表单",
          dataIndex: "name",
          key: "name",
          width: "60%"
        },
        {
          title: "进度",
          dataIndex: "progress",
          key: "progress",
          width: "40%",
          scopedSlots: {
            customRender: "progress"
          }
        }
      ],
      releaseFormResultTable: [],

      releaseFormTotal: 0, //发布form 总数量
      releaseFormFinishandError: 0, //发布form 已完成
      trackingFormulaVisible: false
    };
  },
  methods: {
    lock() {
      this.lockVisible = false
      DsUtils.post(
        `${api.markInvalid}`,
        this.getParam("lock")
      ).then(res => {
        if (res.data.success) {
          UiUtils.successMessage(res.data.data);
          this.search(0); //更新数据
        }
      });
    },
    unlock() {
      this.unlockVisible = false
      DsUtils.post(
        `${api.markInvalid}`,
        this.getParam("unlock")
      ).then(res => {
        if (res.data.success) {
          UiUtils.successMessage(res.data.data);
          this.search(0); //更新数据
        } 
      });
    },
    subSearch(arr, dim) {
      console.log("search传递参数");
      console.log(arr, dim); 
      this.selectedForm = arr
      this.filterDimension = dim
      this.search(1) 
    },
    //搜索筛选维 (聚焦,输入,跳页时触发)
    async onSearchDimension(flag) {
      if (flag == "inputSearch") {
        //搜索时跳到第一页
        this.DimensionPage.current = 1;
      }
      // if (this.formName == "") {
      //   UiUtils.errorMessage("请先选择表单");
      //   return;
      // }
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
      this.filterDimension = p;
      this.showDimensionDropdown = false;
    },
    search(flag) {
      //flag 0:跳页/切换每页条数/标记失效,1:查询,2:检测或发布或计算后调用
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

      let precisePublish =
        this.accurateSelect == "all"
          ? ""
          : this.accurateSelect == "failure"
          ? false
            : true;
      let lockFlag =
        this.lockSelect == "all"
          ? null
          : this.lockSelect == "failure"
          ? false
          : true;
      let publishFlag =
        this.structureSelect == "all"
          ? ""
          : this.structureSelect == "failure"
          ? false
          : true;
      let formulaFlag =
        this.formulaSelect == "all"
          ? ""
          : this.formulaSelect == "failure"
          ? false
          : true;
      let calcFlag =
        this.computeSelect == "all"
          ? ""
          : this.computeSelect == "failure"
          ? false
          : true;
      //true是反过来的
      let toDeleteFlag =
        this.deleteSelect == "all"
          ? ""
          : this.deleteSelect == "failure"
          ? true
          : false;

      //查询时,当前页数重置为 1
      if (flag == 1) {
        this.tableConfig.pagination.current = 1;
      }
      //跳页时,在其它地方修改当前页数

      let pageNum = this.tableConfig.pagination.current;
      let obj;

      if (flag != 1) {
        obj = {
          //查询条件 非查询
          bookIds: this.searchInfo.bookIds,
          pageDimFilter: this.searchInfo.pageDimFilter,
          precisePublish: this.searchInfo.precisePublish,
          lockFlag: this.searchInfo.lockFlag,
          publishFlag: this.searchInfo.publishFlag,
          formulaFlag: this.searchInfo.formulaFlag,
          calcFlag: this.searchInfo.calcFlag,
          toDeleteFlag: this.searchInfo.toDeleteFlag,
          pageNum: this.tableConfig.pagination.current,
          pageSize: this.tableConfig.pagination.pageSize
        };
      } else {
        obj = {
          //查询条件 查询
          bookIds: arr,
          pageDimFilter: this.filterDimension,
          precisePublish: precisePublish,
          lockFlag:lockFlag,
          publishFlag: publishFlag,
          formulaFlag: formulaFlag,
          calcFlag: calcFlag,
          toDeleteFlag: toDeleteFlag,
          pageNum: pageNum,
          pageSize: formPageSize
        };
        this.searchInfo = obj;
        //查询的时候,清除缓存勾选
        this.data = {};
        //清除全选缓存
        this.isAllChecked = false;
        this.falseList = [];
      }

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
              let sheetPublishFlag = !p.publishFlag;
              let sheetFormulaFlag = !p.formulaFlag;
              let sheetCalculationFlag = !p.calcFlag;
              let sheetToDeleteFlag = p.toDeleteFlag;
              let accurateDetectionFlag = p.precisePublish;

              let arrobj = {
                key: p.sheetId,
                bookId: p.bookId,
                sheetId: p.sheetId,
                bookName: p.bookName, 
                dimension: p.pageDimName,

                //请区分这里的字段和查询条件中的字段
                //虽然相同，但这里是每个数据的状态
                //查询条件是查询筛选的状态
                draftSign: p.formulaPublish,
                accurateDetectionSign: accurateDetectionFlag,
                lock:p.lockFlag,   
                structureSign: sheetPublishFlag,
                formulaSign: sheetFormulaFlag,
                calculationSign: sheetCalculationFlag,
                deleteSign: sheetToDeleteFlag
              };

              //覆盖缓存
              this.$set(this.data, p.sheetId, arrobj);
              arrData.push(this.data[p.sheetId]);
              //this.tableConfig.dataSource使用的都是this.data里的数据
              //由于使用的是同一个地址
              //structuralFailure在修改this.tableConfig.dataSource时,也会修改对应this.data里的数据
            });
            this.tableConfig.dataSource = arrData;

            this.calculateColumnWidth(this.tableConfig.columns, arrData);
            //search后,重新计算并设置表单名称和筛选维列的宽度

            //这里要等到页面出来后
            //才能获取到title 可是为什么nextTick没用?之前用本地数据时可以
            if (flag == 1) {
              //清空
              this.isChecked = {};
            }
            setTimeout(() => {
              this.init();
            }, 0);
          } else {
            UiUtils.errorMessage(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.tableConfig.loading = false;
        });
    },
    getProgress(id, value) {
      // console.log(id, value);
      let count = 1;
      this.timer = setInterval(() => {
        // console.log(`轮询${count}`);
        DsUtils.get(`${api.getTaskState}?taskId=${id}`)
          .then(res => {
            console.log(res);
            if (res.data.data.state == "finish") {
              clearInterval(this.timer);
              this.percent = 100;
              this.clearChecked(); //清空缓存,勾选等信息
              this.search(2);
              this.isLoading = false;
              this.progressVisible = false;
              if (value == "release") {
                UiUtils.successMessage("发布完成");
              } else if (value == "detect") {
                UiUtils.successMessage("检测差异完成");
                this.showDetectDifferencesResultData(id);
              } else if (value == "releaseandCompute") {
                UiUtils.successMessage("发布并计算完成");
              } else if (value == "compute") {
                UiUtils.successMessage("计算完成");
              } else if (value == "releaseDraft") {
                this.showReleaseDraftResultData(res.data.data.stateInfo);
              }
            } else if (res.data.data.state == "error") {
              //这里可以设置progress为错误样式
              clearInterval(this.timer);
              UiUtils.errorMessage(res.data.data.stateInfo);
              this.isLoading = false;
              this.progressVisible = false;
              if (value == "release" && res.data.data.errorDetail) {
                //如果是release且有errorDetail字段,则发生预编译错误
                let data = JSON.parse(res.data.data.errorDetail);
                console.log(data);
                this.showReleaseErrorData(data); //展示发布预编译错误信息
              } else if (value == "detect") {
                this.showDetectDifferencesResultData(id);
              } else if (value == "releaseDraft") {
                // this.showReleaseDraftResultData(data)
              }
            } else {
              //加载状态
              this.percent = res.data.data.progress;
            }
          })
          .catch(err => {
            clearInterval(this.timer);
            // UiUtils.errorMessage("error");
            console.log(err);
            this.isLoading = false;
            this.progressVisible = false;
          })
          .finally(() => {
            count++;
          });
      }, 500);
    },
    //检测差异,发布,标识需要的参数
    getParam(value) {
      let obj = {
        bookIds: this.searchInfo.bookIds,
        pageDimFilter: this.searchInfo.pageDimFilter,
        precisePublish: this.searchInfo.precisePublish,
        lockFlag:this.searchInfo.lockFlag, 
        toDeleteFlag:this.searchInfo.toDeleteFlag,
        publishFlag: this.searchInfo.publishFlag,
        formulaFlag: this.searchInfo.formulaFlag,
        calcFlag: this.searchInfo.calcFlag,
        toDeleteFlag: this.searchInfo.toDeleteFlag,
        pageNum: this.tableConfig.pagination.current,
        pageSize: this.tableConfig.pagination.pageSize,
        //以上都是本次的查询条件

        selectAll: this.isAllChecked,
        excludeSheetInfos: [],
        selectSheetInfos: [] 
      };

      if (value == "structural") {
        obj = {
          ...obj,
          publishInvalid: false,
          publishRelyFormulaInvalid: true,
          formulaInvalid: true,
          deletedInvalid: false
        };
      } else if (value == "publishRelyFormula") {
        obj = {
          ...obj,
          publishInvalid: true,
          publishRelyFormulaInvalid: false,
          formulaInvalid: true,
          deletedInvalid: false
        };
      } else if (value == "formula") {
        obj = {
          ...obj,
          publishInvalid: true,
          publishRelyFormulaInvalid: true,
          formulaInvalid: false,
          deletedInvalid: false
        };
      } else if (value == "delete") {
        obj = {
          ...obj,
          publishInvalid: true,
          publishRelyFormulaInvalid: true,
          formulaInvalid: true,
          deletedInvalid: true
        };
      } else if (value == "releaseandCompute") {
        obj = {
          ...obj,
          calc: true
        };
      } else if (value == "release") {
        obj = {
          ...obj,
          calc: false
        };
      } else if (value == "accurateDetection") {
      }
      else if (value == "lock") {
        obj = {
          ...obj,
          locked: true
          //这里是设置标识的条件 
        };
      }
      else if (value == "unlock") {
        obj = {
          ...obj,
          locked: false
        }; 
      }

      if (!this.isAllChecked) {
        for (let key in this.data) {
          if (this.isChecked[this.data[key].sheetId]) {
            let formulaPublish = this.data[key].draftSign == true ? true : false;
            let accurateDetectionFlag =
              this.data[key].accurateDetectionSign == true ? true : false;
            let lock = this.data[key].lock == true ? true : false;
            let formulaFlag = this.data[key].formulaSign == true ? false : true;
            let publishFlag = 
              this.data[key].structureSign == true ? false : true;
            let calcFlag =
              this.data[key].calculationSign == true ? false : true;
            let toDeleteFlag = this.data[key].deleteSign == true ? true : false;
            // let formulaPublish = this.data[key].draftSign;
            // let accurateDetectionFlag = this.data[key].accurateDetectionSign;
            // let formulaFlag = !this.data[key].formulaSign;
            // let publishFlag = !this.data[key].structureSign;
            // let calcFlag = !this.data[key].calculationSign;
            // let toDeleteFlag = this.data[key].deleteSign;
            let o = { 
              bookId: this.data[key].bookId,
              bookName: this.data[key].bookName,
              precisePublish: accurateDetectionFlag,
              formulaFlag: formulaFlag,
              lockFlag:lock,
              pageDimName: this.data[key].dimension,
              publishFlag: publishFlag,
              calcFlag: calcFlag,
              sheetId: this.data[key].sheetId,
              toDeleteFlag: toDeleteFlag,
              formulaPublish: formulaPublish
            };
            obj.selectSheetInfos.push(o);
          }
        }
      }
      if (this.isAllChecked) {
        obj.excludeSheetInfos = this.falseList;
      }

      return obj;
    },
    //检测差异
    detectDifferences() {
      this.differencesVisible = false;
      this.isLoading = true;

      this.detectDifferencesResult = {};
      this.detectDifferencesResultTable = [];
      //检测差异时,清除上次结果

      this.progressVisible = true;
      this.percent = 0;
      DsUtils.post(`${api.detectDifferences}`, this.getParam("detect"))
        .then(res => {
          // console.log(res);
          if (res.data.success) {
            this.getProgress(res.data.data, "detect");
            // this.detectDifferencesProgress(res.data.data);
          } else {
            UiUtils.errorMessage(res.data.message);
            this.isLoading = false;
            this.progressVisible = false;
          }
        })
        .catch(err => {
          console.log(err);
          this.isLoading = false;
          this.progressVisible = false;
        });
    },
    //发布
    release(flag) {
      this.releaseVisible = false;
      this.isLoading = true;
      flag = flag == "releaseandCompute" ? "releaseandCompute" : "release";

      this.progressVisible = true;
      this.percent = 0;
      DsUtils.post(`${api.accuratePublish}`, this.getParam(flag))
        .then(res => {
          if (res.data.success) {
            this.getProgress(res.data.data, flag);
            // this.releaseProgress(res.data.data);
          } else {
            UiUtils.errorMessage(res.data.message);
            this.isLoading = false;
            this.progressVisible = false;
          }
        })
        .catch(err => {
          console.log(err);
          this.isLoading = false;
          this.progressVisible = false;
        });
    },
    //草稿版->正式版
    async releaseDraft() {
      this.releaseDraftVisible = false;
      this.isLoading = true;
      this.progressVisible = true;
      this.percent = 0;
      try {
        let res = await api.accuratePublishFormula(
          this.getParam("releaseDraft")
        );

        //调用进度条
        this.getProgress(res.data.data, "releaseDraft");

        // res = res.data.data;
        // this.releaseDraftError = res.errorFormulas;
        // this.releaseDraftSuccess = res.successFormulas;
        // this.showReleaseDraftVisible = true;
        // this.search(2);
        // UiUtils.successMessage("");
        // this.isLoading = false;
      } catch {
        this.isLoading = false;
        this.progressVisible = false;
      }
    },
    showReleaseDraftResultData(res) {
      res = JSON.parse(res);
      this.releaseDraftError = res.errorFormulas;
      this.releaseDraftSuccess = res.successFormulas;
      this.showReleaseDraftVisible = true;
      this.search(2);
      UiUtils.successMessage("执行成功");
      this.isLoading = false;
    },
    //发布form
    async releaseForm() {
      this.releaseFormVisible = false;
      this.isLoading = true;
      try {
        let res = await api.batchFormPublish(this.getParam("releaseForm"));
        if (res.data.success) {
          let data = res.data.data;
          this.releaseFormTotal = data.length; //发布form 总数量
          let arr = []; //每轮的数据结果
          let count = 0; //定时器 计数
          let timer = setInterval(async () => {
            console.log("================");
            count++;
            //第count次 查询所有表单的发布进度
            for (let id = 0; id < data.length; id++) {
              if (count == 1) {
                //第一次,必定每个都要要请求,因此每条数据都push
                let res2 = await api.getTaskState2(data[id].linkId);
                console.log(`第${count}次,请求${data[id].bookName}`);
                let data2 = res2.data.data;
                arr.push({
                  key: data[id].bookId,
                  name: data[id].bookName,
                  progress: data2.progress,
                  state: data2.state,
                  stateInfo: data2.stateInfo
                });
              } else if (
                arr[id].state != "finish" &&
                arr[id].state != "error"
              ) {
                //第2次及以后,如果任务还未完成,则splice
                let res2 = await api.getTaskState2(data[id].linkId);
                console.log(`第${count}次,请求${data[id].bookName}`);
                let data2 = res2.data.data;
                arr.splice(id, 1, {
                  key: data[id].bookId,
                  name: data[id].bookName,
                  progress: data2.progress,
                  state: data2.state,
                  // state:'error',
                  stateInfo: data2.stateInfo
                  // stateInfo:"错误信息错误信息错误信息错误信息错误信息错误信息错误信息错误信息错误信息错误信息错误信息错误信息错误信息错误信息错误信息错误信息错误信息错误信息"
                });
              } else if (arr[id].state == "error") {
                //第2次及以后 如果是finish/error,则不再发送请求
                //如果是error
              }
            }
            let finishorError = 0;
            //记录完成的表单发布(状态为error或finish)
            arr.forEach(p => {
              if (p.state == "error" || p.state == "finish") {
                finishorError++;
              }
            });
            (this.releaseFormFinishandError = finishorError), //发布form 已完成
              (this.releaseFormResultTable = [...arr]);
            this.releaseFormResultTable.unshift({
              key: 0,
              name: "总进度",
              progress: (finishorError * 100) / data.length
            });

            //如果是第一次请求 展示表单
            if (count == 1) {
              this.showReleaseFormResultVisible = true;
            }
            //如果所有表单发布都完成
            if (finishorError >= data.length) {
              clearInterval(timer);
              this.isLoading = false;
              this.clearChecked(); //清空缓存,勾选等信息
              this.search(2); //重新请求
            }
          }, 1000);
        } else {
          this.isLoading = false;
          UiUtils.errorMessage(res.data.message);
        }
      } catch {
        this.isLoading = false;
      }
    },
    //计算
    async compute() {
      this.computeVisible = false;
      this.isLoading = true;

      // this.progressVisible = true;
      this.percent = 0;
      try {
        let res = await api.accuratePublishCalc(this.getParam("compute"));
        if (res.data.success) {
          this.isLoading = false;
          UiUtils.successMessage("计算成功");
          this.clearChecked();
          this.search(2);
          // this.getProgress(res.data.data, "compute");
        } else {
          UiUtils.errorMessage(res.data.message);
          this.isLoading = false;
          // this.progressVisible = false;
        }
      } catch (err) {
        this.isLoading = false;
      }
    },
    //发布并计算
    releaseandCompute() {
      this.releaseandComputeVisible = false;
      this.release("releaseandCompute");
    },
    //置反精准检测
    async accurateDetection() {
      this.accurateDetectionVisible = false;
      console.log(this.getParam("accurateDetection"));
      let res = await api.accurateDetection(this.getParam("accurateDetection"));
      if (res.data.success) {
        UiUtils.successMessage(res.data.data);
        this.search(0); //更新数据
      } else {
        UiUtils.errorMessage(res.data.message);
      }
    },
    //设置结构失效
    structuralFailure() {
      this.structuralFailureVisible = false;
      DsUtils.post(`${api.markInvalid}`, this.getParam("structural")).then(
        res => {
          if (res.data.success) {
            UiUtils.successMessage(res.data.data);
            this.search(0); //更新数据
          }
        }
      );
    },
    //设置结构及下游表单失效
    downstreamFailure() {
      this.downstreamFailureVisible = false;
      DsUtils.post(
        `${api.markInvalid}`,
        this.getParam("publishRelyFormula")
      ).then(res => {
        if (res.data.success) {
          UiUtils.successMessage(res.data.data);
          this.search(0); //更新数据
        }
      });
    },
    //设置公式失效
    formulaFailure() {
      this.formulaFailureVisible = false;
      DsUtils.post(`${api.markInvalid}`, this.getParam("formula")).then(res => {
        if (res.data.success) {
          UiUtils.successMessage(res.data.data);
          this.search(0); //更新数据
        }
      });
    },
    //设置删除
    deleteOperation() {
      this.deleteOperationVisible = false;
      DsUtils.post(`${api.markInvalid}`, this.getParam("delete")).then(res => {
        if (res.data.success) {
          UiUtils.successMessage(res.data.data);
          this.search(0); //更新数据
        }
      });
    },
    //选择数据的chechkbox
    onChangeColumnsCheckbox(e, record) {
      //如果全选时取消这条数据
      if (!e && this.isAllChecked) {
        //记录
        this.falseList.push(record.sheetId);
      }
      //如果全选时取消后,再次勾选这条数据
      if (
        e &&
        this.isAllChecked &&
        this.falseList.indexOf(record.sheetId) != -1
      ) {
        //删除记录
        this.falseList.splice(this.falseList.indexOf(record.sheetId), 1);
      }
      // console.log(this.falseList);
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
      //每次调用search都会执行这个函数
      //根据当前页内容tableConfig.dataSource更新isChecked
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
      // console.log("触发计算checkbox位置");
      //获取pagelist中标题最左的dom
      let title = document.querySelector("[key='sheetId']");
      let checkbox = document.querySelector(".allCheckbox");

      if (checkbox) {
        checkbox.style.left =
          title.getBoundingClientRect().width / 2 - 8 + "px";
        checkbox.style.top =
          title.getBoundingClientRect().height / 2 - 8 - 2 + "px";
        //再计算display,计算差额
      }

      this.isShowTitleCheckbox = true;
    },
    //添加resize事件
    addCheckboxResize() {
      const resizeObserver = new ResizeObserver(entries => {
        // if (this.checkboxTimer == null) {
        //   this.checkboxTimer = setTimeout(() => {
        //     this.createTitleCheckbox()//更新位置
        //     this.checkboxTimer = null
        //   },2000)
        // }
        this.createTitleCheckbox(); //更新位置
      });

      //监听
      document.querySelector(".display .yn-page-list .resizable") &&
        resizeObserver.observe(
          document.querySelector(".display .yn-page-list .resizable")
        );
    },
    //全选
    onChangeAllCheckbox(e) {
      if (e) {
        for (let key in this.isChecked) {
          this.isChecked[key] = true;
        }

        //重新全选全部内容,清空falseList
        this.falseList = [];
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
    //统计选择了多少实例
    getCheckedNum() {
      let num = 0;
      Object.keys(this.data).forEach(p => {
        if (this.isChecked[this.data[p].sheetId]) {
          num++;
        }
      });

      if (num == 0) {
        UiUtils.errorMessage("未选择实例");
      }

      return num;
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

      this.preSelectedForm = [];
      //清空本次选择
      this.selectAll = false;
      this.$refs.list.setSelectAll(false);
      //取消所有选择
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
      // this.selectAll = !this.selectAll;
      this.$refs.list.setSelectAll(this.selectAll);
    },
    //清空勾选
    clearChecked() {
      this.data = {}; //清空已加载数据,防止复用旧数据,跳页时会加载新数据
      this.isAllChecked = false;
      Object.keys(this.isChecked).forEach(p => {
        this.isChecked[p] = false;
      });
      // this.isAllStructuralFailure = "";
      // this.isAllFormulaFailure = "";
      // this.isAllDeleteOperation = "";
    },
    //检测差异完成后,请求详细信息
    showDetectDifferencesResultData(id) {
      //发送请求
      DsUtils.get(`${api.detectDifferencesDetail}?linkId=${id}`)
        .then(res => {
          if (res.data.success) {
            this.detectDifferencesResult = res.data.data;
            //记得检测前清空上次结果
            this.setDetectDifferencesResultTable(res.data.data);
          } else {
            UiUtils.errorMessage(res.data.message);
          }
        })
        .catch(err => {
          UiUtils.errorMessage("");
          console.log(err);
        });

      this.showFormResultVisible = true;
    },
    //检测差异完成后,请求详细信息(table展示)
    setDetectDifferencesResultTable(data) {
      this.detectDifferencesResultTable = [];
      // console.log(data);
      //汇总
      this.detectDifferencesResultTable.push({
        key: 0,
        index: `共${data.totalFormCount}张表单，累计数据：`,
        name: ``,
        beforeDetectTotalSheetCount: data.totalSheetCount || 0,
        afterDetectAddSheetCount: data.totalAddSheetCount || 0,
        afterDetectDelSheetCount: data.totalDelSheetCount || 0,
        afterDetectChangeSheetCount: data.totalChangeCount || 0,
        afterDetectNoChangeSheetCount: data.totalNoChangeCount || 0,
        affectRelyFormCount: data.affectRelyFormCount || 0,
        affectRelySheetCount: data.affectRelySheetCount || 0,
        costTime: data.totalCostTime,
        finishTime: data.finishTime,
        errorDetailMessage: "",
        detectDifferencesSuccess: true,
        copy: "",
        totalFormCount: data.totalFormCount
      });

      data.detailDTOList.forEach((p, index) => {
        this.detectDifferencesResultTable.push({
          key: index + 1,
          index: index + 1,
          name: p.bookName,
          beforeDetectTotalSheetCount: p.beforeDetectTotalSheetCount || 0,
          afterDetectAddSheetCount: p.afterDetectAddSheetCount || 0,
          afterDetectDelSheetCount: p.afterDetectDelSheetCount || 0,
          afterDetectChangeSheetCount: p.afterDetectChangeSheetCount || 0,
          afterDetectNoChangeSheetCount: p.afterDetectNoChangeSheetCount || 0,
          affectRelyFormCount: p.affectRelyFormCount || 0,
          affectRelySheetCount: p.affectRelySheetCount || 0,
          costTime: p.costTime,
          finishTime: p.finishTime,
          errorDetailMessage: "出现错误:" + p.errorDetailMessage,
          detectDifferencesSuccess: p.detectDifferencesSuccess,
          copy: ""
        });
      });
    },
    //复制单条
    copyResult(text, detectDifferencesResult) {
      let str = ``;
      // console.log(detectDifferencesResult);

      if (detectDifferencesResult.key == 0) {
        str = `汇总信息：总计${detectDifferencesResult.totalFormCount ||
          0}张表单/Form，表格/Sheet情况：检测前合计${detectDifferencesResult.beforeDetectTotalSheetCount ||
          0}张，检测后新增${detectDifferencesResult.afterDetectAddSheetCount ||
          0}张，删除${detectDifferencesResult.afterDetectDelSheetCount ||
          0}张，变化${detectDifferencesResult.afterDetectChangeSheetCount ||
          0}张，无变化${detectDifferencesResult.afterDetectNoChangeSheetCount ||
          0}张，影响后续${detectDifferencesResult.affectRelyFormCount ||
          0}张表单/Form，${detectDifferencesResult.affectRelySheetCount ||
          0}张表格/Sheet。累计用时:${
          detectDifferencesResult.costTime
        } ms，完成时间:${detectDifferencesResult.finishTime}`;
      } else if (detectDifferencesResult.detectDifferencesSuccess) {
        str = `表单/Form：${
          detectDifferencesResult.name
        }，表格/Sheet情况：检测前合计${detectDifferencesResult.beforeDetectTotalSheetCount ||
          0}张，检测后新增${detectDifferencesResult.afterDetectAddSheetCount ||
          0}张，删除${detectDifferencesResult.afterDetectDelSheetCount ||
          0}张，变化${detectDifferencesResult.afterDetectChangeSheetCount ||
          0}张，无变化${detectDifferencesResult.afterDetectNoChangeSheetCount ||
          0}张，影响后续${detectDifferencesResult.affectRelyFormCount ||
          0}张表单/Form，${detectDifferencesResult.affectRelySheetCount ||
          0}张表格/Sheet。累计用时：${
          detectDifferencesResult.costTime
        } ms，完成时间：${detectDifferencesResult.finishTime}`;
      } else {
        str = `表单/Form：${detectDifferencesResult.name}，${detectDifferencesResult.errorDetailMessage}，完成时间：${detectDifferencesResult.finishTime}`;
      }

      const textArea = document.createElement("textArea");
      textArea.value = str;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      UiUtils.successMessage("已复制信息");
    },
    //复制全部
    copyAllResult() {
      let str = ``;
      console.log(this.detectDifferencesResultTable);
      this.detectDifferencesResultTable.forEach(p => {
        if (p.key == 0) {
          str += `汇总信息：总计${p.totalFormCount ||
            0}张表单/Form，表格/Sheet情况：检测前合计${p.beforeDetectTotalSheetCount ||
            0}张，检测后新增${p.afterDetectAddSheetCount ||
            0}张，删除${p.afterDetectDelSheetCount ||
            0}张，变化${p.afterDetectChangeSheetCount ||
            0}张，无变化${p.afterDetectNoChangeSheetCount ||
            0}张，影响后续${p.affectRelyFormCount ||
            0}张表单/Form，${p.affectRelySheetCount ||
            0}张表格/Sheet。累计用时:${p.costTime} ms，完成时间:${
            p.finishTime
          }`;
        } else if (p.detectDifferencesSuccess) {
          str += `\n${p.index}、表单/Form：${
            p.name
          }，表格/Sheet情况：检测前合计${p.beforeDetectTotalSheetCount ||
            0}张，检测后新增${p.afterDetectAddSheetCount ||
            0}张，删除${p.afterDetectDelSheetCount ||
            0}张，变化${p.afterDetectChangeSheetCount ||
            0}张，无变化${p.afterDetectNoChangeSheetCount ||
            0}张，影响后续${p.affectRelyFormCount ||
            0}张表单/Form，${p.affectRelySheetCount ||
            0}张表格/Sheet。累计用时：${p.costTime} ms，完成时间：${
            p.finishTime
          }`;
        } else {
          str += `\n${p.index}、表单/Form：${p.name}，${p.errorDetailMessage}，完成时间：${p.finishTime}`;
        }
      });

      const textArea = document.createElement("textArea");
      textArea.value = str;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      UiUtils.successMessage("已复制全部信息");
    },
    showReleaseErrorData(data) {
      this.showReleaseResultVisible = true;
      this.releaseErrorFormulas = [];
      this.preReleaseErrorFormulas = [];

      data.errorFormulas.forEach(p => {
        if (p.isolationType == 1) {
          this.preReleaseErrorFormulas.push(p);
        } else if (p.isolationType == 0) {
          this.releaseErrorFormulas.push(p);
        }
      });
    },
    //在返回数据后 需要做的一些操作
    init() {
      this.createTitleCheckbox();
      this.createIsChecked();
      this.setPageSize();
    },
    //点击行
    rowClick(record) {
      return {
        on: {
          click: event => {
            // console.log('点击了我', record, event,event.target._prevClass)
            this.isChecked[record.sheetId] = !this.isChecked[record.sheetId];
          }
        }
      };
    },
    //计算字符串长度
    getTextWidth(str) {
      let width = 0;
      let html = document.createElement("span");
      html.innerText = str;
      html.className = "getTextWidth";
      document.querySelector("body").appendChild(html);
      width = document.querySelector(".getTextWidth").offsetWidth;
      document.querySelector(".getTextWidth").remove();
      return width;
    },
    //计算列宽
    calculateColumnWidth(column, valArr) {
      //column是列,valArr是data
      //循环每一列
      column.map(v1 => {
        //获取这一列的所有数据arr
        const arr = valArr.map(v2 => {
          return v2[v1.dataIndex];
        });
        //如果是表单名称或筛选维列,则统计数据中最长的width,作为这列的width(至少500)
        let width =
          Math.max.apply(
            Math,
            arr.map(v2 => {
              return this.getTextWidth(v2);
            })
          ) + 40; //20模拟padding
        if (v1.dataIndex == "bookName" || v1.dataIndex == "dimension") {
          // if (v1.width < 500) {
          //   //说明被调整缩小过
          // }
          v1.width = width >= 408 ? width : 408;
          // console.log(v1.title,v1.width);
        }
      });
    },
    handleHoverChange(visible) { 
      // this.clicked = false;
      this.hovered = visible;
    },
    clickListItem(item, index, e) {
      //获取和点击对象一组的checkbox 并手动点击
      e.currentTarget.parentNode.parentNode
        .querySelector(".ant-checkbox-input")
        .click();
    }
  },
  mounted() {
    //加载时默认查询一次
    this.search(1);
    //给tableConfig添加点击事件
    this.$set(this.tableConfig, "customRow", this.rowClick);
    //绑定监听方法 时间设置为0绑不上?可能被更新覆盖了
    setTimeout(() => {
      this.addCheckboxResize();
    }, 1000);
  },
  components: {
    headerSearch
  }
};
</script>
<style scoped>
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

.prBox {
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


.operation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 20px;
} 

.search{
  display: flex; 
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 20px;
} 

.search > * {
  margin-right: 12px;
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
  /* height: 500px; */
  height: 200px;
  flex: 1;
}

.input {
  width: 350px;
  display: flex;
}

/* 对input设置display:flex无效,无法覆盖原本的inline-block 需要!important*/
::v-deep .ant-input-affix-wrapper {
  display: flex !important;
  align-items: center !important;
}

.prBox span {
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

.searchIcon,
.copyIcon {
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

.copyIcon:hover {
  background-color: rgb(192, 205, 223);
}

::v-deep .ant-list-header {
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

::v-deep .ant-spin-nested-loading {
  height: 100%;
}

::v-deep .ant-spin-container {
  height: 100%;
}

::v-deep .ypl-data-panel {
  padding-left: 0 !important;
  padding-right: 0 !important;
  padding-top: 0 !important;
}

/*进度条会导致下拉框闪烁 在这里取消下拉框的动画 */
::v-deep .ant-dropdown {
  pointer-events: auto !important;
  opacity: 1 !important;
}
::v-deep .slide-up-enter,
::v-deep .slide-up-appear {
  animation-duration: 0s;
}

::v-deep .ant-table-pagination {
  margin-right: 20px !important;
}

/* 设置modal固定高度的方法 */
.selectFormModal ::v-deep .ant-modal-body,
.showFormResultModal ::v-deep .ant-modal-body,
.showReleaseResultModal ::v-deep .ant-modal-body,
.showReleaseFormResultModal ::v-deep .ant-modal-body,
.trackingFormula ::v-deep .ant-modal-body,
.showReleaseDraft ::v-deep .ant-modal-body {
  height: 550px;
}

/* 设置modal百分比高度的方法 */
/* .trackingFormula .ant-modal{
  height: 90%;
}
.trackingFormula .ant-modal-content{
  height: 100%;
}
.trackingFormula .ant-modal-body{
  height: 88%;  
} */

.showFormResultModal ::v-deep .ant-modal-close-x,
.showReleaseResultModal ::v-deep .ant-modal-close-x,
.showReleaseFormResultModal ::v-deep .ant-modal-close-x {
  display: none;
}

.ant-divider-vertical {
  margin-left: 0px;
}
</style>
