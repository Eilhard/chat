<template lang="html">
  <div
    class="message-card"
    :class="{'message-card--own': message.isOwner}"
  >
    <div
      class="message-card__body z-depth-2"
      :class="{'message-card__body--own': message.isOwner}"
    >
      <div v-if="!message.isOwner" class="message-card-header">
        <h2
          class="message-card-header__title"
          v-if="!message.isOwner"
        >{{message.fullname}}</h2>
        <!-- <div class="spacer"></div> -->
        <!-- <button
          class="message-card-header__controls waves-effect waves-light"
          v-if="message.isOwner"
        >
          <i class="fas fa-pen"></i>
        </button> -->
      </div>


      <p>{{message.text}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      message: Object
    },
    computed: {
      userName() {
        return this.$store.getters['user/userFullName'];
      },
      messages() {
        return this.$store.state.messages;
      }
    }
  }
</script>

<style lang="css" scoped>
</style>
