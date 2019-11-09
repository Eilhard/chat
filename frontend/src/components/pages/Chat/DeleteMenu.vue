<template lang="html">
  <div class="">
    <ul v-if="contacts.length" class="results-list">
      <li
        v-for="contact in contacts"
        class="results-list__item"
      >
        <span>{{contact.fullname | titleCutter}}</span>
        <button
          @click="deleteContact(contact)"
          class="side-menu-controls__btn side-menu-controls__btn--list-item waves-effect waves-light"
        >
          <i class="fas fa-times"></i>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    filters: {
      titleCutter(value) {
        if (!value) return '';
        if (value.length < 20) return value;
        return `${value.slice(0, 18)}...`;
      }
    },
    data() {
      return {
        searchInput: ""
      }
    },
    computed: {
      contacts() {
        return this.$store.state.conversations.contacts;
      },
    },
    methods: {
      deleteContact(contact) {
        this.$store.dispatch('conversations/deleteContact', contact);
        let regexp = new RegExp('^\/chat\/' + contact._id);
        if (regexp.test(this.$route.fullPath)) {
          this.$router.push('/chat');
        }
      }
    }
  }
</script>

<style lang="css" scoped>
</style>
