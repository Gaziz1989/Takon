<style src="./style.css" scoped></style>
<template>
  <div
    id="e3"
    style="margin-top: 65px;"
    class="grey lighten-3"
  >
    <v-toolbar color="grey lighten-4" flat>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title class="black--text">Организации</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container
      fluid
      grid-list-lg
    >
      <v-layout row wrap>
        <v-flex xs3 v-for="notification in notifications" :key="notification.id" hover>
          <v-card color="green darken-3" class="white--text" hover>
            <v-card-title primary-title>
              <div class="headline">Организация: {{notification.owner.name ? notification.owner.name : notification.owner.email}}</div>
            </v-card-title>
            <div>
              Создана: {{new Date(notification.createdAt).getFullYear() + '-' + new Date(notification.createdAt).getMonth() +1 + '-' + new Date(notification.createdAt).getDate()}}
            </div>
            <div>
              Услуга: {{notification.service.name}} <br/>
              Владелец услуги: {{notification.service.owner.name}}
            </div>
            <v-card-actions>
              <v-btn flat dark @click="openNotificationModal(notification.id)">Подробнее</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <notification-modal/>
  </div>
</template>

<script>
  import ServicesService from '@/services/ServicesService'
  import NotificationModal from '@/components/modals/notificationModal'
export default {
    name: 'NotificationsPage',
    components: {
      NotificationModal
    },
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
      openNotificationModal (_id) {
        this.$modal.show('NotificationModal', {id: _id})
      }
    },
    sockets: {
      notificationAdded (_notification) {
        this.notifications.push(_notification)
      }
    }
}
</script>
