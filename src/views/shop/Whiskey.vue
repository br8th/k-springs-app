<template>
    <div class="tab-port:flex tab-port:flex-wrap tab-port:justify-center">
        <!--<div v-scroll:throttle="{fn: onScroll, throttle: 0 }" style="height: 100px; overflow: auto">-->
            <ShopCard :drink="drink" v-for="drink in drinks" :key="drink.id"/>
        <!--</div>-->
    </div>
</template>

<script>
import ShopCard from '@/components/ShopCard.vue';

export default {
  name: 'ShopWhiskey',
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

      const url = '/api/products/category/10';

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
