<template>
  <div class="card-wrap">
    <div v-if="param">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis
      similique exercitationem suscipit sint distinctio vel facilis corporis
      adipisci ea labore est quos facere libero nesciunt minus tenetur sit
      mollitia voluptatem ex eaque sapiente, dolor asperiores quam voluptates.
      Esse delectus quidem quasi nisi obcaecati et aliquid. Numquam, quia.
      Sequi, reprehenderit incidunt doloribus excepturi veritatis quae
      architecto unde molestias pariatur dignissimos, quibusdam voluptates
      quaerat. Sunt praesentium animi consequatur dolore, distinctio libero!
      Ipsum, laborum voluptatibus amet voluptate quia esse sint ipsa quas,
      corrupti ducimus, dolorum ullam rem sapiente! Officia velit officiis rem
      labore molestias, aliquid doloremque eligendi consequatur fugit quisquam
      saepe eum omnis quasi impedit nemo, non mollitia? Quas quos reiciendis rem
      sunt veritatis aut iure illo ab alias cum assumenda obcaecati, distinctio
      nihil aliquid repellat enim. Eveniet quae quidem velit repellat delectus!
      Deserunt, cumque assumenda? Vel quisquam, hic sunt commodi alias animi
      ducimus iste pariatur, voluptates possimus unde! Modi eaque quas
      voluptates.
    </div>
    <div v-else>
      kek
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      param: this.$route.params.realtyType
    };
  }
  // async asyncData({ params, redirect }) {
  //   console.log(params.realtyType);
  //   return {
  //     param: params.realtyType
  //   };
  // }
};
</script>

<style></style>
