<template>
  <el-pagination
    @current-change="handleCurrentChange"
    background
    layout="prev, pager, next"
    :total="listPages"
    :page-size="1"
  ></el-pagination>
</template>

<script>
export default {
  props: ["listPages"],
  methods: {
    handleCurrentChange(val) {
      window.scrollTo(0, 0);
      let queryData = {};
      queryData.page = val;
      this.$router.push({ query: queryData });
    }
  }
};
</script>
