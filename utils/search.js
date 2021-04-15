import Api from "~/utils/api";
export const search = {
  created() {
    let deal = this.$route.path.split("/")[1];
    let kind = this.$route.path.split("/")[2];
    if (deal == "buy") {
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
      this.param == "room"
        ? (this.title = "Купить комнату в Таджикистане")
        : "";
    } else if (deal == "daily") {
      this.param == "apartment"
        ? (this.title = "Снять посуточно квартиру в Таджикистане")
        : "";
      this.param == "commercy"
        ? (this.title =
            "Снять посуточно коммерческую недвижимость в Таджикистане")
        : "";
      this.param == "house"
        ? (this.title = "Снять посуточно дом в Таджикистане")
        : "";
      this.param == "ground"
        ? (this.title = "Снять посуточно участок в Таджикистане")
        : "";
      this.param == "room"
        ? (this.title = "Снять посуточно комнату в Таджикистане")
        : "";
    } else if (deal == "rent") {
      this.param == "apartment"
        ? (this.title = "Снять квартиру в Таджикистане")
        : "";
      this.param == "commercy"
        ? (this.title = "Снять коммерческую недвижимость в Таджикистане")
        : "";
      this.param == "house" ? (this.title = "Снять дом в Таджикистане") : "";
      this.param == "ground"
        ? (this.title = "Снять участок в Таджикистане")
        : "";
      this.param == "room" ? (this.title = "Снять комнату в Таджикистане") : "";
    }
    this.get();
  },
  methods: {
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
