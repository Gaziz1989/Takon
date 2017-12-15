<style src="./style.css" scoped></style>
<template>
  <modal name="BuyCoupon" width="50%" height="40%" @before-open="beforeOpen">
    <div class="moduleWraper">
      <h6>Купон: {{ coupon.name }}</h6>
      <div class="fullOf">
        <p class="greyFont">Доступное количество</p>
        <p class="greyFont" style="color: black;">{{coupon.amount}}</p>
      </div>
      <input-a type="number" title="Количество" v-model="released.amount" full/>
      <v-btn @click="buyCoupon" small flat :disabled="disabled">Купить</v-btn>
    </div>
  </modal>
</template>

<script>
  import CouponsService from '@/services/CouponsService'
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
          amount: ''
        }
      }
    },
    mounted () {},
    computed: {
      disabled () {
        if (this.released.amount && this.released.amount > 0 && this.released.amount <= this.coupon.amount) {
          return false
        } else {
          return true
        }
      }
    },
    methods: {
      async beforeOpen (event) {
        this.coupon = event.params.coupon
        this.released = {
          name: this.coupon.name,
          description: this.coupon.description,
          price: this.coupon.price,
          amount: '',
          CouponId: this.coupon.id,
          organization: this.coupon.UserId,
          owner: this.$auth.currentUser().id
        }
      },
      async buyCoupon () {
        try {
          const response = await CouponsService.buyCoupon(this.released)
          alert('Купон ' + response.data.coupon + ' был куплен!')
        } catch (error) {
          alert(error.response.data.message)
        }
      }
    }
}
</script>
