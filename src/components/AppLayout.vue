<template>
  <div class="layout-container">
    <!-- 顶部导航栏 -->
    <el-header class="header">
      <div class="logo">管理后台</div>
      <el-menu
        :default-active="activeMenu"
        mode="horizontal"
        class="top-nav"
        @select="handleMenuSelect"
      >
        <el-menu-item index="1" @click="goToDashboard">首页</el-menu-item>
        <el-menu-item index="2" @click="goToUsers">用户管理</el-menu-item>
        <el-menu-item index="3" @click="goToSettings">设置</el-menu-item>
        <el-menu-item index="4" @click="goToAttractions">景点管理</el-menu-item>
        <!-- 新增景点管理菜单项 -->
      </el-menu>
    </el-header>

    <div class="main-container">
      <!-- 侧边栏 -->
      <el-aside width="200px" class="sidebar">
        <el-menu
          :default-active="activeMenu"
          class="el-menu"
          @select="handleMenuSelect"
        >
          <el-menu-item index="1" @click="goToDashboard">首页</el-menu-item>
          <el-menu-item index="2" @click="goToUsers">用户管理</el-menu-item>
          <el-menu-item index="3" @click="goToSettings">设置</el-menu-item>
          <el-menu-item index="4" @click="goToAttractions"
            >景点管理</el-menu-item
          >
        </el-menu>
      </el-aside>

      <!-- 主体内容 -->
      <el-main class="el-main">
        <router-view></router-view>
        <!-- 用来显示匹配的子路由组件 -->
      </el-main>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppLayout",
  data() {
    return {
      activeMenu: "1", // 默认激活的菜单项
    };
  },
  methods: {
    goToDashboard() {
      this.$router.push("/dashboard"); // 跳转到首页
    },
    goToUsers() {
      this.$router.push("/dashboard/users"); // 跳转到用户管理
    },
    goToSettings() {
      this.$router.push("/dashboard/settings"); // 跳转到设置页面
    },
    goToAttractions() {
      this.$router.push("/dashboard/attractions"); // 跳转到景点管理
    },
    handleMenuSelect(index) {
      this.activeMenu = index; // 更新激活的菜单项
    },
  },
  watch: {
    // 监听路由变化，动态更新菜单项的激活状态
    "$route.path"(newPath) {
      if (newPath === "/dashboard") {
        this.activeMenu = "1"; // 首页
      } else if (newPath === "/dashboard/users") {
        this.activeMenu = "2"; // 用户管理
      } else if (newPath === "/dashboard/settings") {
        this.activeMenu = "3"; // 设置
      } else if (newPath === "/dashboard/attractions") {
        this.activeMenu = "4"; // 景点管理
      }
    },
  },
};
</script>

<style scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  background-color: #2c3e50;
  color: white;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.top-nav {
  background-color: #2c3e50;
  border-bottom: 1px solid #34495e;
}

.top-nav .el-menu-item {
  color: white;
}

.main-container {
  display: flex;
  flex-grow: 1;
}

.sidebar {
  background-color: #2c3e50;
  color: white;
  height: 100%;
}

.el-menu {
  background-color: #2c3e50;
  height: 100%;
}

.el-menu-item {
  color: white;
}

.el-main {
  padding: 20px;
  flex-grow: 1;
}
</style>
