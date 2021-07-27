<template>
    <div class="tab-port:flex tab-port:flex-wrap tab-port:justify-center">
        <ShopCard :drink="drink" v-for="drink in drinks"/>
    </div>
</template>

<script>
import ShopCard from '@/components/ShopCard.vue';

export default {
  name: 'ShopRum',
  components: {
    ShopCard,
  },
  data: () => ({
    drinks: [],
  }),
  mounted() {
    this.getDistilledBeer();
  },
  methods: {

    // Get it? Because Whiskey is basically just distilled beer.
    getDistilledBeer() {
      this.$store.dispatch('shop/startLoadingCategory');
      const url = '/api/products/category/5';

      axios.get(url)
        .then(({ data }) => {
          this.drinks = data.data;
        })
        .catch((errors) => {

        })
        .finally(() => {
          this.$store.dispatch('shop/stopLoadingCategory');
        });
    },
  },
};
</script>

<style scoped>

</style>

