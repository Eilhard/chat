<template>
  <nav class="navigation px--2">
    <button
      v-show="isChat"
      @click="sidebar"
      class="btn-floating waves-effect waves-light btn-flat navigation__flat-btn "
    >
      <i class="fas fa-bars"></i>
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
        return this.$route.fullPath == '/chat';
      }
    },
    methods: {
      sidebar() {
        this.$store.commit('switchSidebar');
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
