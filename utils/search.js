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
      this.param == "building"
        ? (this.title = "Купить здание в Таджикистане")
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
      this.param == "building"
        ? (this.title = "Арендовать посуточно здание в Таджикистане")
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
      this.param == "building"
        ? (this.title = "Арендовать здание в Таджикистане")
        : "";
    }
  }
};
