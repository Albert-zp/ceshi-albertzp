<template>
  <el-container>
    <el-header>行政区划列表</el-header>
    <el-main>
      <el-button type="primary" @click="goToCreatePage">新建区域</el-button>
      <el-table :data="regions" style="width: 100%">
        <el-table-column
          prop="name"
          label="区域名称"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="level"
          label="级别"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="parentId"
          label="父级区域"
          width="180"
        ></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button @click="editRegion(scope.row.id)" size="mini"
              >编辑</el-button
            >
            <el-button
              @click="deleteRegion(scope.row.id)"
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
import { getRegions } from "../api/api"; // 假设你有一个 API 文件

export default {
  data() {
    return {
      regions: [], // 存放区域数据
    };
  },
  created() {
    this.fetchRegions();
  },
  methods: {
    // 获取行政区划数据
    async fetchRegions() {
      try {
        const response = await getRegions();
        this.regions = response.data;
      } catch (error) {
        this.$message.error("加载数据失败！");
      }
    },
    // 跳转到新建区域页面
    goToCreatePage() {
      this.$router.push({ name: "CreateRegion" });
    },
    // 跳转到编辑页面
    editRegion(id) {
      this.$router.push({ name: "EditRegion", params: { id } });
    },
    // 删除区域
    // eslint-disable-next-line no-unused-vars
    async deleteRegion(id) {
      try {
        await this.$confirm("确定删除该区域?", "提示", {
          type: "warning",
        });
        // 调用删除接口
        // await deleteRegion(id); // 删除请求，你需要在 api 中实现这个方法
        this.$message.success("区域删除成功");
        this.fetchRegions(); // 刷新列表
      } catch (error) {
        this.$message.info("取消删除");
      }
    },
  },
};
</script>

<style scoped>
.el-button {
  margin-bottom: 10px;
}

.el-table {
  margin-top: 20px;
}
</style>
