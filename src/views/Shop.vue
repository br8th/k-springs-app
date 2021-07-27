<template>
    <div class="container mx-auto overflow-auto">
        <header class="auto-hide-header" id="header">
            <div class="auto-hide-header__logo">

                <div v-if="isAuthenticated">
                    {{ user.name }}
                    <a href="" @click="$store.dispatch('auth/logout')">Logout</a>
                </div>

                <div v-else>
                    <a href="#register" @click="open('register', $event)">Register</a>
                    <a href="#login" @click="open('login', $event)">Login</a>
                </div>
            </div>

            <nav class="primary-nav">
                <a href="#" class="auto-hide-header__nav-trigger">
          <span>
            <em aria-hidden="true"></em>Menu
          </span>
                </a>
                <!-- .nav-trigger -->

                <ul id="navigation" class="uppercase tracking-wide">
                    <li>
                        <router-link :to="{ name: 'home' }">Home</router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'shop' }">Shop</router-link>
                    </li>
                    <li class="cart-trigger flex justify-center items-center cursor-pointer icon-box sm:hidden">
                        <div style="position: relative">
                            <img src="../assets/img/cart-black.svg" class="icon-box__icon">
                            <span class="icon-box__notification">{{ amount }}</span>
                        </div>
                    </li>
                </ul>
            </nav>
            <!-- .primary-nav -->

            <nav class="secondary-nav shadow">
                <ul>
                    <li>
                        <router-link :to="{name: 'shop-vodka'}">Vodka</router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'shop-whiskey'}">Whiskey</router-link>
                    </li>
                    <!--<li>-->
                    <!--<router-link :to="{name: 'shop-single-malt'}">Single Malt</router-link>-->
                    <!--</li>-->
                    <li>
                        <router-link :to="{name: 'shop-rum'}">Rum</router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'shop-gin'}">Gin</router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'shop-tequila'}">Tequila</router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'shop-liqueur'}">Liqueur</router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'shop-brandy'}">Brandy</router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'shop-reserves'}">Reserves</router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'shop-vermouth'}">Vermouth</router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'shop-wine'}">Wine</router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'shop-others'}">Others</router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'shop-offers'}">Offers</router-link>
                    </li>
                </ul>
            </nav>
        </header>

        <!-- [START] main content-->
        <main
                class="main-content sub-nav pb-24 tab-port:mt-6 overflow-auto h-screen"
                v-scroll="handleScroll">
            <!-- [START] login popup -->
            <div
                    class="user-modal-container"
                    :class="{ 'active': active }"
                    id="login-modal"
                    @click="close">
                <div class="user-modal">
                    <ul class="form-switcher">
                        <li @click="flip('register', $event)">
                            <a href id="register-form">Register</a>
                        </li>
                        <li @click="flip('login', $event)">
                            <a href id="login-form">Login</a>
                        </li>
                    </ul>
                    <div
                            class="form-register"
                            :class="{ 'active': active == 'register' }"
                            id="form-register">

                        <div class="form-group">
                            <input
                                    type="text"
                                    name="user"
                                    placeholder="Name"
                                    v-model="model.name"
                                    @keyup.enter="register">

                            <span
                                    class="invalid-feedback"
                                    v-if="registerForm.errors.has('name')">
                                {{ registerForm.errors.get('name') }}
                            </span>
                        </div>

                        <div class="form-group">
                            <input
                                    type="text"
                                    name="user"
                                    placeholder="Email Address"
                                    v-model="model.email"
                                    @keyup.enter="register">

                            <span
                                    class="invalid-feedback"
                                    v-if="registerForm.errors.has('email')">
                                {{ registerForm.errors.get('email') }}
                            </span>
                        </div>

                        <div class="form-group">
                            <input
                                    type="text"
                                    name="phone_number"
                                    placeholder="Phone Number"
                                    v-model="model.phone_number"
                                    @keyup.enter="register">

                            <span
                                    class="invalid-feedback"
                                    v-if="registerForm.errors.has('phone_number')">
                                {{ registerForm.errors.get('phone_number') }}
                            </span>
                        </div>

                        <div class="form-group">
                            <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    v-model="model.password"
                                    @keyup.enter="register">

                            <span
                                    class="invalid-feedback"
                                    v-if="registerForm.errors.has('password')">
                                {{ registerForm.errors.get('password') }}
                            </span>
                        </div>

                        <div class="btn btn--orange ld-ext-right" :class="{ 'running' : registerForm.isPending }"
                             @click="register()">
                            Register
                            <div class="ld ld-ring ld-spin-fast"></div>
                        </div>

                        <div class="links">
                            <a href @click="flip('login', $event)">Already have an account?</a>
                        </div>

                    </div>

                    <div class="form-login" :class="{ 'active': active == 'login' }" id="form-login">

                        <div class="form-group">
                            <input
                                    type="text"
                                    name="user"
                                    placeholder="Email Address"
                                    v-model="model.email"
                                    @keyup.enter="login">

                            <span
                                    class="invalid-feedback"
                                    v-if="loginForm.errors.has('email')">
                                {{ loginForm.errors.get('email') }}
                            </span>
                        </div>

                        <div class="form-group">
                            <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    v-model="model.password"
                                    @keyup.enter="login">

                            <span
                                    class="invalid-feedback"
                                    v-if="loginForm.errors.has('password')">
                                {{ loginForm.errors.get('password') }}
                            </span>
                        </div>

                        <div class="btn btn--orange ld-ext-right" :class="{ 'running' : loginForm.isPending }"
                             @click="login()">
                            Login
                            <div class="ld ld-ring ld-spin-fast"></div>
                        </div>

                        <!-- END login Submit -->

                        <div class="links">
                            <a href @click="flip('password', $event)">Forgot your password?</a>
                        </div>
                    </div>
                </div>
            </div>
            <!-- [END] Login popup -->
            <div
                    class="h-full w-full flex items-center justify-center"
                    style="position: absolute"
                    v-show="$store.state.shop.isCategoryLoading">
                <div class="whiskey-loader">
                    <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 65 65"
                            height="65px"
                            width="65px">
                        <path
                                fill="#796B63"
                                d="M58.4,8.3c-0.6-2.2-1.7-4.1-8.4-5.5c-4.8-1-17.5-3.5-35.2-0.1C9.6,3.7,7,5.6,6.9,7.6c-0.3,1.8-5.8,32-4,40.2
                        C5.3,58.5,15.3,64,32.7,64c17.6,0,26.9-5.6,29.3-16.6C63.9,39.2,58.9,10.2,58.4,8.3 M32.4,3.1c15.3,0,23.6,3.1,23.6,4.6
                        c0,1.6-8.3,4.6-23.6,4.6S8.9,9.3,8.9,7.8C8.9,6.2,17.2,3.1,32.4,3.1 M60,47.4C57.7,57.4,49.4,62,32.7,62C16.4,62,7.1,57,4.9,47.4
                        c-1.5-6.7,2.3-29.6,3.6-37c1.3,0.9,3.4,1.7,6.4,2.4c4.7,1.1,11,1.7,17.6,1.7s12.9-0.6,17.6-1.7c3-0.7,5.1-1.5,6.4-2.4
	C57.7,17.7,61.5,40.8,60,47.4">
                        </path>

                        <path
                                fill="#E4852E"
                                fill-opacity="0.85"
                                d="M5.4,31.3C4.6,38,4.2,44.4,4.9,47.4C7.1,57,16.4,62,32.7,62c16.7,0,25.1-4.5,27.3-14.6
	c0.7-3,0.3-9.5-0.5-16.3c-6,2-16.7,5-27.3,5C21.9,36.1,11.5,33.3,5.4,31.3z"
                        >
                            <animate
                                    attributeName="d"
                                    calcMode="spline"
                                    keySplines="0.45 0.03 0.5 0.95; 0.45 0.03 0.5 0.95"
                                    values="
					   M5.4,31.3C4.6,38,4.2,44.4,4.9,47.4C7.1,57,16.4,62,32.7,62c16.7,0,25.1-4.5,27.3-14.6
	c0.7-3,0.3-9.5-0.5-16.3c-6,2-16.7,5-27.3,5C21.9,36.1,11.5,33.3,5.4,31.3z;
					   M5.1,34.6c-0.8,6.8-0.8,9.8-0.2,12.8C7.1,57,16.4,62,32.7,62c16.7,0,25.1-4.5,27.3-14.6
	c0.7-3,0.6-6.1-0.2-12.9c-6,2-17,4.3-27.7,4.3C21.9,38.8,11.2,36.6,5.1,34.6z;
					   M5.4,31.3C4.6,38,4.2,44.4,4.9,47.4C7.1,57,16.4,62,32.7,62c16.7,0,25.1-4.5,27.3-14.6
	c0.7-3,0.3-9.5-0.5-16.3c-6,2-16.7,5-27.3,5C21.9,36.1,11.5,33.3,5.4,31.3z"
                                    dur="3s"
                                    repeatCount="indefinite"
                            ></animate>
                        </path>
                    </svg>
                </div>
            </div>

            <transition :name="transitionName" mode="out-in">
                <router-view class="child-view"></router-view>
            </transition>
        </main>
        <!-- [END] main content-->

        <!--Cart Bottom Sheet -->
        <div
                class="cart-bottom-sheet tab-port:hidden fixed h-24 w-full bg-white flex flex-col justify-center text-black"
        >
            <div class="flex px-10 justify-between">
                <div class="text-3xl">
                    <span class="u-text-orange">KES</span>
                    <span class="text-4xl">{{ total }}</span>
                </div>
                <button class="btn btn--bottom-sheet cart-trigger shadow-inner flex justify-center">
                    <img src="../assets/img/cart.svg" class="h-12 w-12">
                    {{ amount }}
                </button>
            </div>
        </div>

        <div id="shadow-layer"></div>

        <!-- Cart -->
        <div id="cart" class="cart w-full tab-port:w-1/4 flex flex-col">
            <div class="flex uppercase p-6 tab-port:p-4 items-center">
                <h4 class="cart-trigger flex justify-center items-center">
                    <img src="../assets/img/close.svg" class="h-8 w-8 cursor-pointer">
                </h4>
                <h4 class="u-text-orange text-2xl mx-auto">Your Cart</h4>
                <button class="btn p-0 tab-port:p-2" @click="$store.dispatch('shop/clearCart')">Empty</button>
            </div>

            <ul class="cart__items flex-1">
                <!-- CartItem.vue ? well I tried. Still a noob at vue. Deep watchers wouldn't work -->
                <div class="flex justify-between border-b-2 border-grey-lightest p-4 h-48"
                     v-for="item in cart" :key="item.id">
                    <div class="h-full w-48">
                        <img :src="item.image" class="h-full">
                    </div>
                    <div class="flex flex-col flex-grow p-4 justify-between items-start text-black">
                        <h5 class="text-2xl w-3/4 text-left">{{ item.title }}</h5>
                        <h4 class="text-xl">{{ item.category.title }}</h4>
                        <div>
                            <span class="u-text-orange">KES</span>
                            {{ item.price * item.quantity }}
                        </div>
                    </div>
                    <div class="flex flex-col justify-between">
                        <button
                                class="btn btn--round u-text-orange font-bold text-3xl"
                                @click="addToCart(item)">+
                        </button>
                        <div class="cart-item__qty">{{ item.quantity }}</div>
                        <button
                                class="btn btn--round u-text-orange font-bold text-3xl"
                                @click="removeFromCart(item)">-
                        </button>
                    </div>
                </div>
            </ul>

            <div class="py-6 border-t" v-if="total">
                <router-link :to="{ name: 'checkout'}" tag="button" class="btn btn--orange">Checkout</router-link>
            </div>
        </div>
        <!-- END cart -->
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import ShopCard from "@/components/ShopCard.vue";
    import CartItem from "@/components/CartItem.vue";
    import Footer from "@/components/Footer.vue";
    import {SET_AUTH} from "@/ghala/mutation-types";

    export default {
        name: "home",
        components: {
            ShopCard,
            CartItem,
            Footer
        },
        mounted() {
            // [START] Hide Header
            const mainHeader = this.$el.querySelector(".auto-hide-header");
            const navTrigger = this.$el.querySelector(".auto-hide-header__nav-trigger");

            // open primary navigation on mobile
            navTrigger.addEventListener("click", e => {
                e.preventDefault();
                mainHeader.classList.toggle("nav-open");
            });
            // [STOP] Hide Header

            // [START] Cart
            const cart_trigger = this.$el.querySelectorAll(".cart-trigger");
            const shadow_layer = this.$el.querySelector("#shadow-layer");
            const lateral_cart = this.$el.querySelector("#cart");

            cart_trigger.forEach(el => {
                el.addEventListener("click", e => {
                    e.preventDefault();

                    if (lateral_cart.classList.contains("slide-in")) {
                        lateral_cart.classList.remove("slide-in");
                    } else {
                        lateral_cart.classList.add("slide-in");
                    }

                    shadow_layer.classList.toggle("is-visible");
                });
            });

            shadow_layer.addEventListener("click", e => {
                e.preventDefault();

                shadow_layer.classList.remove("is-visible");

                if (lateral_cart.classList.contains("slide-in")) {
                    lateral_cart.classList.remove("slide-in");
                } else {
                    lateral_cart.classList.remove("slide-in");
                }
            });
            // [END] Cart
        },
        data() {
            return {
                transitionName: "slide-right",
                // Scrolling
                previousTop: 0,
                scrollDelta: 10,
                scrollOffset: 150,

                // [START] login data
                active: null,
                submitted: null,
                loginForm: new Form,
                registerForm: new Form,
                model: {
                    name: '',
                    email: '',
                    password: '',
                    phone_number: '',
                },
                // [END] login data

            };
        },
        computed: {
            ...mapGetters({
                cart: "shop/cart",
                total: "shop/totalCartItems",
                amount: "shop/totalCartAmount",
                isAuthenticated: "auth/isAuthenticated",
                user: "auth/currentUser",
            })
        },
        directives: {
            focus: {
                inserted(el) {
                    el.focus();
                }
            }
        },
        methods: {
            handleScroll(evt, el) {
                const mainHeader = this.$el.querySelector(".auto-hide-header");
                const currentTop = el.scrollTop;

                if (this.previousTop - currentTop > this.scrollDelta) {
                    // if scrolling up...
                    mainHeader.classList.remove("is-hidden");
                } else if (
                    currentTop - this.previousTop > this.scrollDelta &&
                    currentTop > this.scrollOffset
                ) {
                    // if scrolling down...
                    mainHeader.classList.add("is-hidden");
                }

                this.previousTop = currentTop;
            },
            addToCart(product) {
                this.$store.dispatch("shop/addToCart", product);
            },
            removeFromCart(product) {
                this.$store.dispatch("shop/removeFromCart", product);
            },
            socialLogin(provider) {
                // this.error = {};
                axios.post(`/api/login/${provider}`)
                    .then(({data}) => {
                        // if(data.error){
                        // this.error = err.response.data.error;
                        // } else if(response.data.redirectUrl){
                        // console.log(data);
                        window.location.href = data.redirect_url;
                        // }
                    })
                    .catch(error => {
                        console.log(error);
                        // if(err.response.data.error){
                        //     this.error = err.response.data.error;
                        // }
                    });
            },
            // [START] login js
            open(which, e) {
                e.preventDefault();
                this.active = which;
            },
            close(e) {
                e.preventDefault();
                if (e.target.id === 'login-modal') {
                    this.active = null;
                }
            },
            flip(which, e) {
                e.preventDefault();
                if (which !== this.active) {
                    this.active = which;
                }
            },
            login() {

                this.loginForm.post('/api/auth/login', this.model)
                    .then((data) => {
                        let user = data.user;
                        user.token = data.token.access_token;
                        this.$store.dispatch("auth/setAuth", user);
                        // Close Modal
                        this.active = null;
                    }).catch((response) => {
                    let {status, data} = response;

                    // Bad Request
                    if (status === 400) {
                        if (data.error) {
                            this.loginForm.errors.set(data.error.message);
                        }
                    }

                    // Unauthorized
                    if (status === 401) {
                        this.$notify({
                            message: 'Invalid Credentials',
                            type: 'danger',
                        });

                        return;
                    }

                    this.$notify({
                        message: 'Oops, something went wrong',
                        type: 'danger',
                    });
                });

            },
            register() {

                this.registerForm.post('/api/auth/register', this.model)
                    .then((data) => {
                        this.$notify({
                            message: 'Registered Successfully',
                            type: 'success',
                        });
                        let user = data.user;
                        user.token = data.token.access_token;
                        this.$store.dispatch("auth/setAuth", user);
                        // Close Modal
                        this.active = null;
                    }).catch(({response}) => {
                        let {status, data} = response;

                        // Bad Request
                        if (status === 400) {
                            if (data.error) {
                                this.registerForm.errors.set(data.error.message);
                            }
                            return;
                        }

                        this.$notify({
                            message: 'Oops, something went wrong',
                            type: 'danger',
                        });
                    });
            },
            // [END] login js
        },
        watch: {
            $route(to, from) {
                const toDepth = to.path.split("/").length;
                const fromDepth = from.path.split("/").length;
                this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
            }
        }
    };
</script>

<style>
    .slide-left-enter,
    .slide-right-leave-active {
        opacity: 0.01;
        -webkit-transform: translate(500px, 0);
        transform: translate(100px, 0);
    }

    .slide-left-leave-active,
    .slide-right-enter {
        opacity: 0.01;
        -webkit-transform: translate(-500px, 0);
        transform: translate(-100px, 0);
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s ease;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0;
    }

    .child-view {
        transition: all 0.4s cubic-bezier(0.55, 0, 0.1, 1);
    }
</style>
