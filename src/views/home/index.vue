<template>
  <el-container class="home">
    <el-aside class="my-aside" :width="isOpen ? '200px' : '64px'">
      <div class="logo" :class="{ minLogin: !isOpen }"></div>

      <el-menu
        :collapse="isCollapse"
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#002233"
        text-color="#fff"
        :collapse-transition="false"
        active-text-color="#ffd04b"
        style="border-right:none"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>

        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>

        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>

        <el-menu-item index="/pubilsh">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>

        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>

        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>

        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="my-header">
        <span class="icon el-icon-s-fold" @click="toggleMenu"></span>
        <span class="text">江苏传智博客科技教育有限公司</span>

        <el-dropdown class="my-dropdown" @command="handleCommand">
          <span class="el-dropdown-link">
            <img class="my-img" :src="photo" alt="" />
            <strong class="name">{{ name }}</strong>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="setting">个人设置</el-dropdown-item>
            <el-dropdown-item command="out">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import auth from "../../utils/auth.js";
export default {
  name: "home",
  data() {
    return {
      isOpen: true,
      isCollapse: false,
      name: "",
      photo: ""
    };
  },
  created() {
    const user = auth.getUser();
    this.name = user.name;
    this.photo = user.photo;
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
      this.isCollapse = !this.isCollapse;
    },
    handleCommand(command) {
      if (command === "setting") {
        this.$router.push("/setting");
      } else {
        auth.remUser();
        this.$router.push("/login");
      }

      // this.$message('click on item ' + command)
      //
    }
  }
};
</script>

<style scoped lang="less">
.home {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  .my-aside {
    background-color: #002233;
    .logo {
      width: 100%;
      height: 60px;
      background: #002244 url(../../assets/logo_admin.png) no-repeat center /
        140px auto;
    }
    .minLogin {
      background-image: url(../../assets/logo_admin_01.png);
      background-size: 36px auto;
    }
  }
  .my-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .icon {
      font-size: 24px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
      // line-height: 60px;
      margin-left: 10px;
    }
    .my-dropdown {
      float: right;
      // line-height: 60px;
      // margin-right: 20px;
      .my-img {
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
      .name {
        vertical-align: middle;
        padding-left: 5px;
      }
    }
  }
}
</style>
