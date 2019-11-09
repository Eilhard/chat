import axios from 'Plugins/axios.js';

export default {
  namespaced: true,
  state: {
    rooms: [],
    contacts: [],
    chat: []
  },
  mutations: {
    addMessage(state, payload) {
      state.chat.push(payload);
    },
    setContacts(state, payload) {
      state.contacts = payload;
    },
    addContact(state, contact) {
      state.contacts.push(contact);
    },
    deleteContact(state, deletedId) {
      state.contacts = state.contacts.filter(item => item.user != deletedId);
    }
  },
  getters: {
    chatIds: state => {
      let chatIds = {};
      for (let contact of state.contacts) {
        chatIds[contact.user] = contact.chat.id;
      }
      return chatIds;
    }
  },
  actions: {
    setContactsOnConnection: async function(context, user) {
      for (let contact of user.contacts) {
        contact.fullname = await context.dispatch('getContactUserName', contact.user);
      }
      context.commit('setContacts', user.contacts);
    },
    getContactUserName: async function(context, userId) {
      let user = await axios.get(`/user/${userId}`, { headers: { Authorization: `Bearer ${context.rootState.auth.accessToken}` } });
      return `${user.data.firstname} ${user.data.lastname}`;
    },
    deleteContact: async function(context, contact) {
      context.rootState.socket.emit('user:delete:contact', {
        addressee: contact.user,
        author: context.rootState.user.id
      });
      context.commit('deleteContact', contact.user);
    }
  }
}
