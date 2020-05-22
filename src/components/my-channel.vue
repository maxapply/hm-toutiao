<template>
  <div class="my-channel">
    <el-select
      clearable
      :value="value"
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
  </div>
</template>

<script>
export default {
  props: ["value"],
  name: "my-channel",
  data() {
    return {
      changeOptions: []
    };
  },
  created() {
    this.getChannels();
  },
  methods: {
    changes(e) {
      if (e === "") {
        e = null;
      }
      this.$emit("input", e);
    },
    async getChannels() {
      const res = await this.$http.get("channels");
      this.changeOptions = res.data.data.channels;
    }
  }
};
</script>

<style scoped lang="less"></style>
