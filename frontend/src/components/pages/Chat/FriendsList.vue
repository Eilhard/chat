<template lang="html">
  <div class="friends-list">
    <div class="friends-list-controls">
      <button class="friends-list-controls__btn waves-effect waves-light">
        <i class="fas fa-user-plus"></i>
      </button>
      <button class="friends-list-controls__btn waves-effect waves-light">
        <i class="fas fa-users"></i>
      </button>
      <button class="friends-list-controls__btn waves-effect waves-light">
        <i class="fas fa-user-minus"></i>
      </button>
    </div>
    <router-link
      for="user in contacts"
      to="/chat/friend1"
      tag="button"
      class="friends-list-card waves-effect waves-light"
      active-class="friends-list-card--active"
    >
      Stats
      <div class="spacer"></div>
      <span class="new badge">4</span>
    </router-link>
  </div>
</template>

<script>

  export default {
    data() {
      return {
      }
    },
    computed: {
      contacts() {
        return this.$store.state.messages.messages;
      }
    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>
</style>
