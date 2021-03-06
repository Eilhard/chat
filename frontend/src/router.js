import VueRouter from 'vue-router';
import Chat from './components/pages/Chat/Chat.vue';
import ChatIndex from './components/pages/ChatIndex/ChatIndex.vue';
import ChatRoom from './components/pages/ChatRoom/ChatRoom.vue';
import LostPage from './components/pages/LostPage.vue';
import Login from './components/pages/Login/Login.vue';
import Stats from './components/pages/Stats/Stats.vue';
import store from 'Store';

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: to => {
        if (store.state.auth.auth) {
          return '/chat';
        }
        return '/login';
      }
    },
    {
      path: '/chat',
      component: Chat,
      beforeEnter: function(to, from, next) {
        if (store.state.auth.auth) {
          next();
        }else{
          next('/');
        }
      },
      children: [
        {
          path: '',
          component: ChatIndex
        },
        {
          path: ':id',
          component: ChatRoom
        }
      ]
    },
    {
      path: '/stats',
      component: Stats,
      beforeEnter: function(to, from, next) {
        if (store.state.auth.auth) {
          next();
        }else{
          next('/');
        }
      }
    },
    {
      path: '/login',
      component: Login,
      beforeEnter: function(to, from, next) {
        if (store.state.auth.auth) {
          next('/');
        }else{
          next();
        }
      }
    },
    {
      path: '*',
      component: LostPage
    }
  ]
})
