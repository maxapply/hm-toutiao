<template>
  <div class="comB">b组件：<button @click="clicks">点击</button></div>
</template>

<script>
import evetBus from "../evenBus.js";
export default {
  name: "comB",
  data() {
    return {
      msg: "我是b组件的值"
    };
  },
  methods: {
    clicks() {
      evetBus.$emit("bt2", this.msg);
    }
  }
};
</script>

<style scoped lang="less"></style>
