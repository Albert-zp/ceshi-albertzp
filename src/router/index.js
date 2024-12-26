import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/LoginPage.vue"; // 确保路径正确
import HomePage from "../views/HomePage.vue"; // 确保路径正确
import DashboardPage from "../views/DashboardPage.vue"; // 管理端首页
import SettingsPage from "../views/SettingsPage.vue"; // 导入正确的路径
import AppLayout from "../components/AppLayout.vue"; // 导入 Layout 布局
import AttractionsPage from "../views/AttractionsPage.vue";
import UsersPage from "../views/UsersPage.vue";
import HotCitiesPage from "../views/HotCitiesPage.vue";
import AttractionDetail from "../views/AttractionDetail.vue"; // 景点详情页面
import CreateAttraction from "../views/CreateAttraction.vue"; // 导入新建景点页面组件
import AdminUsers from "../views/AdminUsers.vue";
import EditAttraction from "../views/EditAttraction.vue";
import CreateRegion from "../views/CreateRegion.vue";
import EditRegion from "../views/EditRegion.vue";
import RegionList from "../views/RegionList.vue"; // 区域管理页面

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
        path: "/attractions/:id", // 动态参数 :id 用于传递景点ID
        name: "AttractionDetail",
        component: AttractionDetail,
      },
      {
        path: "/create-attraction", // 新建景点的 URL 路径
        name: "CreateAttraction", // 路由的名字
        component: CreateAttraction, // 新建景点页面的组件
      },
      {
        path: "/attractions/:id/edit", // 用:id来接收景点ID
        name: "EditAttraction",
        component: EditAttraction,
      },
      {
        path: "regionlist",
        name: "RegionList",
        component: RegionList,
      },
      {
        path: "/regions/create",
        name: "CreateRegion",
        component: CreateRegion,
      },
      {
        path: "/regions/edit/:id",
        name: "EditRegion",
        component: EditRegion,
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
      {
        path: "AdminUsers",
        name: "AdminUsers",
        component: AdminUsers,
      },
      {
        path: "AdminRoles",
        name: "AdminRoles",
        component: () => import("../views/AdminRoles.vue"),
      },
      {
        path: "AdminPermissions",
        name: "AdminPermissions",
        component: () => import("../views/AdminPermissions.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
