<template>
  <div class="attractions-container">
    <h1 class="page-title">景点管理</h1>
    <el-button type="primary" class="create-button" @click="goToCreatePage"
      >新建景点</el-button
    >

    <!-- 景点表格 -->
    <el-table
      :data="attractions"
      style="width: 100%; table-layout: fixed"
      stripe
    >
      <el-table-column
        prop="name"
        label="景点名称"
        width="400"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>

      <el-table-column
        prop="regionId"
        label="所属区域"
        width="380"
        align="center"
        :formatter="formatRegion"
        :show-overflow-tooltip="true"
      ></el-table-column>

      <el-table-column
        prop="description"
        label="描述"
        width="360"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>

      <el-table-column label="操作" width="398" align="center">
        <template v-slot="scope">
          <el-button
            @click="viewAttraction(scope.row.id)"
            type="info"
            size="mini"
            >查看</el-button
          >
          <el-button
            @click="editAttraction(scope.row.id)"
            type="warning"
            size="mini"
            >编辑</el-button
          >
          <el-button
            @click="deleteAttraction(scope.row.id)"
            type="danger"
            size="mini"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAttractions, deleteAttraction } from "../api/api"; // 引入请求方法

export default {
  name: "AttractionsPage",
  data() {
    return {
      attractions: [], // 用来存储景点数据
    };
  },
  created() {
    this.fetchAttractions(); // 组件加载时调用
  },
  methods: {
    // 获取景点列表
    fetchAttractions() {
      getAttractions() // 调用 API 获取景点数据
        .then((response) => {
          this.attractions = response; // 直接将返回数据赋值给 attractions
        })
        .catch((error) => {
          console.error("获取景点列表失败", error); // 错误处理
        });
    },
    // 删除景点
    deleteAttraction(id) {
      deleteAttraction(id) // 调用删除接口
        .then(() => {
          this.fetchAttractions(); // 删除成功后重新获取景点列表
          this.$message({
            type: "success",
            message: "删除成功",
          });
        })
        .catch((error) => {
          console.error("删除景点失败", error); // 错误处理
        });
    },
    // 格式化地区字段（根据你的需求，可能需要修改）
    formatRegion(row, column, cellValue) {
      return `区域 ${cellValue}`; // 这里只是示例，假设 cellValue 是区域ID，你可以根据实际情况调整
    },
    // 页面跳转到创建景点页
    goToCreatePage() {
      this.$router.push({ name: "CreateAttraction" });
    },
    // 查看景点
    viewAttraction(id) {
      this.$router.push({ name: "ViewAttraction", params: { id } });
    },
    // 编辑景点
    editAttraction(id) {
      this.$router.push({ name: "EditAttraction", params: { id } });
    },
  },
};
</script>

<style scoped>
.attractions-container {
  padding: 30px;
  background-color: #f9f9f9;
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.create-button {
  margin-bottom: 20px;
}

.el-table {
  margin-top: 20px;
  border: 1px solid #e0e0e0;
  border-collapse: collapse; /* 确保表格的合并 */
}

.el-table-column {
  text-align: left;
}

.el-table th,
.el-table td {
  padding: 12px 10px; /* 确保表头和表格数据的 padding 一致 */
}

.el-table th {
  background-color: #f2f2f2;
  font-weight: bold;
  color: #333;
  text-align: center;
}

.el-table td {
  text-align: center;
}

.el-table .el-button {
  margin: 0 5px;
}

.el-table .el-button--mini {
  padding: 4px 8px;
}

.el-table .el-button--info {
  background-color: #20a0ff;
  color: white;
}

.el-table .el-button--warning {
  background-color: #f56c6c;
  color: white;
}

.el-table .el-button--danger {
  background-color: #ff4949;
  color: white;
}

.el-table .el-table__header th {
  border-bottom: 2px solid #dcdfe6;
}

.el-table .el-table__body tr:nth-child(odd) {
  background-color: #f9f9f9;
}

.el-table .el-table__body tr:nth-child(even) {
  background-color: #ffffff;
}
</style>
