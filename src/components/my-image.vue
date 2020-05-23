<template>
  <div class="my_image">
    <div class="box_btn" @click="openDialog">
      <img :src="value || btn_ImageUrl" alt="" />
    </div>
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="list">
          <div v-loading="isLoading">
            <el-radio-group
              @change="changeCollect"
              v-model="reqParms.collect"
              size="small"
            >
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
            <!-- 列表 -->
            <div class="img-list">
              <div
                @click="selectedImage(item.url)"
                :class="{ selected: selectedImageUrl === item.url }"
                class="img-item"
                v-for="item in images"
                :key="item.id"
              >
                <img :src="item.url" alt="" />
              </div>
            </div>

            <el-pagination
              hide-on-single-page
              background
              layout="prev, pager, next"
              @current-change="changes"
              :total="count"
              :page-size="reqParms.per_page"
              :current-page="reqParms.page"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane
          label="上传图片"
          name="upload"
          @click="dialogVisible = true"
        >
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :on-success="handleSuccess"
            name="image"
            :headers="actionHeaders"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import auth from "../utils/auth.js";
import BtnImage from "../assets/default.png";
export default {
  props: ["value"],
  name: "my-image",
  data() {
    return {
      dialogVisible: false,
      activeName: "list",
      reqParms: {
        collect: false,
        page: 1,
        per_page: 10
      },
      isLoading: false,
      images: [],
      count: 0,
      selectedImageUrl: null,
      imageUrl: null,
      actionHeaders: {
        Authorization: `Bearer ${auth.getUser().token}`
      },
      btn_ImageUrl: BtnImage
    };
  },
  methods: {
    openDialog() {
      this.dialogVisible = true;
      this.reqParms.collect = false;
      this.getImages();
      this.activeName = "list";
      this.selectedImageUrl = null;
      this.imageUrl = null;
    },
    changeCollect() {
      this.reqParms.page = 1;
      this.getImages();
    },
    async getImages() {
      this.isLoading = true;
      const res = await this.$http.get("user/images", {
        params: this.reqParms
      });
      this.images = res.data.data.results;
      this.count = res.data.data.total_count;
      this.isLoading = false;
    },
    changes(e) {
      this.reqParms.page = e;
      this.getImages();
    },
    selectedImage(url) {
      this.selectedImageUrl = url;
    },
    handleSuccess(e) {
      this.$message.success("上传成功！");
      this.imageUrl = e.data.url;
    },
    confirImage() {
      this.dialogVisible = false;
      if (this.activeName === "list") {
        if (!this.selectedImageUrl) {
          return this.$message.warning("请选择一张素材图片！");
        }
        this.btn_ImageUrl = this.selectedImageUrl;
        this.$emit("input", this.btn_ImageUrl);
      } else {
        if (!this.imageUrl) {
          return this.$message.warning("请上传一张素材图片！");
        }
        this.btn_ImageUrl = this.imageUrl;
        this.$emit("input", this.btn_ImageUrl);
      }
    }
  }
};
</script>

<style scoped lang="less">
// 素材列表
.img-list {
  padding-top: 20px;
  .img-item {
    width: 150px;
    height: 120px;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 20px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    &.selected::after {
      // .img-item 的后伪元素
      // &符号 less语法，连接符，连接 上一级选择和当前的选择器。
      // 此时不加&：.img-item ::after{}  解析后：后代选择器
      // 加上&符后：.img-item::after{}   解析后：交集选择器
      // .img-item.selected::after{} 满足这个选择器样式生效
      // 当你想选中效果：给.img-item加上selected类即可。
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3) url(../assets/selected.png) no-repeat
        center/ 50px auto;
    }
  }
}
// 组件容器
.my_image {
  display: inline-block;
  margin-right: 20px;
}
// 图片按钮
.box_btn {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
