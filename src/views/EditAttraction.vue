<template>
  <el-container>
    <el-header>景点编辑</el-header>
    <el-main>
      <el-form :model="attraction" ref="form" label-width="100px" class="form">
        <!-- 景点名称 -->
        <el-form-item label="景点名称" prop="name">
          <el-input v-model="attraction.name" placeholder="请输入景点名称" />
        </el-form-item>

        <!-- 景点描述 -->
        <el-form-item label="景点描述" prop="description">
          <el-input
            v-model="attraction.description"
            placeholder="请输入景点描述"
          />
        </el-form-item>

        <!-- 其他字段，例如区域等 -->
        <el-form-item label="所属区域" prop="regionId">
          <el-input v-model="attraction.regionId" placeholder="请输入区域ID" />
        </el-form-item>

        <!-- 提交按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitAttraction">提交</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
// 导入API请求方法
import { getAttractionDetails, saveOrUpdateAttraction } from "../api/api"; // 导入正确的 API

export default {
  data() {
    return {
      attraction: {
        id: null, // 如果是编辑模式，可以传入现有ID
        name: "",
        description: "",
        regionId: "",
        // 其他字段...
      },
    };
  },
  created() {
    // 如果是编辑模式，获取景点详情（根据ID）
    const attractionId = this.$route.params.id;
    if (attractionId) {
      this.fetchAttractionDetails(attractionId);
    }
  },
  methods: {
    // 获取景点详情（用于编辑）
    async fetchAttractionDetails(id) {
      try {
        const response = await getAttractionDetails(id);
        this.attraction = response; // 将返回的数据赋值给 attraction
      } catch (error) {
        console.error("获取景点详情失败", error);
        this.$message.error("获取景点详情失败，请稍后再试");
      }
    },
    // 提交表单，保存或更新景点
    async submitAttraction() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            // 如果有ID说明是更新操作，否则是创建
            await saveOrUpdateAttraction(this.attraction); // 只需等待响应
            this.$message({
              type: "success",
              message: "提交成功！",
            });
            // 提交成功后，可以跳转或者清空表单
            this.$router.push({ name: "Attractions" }); // 跳转回景点列表页
          } catch (error) {
            this.$message.error("提交失败，请稍后再试");
          }
        } else {
          console.log("表单验证失败");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.el-form {
  max-width: 600px;
  margin: 20px auto;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-button {
  margin-top: 20px;
}
</style>
