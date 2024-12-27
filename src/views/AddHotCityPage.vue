<template>
  <div class="add-hot-city">
    <h1>添加热门城市</h1>
    <!-- 这里是你要设计的表单，包含选择市级区域和输入热度排名 -->
    <el-select v-model="selectedRegion" filterable placeholder="选择城市">
      <el-option
        v-for="region in regions"
        :key="region.id"
        :label="region.name"
        :value="region.id"
      ></el-option>
    </el-select>

    <el-input
      v-model="hotRank"
      placeholder="输入热度排名"
      type="number"
      min="1"
    />

    <el-button type="primary" @click="addHotCity">添加</el-button>
  </div>
</template>

<script>
import { getRegionsByLevel, addHotCity } from "../api/api"; // 引入 API 方法

export default {
  data() {
    return {
      selectedRegion: null, // 存储选择的市级区域
      hotRank: null, // 存储热度排名
      regions: [], // 存储市级区域数据
    };
  },
  created() {
    this.fetchCityData(); // 页面加载时获取城市数据
  },
  methods: {
    // 获取市级区域数据
    fetchCityData() {
      getRegionsByLevel(2) // 请求市级区域数据，level 2 是市级区域
        .then((response) => {
          this.regions = response; // 将返回的数据赋给 regions
        })
        .catch((error) => {
          console.error("获取城市数据失败", error);
        });
    },

    // 添加热门城市
    addHotCity() {
      // 验证必填项是否填写
      if (!this.selectedRegion || !this.hotRank) {
        this.$message.error("请选择城市和输入热度排名！");
        return;
      }

      const data = {
        regionId: this.selectedRegion,
        hotRank: this.hotRank,
      };

      // 调用添加热门城市的 API
      addHotCity(data)
        .then(() => {
          this.$message.success("热门城市添加成功！");
          // 添加成功后跳转回热门城市管理页面
          this.$router.push({ name: "HotCities" }); // 确保这里使用的路由名称是 HotCitiesPage
        })
        .catch((error) => {
          // 捕获并显示错误信息
          this.$message.error("添加失败");
          console.error("添加热门城市失败", error);
        });
    },
  },
};
</script>

<style scoped>
.add-hot-city {
  padding: 30px;
}

.add-hot-city h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.el-select,
.el-input {
  width: 300px;
  margin-bottom: 20px;
}
</style>
