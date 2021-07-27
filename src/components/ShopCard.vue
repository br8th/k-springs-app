<template>
    <div>
        <div class="product-card hidden tab-port:inline-block font-medium">
            <div class="h-64">
                <img :src="drink.image" class="product-card__image"/>
            </div>
            <p class="py-8">
                {{ drink.title }}
            </p>

            <div class="product-card__ratings">
                <span v-for="m in 5" :key="'index' + m" class="col">
                    <input
                            type="checkbox"
                            :checked="m <= getDrinkRating"
                            @change="updateRating(drink.id, m)"
                            :id="'check'+ m + drink.id">
                    <label
                            :for="'check'+ m + drink.id"
                            @mouseover="hoverRatings(drink.id, m)"
                            @mouseleave="hoverRatings(-1, 0)"
                            :class="drink.id == hoverRating.index && m <= hoverRating.value ? 'hovered' : ''">
                    </label>
                </span>
            </div>

            <div class="product-card__footer">
                <span> KES {{ commaSeparate(drink.price) }}</span>
                <button class="btn btn--orange" @click="addAndCelebrate(drink)">
                    Add to Cart
                </button>
            </div>
        </div>

        <div class="product-card-mobile tab-port:hidden flex justify-between border-t-2 p-4 u-h-52 w-full">
            <div class="h-full w-48">
                <img :src="drink.image" class="h-full"/>
            </div>

            <div class="flex flex-col flex-grow p-4 justify-between items-start text-black">
                <p class="text-3xl text-left font-medium">
                    {{ drink.title }}
                </p>
                <div><span class="u-text-orange">KES </span><span
                        class="text-3xl">{{ commaSeparate(drink.price) }}</span></div>
            </div>

            <div class="flex flex-col justify-between">
                <button class="btn btn--round u-text-orange font-bold text-3xl" @click="add(drink)">+</button>
                <div class="cart-item__qty">{{ cartItemQuantity(drink.id) }}</div>
                <button class="btn btn--round u-text-orange font-bold text-3xl" @click="remove(drink)">-</button>
            </div>

        </div>
    </div>

</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'ShopCard',
        props: {
            drink: {
                type: Object,
                required: true,
            },
        },
        data() {
            return{
                hoverRating: {
                    index: -1,
                    value: 0
                },
            }
        },
        methods: {
            addAndCelebrate(product) {
                this.$store.dispatch('shop/addToCart', product);
                this.$notify({message: `${product.title} added to cart`, type: 'success'});
            },
            add(product) {
                this.$store.dispatch('shop/addToCart', product);
            },
            remove(product) {
                this.$store.dispatch('shop/removeFromCart', product);
            },
            commaSeparate(n) {
                return Number(n).toLocaleString();
            },
            hoverRatings(index, value) {
                this.$set(this.hoverRating, 'index', index);
                this.$set(this.hoverRating, 'value', value);
            },
            getDrink(drink) {

                axios(`api/products/${drink}`)
                    .then(({ data }) => {
                        this.drink = data.product
                    }).catch((error) => {
                        this.$notify({
                            message: "Could not fetch product information",
                            type: 'danger',
                        });
                    });
            },
            updateRating(drink, rating) {

                axios.post(`api/products/${drink}/rate`, {rating})
                    .then(({ data }) => {
                        this.getDrink(drink)
                    }).catch((error) => {
                        this.$notify({
                            message: "Could not perform request :(",
                            type: 'danger',
                        });
                    });
            }
        },
        computed: {
            ...mapGetters({
                cartItemQuantity: 'shop/cartItemQuantity',
            }),
            getDrinkRating() {
                let rating = this.drink.ratings.filter((rating) => {
                    return rating.product_id === this.drink.id
                });

                return rating.length ? rating[0].rating : 0
            }
        },
    };

</script>
