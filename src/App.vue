<template>
  <div id="app">
    <yn-spin :spinning="spinning" size="large">
      <yn-locale-provider :locale="getLocale()">
        <!-- <MainFrame /> -->
        <!-- 默认页面 -->
        <!-- <mydemo /> -->
        <!-- handsontable功能演示 -->
        <!-- <vueinTable /> -->
        <!-- 组件式渲染器 -->
        <!-- <virtualList /> -->
        <!-- 虚拟列表demo -->
        <!-- <newHandsontable /> -->
        <!-- 使用new来实现表格的demo -->
        <!-- <vueinTablebyNew /> -->
        <!-- 尝试使用new来实现 组件式渲染器 -->
        <!-- <hotDocumentation /> -->
        <!-- 虚拟列表demo2 使用yn-handsontable实现 -->
        <!-- <renderTest /> -->
        <!-- 在ynhot中使用渲染器 -->
        <!-- <debounceTest /> -->
        <!-- 防抖test -->
        <!-- <router-view></router-view> -->
        <!-- 路由页面 -->
        <preciseRelease />

      </yn-locale-provider>
    </yn-spin>
  </div>
</template>

<script>
import preciseRelease from "@/views/preciseRelease/index";
import debounceTest from "@/views/hotDocumentation/debounceTest";
import renderTest from "@/views/hotDocumentation/renderTest";
import hotDocumentation from "@/views/hotDocumentation/index";
import newHandsontable from "@/views/newHandsontable/index";
import vueinTable from "@/views/useVueinTable/index";
import vueinTablebyNew from "@/views/useVueinTablebyNew/index";
import mydemo from "@/views/mydemo/index";
import virtualList from "@/views/virtualList/index";
// import MainFrame from "@/views/platform/ui/MainFrame";
import zh_CN from "yn-p1/libs/assets/platform/local/zh_CN";
import en_US from "yn-p1/libs/assets/platform/local/en_US";
import SecurityUtils from "yn-p1/libs/utils/SecurityUtils";
import Logger from "yn-p1/libs/modules/log/logger";
import AppRouter from "yn-p1/libs/config/navi/router";
import RouterUtils from "yn-p1/libs/utils/RouterUtils";
import UiUtils from "yn-p1/libs/utils/UiUtils";
import DsUtils from "yn-p1/libs/utils/DsUtils";
import { APPS, BACKEND } from "@/config/SETUP";
import menuStructure from "@/config/navi/menuStructure.js";
import customMenuStructure from "@/custom/config/navi/menuStructure.js";
import { OPERATION } from "@/config/custom/";
import { custom as DsUtilsCustom } from "@/custom/noSourceCode/platform/common/DsUtils";
import moment from "moment";
import "moment/locale/zh-cn";
import "moment/locale/en-gb";
import "yn-p1/libs/components/yn-spin/";
import "yn-p1/libs/components/yn-locale-provider/";
import "yn-p1/libs/themes/style/yn-app.less";

// 默认语种
const LOCALE_CODE = "zh_CN";
// 组件多语言语包映射，目前只包含中文和英文
const LANGUAGE_MAP = {
  zh_CN,
  en_US
};
// 多语言语种和moment包映射关系，目前只包含中文和英文
const LANGUAGE_MOMENT_MAP = {
  zh_CN: "zh-cn",
  en_US: "en-gb"
};

