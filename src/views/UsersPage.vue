<!-- src/views/UsersPage.vue -->
<template>
  <div class="users-container">
    <h1>用户管理</h1>
    <el-table :data="users" style="width: 100%">
      <el-table-column
        prop="username"
        label="用户名"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="phone_number"
        label="手机号码"
        width="180"
      ></el-table-column>
      <el-table-column label="操作" width="180">
        <template v-slot="scope">
          <el-button @click="deleteUser(scope.row.id)" type="danger"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getUsers, deleteUser } from "../api/api";

export default {
  name: "UsersPage",
  data() {
    return {
      users: [], // 用来存储用户数据
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    // 获取用户列表
    fetchUsers() {
      getUsers()
        .then((response) => {
          this.users = response.data; // 将后端数据赋值给 users
        })
        .catch((error) => {
          console.error("获取用户列表失败", error);
        });
    },
    // 删除用户
    deleteUser(id) {
      deleteUser(id)
        .then(() => {
          this.fetchUsers(); // 删除成功后重新获取用户列表
          this.$message({
            type: "success",
            message: "删除成功",
          });
        })
        .catch((error) => {
          console.error("删除用户失败", error);
        });
    },
  },
};
</script>

<style scoped>
.users-container {
  padding: 20px;
}

.el-table {
  margin-top: 20px;
}
</style>
