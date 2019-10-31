import Vue from 'vue';
import Vuex from 'vuex';
import io from 'Plugins/socket.io.js';
const socket = io('http://localhost:18000');
socket.on('confirmedMessage', message => { console.log(message); });

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {

  },
  state: {
    messageRecipient: "Tom",
    messages: [],
    message: ""
  },
  mutations: {
    addMessage(state, payload) {
      state.messages.push(payload);
    }
  },
  getters: {

  },
  actions: {
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
