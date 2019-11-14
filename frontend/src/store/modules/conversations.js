import axios from 'Plugins/axios.js';

export default {
  namespaced: true,
  state: {
    rooms: [],
    contacts: [],
    chat: [],
    currentChat: ''
  },
  mutations: {
    addChat(state, chat) {
      state.chat.push(chat);
    },
    setChat(state, payload) {
      state.chat = payload;
    },
    setCurrentChat(state, chatId) {
      state.currentChat = chatId;
    },
    addMessage(state, message) {
      state.chat.forEach(chat => {
        if (chat._id == message.chat) {
          chat.messages.push(message);
        }
      });
    },
    setContacts(state, payload) {
      state.contacts = payload;
    },
    addContact(state, contact) {
      state.contacts.push(contact);
    },
    deleteContact(state, deletedId) {
      state.contacts = state.contacts.filter(item => item.user != deletedId);
    },
    setContactLastMessage(state, { userId, lastRead }) {
      state.contacts.forEach(contact => {
        if (contact.user == userId) {
          contact.chat.lastReaded = lastRead;
        }
      });
    },
  },
  getters: {
    chatIds(state) {
      /* Returns { user._id: chat._id  } */
      return state.contacts.reduce((chatIds, contact) => {
        chatIds[contact.user] = contact.chat.id;
        return chatIds;
      }, {});
    },
    displayedMessages(state) {
      let chat = state.chat.filter(item => item._id == state.currentChat)[0];
      if (chat) return chat.messages;
      return [];
    },
    amountMsgChat(state) {
      /* Returns { chat._id: amount_of_msg  } */
      return state.chat.reduce((msgAmount, chat) => {
        msgAmount[chat._id] = chat.messages.length;
        return msgAmount;
      }, {});
    },
    unreadMessages: (state, getters) => {
      let unreadMsg = state.contacts.reduce((unreadMsg, contact) => {
        let allMsg = getters.amountMsgChat[contact.chat.id];
        unreadMsg[contact.user] = allMsg - contact.chat.lastReaded;
        return unreadMsg;
      }, {});
      return unreadMsg;
    }
  },
  actions: {
    setContactsOnConnection: async function(context, user) {
      /* Set contacts */
      for (let contact of user.contacts) {
        contact.fullname = await context.dispatch('getContactUserName', contact.user);
      }
      /* Get messages */
      let chatArray = await axios.get('chat', { headers: { Authorization: `Bearer ${context.rootState.auth.accessToken}` } });
      /* Set owner of our messages and fullname for other */
      chatArray.data.forEach(item => {
        item.messages.forEach(message => {
          if (message.author == user._id) {
            message.isOwner = true;
          } else {
            let author = user.contacts.filter(item => item.user == message.author)[0];
            message.fullname = author.fullname;
          }
        });
      });
      context.commit('setChat', chatArray.data);
      context.commit('setContacts', user.contacts);
    },
    getContactUserName: async function(context, userId) {
      let user = await axios.get(`/user/${userId}`, { headers: { Authorization: `Bearer ${context.rootState.auth.accessToken}` } });
      return `${user.data.firstname} ${user.data.lastname}`;
    },
    getContactUserNameLocal(context, userId) {
      let user = context.state.contacts.filter(item => item.user == userId)[0];
      return user.fullname;
    },
    deleteContact: async function(context, contact) {
      context.rootState.socket.emit('user:delete:contact', {
        addressee: contact.user,
        author: context.rootState.user.id
      });
      context.commit('deleteContact', contact.user);
    },
    setCurrentChat(context, contactId) {
      context.commit('setCurrentChat', context.getters.chatIds[contactId]);
    }
  }
}
