import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/LoginPage.vue"; // 确保路径正确
import HomePage from "../views/HomePage.vue"; // 确保路径正确
import DashboardPage from "../views/DashboardPage.vue"; // 管理端首页
import SettingsPage from "../views/SettingsPage.vue"; // 导入正确的路径
import AppLayout from "../components/AppLayout.vue"; // 导入 Layout 布局
import AttractionsPage from "../views/AttractionsPage.vue";
import UsersPage from "../views/UsersPage.vue";
import HotCitiesPage from "../views/HotCitiesPage.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: LoginPage, // 路由到 Login 页面
  },
  {
    path: "/home",
    name: "Home",
    component: HomePage, // 路由到 Home 页面
  },
  {
    path: "/dashboard",
    component: AppLayout, // 使用 Layout 作为父路由
    children: [
      {
        path: "",
        name: "Dashboard",
        component: DashboardPage, // 管理端首页
      },
      {
        path: "users",
        name: "Users",
        component: () => import("../views/UsersList.vue"), // 用户管理页面
      },
      {
        path: "settings",
        name: "Settings",
        component: SettingsPage, // 使用SettingsPage组件
      },
      {
        path: "attractions",
        name: "Attractions",
        component: AttractionsPage,
      },
      {
        path: "users",
        name: "Users",
        component: UsersPage,
      },
      {
        path: "hot-cities",
        name: "HotCities",
        component: HotCitiesPage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
