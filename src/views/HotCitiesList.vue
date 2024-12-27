<template>
  <div class="hot-cities-container">
    <h1 class="page-title">热门城市管理</h1>
    <el-button type="primary" class="create-button" @click="goToCreatePage">
      新建热门城市
    </el-button>

    <!-- 加载状态 -->
    <el-spin v-if="isLoading" size="large" class="loading-spinner"></el-spin>

    <!-- 热门城市表格 -->
    <el-table
      v-if="!isLoading && hotCities.length > 0"
      :data="hotCities"
      style="width: 100%; table-layout: fixed"
      stripe
    >
      <!-- 区域列 -->
      <el-table-column
        prop="region.name"
        label="区域"
        width="688"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>

      <!-- 热门排名列 -->
      <el-table-column
        prop="hotRank"
        label="热门排名"
        width="482"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>

      <!-- 操作列 -->
      <el-table-column label="操作" width="380" align="center">
        <template v-slot="scope">
          <el-button
            @click="deleteHotCity(scope.row.id)"
            type="danger"
            size="mini"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 如果没有数据 -->
    <el-alert
      v-if="!isLoading && hotCities.length === 0"
      title="没有热门城市数据"
      type="info"
      :closable="false"
      class="no-data-alert"
    ></el-alert>
  </div>
</template>

<script>
import { getAllHotCities, deleteHotCity } from "../api/api"; // 引入获取热门城市和删除热门城市的 API 方法

export default {
  name: "HotCitiesPage",
  data() {
    return {
      hotCities: [], // 存储热门城市数据
      isLoading: false, // 加载状态
    };
  },
  created() {
    this.fetchHotCities(); // 组件加载时调用获取热门城市数据
  },
  methods: {
    // 获取热门城市列表
    fetchHotCities() {
      this.isLoading = true; // 开始加载
      getAllHotCities() // 调用 API 获取热门城市数据
        .then((response) => {
          console.log("热门城市数据:", response); // 打印返回的数据
          if (response && Array.isArray(response) && response.length) {
            this.hotCities = response; // 赋值热门城市数据
          } else {
            this.hotCities = []; // 如果没有数据，则清空
            this.$message({
              type: "info",
              message: "没有热门城市数据",
            });
          }
          this.isLoading = false; // 数据加载完成
        })
        .catch((error) => {
          console.error("获取热门城市列表失败", error); // 错误处理
          this.hotCities = []; // 如果请求失败，则清空数据
          this.isLoading = false; // 加载完成，错误处理
          this.$message.error("加载热门城市失败");
        });
    },

    // 删除热门城市
    deleteHotCity(id) {
      this.$confirm("确认删除该热门城市吗?", "删除确认", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteHotCity(id) // 调用删除接口
          .then(() => {
            this.fetchHotCities(); // 删除成功后重新获取热门城市列表
            this.$message({
              type: "success",
              message: "删除成功",
            });
          })
          .catch((error) => {
            console.error("删除热门城市失败", error); // 错误处理
            this.$message.error("删除热门城市失败");
          });
      });
    },

    // 页面跳转到创建热门城市页
    goToCreatePage() {
      this.$router.push({ name: "AddHotCityPage" }); // 跳转到新建热门城市页面
    },
  },
};
</script>

<style scoped>
.hot-cities-container {
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
  border-collapse: collapse;
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

.loading-spinner {
  text-align: center;
  margin-top: 20px;
}

.no-data-alert {
  margin-top: 20px;
}
</style>
