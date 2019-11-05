import Vue from 'vue';
import Vuex from 'vuex';
import io from 'Plugins/socket.io.js';
import auth from './modules/auth.js';
import messages from './modules/messages.js';
import user from './modules/user.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    messages,
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
      const socket = io(context.state.socketUrl);
      context.commit('setSocket', socket);
      context.dispatch('messages/listenMessages');
    },
    sendMessage(context, payload) {
      socket.emit('message:create', payload, ({ status, message }) => {
        if (status === 201) {
          console.log("Our message recived", message); // Test
          context.commit('addMessage', {
            text: message,
            isOwner: true
          });
        } else {
          console.log(status, message);
        }
      });
    },
    listenMessages(context) {
      socket.on('message:new', message => {
        console.log("New message recived", message); // Test
        context.commit('addMessage', {
          text: message,
          isOwner: false
        });
      });
    }
  }
});
