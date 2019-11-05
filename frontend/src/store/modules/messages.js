export default {
  namespaced: true,
  state: {
    addressee: "",
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
      context.rootState.socket.emit('message:create', payload, ({ status, message }) => {
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
      context.rootState.socket.on('message:new', message => {
        console.log("New message recived", message); // Test
        context.commit('addMessage', {
          text: message,
          isOwner: false
        });
      });
    }
  }
}
