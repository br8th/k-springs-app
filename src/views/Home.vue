<template>
    <div class="container mx-auto h-screen overflow-auto" id="home-container">
        <header class="header">

            <div class="flex">
                <div class="header__logo mr-auto">
                    <router-link :to="{name: 'home'}">
                      <h3 class="text-white">KSprings</h3>
                    </router-link>
                </div>

                <nav class="navigation">
                    <ul>
                        <li>
                            <router-link :to="{name: 'home'}">Home</router-link>
                        </li>
                        <li>
                            <router-link :to="{name: 'shop'}">Shop</router-link>
                        </li>
                    </ul>
                </nav>
            </div>

            <carousel
                    :autoplay="true"
                    :per-page="1"
                    :loop="true"
                    pagination-color="transparent"
                    pagination-active-color="#FEFEFE">

                <sslide class="header__content">
                    <h6 class="text-3xl font-semibold">&mdash; Online Shop &mdash;</h6>
                    <h2 class="uppercase tracking-wide text-5xl font-black">You Order We Deliver</h2>

                    <router-link :to="{name: 'shop'}" class="btn btn--pretty mt-12">
                        Shop Now
                    </router-link>
                </sslide>

                <sslide class="header__content">
                    <h6 class="text-3xl font-semibold">&mdash; Events &mdash;</h6>
                    <h2 class="uppercase tracking-wide text-5xl font-black">We Offer Open & Cashbar Services</h2>
                    <a href="#" class="btn btn--pretty mt-12">Book</a>
                </sslide>

            </carousel>

        </header>

        <!-- [START] User recommendations -->
        <div class="featured-products py-32">
            <h3 class="tracking-normal uppercase mb-8">Recommendations For You</h3>

            <p class="mb-16">
                We think you'd like
            </p>

            <flickity v-if="Object.keys(recommendedProducts).length > 0" ref="flickity" :options="flickityOptions">
                <div class="carousel-cell" v-for="(drink, i) in recommendedProducts" :index="i">
                    <div class="product-card-home font-medium">
                        <div class="h-72-k">
                            <img :src="drink.image"
                                 class="product-card__image"/>
                        </div>
                        <p class="py-8 product-card-home__title">
                            {{ drink.title }}
                        </p>
                        <div class="product-card__footer">
                            <span> KES {{ Number(drink.price).toLocaleString() }}</span>
                            <button class="btn btn--orange" @click="addToCart(drink)">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </flickity>
        </div>
        <!-- [END] User Recommendations -->

        <Footer></Footer>
    </div>

</template>

<script>
  import Footer from "@/components/Footer.vue";
  import {Carousel, Slide} from "vue-carousel";
  import Flickity from '@/components/Flickity';
  import {mapGetters} from 'vuex';
  import config from '@/config.js';

  export default {
    name: "home",
    components: {
      Footer,
      Carousel,
      sslide: Slide,
      Flickity
    },
    data: () => {
      return {
        mapOptions: {
          styles: [
            {
              featureType: "administrative.locality",
              elementType: "all",
              stylers: [
                {hue: "#c79c60"},
                {saturation: 7},
                {lightness: 19},
                {visibility: "on"}
              ]
            },
            {
              featureType: "landscape",
              elementType: "all",
              stylers: [
                {hue: "#ffffff"},
                {saturation: -100},
                {lightness: 100},
                {visibility: "simplified"}
              ]
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [
                {hue: "#c79c60"},
                {saturation: -52},
                {lightness: -10},
                {visibility: "on"}
              ]
            },
            {
              featureType: "road",
              elementType: "labels",
              stylers: [
                {hue: "#c79c60"},
                {saturation: -93},
                {lightness: 31},
                {visibility: "on"}
              ]
            },
            {
              featureType: "road.arterial",
              elementType: "labels",
              stylers: [
                {hue: "#c79c60"},
                {saturation: -93},
                {lightness: -2},
                {visibility: "simplified"}
              ]
            },
            {
              featureType: "road.local",
              elementType: "geometry",
              stylers: [
                {hue: "#c79c60"},
                {saturation: -52},
                {lightness: -10},
                {visibility: "simplified"}
              ]
            },
            {
              featureType: "transit",
              elementType: "all",
              stylers: [
                {hue: "#c79c60"},
                {saturation: 10},
                {lightness: 69},
                {visibility: "on"}
              ]
            },
            {
              featureType: "water",
              elementType: "all",
              stylers: [
                {hue: "#c79c60"},
                {saturation: -78},
                {lightness: 67},
                {visibility: "simplified"}
              ]
            }
          ]
          // mapTypeControl: false,
          // streetViewControl: false,
        },
        form: new Form(),
        recommendedProducts: [],
        flickityOptions: {
          initialIndex: 0,
          prevNextButtons: true,
          pageDots: false,
          wrapAround: true,
          autoPlay: true,
          contain: true,
        },
      };
    },
    computed: {
      ...mapGetters({
          isAuthenticated: "auth/isAuthenticated",
          user: "auth/currentUser",
      })
    },
    mounted() {
      this.getRecommendedProducts();
    },
    methods: {
      addToCart(product) {
        this.$store.dispatch("shop/addToCart", product);
        this.$notify({
          message: `${product.title} added to cart`,
          type: "success"
        });
      },
      getRecommendedProducts() {
        if(!this.isAuthenticated)
          return;

        const url = `/recommendations/user/${this.user.id}`;

        axios.create({baseURL: config.rs_url}).get(url)
          .then(({data}) => {
            this.recommendedProducts = data;
          })
          .catch(errors => {
            console.log(errors)
            this.$notify({
              message: "Error while fetching recommendations",
              type: "danger"
            });
          });
      },
     
    }
  };
</script>

<style lang="scss">
    .VueCarousel {
        height: 92%;
        padding-top: 6rem;

        &-slide {
            height: inherit;
        }

        &-wrapper {
            height: inherit;
        }

        &-inner {
            height: inherit;
        }
    }

    .VueCarousel-dot {
        .VueCarousel-dot-button {
            border: 1.2px solid #fefefe;
        }
    }

    .carousel-3d-slide {
        border: none;
        background-color: #ffffff;
    }

    .carousel-3d-slide img {
    }

    .carousel-3d-slide.current {
    }
</style>
