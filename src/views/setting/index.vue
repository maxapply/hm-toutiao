<template>
  <div class="setting">
    <el-row>
      <el-col :span="12">
        <el-form :model="user" label-width="120px">
          <el-form-item label="编号：">{{ user.id }}</el-form-item>
          <el-form-item label="手机号：">{{ user.mobile }} </el-form-item>
          <el-form-item label="媒体名称：">
            <el-input v-model="user.name"></el-input>
          </el-form-item>
          <el-form-item label="媒体介绍：">
            <el-input type="textarea" :rows="3" v-model="user.intro"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：">
            <el-input v-model="user.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="preseSetting">保存设置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <div class="upload">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :http-request="handleSuccess"
          >
            <img v-if="user.photo" :src="user.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import auth from "../../utils/auth.js";
import eventBus from "../../eventBus.js";
export default {
  name: "setting",
  data() {
    return {
      userList: [],
      user: {
        name: "",
        intro: "",
        email: "",
        id: "",
        mobile: "",
        photo: ""
      }
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    async getUser() {
      const res = await this.$http.get("user/profile");
      this.user = res.data.data;
    },
    async preseSetting() {
      try {
        const { name, intro, email } = this.user;
        await this.$http.patch("user/profile", { name, intro, email });
        this.$message.success("修改成功！");
        const userName = auth.getUser();
        userName.name = this.user.name;
        auth.setUser(userName);
        eventBus.$emit("btn2", this.user);
      } catch (e) {
        this.$message.error("修改失败！");
      }
    },
    async handleSuccess({ file }) {
      try {
        const fd = new FormData();
        fd.append("photo", file);
        const res = await this.$http.patch("user/photo", fd);
        this.user.photo = res.data.data.photo;
        eventBus.$emit("btn2", this.user);
        const userImage = auth.getUser();
        userImage.photo = this.user.photo;
        auth.setUser(userImage);
        this.$message.success("修改头像成功！");
      } catch (e) {
        this.$message.error("修改头像失败！");
      }
    }
  }
};
</script>

<style scoped lang="less">
.upload {
  margin-top: 100px;
}
</style>
