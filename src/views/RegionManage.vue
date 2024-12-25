<template>
  <div>
    <!-- 区域列表 -->
    <el-row class="mb-4">
      <el-col :span="24">
        <el-button type="primary" @click="openCreateModal">添加区域</el-button>
      </el-col>
    </el-row>

    <el-table
      :data="regions"
      style="width: 100%"
      border
      stripe
      :key="region.id"
    >
      <el-table-column label="区域名称" prop="name" />
      <el-table-column label="父级区域" :formatter="formatParent" />
      <el-table-column label="层级" :formatter="formatLevel" />
      <el-table-column label="排序" prop="sortOrder" />
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button
            @click="openViewModal(scope.row)"
            size="small"
            type="success"
            >查看</el-button
          >
          <el-button
            @click="openEditModal(scope.row)"
            size="small"
            type="primary"
            >编辑</el-button
          >
          <el-button
            @click="deleteRegion(scope.row.id)"
            size="small"
            type="danger"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 新建区域的模态框 -->
    <el-dialog v-model:visible="createDialogVisible" title="添加区域">
      <el-form :model="regionForm">
        <el-form-item label="区域名称" :label-width="formLabelWidth">
          <el-input v-model="regionForm.name" />
        </el-form-item>
        <el-form-item label="父级区域" :label-width="formLabelWidth">
          <el-select v-model="regionForm.parentId" placeholder="选择父级区域">
            <el-option
              v-for="item in regions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="层级" :label-width="formLabelWidth">
          <el-select v-model="regionForm.level" placeholder="选择层级">
            <el-option label="省级" :value="1" />
            <el-option label="市级" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth">
          <el-input-number v-model="regionForm.sortOrder" :min="0" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="createRegion">确定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑区域的模态框 -->
    <el-dialog v-model:visible="editDialogVisible" title="编辑区域">
      <el-form :model="regionForm">
        <el-form-item label="区域名称" :label-width="formLabelWidth">
          <el-input v-model="regionForm.name" />
        </el-form-item>
        <el-form-item label="父级区域" :label-width="formLabelWidth">
          <el-select v-model="regionForm.parentId" placeholder="选择父级区域">
            <el-option
              v-for="item in regions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="层级" :label-width="formLabelWidth">
          <el-select v-model="regionForm.level" placeholder="选择层级">
            <el-option label="省级" :value="1" />
            <el-option label="市级" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth">
          <el-input-number v-model="regionForm.sortOrder" :min="0" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="updateRegion">确定</el-button>
      </div>
    </el-dialog>

    <!-- 查看区域的模态框 -->
    <el-dialog v-model:visible="viewDialogVisible" title="查看区域">
      <el-form :model="regionForm" label-width="100px">
        <el-form-item label="区域名称">
          <el-input v-model="regionForm.name" disabled />
        </el-form-item>
        <el-form-item label="父级区域">
          <el-input v-model="formatParent(regionForm)" disabled />
        </el-form-item>
        <el-form-item label="层级">
          <el-input v-model="formatLevel(regionForm)" disabled />
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="regionForm.sortOrder" disabled />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="viewDialogVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getRegions, createRegion, updateRegion, deleteRegion } from "@/api";

export default {
  data() {
    return {
      regions: [], // 存放区域数据
      regionForm: {
        id: null,
        name: "",
        parentId: null,
        level: 1,
        sortOrder: 0,
      },
      createDialogVisible: false,
      editDialogVisible: false,
      viewDialogVisible: false,
      formLabelWidth: "80px",
    };
  },
  methods: {
    // 获取所有区域
    async fetchRegions() {
      try {
        const response = await getRegions();
        this.regions = response;
      } catch (error) {
        this.$message.error("加载区域数据失败！");
      }
    },

    // 创建新区域
    async createRegion() {
      try {
        await createRegion(this.regionForm);
        this.$message.success("区域创建成功！");
        this.fetchRegions();
        this.createDialogVisible = false;
      } catch (error) {
        this.$message.error("创建区域失败！");
      }
    },

    // 打开创建区域的模态框
    openCreateModal() {
      this.regionForm = {
        id: null,
        name: "",
        parentId: null,
        level: 1,
        sortOrder: 0,
      };
      this.createDialogVisible = true;
    },

    // 编辑区域
    async openEditModal(region) {
      this.regionForm = { ...region };
      this.editDialogVisible = true;
    },

    // 更新区域
    async updateRegion() {
      try {
        await updateRegion(this.regionForm);
        this.$message.success("区域更新成功！");
        this.fetchRegions();
        this.editDialogVisible = false;
      } catch (error) {
        this.$message.error("更新区域失败！");
      }
    },

    // 删除区域
    async deleteRegion(id) {
      try {
        await this.$confirm("确认删除该区域?", "警告", {
          type: "warning",
        });
        await deleteRegion(id);
        this.$message.success("区域删除成功！");
        this.fetchRegions();
      } catch (error) {
        this.$message.info("取消删除");
      }
    },

    // 格式化父级区域
    formatParent(row) {
      return row.parentId ? row.parentId : "无";
    },

    // 格式化层级
    formatLevel(row) {
      return row.level === 1 ? "省级" : "市级";
    },

    // 查看区域
    openViewModal(region) {
      this.regionForm = { ...region };
      this.viewDialogVisible = true;
    },
  },

  // 初始化数据
  created() {
    this.fetchRegions();
  },
};
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}
</style>
