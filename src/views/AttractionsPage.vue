<template>
  <div class="attractions-container">
    <h1 class="page-title">景点管理</h1>
    <el-button type="primary" class="create-button" @click="goToCreatePage">
      新建景点
    </el-button>

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
import { getAttractions, deleteAttraction, getRegions } from "../api/api";

export default {
  name: "AttractionsPage",
  data() {
    return {
      attractions: [], // 存储景点数据
      regionNameMap: {}, // 缓存区域名称映射
    };
  },
  created() {
    this.fetchAttractions(); // 组件加载时获取景点数据
    this.fetchRegionNames(); // 同时加载区域名称映射
  },
  methods: {
    // 获取景点列表
    fetchAttractions() {
      getAttractions()
        .then((response) => {
          this.attractions = response;
        })
        .catch((error) => {
          console.error("获取景点列表失败", error);
        });
    },
    // 获取区域名称映射
    fetchRegionNames() {
      getRegions()
        .then((response) => {
          this.regionNameMap = response.reduce((map, region) => {
            map[region.id] = region.name;
            return map;
          }, {});
        })
        .catch((error) => {
          console.error("获取区域名称失败", error);
        });
    },
    // 删除景点
    deleteAttraction(id) {
      deleteAttraction(id)
        .then(() => {
          this.fetchAttractions();
          this.$message({
            type: "success",
            message: "删除成功",
          });
        })
        .catch((error) => {
          console.error("删除景点失败", error);
        });
    },
    // 格式化区域字段
    formatRegion(row, column, cellValue) {
      return this.regionNameMap[cellValue] || "未知区域";
    },
    // 页面跳转到创建景点页
    goToCreatePage() {
      this.$router.push({ name: "CreateAttraction" });
    },
    // 查看景点
    viewAttraction(id) {
      this.$router.push({ name: "AttractionDetail", params: { id } });
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
  border-collapse: collapse;
}

.el-table-column {
  text-align: left;
}

.el-table th,
.el-table td {
  padding: 12px 10px;
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
