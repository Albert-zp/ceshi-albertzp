<!-- src/views/DashboardPage.vue -->
<template>
  <div class="dashboard">
    <el-row>
      <el-col :span="24">
        <el-card>
          <h2>欢迎来到管理后台</h2>
          <el-button type="primary" @click="goToUsers">管理用户</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "DashboardPage", // 确保是多单词的组件名
  methods: {
    goToUsers() {
      this.$router.push("/users"); // 跳转到用户管理页面
    },
  },
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
}
</style>
