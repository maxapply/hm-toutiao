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

        <el-form-item label="内容：">
          <quillEditor
            v-model="articles.content"
            :options="editorOption"
          ></quillEditor>
        </el-form-item>

        <el-form-item label="封面：">
          <el-radio-group
            @change="articles.cover.images = []"
            v-model="articles.cover.type"
          >
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <div>
            <div v-if="articles.cover.type === 1">
              <my-image v-model="articles.cover.images[0]"></my-image>
            </div>
            <div v-else>
              <my-image
                :key="item"
                v-for="item in 3"
                v-model="articles.cover.images[item - 1]"
              ></my-image>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="频道：">
          <my-channel v-model="articles.channel_id"></my-channel>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            size="small"
            @click="publishArticle('false')"
            >发布文章</el-button
          >
          <el-button size="small" @click="publishArticle('true')"
            >存入草稿</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import router from "../../router/index.js";
export default {
  name: "publish",
  components: { quillEditor },

  data() {
    return {
      articles: {
        title: null,
        content: null,
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      },
      editorOption: {
        placeholder: "",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            ["image"]
          ]
        }
      }
    };
  },
  methods: {
    async publishArticle(zhi) {
      await this.$http.post("articles", this.articles, {
        draft: zhi
      });
      router.push("article");
    }
  }
};
</script>

<style scoped lang="less"></style>
