<style src="./style.css" scoped></style>
<template>
  <v-card>
    <v-card-title>
      Купоны
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
    </v-card-title>
    <v-data-table
        v-bind:headers="headers"
        v-bind:items="coupons"
        v-bind:search="search"
      >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.description }}</td>
        <td class="text-xs-right">{{ props.item.price }}</td>
        <td class="text-xs-right">{{ props.item.amount }}</td>
        <td class="text-xs-right">{{ props.item.amountofservices }}</td>
        <td class="text-xs-right">{{ new Date(props.item.endDate).getFullYear() +'-'+ (new Date(props.item.endDate).getMonth()+1) +'-'+ new Date(props.item.endDate).getDate() }}</td>
        <td class="text-xs-right">{{ props.item.service.name }}</td>
        <td class="text-xs-right">{{ props.item.status === 'active' ? 'Активный' : props.item.status === 'inactive' ? 'Не активный' : 'Заблокирован' }}</td>
        <td class="text-xs-right">
          <v-btn flat fab dark small color="grey" @click="openEditModal(props.item.id)">
            <v-icon>edit</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="pageText" slot-scope="{ pageStart, pageStop }">
        От {{ pageStart }} к {{ pageStop }}
      </template>
    </v-data-table>
    <coupon-edit/>
  </v-card>
</template>

<script>
  import CouponsService from '@/services/CouponsService'
  import CouponEdit from '@/components/modals/couponEdit'
export default {
    name: 'CouponsPage',
    components: {
      CouponEdit
    },
    computed: {},
    data () {
      return {
        max25chars: (v) => v.length <= 25 || 'Input too long!',
        tmp: '',
        search: '',
        pagination: {},
        headers: [
          {
            text: 'Название',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Описание', value: 'description' },
          { text: 'Цена', value: 'price' },
          { text: 'Количество', value: 'amount' },
          { text: 'Количество услуг/товаров на купоне', value: 'amountofservices' },
          { text: 'Действителен до', value: 'endDate' },
          { text: 'Товар/Услуга', value: 'service' },
          { text: 'Статус', value: 'status' },
          { text: 'Действия', value: 'event' }
        ],
        coupons: []
      }
    },
    async beforeMount () {
      const response = await CouponsService.getCoupons(this.$auth.currentUser().id)
      this.coupons = response.data.coupons
    },
    methods: {
      openEditModal (_id) {
        this.$modal.show('CouponEdit', {id: _id})
      }
    }
}
</script>
