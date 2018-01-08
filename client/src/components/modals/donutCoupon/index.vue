<style src="./style.css" scoped></style>
<template>
  <modal name="DonutCoupon" width="50%" height="80%" @before-open="beforeOpen">
    <div class="moduleWraper">
      <h6>Купон: {{ coupon.id }}</h6>
      <div class='error' v-html="error"/>
      <div class="fullOf">
        <p class="greyFont">Название</p>
        <p class="greyFont" style="color: black;">{{coupon.name}}</p>
      </div>
      <div class="fullOf">
        <p class="greyFont">Количество</p>
        <p class="greyFont" style="color: black;">{{coupon.amount}}</p>
      </div>
      <div class="fullOf">
        <p class="greyFont">Описание</p>
        <p class="greyFont" style="color: black;">{{coupon.description}}</p>
      </div>
      <div class="fullOf">
        <p class="greyFont">Сотрудник</p>
        <select v-model="usersCoupon.ownerId">
          <option value=""></option>
          <option :value="employee.id" v-for="employee in employees">{{employee.name}}</option>
        </select>
      </div>
      <input-a type="number" title="Количество к передаче" placeholder="0" v-model="usersCoupon.amount" full/>
      <v-btn @click="donutCoupon" small flat :disabled="disabled">Передать</v-btn>
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
        coupon: {},
        usersCoupon: {
          name: '',
          description: '',
          price: '',
          amount: '',
          amountofservices: '',
          endDate: '',
          status: '',
          serviceId: '',
          couponId: '',
          organizationId: '',
          ownerId: ''
        },
        employees: [],
        error: ''
      }
    },
    mounted () {},
    computed: {
      disabled () {
        if (this.usersCoupon.amount && this.usersCoupon.ownerId && this.usersCoupon.amount <= this.coupon.amount) {
          return false
        } else {
          return true
        }
      }
    },
    methods: {
      async beforeOpen (event) {
        const response = await CouponsService.getReleasedCoupon(event.params.id)
        this.coupon = response.data.coupon
        this.usersCoupon = {
          name: this.coupon.name,
          description: this.coupon.description,
          price: this.coupon.price,
          amountofservices: this.coupon.amountofservices,
          amount: '',
          endDate: this.coupon.endDate,
          status: this.coupon.status,
          serviceId: this.coupon.serviceId,
          couponId: this.coupon.couponId,
          organizationId: this.coupon.organizationId
        }
        const response2 = await UsersService.getEmployees(this.$auth.currentUser().id)
        this.employees = response2.data.users
      },
      async donutCoupon () {
        try {
          const response = await CouponsService.donutCoupon(this.usersCoupon, this.$auth.currentUser().id, this.coupon.id)
          this.coupon = response.data.coupon
          alert(response.data.coupon.name + ' был успешно передан!')
          this.$modal.hide('CouponEdit')
          window.location.reload()
        } catch (error) {
          alert(error.response.data.error)
          this.$modal.hide('CouponEdit')
        }
      }
    }
}
</script>
