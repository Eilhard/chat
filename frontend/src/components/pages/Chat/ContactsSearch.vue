<template lang="html">
  <div class="">
    <form class="input-container mb--1" @submit.prevent @keydown.enter.prevent="search">
      <label class="input-group">
        <input
          v-model="searchInput"
          type="text"
          class="input-group__text-input"
        >
        <button @click="search" type="button" class="input-group__btn-append">
          <i class="fas fa-search"></i>
        </button>
      </label>
    </form>
    <ul v-if="searchResults" class="results-list">
      <li
        v-for="user in searchResults"
        class="results-list__item"
      >
        <span>{{user.fullname}}</span>
        <button
          @click="requestAdd(user._id)"
          class="side-menu-controls__btn waves-effect waves-light"
        >
          <i class="fas fa-user-plus"></i>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        searchInput: ""
      }
    },
    computed: {
      searchResults() {
        return this.$store.state.user.searchResults;
      }
    },
    methods: {
      search() {
        this.$store.dispatch('user/searchContact', this.searchInput);
      },
      requestAdd(userId) {
        this.$store.dispatch('user/requestAdd', userId);
        this.searchInput = "";
        this.backToContacts();
      },
      backToContacts() {
        this.$emit('modeChangeDefault');
      },
    }
  }
</script>

<style lang="css" scoped>
</style>
