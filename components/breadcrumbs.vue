<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">Главная</el-breadcrumb-item>
    <el-breadcrumb-item v-for="(item, i) in breadcrumbsLinks" :key="i">
      <nuxt-link :to="item.path">
        {{ item.meta.title }}
      </nuxt-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  // data() {
  //   return {
  //     items: []
  //   };
  // },
  // watch: {
  //   $route() {
  //     this.getRoute();
  //   }
  // },
  // created() {
  //   this.getRoute();
  // },
  // methods: {
  //   getRoute() {
  //     this.items = this.$route.matched;
  //     console.log(this.items);
  //   }
  // },
  computed: {
    breadcrumbsLinks() {
      let tmp = [];
      if (this.$route.matched) {
        this.$route.matched.forEach(link => {
          tmp.push(
            Object.assign({ meta: { title: "Title not found in meta" } }, link)
          );
        });
      }
      if (tmp.length === 0) {
        tmp.push({ path: "/", meta: { title: "Home" } });
      }
      console.log(tmp);
      return tmp;
    }
  }
  // computed: {
  //   crumbs() {
  //     const crumbs = [];
  //     this.$route.matched.forEach((item, i, { length }) => {
  //       const crumb = {};
  //       crumb.path = item.path;
  //       crumb.name = item.name || item.path;

  //       // is last item?
  //       if (i === length - 1) {
  //         // is param route? .../.../:id
  //         if (item.regex.keys.length > 0) {
  //           crumbs.push({
  //             path: item.path.replace(/\/:[^/:]*$/, ""),
  //             name: item.name.replace(/-[^-]*$/, "")
  //           });
  //           crumb.path = this.$route.path;
  //           (crumb.name = this.$route.name), [crumb.path.match(/[^/]*$/)[0]];
  //         }
  //         crumb.classes = "nuxt-link-exact-active";
  //       }

  //       crumbs.push(crumb);
  //     });

  //     return crumbs;
  //   }
  // }
};
</script>
