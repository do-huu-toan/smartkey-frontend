import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import MaterialDashboard from "./material-dashboard";
import "ant-design-vue/dist/antd.css";
import VueSocketIO from "vue-3-socket.io";
import SocketIO from "socket.io-client";
import utils from "./utils";
const appInstance = createApp(App);
appInstance.use(
  new VueSocketIO({
    debug: true,
    connection: SocketIO(process.env.VUE_APP_SOCKET_URL, {
      auth: {
        token: utils.getToken(),
      },
    }),
  })
);
appInstance.use(store);
appInstance.use(router);
appInstance.use(MaterialDashboard);
appInstance.mount("#app");
