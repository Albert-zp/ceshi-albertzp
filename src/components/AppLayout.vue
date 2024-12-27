<template>
  <el-container>
    <!-- 顶部导航栏 -->
    <el-header class="header">
      <div class="logo">管理后台</div>
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
          <el-menu-item index="5" @click="goToAccountManagement"
            >账号管理</el-menu-item
          >
          <el-menu-item index="6" @click="goToRegions">区域管理</el-menu-item>
          <el-menu-item index="6" @click="goToHotCities"
            >热门城市管理</el-menu-item
          >
          <!-- 新增区域管理入口 -->
        </el-menu>
      </el-aside>

      <!-- 主体内容 -->
      <el-main class="el-main">
        <router-view></router-view>
      </el-main>
    </div>
  </el-container>
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
    goToAccountManagement() {
      this.$router.push("/dashboard/AdminUsers"); // 跳转到账号管理页面
    },
    goToRegions() {
      this.$router.push("/dashboard/regionlist"); // 跳转到区域管理页面
    },
    goToHotCities() {
      this.$router.push("/dashboard/hot-cities"); // 跳转到热门城市管理页面
    },
    handleMenuSelect(index) {
      this.activeMenu = index; // 更新激活的菜单项
    },
  },
  watch: {
    "$route.path"(newPath) {
      if (newPath === "/dashboard") {
        this.activeMenu = "1"; // 首页
      } else if (newPath === "/dashboard/users") {
        this.activeMenu = "2"; // 用户管理
      } else if (newPath === "/dashboard/settings") {
        this.activeMenu = "3"; // 设置
      } else if (newPath === "/dashboard/attractions") {
        this.activeMenu = "4"; // 景点管理
      } else if (newPath === "/dashboard/AdminUsers") {
        this.activeMenu = "5"; // 账号管理
      } else if (newPath === "/dashboard/regions") {
        this.activeMenu = "6"; // 区域管理
      } else if (newPath === "/dashboard/hot-cities") {
        this.activeMenu = "7"; // 热门城市管理
      }
    },
  },
};
</script>

<style scoped>
/* 清除浏览器默认的 margin 和 padding */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  overflow-x: hidden;
}

/* 整体布局容器，确保内容撑满全屏 */
.layout-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* 顶部导航栏 */
.header {
  background-color: #2c3e50;
  color: white;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: fixed; /* 强制固定在浏览器顶部 */
  top: 0;
  left: 0;
  right: 0;
  height: 60px; /* 明确指定高度 */
  padding: 0 20px;
  z-index: 10; /* 确保在顶部 */
}

/* logo 样式 */
.logo {
  font-size: 24px;
  font-weight: bold;
  color: white;
}

/* 主体容器区域 */
.main-container {
  display: flex;
  flex-grow: 1;
  padding-top: 60px; /* 给主体内容留出顶部导航栏的空间 */
  height: 100%;
  margin-left: 0; /* 确保主容器没有额外的左边距 */
}

/* 侧边栏样式 */
.sidebar {
  background-color: #2c3e50;
  color: white;
  position: fixed; /* 使侧边栏固定在页面左侧 */
  top: 60px; /* 顶部导航栏的高度，确保导航栏下方开始显示 */
  bottom: 0; /* 从顶部到页面底部 */
  left: 0; /* 确保侧边栏贴合左边缘 */
  width: 200px; /* 设置侧边栏的宽度 */
  box-shadow: 4px 0 6px rgba(0, 0, 0, 0.1);
}

/* 侧边栏菜单 */
.el-menu {
  background-color: #2c3e50;
  height: 100%; /* 使菜单区域填满侧边栏 */
  padding-top: 20px;
}

.el-menu-item {
  color: white;
  font-size: 16px;
}

.el-menu-item:hover {
  background-color: #34495e;
}

/* 主内容区 */
.el-main {
  padding: 20px;
  flex-grow: 1;
  background-color: #ffffff;
  box-shadow: 4px 0 6px rgba(0, 0, 0, 0.1);
  margin-left: 200px; /* 给内容区留出左侧导航栏的空间 */
}

.el-main router-view {
  padding: 10px;
}
</style>
