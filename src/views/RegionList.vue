<template>
  <div>
    <!-- 新建区域按钮 -->
    <el-button
      type="primary"
      @click="goToCreateRegion"
      style="margin-bottom: 20px"
    >
      新建区域
    </el-button>

    <!-- 区域列表表格 -->
    <el-table :data="regions" style="width: 100%">
      <el-table-column label="区域名称" prop="name"></el-table-column>

      <el-table-column label="上级区域" prop="parentName">
        <template v-slot:default="scope">
          <span>{{ scope.row.parentName || "无" }}</span>
        </template>
      </el-table-column>

      <el-table-column label="区域级别" prop="level">
        <template v-slot:default="scope">
          <span>{{ scope.row.level === 1 ? "省级" : "市级" }}</span>
        </template>
      </el-table-column>

      <el-table-column label="排序" prop="sortOrder"></el-table-column>

      <el-table-column label="操作">
        <template v-slot:default="scope">
          <el-button
            type="primary"
            @click="editRegion(scope.row.id)"
            size="small"
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            @click="deleteRegion(scope.row.id)"
            size="small"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getRegions, deleteRegion } from "../api/api";

export default {
  data() {
    return {
      regions: [],
    };
  },
  created() {
    this.fetchRegions();
  },
  methods: {
    // 获取区域列表数据
    fetchRegions() {
      getRegions()
        .then((data) => {
          this.regions = data;
          // 如果没有parentName字段，手动填充
          this.regions.forEach((region) => {
            if (!region.parentName && region.parentId) {
              // 查找父级区域名称
              const parentRegion = this.regions.find(
                (r) => r.id === region.parentId
              );
              region.parentName = parentRegion ? parentRegion.name : "无";
            }
          });
        })
        .catch(() => {
          this.$message.error("获取区域数据失败！");
        });
    },

    // 编辑区域
    editRegion(id) {
      this.$router.push({ name: "EditRegion", params: { id } });
    },

    // 删除区域
    deleteRegion(id) {
      this.$confirm("是否确定删除该区域?", "删除区域", {
        type: "warning",
      })
        .then(() => {
          deleteRegion(id)
            .then(() => {
              this.$message.success("区域删除成功！");
              this.fetchRegions(); // 刷新区域列表
            })
            .catch(() => {
              this.$message.error("删除区域失败！");
            });
        })
        .catch(() => {});
    },

    // 跳转到新建区域页面
    goToCreateRegion() {
      this.$router.push({ name: "CreateRegion" });
    },
  },
};
</script>

<style scoped>
.el-table {
  margin-top: 20px;
}
</style>
