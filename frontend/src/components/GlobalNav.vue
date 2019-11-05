<template>
  <nav class="navigation px--2">
    <button
      v-show="isChat"
      @click="sidebar"
      class="btn-floating waves-effect waves-light btn-flat navigation__flat-btn "
    >
      <i class="fas fa-bars"></i>
    </button>
    <div class="spacer"></div>
    <router-link
      v-show="auth"
      to="/chat"
      tag="button"
      class="navigation-button waves-effect waves-light"
    >
      Chat
    </router-link>
    <router-link
      v-show="auth"
      to="/stats"
      tag="button"
      class="navigation-button waves-effect waves-light"
    >
      Stats
    </router-link>
    <button
      v-show="auth"
      @click="logout"
      class="navigation-button waves-effect waves-light"
    >
      Logout
    </button>
  </nav>
</template>

<script>


  export default {
    data() {
      return {

      }
    },
    computed: {
      isChat() {
        return /^\/chat.*/.test(this.$route.fullPath);
      },
      auth() {
        return this.$store.state.auth.auth;
      }
    },
    methods: {
      sidebar() {
        this.$store.commit('switchSidebar');
      },
      logout() {
        console.log("logout");
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
