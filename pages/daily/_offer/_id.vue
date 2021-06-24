<template>
  <OfferCard class="container" :offerData="offerData" typeDeal="Посуточно" />
</template>
<script>
import axios from "axios";
export default {
  async asyncData({ route }) {
    let offerData;
    const { id } = route.params;
    return axios
      .get(`https://maidon.tj/server/api/v1/get_offer/${id}`)
      .then((response) => {
        offerData = response.data;
        return { offerData };
      });
  },

  head() {
    return {
      title: this.whatTitle(),
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.cutDescription(),
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: this.offerData.offerPhothos[0].imgName,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.offerData.offerPhothos[0].imgName,
        },
        {
          hid: "og:image:secure_url",
          property: "og:image:secure_url",
          content: this.offerData.offerPhothos[0].imgName,
        },
        {
          hid: "og:image:alt",
          property: "og:image:alt",
          content: this.title,
        },
      ],
    };
  },
  methods: {
    cutDescription() {
      return this.offerData.offerDescription.replace("<br />", " ");
    },
    whatTitle() {
      if (this.offerData) {
        if (this.offerData.offer_price.deal == "rent_long") {
          return "Снять " + this.offerData.title;
        } else if (this.offerData.offer_price.deal == "sell") {
          return "Купить " + this.offerData.title;
        } else {
          return "Посуточно " + this.offerData.title;
        }
      }
    },
  },
};
</script>
