<style src="./style.css" scoped></style>
<template>
  <modal name="DonutService" width="50%" height="80%" @before-open="beforeOpen">
    <div class="moduleWraper">
      <h6>Купон: {{ service.id }}</h6>
      <div class='error' v-html="error"/>
      <div class="fullOf">
        <p class="greyFont">Название</p>
        <p class="greyFont" style="color: black;">{{service.name}}</p>
      </div>
      <div class="fullOf">
        <p class="greyFont">Количество</p>
        <p class="greyFont" style="color: black;">{{service.amount}}</p>
      </div>
      <div class="fullOf">
        <p class="greyFont">Описание</p>
        <p class="greyFont" style="color: black;">{{service.description}}</p>
      </div>
      <div class="fullOf">
        <p class="greyFont">Сотрудник</p>
        <select v-model="donut.ownerId">
          <option value=""></option>
          <option :value="employee.id" v-for="employee in employees">{{employee.name}}</option>
        </select>
      </div>
      <input-a type="number" title="Количество к передаче" placeholder="0" v-model="donut.amount" full/>
      <v-btn @click="donutService" small flat :disabled="disabled">Передать</v-btn>
    </div>
  </modal>
</template>

<script>
  import ServicesService from '@/services/ServicesService'
  import UsersService from '@/services/UsersService'
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
        donut: {
          name: '',
          description: '',
          price: '',
          unit: '',
          amount: 0,
          status: '',
          ownerId: '',
          serviceId: ''
        },
        employees: [],
        error: ''
      }
    },
    computed: {
      disabled () {
        if (this.donut.amount && this.donut.amount != 0 && this.donut.ownerId && this.donut.amount <= this.service.amount) {
          return false
        } else {
          return true
        }
      }
    },
    methods: {
      async beforeOpen (event) {
        const response = await UsersService.getEmployees(this.$auth.currentUser().id)
        this.employees = response.data.users
        const response1 = await ServicesService.getReleased(event.params.id)
        this.service = response1.data.released
        this.donut = {
          name: this.service.name,
          description: this.service.description,
          price: this.service.price,
          unit: this.service.unit,
          amount: 0,
          status: 'active',
          ownerId: '',
          serviceId: this.service.serviceId
        }
      },
      async donutService () {
        try {
          const response = await ServicesService.donutService(this.donut, this.$auth.currentUser().id, this.service.id)
          alert(response.data.message)
          this.$modal.hide('DonutService')
          window.location.reload()
        } catch (error) {
          alert(error.response.data.error)
          this.$modal.hide('DonutService')
        }
      }
    }
}
</script>
