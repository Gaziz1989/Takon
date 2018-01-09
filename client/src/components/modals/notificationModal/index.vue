<style src="./style.css" scoped></style>
<template>
  <modal name="NotificationModal" width="50%" height="50%" @before-open="beforeOpen">
    <div class="moduleWraper">
      <h6>Услуга: {{ notification.name }}</h6>
      <div class='error' v-html="error"/>
      <div class="halfOf">
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
      <div class="halfOf">
        <span>
          Поставщик: {{ notification.service.owner.name ? notification.service.owner.name : notification.owner.email }}
        </span>
        <span>
          E-mail: {{ notification.service.owner.email ? notification.service.owner.email : 'Нет данных' }}
        </span>
        <span>
          Телефон: {{ notification.service.owner.phone ? notification.service.owner.phone : 'Нет данных' }}
        </span>
      </div>
      <div class="fullOf">
        <span>
          Услуга: {{ notification.name ? notification.name : 'Нет данных' }}
        </span>
        <span>
          Цена: {{ notification.price ? notification.price : 'Нет данных' }}
        </span>
        <span>
          Количество: {{ notification.amount ? notification.amount : 'Нет данных' }}
        </span>
        <span>
          Сумма: {{ notification.amount * notification.price }}
        </span>
        <span>
          Описание: {{ notification.description ? notification.description : 'Нет данных' }}
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
          },
          service: {
            owner: {
              email: '',
              name: '',
              phone: '',
              adress: '',
              bio: ''
            }
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
        } catch (error) {
          this.error = error.response.data.error
        }
      },
      async approveNotification () {
        try {
          const answer = confirm('Нажмите OK для продолжения или Cancel для выхода.')
          if (answer) {
            const response = await ServicesService.approveNotification(this.notification.id)
            alert(response.data.message)
            window.location.reload()
          } else {
            this.$modal.hide('NotificationModal')
          }
        } catch (error) {
          alert(error.response.data.error)
        }
      }
    }
}
</script>
