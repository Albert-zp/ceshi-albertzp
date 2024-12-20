<template>
  <div class="login-container">
    <el-form :model="loginForm" ref="loginForm" label-width="100px">
      <el-form-item
        label="用户名"
        prop="username"
        :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' }]"
      >
        <el-input v-model="loginForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
        :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
      >
        <el-input
          type="password"
          v-model="loginForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "LoginPage", // 组件名称
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    handleLogin() {
      if (
        this.loginForm.username === "admin" &&
        this.loginForm.password === "password"
      ) {
        this.$router.push("/Dashboard"); // 登录成功后跳转到首页
      } else {
        this.$message.error("用户名或密码错误");
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  width: 400px;
  margin: 100px auto;
}
</style>
