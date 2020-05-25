<template>
  <div class="comA">comA组件：{{ msg }}</div>
</template>

<script>
import eventBus from "../evenBus.js";
export default {
  name: "comA",
  data() {
    return {
      msg: ""
    };
  },
  created() {
    eventBus.$on("bt2", data => {
      this.msg = data;
    });
  }
};
</script>

<style scoped lang="less"></style>
