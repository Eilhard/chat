import VueRouter from 'vue-router';
import Chat from './components/pages/Chat/Chat.vue';
import store from 'Store';

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Chat
    },
    // {
    //   path: '/relations',
    //   component: User,
    //   beforeEnter: function(to, from, next) {
    //     if (store.state.auth) {
    //       next();
    //     }else{
    //       next('/');
    //     }
    //   }
    // },
    // {
    //   path: '/login',
    //   component: Login,
    //   beforeEnter: function(to, from, next) {
    //     if (store.state.auth) {
    //       next('/');
    //     }else{
    //       next();
    //     }
    //   }
    // },
    // {
    //   path: '*',
    //   component: LostPage
    // }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return { selector: to.hash }
    } else {
      return { x: 0, y: 0 }
    }
  }
})
