<template>
  <el-container>
    <el-header>景点详情</el-header>
    <el-main>
      <div v-if="attraction">
        <el-table
          :data="[attraction]"
          style="width: 100%; table-layout: fixed"
          stripe
        >
          <!-- 景点名称 -->
          <el-table-column
            label="景点名称"
            prop="name"
            width="180"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>

          <!-- 景点描述 -->
          <el-table-column
            label="描述"
            prop="description"
            width="360"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>

          <!-- 景点图片 -->
          <el-table-column label="图片" width="250" align="center">
            <template #default="{ row }">
              <img :src="row.image_url" alt="景点图片" width="100px" />
            </template>
          </el-table-column>

          <!-- 所属区域 -->
          <el-table-column
            label="所属区域"
            prop="regionId"
            width="180"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>

          <!-- 其他字段 -->
          <el-table-column
            label="其他信息"
            prop="otherInfo"
            width="180"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template #default="{ row }">
              <div>{{ row.otherInfo || "暂无" }}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-else>
        <p>加载中...</p>
      </div>
    </el-main>
  </el-container>
</template>

<script>
// 导入封装好的请求方法
import { getAttractionDetails } from "../api/api"; // 根据项目结构调整路径

export default {
  data() {
    return {
      attraction: null, // 存储景点详情
    };
  },
  created() {
    this.fetchAttractionDetails();
  },
  methods: {
    async fetchAttractionDetails() {
      const attractionId = this.$route.params.id; // 获取路由传递的景点ID
      if (!attractionId) {
        console.error("景点ID无效");
        return;
      }

      try {
        // 获取景点详情
        const response = await getAttractionDetails(attractionId);
        this.attraction = response; // 将返回的数据赋值给 attraction
      } catch (error) {
        console.error("获取景点详情失败", error);
        this.$message({
          type: "error",
          message: "获取景点详情失败，请稍后再试",
        });
      }
    },
  },
};
</script>

<style scoped>
.el-table {
  margin-top: 20px;
  border: 1px solid #e0e0e0;
}

.el-table th,
.el-table td {
  padding: 12px 10px; /* 统一的 padding */
}

.el-table-column {
  text-align: left;
}

.el-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.el-table td {
  text-align: center;
}

img {
  max-width: 100%;
  height: auto;
}

h2 {
  color: #409eff;
}
</style>
