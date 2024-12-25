<template>
  <el-container>
    <!-- 头部 -->
    <el-header class="header">
      <span>账号管理</span>
    </el-header>

    <!-- 主体内容 -->
    <el-main class="main-content">
      <!-- 搜索框 -->
      <el-row class="search-row">
        <el-col :span="8">
          <el-input
            v-model="searchQuery"
            placeholder="请输入用户名或手机号搜索"
            clearable
            suffix-icon="el-icon-search"
            @input="handleSearch"
          />
        </el-col>
      </el-row>

      <!-- 用户列表表格 -->
      <el-table :data="filteredUsers" style="width: 100%" :loading="loading">
        <!-- 用户名列 -->
        <el-table-column
          label="用户名"
          prop="username"
          width="180"
        ></el-table-column>

        <!-- 手机号列 -->
        <el-table-column
          label="手机号"
          prop="phone_number"
          width="180"
        ></el-table-column>

        <!-- 操作列 -->
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <!-- 编辑按钮 -->
            <el-button @click="editUser(row)" size="mini" type="primary"
              >编辑</el-button
            >
            <!-- 删除按钮 -->
            <el-button
              @click="deleteUser(row.id)"
              type="danger"
              size="mini"
              style="margin-left: 10px"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        v-if="totalUsers > 0"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="totalUsers"
        layout="total, prev, pager, next"
        @current-change="handlePageChange"
      ></el-pagination>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      users: [], // 存储用户数据
      searchQuery: "", // 搜索框内容
      loading: false, // 加载状态
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页显示条数
      totalUsers: 0, // 用户总数
    };
  },
  computed: {
    // 筛选后的用户列表
    filteredUsers() {
      return this.users.filter((user) => {
        return (
          user.username.includes(this.searchQuery) ||
          user.phone_number.includes(this.searchQuery)
        );
      });
    },
  },
  created() {
    this.getUsers(); // 页面加载时获取用户列表
  },
  methods: {
    // 获取所有用户
    async getUsers() {
      try {
        this.loading = true; // 开始加载数据
        const response = await axios.get("/api/admin/users", {
          params: {
            page: this.currentPage,
            pageSize: this.pageSize,
          },
        });
        this.users = response.data.users; // 将获取到的用户数据赋值给 users
        this.totalUsers = response.data.total; // 用户总数
        this.loading = false; // 加载完成
      } catch (error) {
        console.error("获取用户数据失败", error);
        this.loading = false;
        this.$message({
          type: "error",
          message: "获取用户数据失败，请稍后再试",
        });
      }
    },
    // 删除用户
    async deleteUser(userId) {
      try {
        await axios.delete(`/api/admin/users/${userId}`);
        this.getUsers(); // 删除成功后重新获取用户列表
        this.$message({
          type: "success",
          message: "用户删除成功",
        });
      } catch (error) {
        console.error("删除用户失败", error);
        this.$message({
          type: "error",
          message: "删除失败，请稍后再试",
        });
      }
    },
    // 编辑用户
    editUser(user) {
      this.$router.push({ name: "EditUser", params: { id: user.id } });
    },
    // 处理搜索框输入
    handleSearch() {
      this.currentPage = 1; // 搜索时重置为第一页
      this.getUsers(); // 重新获取用户数据
    },
    // 页码变化时重新获取用户数据
    handlePageChange(page) {
      this.currentPage = page;
      this.getUsers();
    },
  },
};
</script>

<style scoped>
/* 头部样式 */
.header {
  background-color: #409eff;
  color: white;
  font-size: 18px;
  padding: 10px;
  text-align: center;
}

/* 主体内容样式 */
.main-content {
  padding: 20px;
  background-color: #f9f9f9;
}

/* 搜索框样式 */
.search-row {
  margin-bottom: 20px;
}

/* 表格样式 */
.el-table {
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.el-table th {
  background-color: #f4f4f4;
  color: #333;
}

.el-table .el-button {
  width: 70px;
  font-size: 14px;
}
</style>
