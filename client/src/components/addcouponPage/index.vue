<style src="./style.css" scoped></style>
<template>
  <panel>
      <h6>Добавление нового купона</h6>
      <p>Добавьте купон заполнив следующие поля.</p>
      <div class='error' v-html="error"/>
      <input-a type="text" title="Название" v-model="coupon.name" full/>
      <div class="fullOf">
        <p class="greyFont">Услуга/Товар</p>
        <select v-model="coupon.ServiceId">
          <option value=""></option>
          <option :value="service.id" v-for="service in services">{{service.name}}</option>
        </select>
      </div>
      <input-a type="text" title="Цена" v-model="coupon.price" full/>
      <input-a type="number" title="Количество" v-model="coupon.amount" full/>
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
      <v-btn @click="createCoupon" small flat>Сохранить</v-btn>
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
    computed: {},
    data () {
      return {
        coupon: {
          name: '',
          ServiceId: '',
          description: '',
          price: '',
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
    mounted () {},
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
