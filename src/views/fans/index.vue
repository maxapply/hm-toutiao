<template>
  <div class="fans">
    <el-card class="box-card">
      <div slot="header">
        <my-bread>粉丝管理</my-bread>
      </div>

      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="list">
          <div class="fans_list">
            <div
              class="item_list"
              v-for="item in list"
              :key="item.id.toString()"
            >
              <el-avatar :src="item.photo" :size="80"></el-avatar>
              <p>{{ item.name }}</p>
              <el-button size="small" type="primary" plain>+关注</el-button>
            </div>

            <el-pagination
              :page-size="fansList.per_page"
              :current-page="fansList.page"
              @current-change="change"
              background
              layout="prev, pager, next"
              :total="count"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="second">
          <div ref="main" style="width: 600px;height:400px;"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "fans",
  data() {
    return {
      activeName: "list",
      list: [],
      fansList: {
        page: 1,
        per_page: 24
      },
      count: 0
    };
  },
  created() {
    this.getFansList();
  },
  mounted() {
    var myChart = echarts.init(this.$refs.main);
    // 指定图表的配置项和数据
    var option = {
      color: ["#3398DB"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "直接访问",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  },
  methods: {
    async getFansList() {
      const res = await this.$http.get("followers", {
        params: this.fansList
      });
      this.list = res.data.data.results;
      this.count = res.data.data.total_count;
    },
    change(e) {
      this.fansList.page = e;
      this.getFansList();
    }
  }
};
</script>

<style scoped lang="less">
.fans_list {
  .item_list {
    padding-top: 10px;
    width: 170px;
    height: 188px;
    display: inline-block;
    text-align: center;
    border: 1px dashed #ddd;
    margin-right: 50px;
    margin-bottom: 20px;
    p {
      padding: 0;
      font-style: 12px;
    }
  }
}
</style>
