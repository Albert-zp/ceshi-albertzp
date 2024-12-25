import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // 引入路由配置
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

createApp(App)
  .use(router) // 使用 Vue Router
  .use(ElementPlus) // 使用 Element Plus
  .mount("#app");
