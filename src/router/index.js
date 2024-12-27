import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/LoginPage.vue"; // 登录页面
import HomePage from "../views/HomePage.vue"; // 首页
import DashboardPage from "../views/DashboardPage.vue"; // 管理端首页
import SettingsPage from "../views/SettingsPage.vue"; // 设置页面
import AppLayout from "../components/AppLayout.vue"; // 布局组件
import AttractionsPage from "../views/AttractionsPage.vue"; // 景点列表页
import UsersPage from "../views/UsersPage.vue"; // 用户管理
import HotCitiesPage from "../views/HotCitiesList.vue"; // 热门城市列表页
import AttractionDetail from "../views/AttractionDetail.vue"; // 景点详情页面
import CreateAttraction from "../views/CreateAttraction.vue"; // 新建景点页面
import AdminUsers from "../views/AdminUsers.vue"; // 管理员用户管理
import EditAttraction from "../views/EditAttraction.vue"; // 编辑景点页面
import CreateRegion from "../views/CreateRegion.vue"; // 新建区域页面
import EditRegion from "../views/EditRegion.vue"; // 编辑区域页面
import RegionList from "../views/RegionList.vue"; // 区域管理页面
import AddHotCityPage from "../views/AddHotCityPage.vue";

// 定义路由
const routes = [
  {
    path: "/",
    name: "Login",
    component: LoginPage, // 登录页面
  },
  {
    path: "/home",
    name: "Home",
    component: HomePage, // 首页
  },
  {
    path: "/dashboard",
    component: AppLayout, // 布局组件
    children: [
      {
        path: "",
        name: "Dashboard",
        component: DashboardPage, // 管理端首页
      },
      {
        path: "users",
        name: "Users",
        component: UsersPage, // 用户管理页面
      },
      {
        path: "settings",
        name: "Settings",
        component: SettingsPage, // 设置页面
      },
      {
        path: "attractions",
        name: "Attractions",
        component: AttractionsPage, // 景点管理页面
      },
      {
        path: "/attractions/:id", // 动态参数 :id 用于传递景点ID
        name: "AttractionDetail",
        component: AttractionDetail, // 景点详情页面
      },
      {
        path: "/create-attraction", // 新建景点的 URL 路径
        name: "CreateAttraction", // 路由的名字
        component: CreateAttraction, // 新建景点页面的组件
      },
      {
        path: "/attractions/:id/edit", // 用:id来接收景点ID
        name: "EditAttraction",
        component: EditAttraction, // 编辑景点页面
      },
      {
        path: "regionlist",
        name: "RegionList",
        component: RegionList, // 区域管理页面
      },
      {
        path: "/regions/create",
        name: "CreateRegion",
        component: CreateRegion, // 新建区域页面
      },
      {
        path: "/regions/edit/:id",
        name: "EditRegion",
        component: EditRegion, // 编辑区域页面
      },
      {
        path: "hot-cities", // 热门城市列表页
        name: "HotCities",
        component: HotCitiesPage, // 热门城市页面
      },
      {
        path: "/add-hot-city",
        name: "AddHotCityPage",
        component: AddHotCityPage, // 添加热门城市页面
      },
      {
        path: "AdminUsers",
        name: "AdminUsers",
        component: AdminUsers, // 管理员用户管理页面
      },
      {
        path: "AdminRoles",
        name: "AdminRoles",
        component: () => import("../views/AdminRoles.vue"), // 动态加载角色管理页面
      },
      {
        path: "AdminPermissions",
        name: "AdminPermissions",
        component: () => import("../views/AdminPermissions.vue"), // 动态加载权限管理页面
      },
    ],
  },
];

// 创建路由
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
