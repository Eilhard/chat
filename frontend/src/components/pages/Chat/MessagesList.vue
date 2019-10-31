<template lang="html">
  <div class="message-list">
    <MessageCard
      v-for="(msg, index) in messages"
      :key="`message-${index}`"
      :message="msg"
    />
  </div>
</template>

<script>
  import MessageCard from './MessageCard.vue';
  export default {
    components: {
      MessageCard
    },
    data() {
      return {

      }
    },
    computed: {
      messages() {
        return this.$store.state.messages;
      }
    },
    methods: {
      send() {
        this.$store.dispatch('test');
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
