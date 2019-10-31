<template lang="html">
  <div
    class="message-card"
    :class="{'message-card--own': message.isOwner}"
  >
    <div
      class="message-card__body z-depth-2"
      :class="{'message-card__body--own': message.isOwner}"
    >
      <h2 v-if="">{{message.author}}</h2>
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
      messages() {
        return this.$store.state.messages;
      }
    }
  }
</script>

<style lang="css" scoped>
</style>
