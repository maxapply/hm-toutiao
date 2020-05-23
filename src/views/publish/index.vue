<template>
  <div class="publish">
    <el-card>
      <div slot="header">
        <my-bread>{{ $route.query.id ? "修改" : "发布" }}文章</my-bread>
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
          <div v-if="$route.query.id">
            <el-button type="success" size="small" @click="updata()"
              >修改文章</el-button
            >
          </div>
          <div v-else>
            <el-button
              type="primary"
              size="small"
              @click="publishArticle(false)"
              >发布文章</el-button
            >
            <el-button size="small" @click="publishArticle(true)"
              >存入草稿</el-button
            >
          </div>
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
  created() {
    if (this.$route.query.id) {
      this.getArticle();
    }
  },
  watch: {
    "$route.query.id": function() {
      this.toggleFormIfo();
    }
  },
  methods: {
    async publishArticle(draft) {
      try {
        await this.$http.post(`articles?draft=${draft}`, this.articles);
        this.$message.success(draft ? "存入草稿成功！" : "发布文章成功！");
        this.$router.push("/article");
      } catch (e) {
        this.$message.error("操作失败");
      }
    },
    async getArticle() {
      const res = await this.$http.get(`articles/${this.$route.query.id}`);
      this.articles = res.data.data;
    },
    toggleFormIfo() {
      if (this.$route.query.id) {
        this.getArticle();
      } else {
        this.articles = {
          title: null,
          content: null,
          cover: {
            type: 1,
            images: []
          },
          channel_id: null
        };
      }
    },
    async updata() {
      try {
        await this.$http.put(
          `articles/${this.$route.query.id}?draft=false`,
          this.articles
        );
        this.$message.success("修改成功！");
        this.$router.push("/article");
      } catch (e) {
        this.$message.error("修改失败！");
      }
    }
  }
};
</script>

<style scoped lang="less"></style>
