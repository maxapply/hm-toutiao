<template>
  <div class="article">
    <el-card class="box-card">
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>

      <el-form label-width="80px" size="small">
        <el-form-item label="状态：">
          <el-radio-group v-model="filterData.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <el-select
            clearable
            v-model="filterData.channel_id"
            placeholder="请选择活动区域"
            @change="changes"
          >
            <el-option
              v-for="item in changeOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="dataArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeData"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="setting">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card" style="margin-top:20px">
      <div slot="header">根据筛选条件共查询到 {{ count }} 条结果：</div>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image
              style="width: 150px; height: 100px"
              :src="scope.row.cover.images[0]"
            >
              <div slot="error">
                <img
                  src="../../assets/error.gif"
                  style="width: 150px; height: 100px"
                  alt=""
                /></div
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column prop="address" label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success"
              >审核通过</el-tag
            >
            <el-tag v-if="scope.row.status === 3" type="warning"
              >审核失败</el-tag
            >
            <el-tag v-if="scope.row.status === 4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"> </el-table-column>
        <el-table-column prop="address" label="操作" width="120px">
          <template slot-scope="scope">
            <el-button
              @click="toEditArticle(scope.row.id)"
              type="primary"
              icon="el-icon-edit"
              plain
              circle
            ></el-button>
            <el-button
              @click="removeArticle(scope.row.id)"
              type="danger"
              plain
              icon="el-icon-delete"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top:20px"
        background
        layout="prev, pager, next"
        :total="count"
        :page-size="filterData.per_page"
        @current-change="currentChanges"
        :current-page="filterData.page"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "app-article",
  data() {
    return {
      filterData: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      changeOptions: [],
      dataArr: [],
      tableData: [],
      count: 0
    };
  },
  created() {
    this.getChannels();
    this.getArticles();
  },
  methods: {
    async getChannels() {
      const res = await this.$http.get("channels");
      this.changeOptions = res.data.data.channels;
    },
    async getArticles() {
      const res = await this.$http.get("articles", {
        params: this.filterData
      });
      this.tableData = res.data.data.results;

      this.count = res.data.data.total_count;
    },
    currentChanges(e) {
      this.filterData.page = e;
      this.getArticles();
    },
    changeData(e) {
      if (e) {
        this.filterData.begin_pubdate = e[0];
        this.filterData.end_pubdate = e[1];
      } else {
        this.filterData.begin_pubdate = null;
        this.filterData.end_pubdate = null;
      }
    },
    setting() {
      this.filterData.page = 1;
      this.getArticles();
    },
    changes(e) {
      if (e === "") {
        this.filterData.channel_id = null;
      }
    },
    toEditArticle(id) {
      this.$router.push(`/publish?id=${id}`);
    },
    removeArticle(id) {
      this.$confirm("亲, 您是否要删除该篇文章?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          try {
            await this.$http.delete(`articles/${id}`);

            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getArticles();
          } catch (e) {
            this.$message.error("删除失败");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style scoped lang="less"></style>
