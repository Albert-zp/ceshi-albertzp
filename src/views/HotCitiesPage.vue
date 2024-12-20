<!-- src/views/HotCitiesPage.vue -->
<template>
  <div class="hot-cities-container">
    <h1>热门城市管理</h1>
    <el-table :data="hotCities" style="width: 100%">
      <el-table-column
        prop="name"
        label="城市名称"
        width="180"
      ></el-table-column>
      <el-table-column label="操作" width="180">
        <template v-slot="scope">
          <el-button @click="removeHotCity(scope.row.id)" type="danger"
            >移除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getHotCities } from "../api/api";

export default {
  name: "HotCitiesPage",
  data() {
    return {
      hotCities: [], // 用来存储热门城市数据
    };
  },
  created() {
    this.fetchHotCities();
  },
  methods: {
    // 获取热门城市列表
    fetchHotCities() {
      getHotCities()
        .then((response) => {
          this.hotCities = response.data; // 将后端数据赋值给 hotCities
        })
        .catch((error) => {
          console.error("获取热门城市列表失败", error);
        });
    },
    // 移除热门城市
    removeHotCity(id) {
      console.log(`移除热门城市 ID: ${id}`);
      // 这里可以根据需求进行进一步的操作
    },
  },
};
</script>

<style scoped>
.hot-cities-container {
  padding: 20px;
}

.el-table {
  margin-top: 20px;
}
</style>
