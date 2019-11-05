<template>
  <div class="app-container">
    <global-nav></global-nav>
    <router-view></router-view>
  </div>
</template>

<script>
  import axios from 'Plugins/axios.js';
  import GlobalNav from './components/GlobalNav.vue';

  export default {
    components: {
      GlobalNav
    },
    mounted() {
      this.$store.dispatch('auth/initialAuth');
    }
  }

</script>

<style lang="scss" scoped>
</style>
