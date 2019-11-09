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
        return this.$store.state.conversations.messages;
      },
      route() {
        return this.$route.params.id;
      }
    },
    watch: {
      route() {
        this.$store.dispatch('message/setMessageAddress', this.$route.params.id);
      }
    },
    methods: {

    },
    mounted() {
      this.$store.dispatch('message/setMessageAddress', this.$route.params.id);
    }
  }
</script>

<style lang="scss" scoped>
</style>
