<template>
  <el-container>
    <el-header>热门城市管理</el-header>
    <el-main>
      <!-- 新建热门城市按钮 -->
      <el-button type="primary" class="create-button" @click="goToCreatePage">
        新建热门城市
      </el-button>

      <!-- 热门城市列表 -->
      <div v-if="hotCities.length > 0">
        <el-table
          :data="hotCities"
          style="width: 100%; table-layout: fixed"
          stripe
        >
          <!-- 区域列 -->
          <el-table-column
            label="区域"
            width="688"
            align="center"
            :formatter="formatRegion"
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
      </div>

      <!-- 加载中提示 -->
      <div v-else-if="isLoading">
        <p>加载中...</p>
      </div>

      <!-- 没有数据的提示 -->
      <el-alert
        v-if="hotCities.length === 0 && !isLoading"
        title="没有热门城市数据"
        type="info"
        :closable="false"
        class="no-data-alert"
      ></el-alert>
    </el-main>
  </el-container>
</template>

<script>
import { getAllHotCities, deleteHotCity, getRegions } from "../api/api"; // 根据项目结构调整路径

export default {
  data() {
    return {
      hotCities: [], // 存储热门城市数据
      regionNameMap: {}, // 缓存区域名称映射
      isLoading: true, // 加载状态
    };
  },
  created() {
    this.loadData(); // 加载数据
  },
  methods: {
    // 加载热门城市和区域名称
    async loadData() {
      try {
        const [hotCitiesResponse, regionsResponse] = await Promise.all([
          getAllHotCities(),
          getRegions(),
        ]);
        this.hotCities = hotCitiesResponse; // 将获取的数据存储到 hotCities 中
        this.regionNameMap = regionsResponse.reduce((map, region) => {
          map[region.id] = region.name;
          return map;
        }, {}); // 缓存区域名称映射
      } catch (error) {
        console.error("加载数据失败", error);
        this.$message.error("加载热门城市或区域名称失败，请稍后再试");
      } finally {
        this.isLoading = false; // 请求完成后更新加载状态
      }
    },

    // 格式化区域字段
    formatRegion(row) {
      return this.regionNameMap[row.regionId] || "未知区域"; // 返回对应区域名称
    },

    // 删除热门城市
    deleteHotCity(id) {
      this.$confirm("确认删除该热门城市吗?", "删除确认", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteHotCity(id)
          .then(() => {
            this.loadData(); // 删除成功后重新加载数据
            this.$message({
              type: "success",
              message: "删除成功",
            });
          })
          .catch((error) => {
            console.error("删除热门城市失败", error);
            this.$message.error("删除热门城市失败");
          });
      });
    },

    // 跳转到新建热门城市页面
    goToCreatePage() {
      this.$router.push({ name: "AddHotCityPage" }); // 假设这是你创建页面的路由名称
    },
  },
};
</script>

<style scoped>
.el-container {
  padding: 30px;
}

.el-header {
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
}

.el-table-column {
  text-align: left;
}

.el-table th,
.el-table td {
  padding: 12px 10px; /* 统一的 padding */
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

.loading-spinner {
  text-align: center;
  margin-top: 20px;
}

.no-data-alert {
  margin-top: 20px;
}
</style>
