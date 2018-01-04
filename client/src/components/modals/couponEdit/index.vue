<style src="./style.css" scoped></style>
<template>
  <modal name="CouponEdit" width="50%" height="60%" @before-open="beforeOpen">
    <div class="moduleWraper">
      <h6>Купон: {{ coupon.id }}</h6>
      <input-a type="text" title="Название" :placeholder="coupon.name" v-model="coupon.name"/>
      <div class="halfOf">
        <p class="greyFont">Услуга/Товар</p>
        <select v-model="coupon.serviceId">
          <option value=""></option>
          <option :value="service.id" v-for="service in services">{{service.name}}</option>
        </select>
      </div>
      <input-a type="number" title="Цена" :placeholder="coupon.price" v-model="coupon.price"/>
      <div class="halfOf">
        <p class="greyFont">Действителен до</p>
        <input type="text" name="" id="" @click="openDatepicker" v-model="new Date(coupon.endDate).getFullYear() +'-'+ (new Date(coupon.endDate).getMonth()+1) +'-'+ new Date(coupon.endDate).getDate()">
        <date-picker 
          :min="(new Date().getFullYear()) + '-' + (new Date().getMonth()+1) + '-' + (new Date().getDate()-1)"
           @close="show = false"
           v-if="show"
           color="#3e50b5"
           v-model="coupon.endDate">
        </date-picker>
      </div>
      <div class="fullOf">
        <p class="greyFont">Статус</p>
        <select v-model="coupon.status">
          <option value=""></option>
          <option value="active">Активный</option>
          <option value="inactive">Не активный</option>
          <option value="blocked">Заблокирован</option>
        </select>
      </div>
      <div class="fullOf">
        <p class="greyFont">Иная информация</p>
        <textarea class="fullOf" placeholder="..." v-model="coupon.description"></textarea>
      </div>
      <v-btn @click="editCoupon" small flat >Сохранить</v-btn>
      <v-btn @click="archiveCoupon" small flat>Удалить</v-btn>
    </div>
  </modal>
</template>

<script>
  import CouponsService from '@/services/CouponsService'
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
        coupon: {
          name: '',
          serviceId: '',
          description: '',
          price: '',
          amountofservices: '',
          amount: '',
          endDate: '',
          status: '',
          id: ''
        },
        show: false,
        services: []
      }
    },
    methods: {
      async beforeOpen (event) {
        const response = await CouponsService.getCoupon(event.params.id)
        this.coupon = response.data.coupon
        console.log(this.coupon)
        const response2 = await ServicesService.getServices(this.$auth.currentUser().id)
        this.services = response2.data.services
      },
      async editCoupon () {
        try {
          const response = await CouponsService.editCoupon(this.coupon)
          this.coupon = response.data.coupon
          alert(response.data.coupon.name + ' был успешно изменен!')
          this.$modal.hide('CouponEdit')
          window.location.reload()
        } catch (error) {
          alert(error.response.data.error)
          this.$modal.hide('CouponEdit')
        }
      },
      async archiveCoupon () {
        try {
          const response = await CouponsService.archiveCoupon(this.coupon.id)
          alert('Товар/Услуга ' + response.data.coupon.name + ' успешно удален!')
          this.$modal.hide('CouponEdit')
          window.location.reload()
        } catch (error) {
          alert(error.response.data.error)
          this.$modal.hide('CouponEdit')
        }
      },
      openDatepicker () {
        this.show = !this.show
      }
    }
}
</script>
