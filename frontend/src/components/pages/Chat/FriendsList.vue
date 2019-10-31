<template lang="html">
  <div class="friends-list">
    
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
        this.$store.dispatch('test');
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
