import axios from 'Plugins/axios.js';

export default {
  namespaced: true,
  state: {
    nodes: [],
    links: [],
    messages: []
  },
  mutations: {
    setNodes(state, nodes) {
      state.nodes = nodes;
    },
    addNode(state, node) {
      state.nodes.push(node);
    },
    setLinks(state, links) {
      state.links = links;
    },
    addLink(state, link) {
      state.links.push(link);
    },
    deleteLink(state, link) {
      let reverseLink = { source: link.target, target: link.source };
      state.links = state.links.filter(item => {
        if (typeof item.source != 'string') {
          if (item.source.id == link.source && item.target.id == link.target) return false;
          if (item.source.id == reverseLink.source && item.target.id == reverseLink.target) return false;
        }
        if (item.source == link.source && item.target == link.target) return false;
        if (item.source == reverseLink.source && item.target == reverseLink.target) return false;
        return true;
      });
    },
    addMessage(state, message) {
      state.messages.push(message);
    },
    deleteMessage(state, message) {
      state.messages = state.messages.filter(msg => msg != message);
    }
  },
  getters: {

  },
  actions: {
    initialStats: async function(context) {
      let users = await axios.get(`/stats`, { headers: { Authorization: `Bearer ${context.rootState.auth.accessToken}` }});
      let nodes = [], links = [];
      users.data.forEach(user => {
        nodes.push({ id: user._id, firstname: user.firstname });
        user.contacts.forEach(contact => {
          links.push({ source: user._id, target: contact.user });
        })
      });
      context.commit('setNodes', nodes);
      context.commit('setLinks', links);
    }
  }
}
