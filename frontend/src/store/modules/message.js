import axios from 'Plugins/axios.js';

export default {
  namespaced: true,
  state: {
    addressee: "",
    author: "",
    text: "",
    chat: "",
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
    sendMessage(context, msgText) {
      let message = {
        addressee: context.state.addressee,
        author: context.state.author,
        text: msgText,
        chat: context.state.chat,
        isPersonal: context.state.isPersonal
      };
      context.rootState.socket.emit('message:create:request', message, (response) => {
        if (response.status === 201) {
          response.message.isOwner = true;
          context.commit('conversations/addMessage', response.message, { root: true });
        } else {
          console.log(response.status, response.message);
        }
      });
    },
    updateLastRead: async function(context) {
      let response = await axios.patch(`user/${context.rootState.user.id}`,
        { contacts: context.rootState.conversations.contacts },
        { headers: { Authorization: `Bearer ${context.rootState.auth.accessToken}` } });
    }
  }
}
