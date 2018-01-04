<style src="./style.css" scoped></style>
<template>
  <div
    id="e3"
    style="margin-top: 65px;"
    class="grey lighten-3"
  >
    <v-toolbar color="grey lighten-4" flat>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title class="black--text">Доступные купоны</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container
      fluid
      grid-list-lg
    >
      <v-layout row wrap>
        <v-flex xs3 v-for="coupon in coupons" :key="coupon.id">
          <v-card color="blue darken-1" class="white--text" hover>
            <v-card-title primary-title>
              <div>Название: "{{coupon.name}}" на "{{coupon.service.name}}"</div>
              <div>Описание: {{coupon.description}}</div>
              <div>Действителен до: {{new Date(coupon.endDate).getFullYear() + '-' + (new Date(coupon.endDate).getMonth() + 1) + '-' + new Date(coupon.endDate).getDate() }}</div>
              <div>Цена: {{coupon.price}}</div>
              <div>Осталось: {{coupon.amount}}</div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat dark @click="openBuyModal(coupon)">Купить</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <buy-coupon/>
  </div>
</template>

<script>
  import BuyCoupon from '@/components/modals/buyCouponModal'
  import CouponsService from '@/services/CouponsService'
export default {
    name: 'ListOfCouponsPage',
    components: {
      BuyCoupon
    },
    computed: {},
    data () {
      return {
        coupons: []
      }
    },
    async beforeMount () {
      const response = await CouponsService.getCouponsForSail(this.$route.params.id)
      this.coupons = response.data.coupons
    },
    methods: {
      openBuyModal (coupon) {
        this.$modal.show('BuyCoupon', {coupon})
      }
    }
}
</script>
