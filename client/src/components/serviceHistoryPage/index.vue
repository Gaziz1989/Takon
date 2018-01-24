<style src="./style.css" scoped></style>
<template>
  <div>
    <div class="basicinfo">
      <span><strong>Название:</strong> {{service.name}}</span>
      <span><strong>id:</strong> {{service.id}}</span>
      <span><strong>Дата создания:</strong> {{new Date(creation.date).getDate() + '/' + new Date(creation.date).getMonth() + 1 + '/' + new Date(creation.date).getFullYear()}}</span>
      <span><strong>Количество проданных:</strong> {{selled}}</span>
      <span><strong>Сумма продаж:</strong> {{selledSumm}}</span>
      <span><strong>Количество использованных:</strong> {{usedAmount}}</span>
      <span><strong>Использовано на сумму:</strong> {{usedSumm}}</span>
    </div>
    <v-card>
      <v-card-title>
        История продаж
        <v-spacer></v-spacer>
        <v-text-field
          append-icon="search"
          label="Поиск"
          single-line
          hide-details
          v-model="search"
        ></v-text-field>
      </v-card-title>
      <v-data-table
          v-bind:headers="headers"
          v-bind:items="sellings"
          v-bind:search="search"
        >
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.organization.name ? props.item.organization.name : props.item.organization.email }}</td>
          <td class="text-xs-right">{{ props.item.owner.name ? props.item.owner.name : props.item.owner.email}}</td>
          <td class="text-xs-right">{{ new Date(props.item.date).getDate() + '-' + new Date(props.item.date).getMonth() + 1 + '-' + new Date(props.item.date).getFullYear() }}</td>
          <td class="text-xs-right">{{ props.item.amount }}</td>
          <td class="text-xs-right">{{ props.item.price }}</td>
          <td class="text-xs-right">{{ props.item.summ }}</td>
        </template>
        <template slot="pageText" slot-scope="{ pageStart, pageStop }">
          От {{ pageStart }} к {{ pageStop }}
        </template>
      </v-data-table>
    </v-card>

    <v-card>
      <v-card-title>
        История использований
        <v-spacer></v-spacer>
        <v-text-field
          append-icon="search"
          label="Поиск"
          single-line
          hide-details
          v-model="search2"
        ></v-text-field>
      </v-card-title>
      <v-data-table
          v-bind:headers="headers2"
          v-bind:items="usings"
          v-bind:search="search2"
        >
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.owner.name ? props.item.owner.name : props.item.owner.email }}</td>
          <td class="text-xs-right">{{ props.item.scaner.name ? props.item.scaner.name : props.item.scaner.email}}</td>
          <td class="text-xs-right">{{ props.item.scaner.employer.name ? props.item.scaner.employer.name : props.item.scaner.employer.email}}</td>
          <td class="text-xs-right">{{ new Date(props.item.date).getDate() + '-' + new Date(props.item.date).getMonth() + 1 + '-' + new Date(props.item.date).getFullYear() }}</td>
          <td class="text-xs-right">{{ props.item.amount }}</td>
          <td class="text-xs-right">{{ props.item.price }}</td>
          <td class="text-xs-right">{{ Number(props.item.price) * Number(props.item.amount) }}</td>
        </template>
        <template slot="pageText" slot-scope="{ pageStart, pageStop }">
          От {{ pageStart }} к {{ pageStop }}
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
  import HistoriesService from '@/services/HistoriesService'
  export default {
    name: 'ServiceHistoryPage',
    components: {},
    data () {
      return {
        max25chars: (v) => v.length <= 25 || 'Input too long!',
        tmp: '',
        search: '',
        pagination: {},
        tmp1: '',
        search1: '',
        pagination1: {},
        tmp2: '',
        search2: '',
        pagination2: {},
        headers: [
          {
            text: 'Продавец',
            align: 'left',
            sortable: false,
            value: 'seller'
          },
          { text: 'Покупатель', value: 'buyer' },
          { text: 'Дата', value: 'date' },
          { text: 'Количество', value: 'amount' },
          { text: 'Цена за единицу', value: 'price' },
          { text: 'Сумма', value: 'summ' }
        ],
        headers1: [
          {
            text: 'Передал ',
            align: 'left',
            sortable: false,
            value: 'from'
          },
          { text: 'Принял', value: 'to' },
          { text: 'Дата', value: 'date' },
          { text: 'Количество', value: 'amount' },
          { text: 'Цена за единицу', value: 'price' },
          { text: 'Сумма', value: 'summ' }
        ],
        headers2: [
          {
            text: 'Кто использовал ',
            align: 'left',
            sortable: false,
            value: 'from'
          },
          { text: 'Кто сканировал', value: 'to' },
          { text: 'Организация', value: 'organization' },
          { text: 'Дата', value: 'date' },
          { text: 'Количество', value: 'amount' },
          { text: 'Цена за единицу', value: 'price' },
          { text: 'Сумма', value: 'summ' }
        ],
        service: {},
        creation: {},
        takons: [],
        usings: [],
        sellings: []
      }
    },
    computed: {
      selled () {
        var _selled = 0
        this.sellings.forEach(sells => {
          _selled = Number(_selled) + Number(sells.amount)
        })
        return _selled
      },
      selledSumm () {
        var summ = 0
        this.sellings.forEach(sells => {
          summ = Number(summ) + Number(sells.amount) * Number(sells.price)
        })
        return summ
      },
      usedAmount () {
        var amount = 0
        this.usings.forEach(used => {
          amount = Number(amount) + Number(used.amount)
        })
        return amount
      },
      usedSumm () {
        var summ = 0
        this.usings.forEach(used => {
          summ = Number(summ) + Number(used.amount) * Number(used.price)
        })
        return summ
      }
    },
    async beforeMount () {
      try {
        const response = await HistoriesService.getAdminServices(this.$route.params.id)
        this.service = response.data.service
        this.creation = response.data.creation
        this.takons = response.data.takons
        this.usings = response.data.usings
        this.sellings = response.data.sellings
      } catch (error) {
        alert('Произошла ошибка')
      }
    },
    methods: {}
  }
</script>