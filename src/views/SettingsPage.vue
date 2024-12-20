<template>
  <div class="settings-container">
    <h1>设置页面</h1>
    <el-row>
      <el-col :span="24">
        <el-card>
          <h2>用户设置</h2>
          <el-form :model="settingsForm" label-width="120px">
            <el-form-item label="用户名">
              <el-input
                v-model="settingsForm.username"
                placeholder="请输入用户名"
              />
            </el-form-item>

            <el-form-item label="邮箱">
              <el-input v-model="settingsForm.email" placeholder="请输入邮箱" />
            </el-form-item>

            <el-form-item label="手机号码">
              <el-input
                v-model="settingsForm.phone"
                placeholder="请输入手机号码"
              />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="saveSettings"
                >保存设置</el-button
              >
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "SettingsPage", // 页面组件名
  data() {
    return {
      // 模拟的设置表单数据
      settingsForm: {
        username: "",
        email: "",
        phone: "",
      },
    };
  },
  methods: {
    // 保存设置方法
    saveSettings() {
      // 模拟保存设置
      console.log("设置已保存:", this.settingsForm);
      this.$message({
        message: "设置已保存",
        type: "success",
      });
    },
  },
};
</script>

<style scoped>
.settings-container {
  padding: 20px;
}

.el-card {
  margin-top: 20px;
}

.el-button {
  margin-top: 20px;
}
</style>
