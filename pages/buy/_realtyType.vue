<template>
  <div>
    <div class="card-wrap">
      <div>
        <Breadcrumbs />
      </div>
      <div><Search :title="title" /></div>
    </div>
    <div class="card-wrap">test</div>
  </div>
</template>

<script>
import Api from "~/utils/api";

export default {
  data() {
    return {
      param: this.$route.params.realtyType,
      title: null
    };
  },
  created() {
    this.param == "apartment"
      ? (this.title = "Купить квартиру в Таджикистане")
      : "";
    this.param == "commercy"
      ? (this.title = "Купить коммерческую недвижимость в Таджикистане")
      : "";
    this.param == "house" ? (this.title = "Купить дом в Таджикистане") : "";
    this.param == "ground"
      ? (this.title = "Купить участок в Таджикистане")
      : "";
    this.param == "room" ? (this.title = "Купить комнату в Таджикистане") : "";
    this.get();
  },
  methods: {
    openAccor() {
      this.isAccorActive = !this.isAccorActive;
    },
    get() {
      let deal = this.$route.path.split("/")[1];
      let kind = this.$route.path.split("/")[2];
      let type =
        Object.keys(this.$route.query).length > 0 ? this.$route.query.type : "";
      let object =
        Object.keys(this.$route.query).length > 0
          ? this.$route.query.object
          : "";
      let repair =
        Object.keys(this.$route.query).length > 0
          ? this.$route.query.repair
          : "";
      // Api.getInstance()
      //   .offer.get_sales_offers(deal, kind, type, object, repair)
      //   .then(response => {
      //     console.log("всё гуд -> ", response);
      //   });
    }
  }
};
</script>
