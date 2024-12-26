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

      <el-form-item label="父级区域" prop="parentId">
        <el-select v-model="region.parentId" placeholder="请选择父级区域">
          <el-option
            v-for="item in regions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="区域级别" prop="level">
        <el-select v-model="region.level" placeholder="请选择区域级别">
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
import { getRegions, getRegionDetails, updateRegion } from "../api/api";

export default {
  data() {
    return {
      region: {
        id: null,
        name: "",
        parentId: null,
        level: 1,
        sortOrder: 0,
      },
      regions: [],
    };
  },
  created() {
    this.fetchRegions();
    this.loadRegion();
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
    loadRegion() {
      const id = this.$route.params.id;
      if (id) {
        // 获取指定ID的区域数据
        getRegionDetails(id).then((data) => {
          this.region = data;
        });
      }
    },
    submitForm() {
      updateRegion(this.region)
        .then(() => {
          this.$message.success("区域更新成功！");
          this.$router.push({ name: "RegionList" });
        })
        .catch(() => {
          this.$message.error("更新区域失败！");
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
