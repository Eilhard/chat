<template lang="html">
  <div class="">
    <ul v-if="contactRequests.length" class="results-list">
      <li
        v-for="request in contactRequests"
        class="results-list__item"
      >
        <span>{{request.authorFullName | titleCutter}}</span>
        <div class="simple-mid">
          <button
            @click="acceptRequest(request.author)"
            class="side-menu-controls__btn side-menu-controls__btn--list-item waves-effect waves-light"
          >
            <i class="fas fa-check"></i>
          </button>
          <button
            @click="rejectRequest(request.author)"
            class="side-menu-controls__btn side-menu-controls__btn--list-item waves-effect waves-light"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    filters: {
      titleCutter(value) {
        if (!value) return '';
        if (value.length < 13) return value;
        return `${value.slice(0, 12)}...`;
      }
    },
    data() {
      return {
        searchInput: ""
      }
    },
    computed: {
      contactRequests() {
        return this.$store.state.user.contactRequests;
      }
    },
    methods: {
      backToContacts() {
        if (this.contactRequests.length < 1) {
          this.$emit('modeChangeDefault');
        }
      },
      acceptRequest(userId) {
        this.$store.dispatch('user/acceptRequest', userId);
        this.backToContacts();
      },
      rejectRequest(userId) {
        this.$store.dispatch('user/rejectRequest', userId);
        this.backToContacts();
      }
    }
  }
</script>

<style lang="css" scoped>
</style>
