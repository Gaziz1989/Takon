<style src="./style.css" scoped></style>
<template>
  <div>
    <div class="basicinfo">
      <span><strong>Id:</strong> {{released.id}}</span>
      <span><strong>Название:</strong> {{released.name}}</span>
      <span><strong>Организация предоставляющая услугу/товар:</strong> {{released.service.owner.name ? released.service.owner.name : released.service.owner.email}}</span>
      <span><strong>Описание:</strong> {{released.description}}</span>
      <span><strong>Цена за единицу:</strong> {{released.price}}</span>
      <span><strong>Количество оставшихся:</strong> {{released.amount}}</span>
      <span><strong>Сумма оставшихся:</strong> {{released.amount * released.price}}</span>
    </div>
    <v-card>
      <v-card-title>
        Сотрудники
        <v-spacer></v-spacer>
        <v-btn flat fab dark small color="grey" :disabled="disabled" @click="transferTakon()">
          <v-icon>edit</v-icon>
        </v-btn>
      </v-card-title>
      <v-data-table
          v-bind:headers="headers"
          v-bind:items="users"
          v-bind:search="search"
        >
        <template slot="items" slot-scope="props">
          <td class="text-xs-left"><input type="checkbox" :value="props.item.id" id="checkbox" v-model="checked"></td>
          <td class="text-xs-left">{{ props.item.name }}</td>
          <td class="text-xs-left">{{ props.item.email }}</td>
          <td class="text-xs-left">{{ props.item.phone }}</td>
          <td class="text-xs-right">
            <input @input="addTakon($event, props.item.id)" type="number" name="" v-if="showChecked(props.item.id)">
          </td>
        </template>
        <template slot="pageText" slot-scope="{ pageStart, pageStop }">
          От {{ pageStart }} к {{ pageStop }}
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import ServicesService from '@/services/ServicesService'
import UsersService from '@/services/UsersService'
export default {
  name: 'TakonDonutPage',
  components: {
  },
  computed: {
    disabled () {
      var total = 0
      this.takonsToTransfer.map(takon => {
        total = total + Number(takon.amount)
      })
      if (total > this.released.amount || total === 0) {
        return true
      } else {
        return false
      }
    }
  },
  data () {
    return {
      max25chars: (v) => v.length <= 25 || 'Input too long!',
      tmp: '',
      search: '',
      pagination: {},
      headers: [
        {
          text: 'Выбрать',
          align: 'left',
          sortable: false,
          value: ''
        },
        { text: 'Логин', align: 'left', value: 'name' },
        { text: 'Email', align: 'left', value: 'email' },
        { text: 'Телефон', align: 'left', value: 'phone' },
        { text: 'Количество к передаче', align: 'right', value: 'action' }
      ],
      users: [],
      released: {
        service: {
          owner: {}
        }
      },
      checked: [],
      takonsToTransfer: []
    }
  },
  async beforeMount () {
    try {
      const response = await ServicesService.getReleased(this.$route.params.id)
      const response1 = await UsersService.getEmployees(this.$auth.currentUser().id)
      this.released = response.data.released
      this.users = response1.data.users
    } catch (error) {
      alert('Произошла ошибка, попробуйте выбрать сервис с начала!')
    }
  },
  methods: {
    async transferTakon () {
      try {
        const answer = confirm('Вы уверены?')
        if (answer) {
          const response = await ServicesService.transferTakon(this.takonsToTransfer, this.released.id)
          alert(response.data.message)
          this.$router.go(-1)
        } else {
          this.takonsToTransfer = []
          this.checked = []
        }
      } catch (error) {
        alert(error.response.data.error)
      }
    },
    showChecked (_id) {
      return this.checked.includes(_id)
    },
    addTakon (event, _id) {
      var found = false
      this.takonsToTransfer.map(takon => {
        if (takon.id === _id) {
          found = true
          takon.amount = Number(event.target.value)
        }
      })
      if (!found) {
        this.takonsToTransfer.push({
          id: _id,
          amount: Number(event.target.value)
        })
      }
    }
  }
}
</script>
