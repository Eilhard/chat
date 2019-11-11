<template lang="html">
  <div class="message-panel">
    <form @keydown.enter.prevent="send" class="message-form">
      <div class="input-field message-form__input-field">
        <input v-model="messageInput" id="mI" type="text" class="message-form__message-box validate">
        <label for="mI">Message</label>
      </div>
      <button
        @click="send"
        class="btn-floating waves-effect waves-light send-button"
        type="button"
        :disabled="messageInput.length < 1"
      >
        <i class="fas fa-chevron-right"></i>
      </button>
    </form>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        messageInput: ""
      }
    },
    methods: {
      send() {
        this.$store.dispatch('message/sendMessage', this.messageInput);
        this.messageInput = "";
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
