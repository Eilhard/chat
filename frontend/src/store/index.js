import Vue from 'vue';
import Vuex from 'vuex';
import io from 'Plugins/socket.io.js';
import auth from './modules/auth.js';
import conversations from './modules/conversations.js';
import message from './modules/message.js';
import user from './modules/user.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    message,
    conversations,
    user
  },
  state: {
    socketUrl: 'http://localhost:18000',
    socket: null,
    sidebar: true,
  },
  mutations: {
    switchSidebar(state) {
      state.sidebar = !state.sidebar;
    },
    setSocket(state, socket) {
      state.socket = socket;
    }
  },
  getters: {

  },
  actions: {
    connect(context) {
      const socket = io(context.state.socketUrl,
        {
          transports: ['websocket'],
          query: {
            user: JSON.stringify({
                login: context.state.user.login,
                id: context.state.user.id
            })
          }
        }
      );
      socket.on('reconnect_attempt', () => {
        socket.io.opts.transports = ['polling', 'websocket'];
      });
      context.commit('setSocket', socket);
      context.commit('user/setSocketId', socket.id);
      context.dispatch('listen');
    },
    listen(context) {
      context.state.socket.on('message:new', message => {
        console.log("New message recived", message); // Test
        message.isOwner = true;
        context.commit('conversations/addMessage', message);
      });

      context.state.socket.on('user:add:request:notify', async request => {
        request = await context.dispatch('user/getRequestAuthorName', request);
        context.commit('user/addContactRequests', request);
      });

      context.state.socket.on('user:add:result', async response => {
        let contact = { chat: response.chat };
        if (response.author == context.state.user.id) {
          contact.user = response.addressee;
        } else {
          contact.user = response.author;
        }
        contact.fullname = await context.dispatch('conversations/getContactUserName', contact.user);
        context.commit('conversations/addContact', contact);
      });

      context.state.socket.on('user:delete:contact:notify', request => {
        context.commit('conversations/deleteContact', request.author);
      });

      context.state.socket.on('server:error', error => {
        console.log(error);
      });
    }
  }
});
