<template>
  <div class="NotFound">
    <!-- <img src="../../assets/404.png" alt=""> -->
  </div>
</template>

<script>
export default {
  name: "NotFound",
  data() {
    return {};
  }
};
</script>

<style scoped lang="less">
.NotFound {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  background: url("../../assets/404.png") no-repeat;
  background-size: cover;
}
</style>
