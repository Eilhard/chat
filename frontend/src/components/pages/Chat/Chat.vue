<template lang="html">
  <div class="chat">
    <FriendsList class="chat__aside" />
    <div class="chat__main">
      <MessagesList class="chat__main--grow" />
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
    mounted() {
      this.$store.dispatch('listenMessages');
    }
  }
</script>

<style lang="scss" scoped>
</style>
