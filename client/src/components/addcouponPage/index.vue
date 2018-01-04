<style src="./style.css" scoped></style>
<template>
  <panel>
      <h6>Добавление нового купона</h6>
      <p>Добавьте купон заполнив следующие поля.</p>
      <div class='error' v-html="error"/>
      <input-a type="text" title="Название" v-model="coupon.name" full/>
      <div class="fullOf">
        <p class="greyFont">Услуга/Товар</p>
        <select v-model="coupon.serviceId">
          <option value=""></option>
          <option :value="service.id" v-for="service in services">{{service.name}}</option>
        </select>
      </div>
      <input-a type="text" title="Цена" v-model="coupon.price" full/>
      <input-a type="number" title="Количество" v-model="coupon.amount" full/>
      <input-a type="number" title="Количество услуг на купоне" v-model="coupon.amountofservices" full/>
      <div class="fullOf">
        <p class="greyFont">Действителен до</p>
        <input type="text" name="" id="" @click="openDatepicker" v-model="coupon.endDate">
        <date-picker 
          :min="(new Date().getFullYear()) + '-' + (new Date().getMonth()+1) + '-' + (new Date().getDate()-1)"
           @close="show = false"
           v-if="show"
           color="#3e50b5"
           v-model="coupon.endDate">
        </date-picker>
      </div>
      <div class="fullOf">
        <p class="greyFont">Иная информация</p>
        <textarea class="fullOf" placeholder="..." v-model="coupon.description"></textarea>
      </div>
      <v-btn @click="createCoupon" small flat :disabled="disabled">Сохранить</v-btn>
  </panel>
</template>

<script>
  import Panel from '@/components/panel'
  import InputA from '@/components/input'
  import DatePicker from 'vue-md-date-picker'
  import CouponsService from '@/services/CouponsService'
  import ServicesService from '@/services/ServicesService'
export default {
    name: 'AddCouponPage',
    components: {
      Panel,
      InputA,
      DatePicker
    },
    computed: {
      disabled () {
        if (this.coupon.name.length > 0 && this.coupon.serviceId.length > 0 && this.coupon.description.length > 0 && this.coupon.price.length > 0 && this.coupon.amountofservices.length > 0 && this.coupon.amount.length > 0 && this.coupon.endDate.length > 0) {
          return false
        } else {
          return true
        }
      }
    },
    data () {
      return {
        coupon: {
          name: '',
          serviceId: '',
          description: '',
          price: '',
          amountofservices: '',
          amount: '',
          endDate: ''
        },
        services: [],
        show: false,
        error: ''
      }
    },
    async beforeMount () {
      const response = await ServicesService.getServices(this.$auth.currentUser().id)
      this.services = response.data.services
    },
    methods: {
      async createCoupon () {
        try {
          const response = await CouponsService.addCoupon(this.coupon, this.$auth.currentUser().id)
          alert('Купон ' + response.data.coupon.name + ' был добавлен!')
          this.$router.go(-1)
        } catch (error) {
          this.error = error.response.data.error
        }
      },
      openDatepicker () {
        this.show = !this.show
      }
    }
}
</script>
