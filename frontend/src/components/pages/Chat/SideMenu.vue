<template lang="html">
  <div class="side-menu">
    <div class="side-menu-controls">
      <button
        @click="switchMode('search')"
        class="side-menu-controls__btn waves-effect waves-light"
      >
        <i class="fas fa-user-plus"></i>
      </button>
      <button class="side-menu-controls__btn waves-effect waves-light">
        <i class="fas fa-users"></i>
      </button>
      <button
        @click="switchMode('delete')"
        class="side-menu-controls__btn waves-effect waves-light"
      >
        <i class="fas fa-user-minus"></i>
      </button>
      <button
        v-if="contactRequests.length"
        @click="switchMode('notifications')"
        class="side-menu-controls__btn waves-effect waves-light"
      >
        <i class="fas fa-bell"></i>
      </button>
    </div>

    <ContactsSearch v-show="modeName == 'search'"/>
    <DeleteMenu v-show="modeName == 'delete'"/>
    <Notifications
      v-show="modeName == 'notifications'"
      @modeChangeDefault="switchMode('contacts')"
    />

    <router-link
      v-if="contacts.length > 0"
      v-show="modeName == 'contacts'"
      v-for="contact in contacts"
      :key="`contact_${contact.user}`"
      :to="`/chat/${contact.user}`"
      tag="button"
      class="contact-card waves-effect waves-light"
      :class="{ 'contact-card--hover': modeName == 'contacts' }"
      active-class="friends-list-card--active"
    >

      {{contact.fullname}}
      <div class="spacer"></div>
      <span v-if="unreadMessages[contact.user]" class="new badge">{{unreadMessages[contact.user]}}</span>
    </router-link>
  </div>
</template>

<script>
  import ContactsSearch from './ContactsSearch.vue';
  import DeleteMenu from './DeleteMenu.vue';
  import Notifications from './Notifications.vue';

  export default {
    components: {
      ContactsSearch,
      DeleteMenu,
      Notifications
    },
    data() {
      return {
        modeName: 'contacts'
      }
    },
    computed: {
      contacts() {
        return this.$store.state.conversations.contacts;
      },
      contactRequests() {
        return this.$store.state.user.contactRequests;
      },
      unreadMessages() {
        return this.$store.getters['conversations/unreadMessages'];
      }
    },
    methods: {
      switchMode(modeName) {
        if (this.modeName === modeName) {
          this.modeName = 'contacts';
          return;
        }
        this.modeName = modeName;
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
