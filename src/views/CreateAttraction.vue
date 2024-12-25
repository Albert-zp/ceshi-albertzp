<template>
  <el-container>
    <el-header>新建景点</el-header>
    <el-main>
      <el-form
        :model="form"
        ref="formRef"
        label-width="120px"
        class="create-form"
      >
        <!-- 景点名称 -->
        <el-form-item
          label="景点名称"
          prop="name"
          :rules="[
            { required: true, message: '请输入景点名称', trigger: 'blur' },
          ]"
        >
          <el-input v-model="form.name" placeholder="请输入景点名称" />
        </el-form-item>

        <!-- 描述 -->
        <el-form-item
          label="描述"
          prop="description"
          :rules="[
            { required: true, message: '请输入景点描述', trigger: 'blur' },
          ]"
        >
          <el-input
            type="textarea"
            v-model="form.description"
            placeholder="请输入景点描述"
          />
        </el-form-item>

        <!-- 景点图片 (非必填) -->
        <el-form-item label="景点图片" prop="image_url" :rules="[]">
          <el-upload
            action="#"
            list-type="picture-card"
            :file-list="fileList"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-upload="beforeUpload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>

        <!-- 所属区域 -->
        <el-form-item
          label="所属区域"
          prop="regionId"
          :rules="[
            { required: true, message: '请选择所属区域', trigger: 'change' },
          ]"
        >
          <el-select v-model="form.regionId" placeholder="请选择所属区域">
            <el-option label="区域1" value="1"></el-option>
            <el-option label="区域2" value="2"></el-option>
            <el-option label="区域3" value="3"></el-option>
            <!-- 这里可以根据实际情况动态加载区域数据 -->
          </el-select>
        </el-form-item>

        <!-- 提交按钮 -->
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm"
            :disabled="isSubmitting"
          >
            提交
          </el-button>
          <el-button @click="goBack">返回</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import { saveOrUpdateAttraction } from "../api/api"; // 引入保存接口

export default {
  data() {
    return {
      form: {
        name: "",
        description: "",
        image_url: "",
        regionId: "",
      },
      fileList: [],
      isSubmitting: false, // 防止重复提交
    };
  },
  methods: {
    // 提交表单
    async submitForm() {
      this.$refs.formRef.validate(async (valid) => {
        if (valid) {
          this.isSubmitting = true; // 设置提交状态为 true，防止重复提交

          try {
            // 提交表单数据
            await saveOrUpdateAttraction(this.form);

            // 提交成功后显示提示信息
            this.$message({
              type: "success",
              message: "新建景点成功",
            });

            // 提交成功后跳转到景点列表页
            this.$router.push({ name: "Attractions" });
          } catch (error) {
            // 提交失败时的错误提示
            this.$message({
              type: "error",
              message: "新建景点失败，请稍后再试",
            });
          } finally {
            // 恢复提交状态
            this.isSubmitting = false;
          }
        } else {
          console.log("表单验证失败！");
          return false;
        }
      });
    },

    // 返回按钮的处理
    goBack() {
      this.$router.push({ name: "Attractions" }); // 返回到景点列表页面
    },

    // 上传图片时的处理函数
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG/PNG 格式!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    // 处理图片删除
    handleRemove(file, fileList) {
      this.fileList = fileList;
    },

    // 处理图片预览
    handlePreview(file) {
      console.log(file);
    },
  },
};
</script>

<style scoped>
.create-form {
  width: 60%;
  margin: 30px auto;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-button {
  margin-right: 10px;
}
</style>
