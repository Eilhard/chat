<template lang="html">
  <div class="chat">
    <SideMenu v-show="sidebar" class="chat__aside" />
    <div
      class="chat__main"
      :class="{ 'chat__main--hide': sidebar }"
    >
      <div class="chat__main--grow">
        <router-view></router-view>
      </div>
      <MessagePanel v-show="isChatRoom" />
    </div>
  </div>
</template>

<script>
  import SideMenu from './SideMenu.vue';
  import MessagePanel from './MessagePanel.vue';

  export default {
    components: {
      SideMenu,
      MessagePanel
    },
    computed: {
      sidebar() {
        return this.$store.state.sidebar;
      },
      isChatRoom() {
        return /^\/chat\/.*/.test(this.$route.fullPath);
      },
    },
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
</style>
