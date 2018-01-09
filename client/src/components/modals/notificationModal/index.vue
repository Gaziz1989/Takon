<style src="./style.css" scoped></style>
<template>
  <modal name="NotificationModal" width="50%" height="40%" @before-open="beforeOpen">
    <div class="moduleWraper">
      <h6>Услуга: {{ notification.name }}</h6>
      <div class='error' v-html="error"/>
      <div class="halfOff">
        <span>
          Заказчик: {{ notification.owner.name ? notification.owner.name : notification.owner.email }}
        </span>
        <span>
          E-mail: {{ notification.owner.email ? notification.owner.email : 'Нет данных' }}
        </span>
        <span>
          Телефон: {{ notification.owner.phone ? notification.owner.phone : 'Нет данных' }}
        </span>
      </div>
      <v-btn @click="approveNotification" small flat>Подтвердить</v-btn>
    </div>
  </modal>
</template>
<script>
  import ServicesService from '@/services/ServicesService'
  import DatePicker from 'vue-md-date-picker'
  import InputA from '@/components/input'
export default {
    components: {
      InputA,
      DatePicker
    },
    data () {
      return {
        notification: {
          owner: {
            email: '',
            name: '',
            phone: '',
            adress: '',
            bio: ''
          }
        },
        error: '',
        summ: ''
      }
    },
    mounted () {},
    computed: {},
    methods: {
      async beforeOpen (event) {
        try {
          const response = await ServicesService.getReleased(event.params.id)
          this.notification = response.data.released
          console.log(this.notification)
        } catch (error) {
          this.error = error.response.data.error
        }
      },
      async approveNotification () {
        // await this.$socket.emit('addnotifications', (JSON.stringify(this.released)))
        // alert('Заявка подана!')
        // this.$router.push({
        //   name: 'ListOfPartnersPage'
        // })
      }
    }
}
</script>
