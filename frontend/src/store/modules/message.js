export default {
  namespaced: true,
  state: {
    addressee: "", // contacts.user
    author: "",
    text: "",
    chat: "", // contacts.chat
    room: "",
    isPersonal: true
  },
  mutations: {
    setAddressee(state, addresseeId) {
      state.addressee = addresseeId;
    },
    setAuthor(state, authorId) {
      state.author = authorId;
    },
    setText(state, text) {
      state.text = text;
    },
    setChat(state, chatId) {
      state.chat = chatId;
    },
    setRoom(state, roomId) {
      state.room = chatId;
    },
    setIsPersonal(state, status) {
      state.isPersonal = status;
    },
  },
  getters: {

  },
  actions: {
    setMessageAddress(context, addresseeId) {
      context.commit('setAddressee', addresseeId);
      let chatIds = context.rootGetters['conversations/chatIds'];
      context.commit('setChat', chatIds[addresseeId]);
    },
    sendMessage(context, payload) {
      let message = {
        addressee: context.state.addressee,
        author: context.state.author,
        text: context.state.text,
        chat: context.state.chat,
        isPersonal: context.state.isPersonal
      };
      context.rootState.socket.emit('message:create', message, (response) => {
        if (response.status === 201) {
          console.log("Our message recived", response.message); // Test
          message.isOwner = true;
          context.commit('addMessage', response.message);
        } else {
          console.log(status, message);
        }
      });
    }
  }
}
