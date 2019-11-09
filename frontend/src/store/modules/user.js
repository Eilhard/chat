import axios from 'Plugins/axios.js';

export default {
  namespaced: true,
  state: {
    id: '',
    socketId: '',
    firstname: '',
    lastname: '',
    email: '',
    login: '',
    contactRequests: [],
    searchResults: []
  },
  mutations: {
    setId(state, payload) {
      state.id = payload;
    },
    setSocketId(state, payload) {
      state.socketId = payload;
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
    },
    setLogin(state, payload) {
      state.login = payload;
    },
    setContactRequests(state, payload) {
      state.contactRequests = payload;
    },
    addContactRequests(state, payload) {
      state.contactRequests.push(payload);
    },
    deleteContactRequests(state, authorId) {
      state.contactRequests = state.contactRequests.filter(request => request.author != authorId);
    },
    setSearchResults(state, payload) {
      state.searchResults = payload;
    }
  },
  getters: {

  },
  actions: {
    setUserConn: async function(context) {
      try {
        let response = await axios.get(`/user/${context.state.id}`, { headers: { Authorization: `Bearer ${context.rootState.auth.accessToken}` } });
        context.commit('setFirstname', response.data.firstname);
        context.commit('setLastname', response.data.lastname);
        context.commit('setEmail', response.data.email);
        context.commit('setLogin', response.data.login);
        let contactRequests = response.data.contactRequests;
        if (contactRequests.length) {
          for (let item of contactRequests) {
            item = await context.dispatch('getRequestAuthorName', item);
          }
          context.commit('setContactRequests', contactRequests);
        }

        await context.dispatch('conversations/setContactsOnConnection', response.data, { root:true } );

        context.commit('message/setAuthor', context.state.id, { root:true } );
        context.dispatch('connect', {}, {root:true});
      } catch (error) {
        console.log(error);
      }
    },
    getRequestAuthorName: async function(context, request) {
      let author = await axios.get(`/user/${request.author}`, { headers: { Authorization: `Bearer ${context.rootState.auth.accessToken}` } });
      request.authorFullName = `${author.data.firstname} ${author.data.lastname}`;
      return request;
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
    },
    searchContact: async function(context, searchStr) {
      try {
        let response = await axios.get(`/user/search?search=${searchStr}`, { headers: { Authorization: `Bearer ${context.rootState.auth.accessToken}` } });
        context.commit('setSearchResults', response.data);
      } catch (error) {
        console.log(error);
      }
    },
    requestAdd(context, userId) {
      context.rootState.socket.emit('user:add:request', {
        addressee: userId,
        author: context.state.id
      });
    },
    acceptRequest(context, userId) {
      context.rootState.socket.emit('user:add:response', {
        addressee: userId,
        author: context.state.id,
        status: true
      });
      context.commit('deleteContactRequests', userId);
    },
    rejectRequest(context, userId) {
      context.rootState.socket.emit('user:add:response', {
        addressee: userId,
        author: context.state.id,
        status: false
      });
      context.commit('deleteContactRequests', userId);
    }
  }
}
