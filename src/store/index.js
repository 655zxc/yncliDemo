import Vue from "vue";
import Vuex from "vuex";
import routerState from "./navi/";
import themeState from "./theme/";
import createLogger from "vuex/dist/logger";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  namespaced: true,
  modules: { routerState, themeState},
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
