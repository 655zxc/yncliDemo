import Vue from "vue";
import App from "./App.vue";
import "normalize.css/normalize.css";
import { LOG, APPS, BACKEND } from "./config/SETUP";
import Logger from "yn-p1/libs/modules/log/logger";
import store from "./store/";
import VueRouter from "vue-router";
import UrlUtils from "yn-p1/libs/utils/UrlUtils";
import DsUtils from "yn-p1/libs/utils/DsUtils";
import YnP1 from "yn-p1";
import "@/themes/theme.less";

// 开启组件库响应式
// YnP1.responsive.init();

const urlLogLevel = UrlUtils.getQuery("logLevel");
// url上的自定参数的优先级最高
const logLevel = urlLogLevel ? Number(urlLogLevel) : LOG.LEVEL;
let { i18n } = YnP1.instances;
Logger.option("level", logLevel);
Logger.warn(
  `Platform Log Level: ${
    logLevel === 2
      ? "2 - Warn"
      : logLevel === 3
      ? "3 - Info"
      : logLevel === 4
      ? "4 - Log"
      : ""
  }`
);

Vue.config.productionTip = false;

Vue.use(VueRouter);
let router = new VueRouter({
  routes: []
});
YnP1.setup(LOG, APPS, BACKEND);
router.beforeEach((to, from, next) => {
  let params = {
    to,
    // headers: {
    //     Sbox: "default"
    // },
    // 若lang不传或为空，getTranslationData方法内会优先从to.query中取lang、其次sessionStorege、localStorege、若都不存在则默认"zh_CN"
    // lang:"",
    modules: [
      //   "common"
    ],
    keys: [
      //   "common.add"
    ]
  };
  DsUtils.getTranslationData(params);
  next();
});
new Vue({
  i18n,
  //router will be updated whild App is created
  router,
  store,
  render: h => h(App)
}).$mount("#app");
