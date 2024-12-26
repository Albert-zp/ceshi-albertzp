<template>
  <div>
    <el-form :model="region" ref="regionForm" label-width="120px">
      <el-form-item
        label="区域名称"
        prop="name"
        :rules="[
          { required: true, message: '区域名称不能为空', trigger: 'blur' },
        ]"
      >
        <el-input v-model="region.name" placeholder="请输入区域名称"></el-input>
      </el-form-item>

      <!-- 只在市级区域时显示父级区域 -->
      <el-form-item label="父级区域" prop="parentId" v-if="region.level === 2">
        <el-select v-model="region.parentId" placeholder="请选择父级区域">
          <!-- 只显示省级区域作为父级 -->
          <el-option
            v-for="item in filteredRegions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="区域级别" prop="level">
        <el-select
          v-model="region.level"
          placeholder="请选择区域级别"
          @change="handleLevelChange"
        >
          <el-option label="省级" :value="1"></el-option>
          <el-option label="市级" :value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="排序" prop="sortOrder">
        <el-input-number v-model="region.sortOrder" :min="0" label="排序" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createRegion, getRegions } from "../api/api";

export default {
  data() {
    return {
      region: {
        name: "",
        parentId: null,
        level: 1, // 默认是省级
        sortOrder: 0,
      },
      regions: [], // 所有区域（父级区域的列表）
    };
  },
  computed: {
    // 计算属性：只返回省级区域
    filteredRegions() {
      return this.regions.filter((region) => region.level === 1);
    },
  },
  created() {
    this.fetchRegions();
  },
  methods: {
    fetchRegions() {
      getRegions()
        .then((data) => {
          this.regions = data;
        })
        .catch(() => {
          this.$message.error("获取区域数据失败！");
        });
    },
    handleLevelChange(level) {
      if (level === 1) {
        // 如果是省级区域，清空父级区域
        this.region.parentId = null;
      }
    },
    submitForm() {
      createRegion(this.region)
        .then(() => {
          this.$message.success("区域创建成功！");
          this.$router.push({ name: "RegionList" });
        })
        .catch(() => {
          this.$message.error("创建区域失败！");
        });
    },
    resetForm() {
      this.$refs.regionForm.resetFields();
    },
  },
};
</script>

<style scoped>
.el-form {
  max-width: 600px;
  margin: 30px auto;
}
</style>
