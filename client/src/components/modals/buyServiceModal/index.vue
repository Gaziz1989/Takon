<style src="./style.css" scoped></style>
<template>
  <modal name="BuyService" width="50%" height="40%" @before-open="beforeOpen">
    <div class="moduleWraper">
      <h6>Купон: {{ service.name }}</h6>
      <div class='error' v-html="error"/>
      <div class="halfOf">
        <p class="greyFont">Цена</p>
        <p class="greyFont" style="color: black;">{{service.price}}</p>
      </div>
      <input-a type="number" title="Количество" v-model="released.amount" @input="setError"/>
      <div class="fullOf">
        <p class="greyFont">Сумма</p>
        <p class="greyFont">{{released.amount * released.price}}</p>
      </div>
      <v-btn @click="addNotification" small flat :disabled="disabled">Оставить заявку</v-btn>
    </div>
  </modal>
</template>
<script>
  // import ServicesService from '@/services/ServicesService'
  import DatePicker from 'vue-md-date-picker'
  import InputA from '@/components/input'
export default {
    components: {
      InputA,
      DatePicker
    },
    data () {
      return {
        service: {},
        released: {
          name: '',
          description: '',
          price: '',
          unit: '',
          amount: '',
          ownerId: '',
          serviceId: ''
        },
        user: {},
        error: '',
        summ: ''
      }
    },
    mounted () {},
    computed: {
      disabled () {
        if (this.released.amount > 0) {
          return false
        } else {
          return true
        }
      }
    },
    methods: {
      async beforeOpen (event) {
        this.error = ''
        this.service = event.params.service
        this.released = {
          name: this.service.name,
          description: this.service.description,
          price: this.service.price,
          unit: this.service.unit,
          amount: '',
          ownerId: this.$auth.currentUser().id,
          serviceId: this.service.id
        }
      },
      async addNotification () {
        await this.$socket.emit('addnotifications', (JSON.stringify(this.released)))
        alert('Заявка подана!')
        this.$router.push({
          name: 'ListOfPartnersPage'
        })
      },
      setError () {
        if (this.service.amount - this.released.amount < 0) {
          this.error = 'Вы превысили доступное количество купонов!'
        } else if (this.released.amount * this.released.price > this.user.balance) {
          this.error = 'У Вас не достаточно денег на счету!'
        } else {
          this.error = ''
        }
      }
    }
}
</script>
