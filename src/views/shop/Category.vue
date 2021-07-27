<!-- Generic Category Component. kinda tough to work with-->
<template>
    <div class="tab-port:flex tab-port:flex-wrap tab-port:justify-center">
        <ShopCard :drink="drink" v-for="drink in drinks"/>
    </div>
</template>

<script>
import ShopCard from '@/components/ShopCard.vue';

export default {
  components: {
    ShopCard,
  },
  props: {
    category: {
      type: Number,
      required: true,
      default: 10,
    },
  },
  data: () => ({
    drinks: [],
  }),
  mounted() {
    this.getDrinks();
  },
  methods: {
    getDrinks() {
      this.$store.dispatch('shop/startLoadingCategory');

      const url = `/api/products/category/${this.category}`;

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
