import Vue from 'vue';
import Router from 'vue-router';
import Checkout from './views/Checkout.vue';

const Home = () => import(/* webpackChunkName: "nyumbani" */ './views/Home.vue');
const Shop = () => import(/* webpackChunkName: "shop" */ './views/Shop.vue');
const ShopBeer = () => import(/* webpackChunkName: "tubonge" */ './views/shop/Beer.vue');
const ShopSingleMalt = () => import(/* webpackChunkName: "single-malt" */ './views/shop/SingleMalt.vue');
const ShopVodka = () => import(/* webpackChunkName: "vodo" */ './views/shop/Vodka.vue');
const ShopRum = () => import(/* webpackChunkName: "cm" */ './views/shop/Rum.vue');
const ShopGin = () => import(/* webpackChunkName: "gin" */ './views/shop/Gin.vue');
const ShopTequila = () => import(/* webpackChunkName: "camino" */ './views/shop/Tequila.vue');
const ShopLiqueur = () => import(/* webpackChunkName: "amarula" */ './views/shop/Liqueur.vue');
const ShopWhiskey = () => import(/* webpackChunkName: "jimbeam" */ './views/shop/Whiskey.vue');
const ShopBrandy = () => import(/* webpackChunkName: "viceroy" */ './views/shop/Brandy.vue');
const ShopReserves = () => import(/* webpackChunkName: "reserves" */ './views/shop/Reserves.vue');
const ShopVermouth = () => import(/* webpackChunkName: "vermouth" */ './views/shop/Vermouth.vue');
const ShopWine = () => import(/* webpackChunkName: "pella" */ './views/shop/Wine.vue');
const ShopOthers = () => import(/* webpackChunkName: "others" */ './views/shop/Others.vue');
const ShopOffers = () => import(/* webpackChunkName: "offers" */ './views/shop/Offers.vue');

const NotFound = () => import(/* webpackChunkName: "404" */ './views/404.vue');

Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: Home,
      name: 'home'
    },
    {
      path: '*',
      component: NotFound,
    },
    {
      path: '/shop',
      name: 'shop',
      redirect: '/shop/vodka',
      component: Shop,
      children: [
        // {
        //   path: 'category/:category',
        //   name: 'shop-category',
        //   component: ShopCategory,
        //   props: true
        // },
        {
          path: 'beer',
          name: 'shop-beer',
          component: ShopBeer,
        },
        {
          path: 'single-malt',
          name: 'shop-single-malt',
          component: ShopSingleMalt,
        },
        {
          path: 'vodka',
          name: 'shop-vodka',
          component: ShopVodka,
        },
        {
          path: 'rum',
          name: 'shop-rum',
          component: ShopRum,
        },
        {
          path: 'gin',
          name: 'shop-gin',
          component: ShopGin,
        },
        {
          path: 'tequila',
          name: 'shop-tequila',
          component: ShopTequila,
        },
        {
          path: 'liqueur',
          name: 'shop-liqueur',
          component: ShopLiqueur,
        },
        {
          path: 'whiskey',
          name: 'shop-whiskey',
          component: ShopWhiskey,
        },
        {
          path: 'brandy',
          name: 'shop-brandy',
          component: ShopBrandy,
        },
        {
          path: 'reserves',
          name: 'shop-reserves',
          component: ShopReserves,
        },
        {
          path: 'vermouth',
          name: 'shop-vermouth',
          component: ShopVermouth,
        },
        {
          path: 'wine',
          name: 'shop-wine',
          component: ShopWine,
        },
        {
          path: 'others',
          name: 'shop-others',
          component: ShopOthers,
        },
        {
          path: 'offers',
          name: 'shop-offers',
          component: ShopOffers,
        },
      ],
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // Scroll to top of each page
    return {x: 0, y: 0};
  },
});
