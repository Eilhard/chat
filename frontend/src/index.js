import './assets/scss/main.scss';

import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import router from './router.js';
import store from 'Store';
import Application from './Application.vue';

Vue.use(Vuex);
Vue.use(VueRouter);

let app = new Vue({
  el: "#root",
  router,
  store,
  render(h) {
    return h(Application);
  }
});
