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
          <el-table-column
            label="景点名称"
            prop="name"
            width="600"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            label="描述"
            prop="description"
            width="600"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            label="所属区域"
            width="338"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template #default="{ row }">
              <span>{{ regionNameMap[row.regionId] || "未知区域" }}</span>
            </template>
          </el-table-column>
        </el-table>

        <div
          v-if="images.content && images.content.length > 0"
          class="image-gallery"
        >
          <h3>景点图片</h3>
          <el-row :gutter="20">
            <el-col :span="6" v-for="image in images.content" :key="image.id">
              <el-card :body-style="{ padding: '10px' }">
                <img
                  :src="image.url"
                  alt="景点图片"
                  class="image"
                  @error="handleImageError(image)"
                />
                <div class="image-name">{{ image.name || "无标题" }}</div>
                <div class="image-likes">点赞: {{ image.likes }}</div>
                <div class="image-favorites">收藏: {{ image.favorites }}</div>
              </el-card>
            </el-col>
          </el-row>

          <el-pagination
            :current-page="currentPage"
            :page-size="pageSize"
            :total="images.totalElements"
            @current-change="handlePageChange"
            layout="prev, pager, next, jumper"
          />
        </div>

        <div v-else>
          <p>没有加载到图片数据，请稍后再试。</p>
        </div>
      </div>

      <div v-else>
        <p>加载中...</p>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router"; // 引入 useRoute
import {
  getAttractionDetails,
  getImagesByAttractionId,
  getRegions,
} from "../api/api";

export default {
  setup() {
    const route = useRoute(); // 获取路由信息
    const attraction = ref(null);
    const regionNameMap = ref({});
    const images = reactive({ content: [], totalElements: 0 });
    const currentPage = ref(1);
    const pageSize = ref(10);

    const fetchAttractionDetails = async () => {
      const attractionId = route.params.id; // 使用 route 参数获取景点 ID
      if (!attractionId) {
        console.error("景点ID无效");
        return;
      }

      try {
        const response = await getAttractionDetails(attractionId);
        attraction.value = response;
        fetchImages(attractionId);
      } catch (error) {
        console.error("获取景点详情失败", error);
        this.$message({
          type: "error",
          message: "获取景点详情失败，请稍后再试",
        });
      }
    };

    const fetchRegionNames = async () => {
      try {
        const regions = await getRegions();
        regionNameMap.value = regions.reduce((map, region) => {
          map[region.id] = region.name;
          return map;
        }, {});
      } catch (error) {
        console.error("获取区域名称失败", error);
        this.$message({
          type: "error",
          message: "获取区域名称失败，请稍后再试",
        });
      }
    };

    const fetchImages = async (attractionId) => {
      try {
        const response = await getImagesByAttractionId(
          attractionId,
          currentPage.value - 1,
          pageSize.value
        );
        console.log("获取到的图片数据：", response);

        // 更新图片数据
        if (response && response.content) {
          images.content = response.content || [];
          images.totalElements = response.totalElements || 0;
        } else {
          console.error("图片数据为空或格式错误", response);
        }
      } catch (error) {
        console.error("获取景点图片失败", error);
      }
    };

    const handlePageChange = (page) => {
      if (page === currentPage.value) return;
      currentPage.value = page;
      fetchImages(attraction.value.id);
    };

    const handleImageError = (image) => {
      console.error("图片加载失败", image);
      image.url = "https://via.placeholder.com/150"; // 加载失败时替换为占位图
    };

    onMounted(() => {
      fetchAttractionDetails();
      fetchRegionNames();
    });

    return {
      attraction,
      regionNameMap,
      images,
      currentPage,
      pageSize,
      fetchAttractionDetails,
      fetchRegionNames,
      fetchImages,
      handlePageChange,
      handleImageError,
    };
  },
};
</script>

<style scoped>
.image-gallery {
  margin-top: 20px;
}

.image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.image-name {
  text-align: center;
  font-size: 14px;
  color: #333;
}

.image-likes,
.image-favorites {
  text-align: center;
  font-size: 12px;
  color: #999;
}
</style>
