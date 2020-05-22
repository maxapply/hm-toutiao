import Vue from "vue";
import App from "./App.vue";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./styles/index.less";

import router from "./router/index.js";

import axios from "./api/index.js";

import plugin from "./plugin";

// import axios from 'axios'

// axios.defaults.headers.Authorization = `Bearer ${auth.getUser().token}`
Vue.prototype.$http = axios;

Vue.use(ElementUI);
Vue.use(plugin);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router
  // axios
}).$mount("#app");
