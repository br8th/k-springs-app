<template>
    <div class="flex justify-between border-b-2 border-grey-lightest p-4 u-h-52">
        <div class="h-full w-48">
            <img :src="item.image" class="h-full"/>
        </div>
        <div class="flex flex-col flex-grow p-4 justify-between items-start text-black">
            <h5 class="text-3xl">
                {{ item.title }}
            </h5>
            <h4 class="text-2xl">
                Whiskey
            </h4>
            <div><span class="u-text-orange">KES</span> {{ item.price * item.quantity }}</div>
        </div>
        <div class="flex flex-col justify-between">
            <button class="btn btn--round u-text-orange font-bold text-3xl">+</button>
            <div class="cart-item__qty">{{ item.quantity }}</div>
            <button class="btn btn--round u-text-orange font-bold text-3xl">-</button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'CartItem',
  props: {
    item: {
      type: Object,
      required: true,
      default() {
        return {
          quantity: 1,
        };
      },
    },
  },
  mounted() {
    //
  },
  watch: {
    'item.quantity': function (newVal, oldVal) {
      console.log('Prop changed: ', newVal, ' | was: ', oldVal);
    },
    // item: {
    //   handler(val) {
    //     console.log('watching item')
    //     console.log(val)
    //   },
    //   deep: true
    // },
    // quantity: {
    //   handler(val) {
    //     console.log('watching quantity')
    //     console.log(val)
    //   },
    //   deep: false
    // },
  },
  computed: {
    // quantity() {
    //   return this.item.quantity;
    // },
    //
    // price() {
    //   return this.item.price;
    // },

    // total() {
    //   return this.price * this.quantity;
    // }
  },
};
</script>

<style scoped lang="scss">

</style>
