<template>
  <div class="article">article</div>
</template>

<script>
export default {
  name: "app-article",
  data() {
    return {};
  },
  created() {
    this.$http
      .get("articles")
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped lang="less"></style>
