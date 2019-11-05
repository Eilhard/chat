<template lang="html">
  <div class="chat">
    <FriendsList v-show="sidebar" class="chat__aside" />
    <div
      class="chat__main"
      :class="{ 'chat__main--hide': sidebar }"
    >
      <div class="chat__main--grow">
        <router-view></router-view>
      </div>
      <MessagePanel />
    </div>
  </div>
</template>

<script>
  import FriendsList from './FriendsList.vue';
  import MessagesList from './MessagesList.vue';
  import MessagePanel from './MessagePanel.vue';

  export default {
    components: {
      FriendsList,
      MessagesList,
      MessagePanel
    },
    computed: {
      sidebar() {
        return this.$store.state.sidebar;
      }
    },
    mounted() {
      this.$store.dispatch('connect');
    }
  }
</script>

<style lang="scss" scoped>
</style>
