<template>
  <el-container>
    <el-header>页面权限管理</el-header>
    <el-main>
      <el-table :data="permissions" style="width: 100%">
        <el-table-column label="页面名称" prop="name"></el-table-column>
        <el-table-column label="权限描述" prop="description"></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button @click="editPermission(row)" size="mini">编辑</el-button>
            <el-button
              @click="deletePermission(row.id)"
              type="danger"
              size="mini"
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
      permissions: [], // 存储权限数据
    };
  },
  created() {
    this.getPermissions(); // 页面加载时获取权限列表
  },
  methods: {
    // 获取所有权限
    async getPermissions() {
      try {
        const response = await axios.get("/api/admin/permissions");
        this.permissions = response.data; // 将获取到的权限数据赋值给 permissions
      } catch (error) {
        console.error("获取权限数据失败", error);
        this.$message({
          type: "error",
          message: "获取权限数据失败，请稍后再试",
        });
      }
    },
    // 删除权限
    async deletePermission(permissionId) {
      try {
        await axios.delete(`/api/admin/permissions/${permissionId}`);
        this.getPermissions(); // 删除成功后重新获取权限列表
        this.$message({
          type: "success",
          message: "权限删除成功",
        });
      } catch (error) {
        console.error("删除权限失败", error);
        this.$message({
          type: "error",
          message: "删除失败，请稍后再试",
        });
      }
    },
    // 编辑权限
    editPermission(permission) {
      this.$router.push({
        name: "EditPermission",
        params: { id: permission.id },
      });
    },
  },
};
</script>

<style scoped>
/* 根据需要添加自定义样式 */
</style>
