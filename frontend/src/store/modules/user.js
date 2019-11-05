import axios from 'Plugins/axios.js';

export default {
  namespaced: true,
  state: {
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    login: ''
  },
  mutations: {
    setId(state, payload) {
      state.id = payload;
    },
    setFirstname(state, payload) {
      state.firstname = payload;
    },
    setLastname(state, payload) {
      state.lastname = payload;
    },
    setEmail(state, payload) {
      state.email = payload;
    },
    setLogin(state, payload) {
      state.login = payload;
    }
  },
  getters: {

  },
  actions: {
    getUser: async function(context) {
      try {
        let response = await axios.get(`/user/${context.state.id}`, { headers: { Authorization: `Bearer ${context.rootState.auth.accessToken}` } });
        context.commit('setFirstname', response.data.firstname);
        context.commit('setLastname', response.data.lastname);
        context.commit('setEmail', response.data.email);
        context.commit('setLogin', response.data.login);
      } catch (error) {
        console.log(error);
      }
    },
    updateUser: async function(context) {
      try {
        let response = await axios.patch(`/user/${context.state.id}`, {
            firstname: context.state.firstname,
            lastname: context.state.lastname,
          },
          { headers: { Authorization: `Bearer ${context.rootState.auth.accessToken}` }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
}
