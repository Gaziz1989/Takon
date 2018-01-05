<style src="./style.css" scoped></style>
<template>
  <modal name="BuyCoupon" width="50%" height="40%" @before-open="beforeOpen">
    <div class="moduleWraper">
      <h6>Купон: {{ coupon.name }}</h6>
      <div class='error' v-html="error"/>
      <div class="halfOf">
        <p class="greyFont">Цена</p>
        <p class="greyFont" style="color: black;">{{coupon.price}}</p>
      </div>
      <div class="halfOf">
        <p class="greyFont">Доступное количество</p>
        <p class="greyFont" style="color: black;">{{coupon.amount - released.amount >= 0 ? coupon.amount - released.amount : 0}}</p>
      </div>
      <div class="halfOf">
        <p class="greyFont">Сумма</p>
        <p class="greyFont">{{released.amount * released.price}}</p>
      </div>
      <input-a type="number" title="Количество" v-model="released.amount" @input="setError"/>
      <v-btn @click="buyCoupon" small flat :disabled="disabled">Купить</v-btn>
    </div>
  </modal>
</template>
<script>
  import CouponsService from '@/services/CouponsService'
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
        released: {
          name: '',
          description: '',
          price: '',
          amount: '',
          endDate: ''
        },
        user: {},
        error: ''
      }
    },
    mounted () {},
    computed: {
      disabled () {
        if (this.released.amount && this.released.amount > 0 && this.released.amount <= this.coupon.amount && this.released.amount * this.released.price <= this.user.balance) {
          return false
        } else {
          return true
        }
      }
    },
    methods: {
      async beforeOpen (event) {
        this.error = ''
        this.coupon = event.params.coupon
        this.released = {
          name: this.coupon.name,
          description: this.coupon.description,
          price: this.coupon.price,
          amount: '',
          endDate: this.coupon.endDate,
          couponId: this.coupon.id,
          organizationId: this.coupon.ownerId,
          ownerId: this.$auth.currentUser().id,
          serviceId: this.coupon.serviceId,
          amountofservices: this.coupon.amountofservices
        }
        const response = await UsersService.getUser(this.$auth.currentUser().id)
        this.user = response.data.user
      },
      async buyCoupon () {
        try {
          const response = await CouponsService.buyCoupon(this.released)
          alert('Купон ' + response.data.coupon.name + ' был куплен!')
          this.$router.push({
            name: 'ListOfPartnersPage'
          })
          window.location.reload()
        } catch (error) {
          alert(error.response.data.message)
        }
      },
      setError () {
        if (this.coupon.amount - this.released.amount < 0) {
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
