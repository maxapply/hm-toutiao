<template>
  <div class="publish">
    <el-card>
      <div slot="header">
        <my-bread>发布文章</my-bread>
      </div>
      <el-form label-width="120px">
        <el-form-item label="标题：">
          <el-input
            v-model="articles.title"
            placeholder="请输入文章标题"
            style="width:400px"
          ></el-input>
        </el-form-item>
        <el-form-item label="内容："> </el-form-item>
        <el-form-item label="封面："> </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="articles.channel_id"></my-channel>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small">发布文章</el-button>
          <el-button size="small">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "publish",
  data() {
    return {
      articles: {
        title: null,
        content: null,
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      }
    };
  }
};
</script>

<style scoped lang="less"></style>
