<!-- src/views/Users.vue -->
<template>
  <div class="users">
    <h2>用户管理</h2>
    <el-table :data="users" style="width: 100%">
      <el-table-column label="用户名" prop="username"></el-table-column>
      <el-table-column label="手机号码" prop="phone"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button @click="editUser(scope.row)" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "UsersList",
  data() {
    return {
      users: [
        { username: "admin", phone: "1234567890", email: "admin@example.com" },
        { username: "user1", phone: "0987654321", email: "user1@example.com" },
      ],
    };
  },
  methods: {
    editUser(user) {
      this.$message.info(`编辑用户: ${user.username}`);
    },
  },
};
</script>

<style scoped>
.users {
  padding: 20px;
}
</style>
