import jwt from 'jsonwebtoken';
import axios from 'Plugins/axios.js';
import router from '../../router.js';

export default {
  namespaced: true,
  state: {
    auth: false,
    accessToken: '',
    accessExpiration: 0,
    expirationTimeLimit: 1000
  },
  mutations: {
    setAuth(state, payload) {
     state.auth = payload;
   },
   setAccessToken(state, payload) {
     state.accessToken = payload;
   },
   setAccessExpiration(state, payload) {
     state.accessExpiration = payload;
   }
  },
  getters: {

  },
  actions: {
    initialAuth(context) {
      if (context.state.accessToken) return;
      let accessToken = localStorage.getItem('accessToken');
      let refreshToken = localStorage.getItem('refreshToken');
      if (accessToken && refreshToken)  {
        context.dispatch('handleTokens', { accessToken, refreshToken });
        context.dispatch('checkAuth');
        return;
      }
      if (refreshToken) {
        context.dispatch('refresh');
      }
    },
    handleTokens(context, payload) {
      context.commit('setAccessToken', payload.accessToken);
      localStorage.setItem('accessToken', payload.accessToken);
      localStorage.setItem('refreshToken', payload.refreshToken);
      let decodedToken = jwt.decode(payload.accessToken);
      context.commit('setAccessExpiration', decodedToken.exp);
      context.commit('user/setId', decodedToken.id, {root:true});
    },
    checkAccessToken(context) {
      let exp = context.state.accessExpiration - Date.now() / 1000;
      if (exp > context.state.expirationTimeLimit) return;
      context.dispatch('refresh');
    },
    refresh: async function(context, payload) {
      let refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        context.dispatch('logout');
        return;
      }
      try {
        let response = await axios.post('/auth/refresh', { refreshToken });
        context.dispatch('handleTokens', {
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken
        });
        context.dispatch('checkAuth');
      } catch (err) {
        if (err.response.status == 400) {
          context.dispatch('logout');
        }
      }
    },
    checkAuth(context) {
      let exp = context.state.accessExpiration - Date.now() / 1000;
      if (context.state.accessToken && exp > context.state.expirationTimeLimit) {
        context.commit('setAuth', true);
        context.dispatch('user/setUserConn', {}, {root:true});
        if (router.currentRoute.fullPath === '/login') {
           router.push('/');
        }
      } else {
        context.commit('setAuth', false);
        context.dispatch('refresh');
      }
    },
    logout(context) {
      context.commit('setAuth', false);
      context.commit('setAccessToken', '');
      context.commit('setAccessExpiration', 0);
      localStorage.removeItem('refreshToken');
      if (router.currentRoute.fullPath != '/') {
         router.push('/');
       }
    }
  }
}
