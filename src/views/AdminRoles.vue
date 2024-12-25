<template>
  <el-container>
    <el-header>角色管理</el-header>
    <el-main>
      <el-table :data="roles" style="width: 100%">
        <el-table-column label="角色名称" prop="name"></el-table-column>
        <el-table-column label="描述" prop="description"></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button @click="editRole(row)" size="mini">编辑</el-button>
            <el-button @click="deleteRole(row.id)" type="danger" size="mini"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      roles: [], // 存储角色数据
    };
  },
  created() {
    this.getRoles(); // 页面加载时获取角色列表
  },
  methods: {
    // 获取所有角色
    async getRoles() {
      try {
        const response = await axios.get("/api/admin/roles");
        this.roles = response.data; // 将获取到的角色数据赋值给 roles
      } catch (error) {
        console.error("获取角色数据失败", error);
        this.$message({
          type: "error",
          message: "获取角色数据失败，请稍后再试",
        });
      }
    },
    // 删除角色
    async deleteRole(roleId) {
      try {
        await axios.delete(`/api/admin/roles/${roleId}`);
        this.getRoles(); // 删除成功后重新获取角色列表
        this.$message({
          type: "success",
          message: "角色删除成功",
        });
      } catch (error) {
        console.error("删除角色失败", error);
        this.$message({
          type: "error",
          message: "删除失败，请稍后再试",
        });
      }
    },
    // 编辑角色
    editRole(role) {
      this.$router.push({ name: "EditRole", params: { id: role.id } });
    },
  },
};
</script>

<style scoped>
/* 根据需要添加自定义样式 */
</style>
