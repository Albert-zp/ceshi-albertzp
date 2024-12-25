<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="login-title">欢迎登录</h2>
      <el-form :model="loginForm" ref="loginForm" label-width="100px">
        <el-form-item
          label="用户名"
          prop="username"
          :rules="[
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ]"
        >
          <el-input
            v-model="loginForm.username"
            autocomplete="off"
            placeholder="请输入用户名"
            class="input-field"
          ></el-input>
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
            placeholder="请输入密码"
            class="input-field"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin" class="login-btn"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
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
/* 确保页面的背景颜色设置 */
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #2c3e50; /* 深蓝色背景 */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 登录容器，设置居中效果 */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

/* 登录框样式 */
.login-box {
  width: 400px;
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-top: 50px; /* 输入框位置下移 */
}

/* 标题样式 */
.login-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #333;
}

/* 输入框的样式 */
.input-field {
  border-radius: 5px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
}

.input-field:hover {
  border-color: #1cc88a;
}

.input-field:focus {
  border-color: #4e73df;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

/* 登录按钮样式 */
.login-btn {
  width: 100%;
  background-color: #4e73df;
  color: white;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.login-btn:hover {
  background-color: #2e59d9;
}

.login-btn:focus {
  outline: none;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-form-item label {
  font-weight: 600;
  color: #333;
}

.el-button {
  height: 40px;
  line-height: 40px;
}
</style>
