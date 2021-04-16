<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Главная</el-breadcrumb-item>
      <el-breadcrumb-item :to="item.path" v-for="(item, i) in crumbs" :key="i">
        {{ item.name || "" }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  computed: {
    crumbs() {
      const crumbs = [];
      this.$route.matched.forEach((item, i, { length }) => {
        const crumb = {};
        crumb.path = item.path;
        crumb.name = this.$i18n.t("route." + item.path.match(/[^/]*$/)[0]);

        if (i === length - 1) {
          if (item.regex.keys.length > 0) {
            crumbs.push({
              path: item.path.replace(/\/:[^/:]*$/, ""),
              name: this.$i18n.t("route." + item.name.replace(/-[^-]*$/, ""))
            });
            crumb.path = this.$route.path;
            crumb.name = this.$i18n.t(
              "route." + [crumb.path.match(/[^/]*$/)[0]]
            );
          }
        }

        crumbs.push(crumb);
      });

      return crumbs;
    }
  }
};
</script>
