import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './ghala';
import './assets/sass/main.scss';
import './plugins';

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  Promise.all([store.dispatch('auth/checkAuth')]).then(next)
});

window.v = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
