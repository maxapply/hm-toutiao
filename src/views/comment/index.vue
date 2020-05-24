<template>
  <div class="comment">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <my-bread>评论管理</my-bread>
      </div>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数">
        </el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数">
        </el-table-column>
        <el-table-column label="评论状态">
          <template slot-scope="scope">
            {{ scope.row.comment_status ? "正常" : "关闭" }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <el-button
              size="small"
              v-if="!scope.row.comment_status"
              @click="statusArticle(scope.row.id, true)"
              type="success"
              >打开评论</el-button
            >
            <el-button
              size="small"
              v-else
              type="danger"
              @click="statusArticle(scope.row.id, false)"
              >关闭评论</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        :current-page="reqParams.page"
        :page-size="reqParams.per_page"
        @current-change="changes"
        style="margin-top:20px"
        background
        layout="prev, pager, next"
        :total="count"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "comment",
  data() {
    return {
      tableData: [],
      count: 0,
      reqParams: {
        response_type: "comment",
        page: 1,
        per_page: 20
      }
    };
  },
  created() {
    this.getComment();
  },
  methods: {
    async getComment() {
      const res = await this.$http.get("articles", {
        params: this.reqParams
      });

      this.tableData = res.data.data.results;
      this.count = res.data.data.total_count;
    },
    changes(e) {
      this.reqParams.page = e;
      this.getComment();
    },
    statusArticle(id, zhi) {
      this.$confirm(
        zhi
          ? "您是否确定要打开该文章的评论功能"
          : "您是否确定要关闭该文章的评论功能，关闭后用户无法对文章进行评论",
        "温馨提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(async () => {
          try {
            await this.$http.put(`comments/status?article_id=${id}`, {
              allow_comment: zhi
            });
            this.getComment();

            if (!zhi) {
              this.$message({
                type: "warning",
                message: "关闭成功!"
              });
            } else {
              this.$message({
                type: "success",
                message: "打开成功!"
              });
            }
          } catch (e) {
            this.$message.error("操作失败！");
          }
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped lang="less"></style>
