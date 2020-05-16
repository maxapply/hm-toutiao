<template>
  <div class="login">
    <el-card class="my-card">
      <img src="../../assets/logo_index.png" alt="" />
      <el-form ref="loginForm" :rules="rules" status-icon :model="LoginForm">
        <el-form-item prop="mobile">
          <el-input
            v-model="LoginForm.mobile"
            placeholder="请输入手机号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="LoginForm.code"
            style="width:240px;margin-right:8px"
            clearable
            placeholder="请输入验证码"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true"
            >我已阅读并同意用户协议和隐私条款</el-checkbox
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value)) {
        callback(new Error("手机号输入错误"));
      } else {
        callback();
      }
    };
    return {
      LoginForm: {
        mobile: "",
        code: ""
      },
      rules: {
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { len: 6, message: "长度在 6 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$http
            .post(
              "http://ttapi.research.itcast.cn/mp/v1_0/authorizations",
              this.LoginForm
            )
            .then(res => {
              console.log(res);

              this.$router.push("/");
            })
            .catch(() => {
              this.$message.error("手机号或验证码输入错误！");
            });
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;
  position: absolute;
  background: url(../../assets/login_bg.jpg) no-repeat;
  background-size: cover;
  top: 0;
  left: 0;
  .my-card {
    width: 400px;
    height: 350px;
    transform: translate(-50%, -60%);
    position: absolute;
    top: 50%;
    left: 50%;
    img {
      width: 200px;
      display: block;
      margin: 0 auto 20px;
    }
  }
}
</style>
