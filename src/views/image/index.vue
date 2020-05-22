<template>
  <div class="app-image">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div class="btn-box">
        <el-radio-group
          @change="changeCollect"
          v-model="reqParms.collect"
          size="small"
        >
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button
          style="float:right;"
          @click="openDialog()"
          type="success"
          size="small"
          >添加素材</el-button
        >
      </div>

      <!-- 列表 -->
      <div class="img-list">
        <div class="img-item" v-for="item in images" :key="item.id">
          <img :src="item.url" alt="" />
          <div class="option" v-if="!reqParms.collect">
            <span
              @click="addImage(item)"
              class="el-icon-star-off"
              :class="{ red: item.is_collected }"
            ></span>
            <span @click="delImage(item.id)" class="el-icon-delete"></span>
          </div>
        </div>
      </div>

      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="changes"
        :total="count"
        :page-size="reqParms.per_page"
        :current-page="reqParms.page"
      >
      </el-pagination>
    </el-card>

    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
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
    </el-dialog>
  </div>
</template>

<script>
import auth from "../../utils/auth.js";
export default {
  name: "app-image",
  data() {
    return {
      reqParms: {
        collect: false,
        page: 1,
        per_page: 10
      },
      images: [],
      count: 0,
      dialogVisible: false,
      imageUrl: null,
      actionHeaders: {
        Authorization: `Bearer ${auth.getUser().token}`
      }
    };
  },

  created() {
    this.getImages();
  },
  methods: {
    async getImages() {
      const res = await this.$http.get("user/images", {
        params: this.reqParms
      });
      this.images = res.data.data.results;
      this.count = res.data.data.total_count;
      // console.log(res)
    },
    changes(e) {
      this.reqParms.page = e;
      this.getImages();
    },
    changeCollect() {
      this.reqParms.page = 1;
      this.getImages();
    },
    delImage(id) {
      this.$confirm("亲，确认要删除该图片吗？", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          try {
            const res = await this.$http.delete(`user/images/${id}`);
            console.log(res);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getImages();
          } catch (e) {
            this.$message.error("删除失败！");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    openDialog() {
      this.imageUrl = null;
      this.dialogVisible = true;
    },
    handleSuccess(e) {
      this.$message.success("上传成功！");
      this.imageUrl = e.data.url;
      window.setTimeout(() => {
        this.dialogVisible = false;
        this.getImages();
      }, 3000);
    },
    async addImage(item) {
      try {
        const res = await this.$http.put(`user/images/${item.id}`, {
          collect: !item.is_collected
        });
        this.getImages();
        this.$message.success(
          res.data.data.collect ? "添加收藏成功" : "取消收藏成功"
        );
      } catch (e) {
        this.$message.error("收藏失败");
      }
    }
  }
};
</script>

<style scoped lang="less">
.img-list {
  margin-bottom: 15px;
  .img-item {
    width: 180px;
    height: 180px;
    border: 1px dashed #ddd;
    position: relative;
    margin-top: 20px;
    display: inline-block;
    margin-right: 30px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .option {
      width: 100%;
      height: 30px;
      line-height: 30px;
      background: rgba(0, 0, 0, 0.3);
      position: absolute;
      left: 0;
      bottom: 0;
      text-align: center;
      span {
        color: #fff;
        margin: 0 30px;
      }
      .red {
        color: red;
      }
    }
  }
}
</style>
