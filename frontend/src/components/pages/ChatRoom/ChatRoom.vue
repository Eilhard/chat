<template lang="html">
  <div class="message-list" ref="messageList">
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
        return this.$store.getters['conversations/displayedMessages'];
      },
      route() {
        return this.$route.params.id;
      },
      chatIds() {
        return this.$store.getters['conversations/chatIds'];
      },
      amountMsgChat() {
        return this.$store.getters['conversations/amountMsgChat'];
      },
      currentChatMsgAmount() {
        let chatId = this.chatIds[this.$route.params.id];
        return this.amountMsgChat[chatId];
      }
    },
    watch: {
      route() {
        this.openChatRoom();
      },
      messages() {
        this.scrollOnNewMsg();
        this.readMessage();
      }
    },
    methods: {
      openChatRoom() {
        this.$store.dispatch('message/setMessageAddress', this.$route.params.id);
        this.$store.dispatch('conversations/setCurrentChat', this.$route.params.id);
        this.readMessage();
      },
      readMessage() {
        this.$store.commit('conversations/setContactLastMessage', {
          userId: this.$route.params.id,
          lastRead: this.currentChatMsgAmount
        });
        this.$store.dispatch('message/updateLastRead');
      },
      scrollOnNewMsg() {
         this.$nextTick(() => {
          this.$refs.messageList.scrollTop = this.$refs.messageList.scrollHeight;
        });
      }
    },
    mounted() {
      this.openChatRoom();
      this.scrollOnNewMsg();
    }
  }
</script>

<style lang="scss" scoped>
</style>
