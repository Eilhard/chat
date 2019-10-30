<template lang="html">
  <div class="container">
    <div class="row">
      <div class="input-field col s6">
        <input :model="messageInput"  id="first_name2" type="text" class="validate">
        <label class="active" for="first_name2">Message</label>
      </div>
      <div class="input-field col s6">
        <button class="btn waves-effect waves-light btn-large" type="button">Submit
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>

    </div>
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

      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