export default {
  name: "app",
  data() {

    return {


      
      screenWidth: 0,
      spinning: false,
      localeCode: LOCALE_CODE
    };
  },
  beforeCreate() {
    let BASE_URL = BACKEND.BASE_URL;
    let { query } = this.$route;
    let {
      TOKEN,
      lang,
      appId,
      menuId,
      roleId,
      serviceName = "console",
      securityFlag,
      timeDelta,
      // eslint-disable-next-line no-unused-vars
      origin,
      inTab,
      logoutTargetUrl,
      server: debugServer,
      ignore: debugIgnore
    } = query || {};
    TOKEN = TOKEN && decodeURI(decodeURI(TOKEN));
    lang = lang && decodeURI(decodeURI(lang));
    appId = appId && decodeURI(decodeURI(appId));
    menuId = (menuId && decodeURI(decodeURI(menuId))) || "metadataMenu";
    inTab = (inTab && decodeURI(decodeURI(inTab))) || menuId;
    roleId = roleId && decodeURI(decodeURI(roleId));
    serviceName = (serviceName && decodeURI(decodeURI(serviceName))) || "ecs";
    securityFlag = securityFlag && decodeURI(decodeURI(securityFlag));
    timeDelta = timeDelta && decodeURI(decodeURI(timeDelta));
    origin = origin && decodeURIComponent(origin);
    logoutTargetUrl = logoutTargetUrl && decodeURIComponent(logoutTargetUrl);
    if (debugServer) {
      // 调试服务
      BASE_URL = debugServer;
    } else if (BASE_URL.indexOf("/") === 0) {
      BASE_URL = window.location.origin + serviceName;
    }
    let urlServiceName = serviceName;
    let EcsOrigin = BASE_URL || window.location.origin;
    DsUtilsCustom(DsUtils);
    DsUtils.addGlobalRequestInterceptor(
      config => {
        let { headers, url } = config || {};
        const { ServiceName, appId: selectAppId } = headers || {};
        headers.LoginToken = TOKEN;
        headers.appId = selectAppId || appId;
        headers.MenuId = menuId;
        headers.ServiceName = ServiceName || serviceName;
        urlServiceName = ServiceName || serviceName;
        if (!url.match(/^(http|https)/)) {
          if (!url.match(/^\//)) {
            url = "/" + url;
          }
          if (debugServer) {
            // 调试服务
            if (debugIgnore && debugIgnore === "true") {
              config.url = debugServer + url;
            } else {
              config.url = debugServer + "/" + urlServiceName + url;
            }
          } else {
            config.url = EcsOrigin + "/" + urlServiceName + url;
          }
        }
        config.url = config.url.replace(/(?=:\/.*)(\/\/*)/g, "/");
        if (securityFlag && securityFlag === "true") {
          let sha = SecurityUtils.getShaId(
            TOKEN,
            config.url,
            config.data || config.params,
            config.headers["Content-Type"],
            config.method,
            !!config.params,
            config
          );
          let { stid, Timestamp } = sha;
          config.headers.stid = stid;
          config.headers.Timestamp = Timestamp;
        }
        return config;
      },
      err => DsUtils.axiosErrorHandler(err)
    );
    let serverUrl = "";
    if (debugServer) {
      if (debugIgnore && debugIgnore === "true") {
        serverUrl = debugServer;
      } else {
        serverUrl = debugServer + "/" + urlServiceName + "/";
      }
    } else {
      serverUrl = EcsOrigin + "/" + urlServiceName + "/";
    }
    DsUtils.addGlobalResponseInterceptor(
      response => DsUtils.axiosResponseHandler(response),
      err => DsUtils.axiosErrorHandler(err)
    );
    DsUtils.init(serverUrl, `${inTab}_${APPS.NAME || ""}`);
    DsUtils.setSessionStorageItem("lang", lang || "zh_CN")
      .setSessionStorageItem("TOKEN", TOKEN || "")
      .setSessionStorageItem("appId", appId)
      .setSessionStorageItem("MenuId", menuId)
      .setSessionStorageItem("roleId", roleId || "")
      .setSessionStorageItem("ServiceName", serviceName)
      .setSessionStorageItem("timeDelta", timeDelta)
      .setSessionStorageItem("securityFlag", securityFlag)
      .setSessionStorageItem("logoutTargetUrl", logoutTargetUrl);
    UiUtils.init(this);
    RouterUtils.init(this);
  },
  components: {
    // MainFrame,
    mydemo,
    vueinTable,
    virtualList,
    newHandsontable,
    vueinTablebyNew,
    hotDocumentation,
    renderTest,
    debounceTest,
    preciseRelease
  },
  created() {
    let language = APPS.LANGUAGE || LOCALE_CODE;
    this.localeCode = language;
    moment.locale(LANGUAGE_MOMENT_MAP[language]);
    AppRouter.loadMenu(this, this.getMergedMenuStructure());
  },
  methods: {
    getLocale() {
      return LANGUAGE_MAP[this.localeCode];
    },
    setWidth() {
      this.screenWidth = document.body.offsetWidth;
    },
    getMergedMenuStructure() {
      const mergedMenuStructure = [...menuStructure];
      customMenuStructure.forEach(customMenu => {
        let { operation = OPERATION.INSERT_AFTER, target } =
          customMenu.custom || {};
        let mergedMenuIndex = -1;
        if (target) {
          mergedMenuIndex = mergedMenuStructure.findIndex(
            mergedMenu => mergedMenu.meta.appId === target
          );
        } else {
          mergedMenuIndex = mergedMenuStructure.length - 1;
        }
        switch (operation) {
          case OPERATION.DELETE:
            mergedMenuStructure.splice(mergedMenuIndex, 1);
            break;
          case OPERATION.INSERT_BEFORE:
            mergedMenuStructure.splice(mergedMenuIndex, 0, customMenu);
            break;
          case OPERATION.INSERT_AFTER:
            mergedMenuStructure.splice(mergedMenuIndex + 1, 0, customMenu);
            break;
          case OPERATION.REPLACE:
            mergedMenuStructure.splice(mergedMenuIndex, 1, customMenu);
            break;
          default:
            Logger.error(
              `operation ${operation} in custom menu structure is not supported`
            );
            break;
        }
        delete customMenu.custom;
      });
      return mergedMenuStructure;
    }
  },
  mounted() {
    let that = this;
    that.setWidth();
    window.onresize = () => {
      that.setWidth();
    };
  }
};
</script>

<style scoped>
#app > .ant-spin-nested-loading {
  height: 100%;
  position: static; /* fix the tree context menu position is not right issue. */
}
#app > .ant-spin-nested-loading > .ant-spin-container {
  position: static; /* fix the tree context menu position is not right issue. */
}

#app > .ant-spin-nested-loading > div > .ant-spin-spinning {
  max-height: inherit;
}


</style>
