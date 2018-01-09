<style src="./style.css" scoped></style>
<template>
  <v-toolbar fixed flat class="header">
      <router-link to="/">
        <v-toolbar-title></v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <div class="meeting">
        Здравствуйте, <p>{{this.$auth.currentUser().name ? this.$auth.currentUser().name : this.$auth.currentUser().email.split('@')[0]}}</p>
        <span>онлайн</span>
      </div>
      <div class="notifications" v-if='$auth.currentUser().type === "admin"'>
        <v-btn @click="goToNotificationsPage" flat>
          <i class="fa fa-envelope" aria-hidden="true"></i>        
          <span class="unread">{{notifications.length}}</span>
        </v-btn>
      </div>
  </v-toolbar>
</template>

<script>
import ServicesService from '@/services/ServicesService'
export default {
  data () {
    return {
      notifications: []
    }
  },
  async beforeMount () {
    const response = await ServicesService.getNotifications()
    this.notifications = response.data.notifications
  },
  methods: {
    goToNotificationsPage () {
      this.$router.push({
        name: 'NotificationsPage'
      })
    }
  },
  sockets: {
    notificationAdded (_notification) {
      this.notifications.push(_notification)
    }
  }
}
</script>
