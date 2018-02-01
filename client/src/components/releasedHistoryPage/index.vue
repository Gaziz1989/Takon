<style src="./style.css" scoped></style>
<template>
  <div>
    <div class="basicinfo">
      <span><strong>Название:</strong> {{service.name}}</span>
      <span><strong>id:</strong> {{service.id ? service.id : this.$route.params.id}}</span>
      <span><strong>Дата покупки:</strong> {{new Date(buying.date).getDate() + '/' + new Date(buying.date).getMonth() + 1 + '/' + new Date(buying.date).getFullYear()}}</span>
      <span><strong>Количество купленных:</strong> {{buying.amount}}</span>
      <span><strong>Цена за единицу:</strong> {{buying.price}}</span>
      <span><strong>Сумма покупки:</strong> {{buying.price * buying.amount}}</span>
      <span><strong>Количество переданных:</strong> {{transferedAmount}}</span>
      <span><strong>Сумма переданных:</strong> {{transferedSumm}}</span>
      <span><strong>Итого у Вас осталось:</strong> {{service.amount}}</span>
    </div>
    <v-card>
      <v-card-title>
        Таконы сотрудников
        <v-spacer></v-spacer>
        <v-text-field
          append-icon="search4"
          label="Поиск"
          single-line
          hide-details
          v-model="search4"
        ></v-text-field>
      </v-card-title>
      <v-data-table
          v-bind:headers="headers4"
          v-bind:items="takons"
          v-bind:search="search4"
        >
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{props.item.owner.name ? props.item.owner.name : props.item.owner.phone}}</td>
          <td class="text-xs-right">{{props.item.name}}</td>
          <td class="text-xs-right">{{props.item.description}}</td>
          <td class="text-xs-right">{{props.item.price}}</td>
          <td class="text-xs-right">{{props.item.amount}}</td>
          <td class="text-xs-right">{{props.item.amount * props.item.price}}</td>
          <td class="text-xs-right">
            <v-btn flat fab dark small color="grey" @click="removeTakon(props.item)">
              <v-icon>remove</v-icon>
            </v-btn>
          </td>
        </template>
        <template slot="pageText" slot-scope="{ pageStart, pageStop }">
          От {{ pageStart }} к {{ pageStop }}
        </template>
      </v-data-table>
    </v-card>

    <v-card>
      <v-card-title>
        История транзакций
        <v-spacer></v-spacer>
        <v-text-field
          append-icon="search"
          label="Поиск"
          single-line
          hide-details
          v-model="search1"
        ></v-text-field>
      </v-card-title>
      <v-data-table
          v-bind:headers="headers1"
          v-bind:items="transactions"
          v-bind:search="search1"
        >
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.from.name ? props.item.from.name : props.item.from.phone }}</td>
          <td class="text-xs-right">{{ props.item.to.name ? props.item.to.name : props.item.to.phone}}</td>
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
        История транзакций сотрудников
        <v-spacer></v-spacer>
        <v-text-field
          append-icon="search"
          label="Поиск"
          single-line
          hide-details
          v-model="search3"
        ></v-text-field>
      </v-card-title>
      <v-data-table
          v-bind:headers="headers3"
          v-bind:items="emplTransfers"
          v-bind:search="search3"
        >
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.from.name ? props.item.from.name : props.item.from.phone }}</td>
          <td class="text-xs-right">{{ props.item.to.name ? props.item.to.name : props.item.to.phone}}</td>
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
          <td class="text-xs-left">{{ props.item.owner.name ? props.item.owner.name : props.item.owner.phone }}</td>
          <td class="text-xs-right">{{ props.item.scaner.name ? props.item.scaner.name : props.item.scaner.phone}}</td>
          <td class="text-xs-right">{{ props.item.scaner.employer.name ? props.item.scaner.employer.phone : props.item.scaner.employer.phone}}</td>
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
  import ServicesService from '@/services/ServicesService'
  export default {
    name: 'TablesPage',
    components: {},
    data () {
      return {
        max25chars: (v) => v.length <= 25 || 'Input too long!',
        tmp1: '',
        search1: '',
        pagination1: {},
        tmp2: '',
        search2: '',
        pagination2: {},
        tmp3: '',
        search3: '',
        pagination3: {},
        tmp4: '',
        search4: '',
        pagination4: {},
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
        headers3: [
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
        headers4: [
          {
            text: 'Имя сотрудника',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Название', value: 'naming' },
          { text: 'Описание', value: 'description' },
          { text: 'Цена за единицу', value: 'price' },
          { text: 'Количество оставшихся', value: 'amount' },
          { text: 'Сумма оставшихся', value: 'summ' },
          { text: 'Уменьшить', value: 'action' }
        ],
        service: {},
        buying: {},
        transactions: [],
        usings: [],
        emplTransfers: [],
        takons: []
      }
    },
    async beforeMount () {
      try {
        const response = await HistoriesService.getJUserServices(this.$route.params.id)
        this.service = response.data.takon
        this.buying = response.data.selling
        this.transactions = response.data.transactions
        this.usings = response.data.usings
        this.emplTransfers = response.data.emplTransfers
        this.takons = response.data.takons
      } catch (error) {
        alert('Произошла ошибка')
      }
    },
    computed: {
      transferedAmount () {
        var amount = 0
        this.transactions.forEach(used => {
          amount = Number(amount) + Number(used.amount)
        })
        return amount
      },
      transferedSumm () {
        var summ = 0
        this.transactions.forEach(used => {
          summ = Number(summ) + Number(used.amount) * Number(used.price)
        })
        return summ
      }
    },
    methods: {
      async removeTakon (item) {
        try {
          var takons = prompt('Сколько хотите отнять?', '')
          if (Number.isNaN(Number(takons.trim())) || Number(takons.trim()) <= 0) {
            return alert('Введите правильное количество')
          }
          if (Number(takons) > Number(item.amount)) {
            return alert('Вы превысили количество таконов сотрудника')
          }
          const response = await ServicesService.minusTakons(item.id, takons, this.service.id)
          alert(response.data.message)
          this.$router.go(-1)
        } catch (error) {
          alert('Произошла ошибка')
        }
      }
    }
  }
</script>