<style src="./style.css" scoped></style>
<template>
   <v-card>
    <v-card-title>
      Услуги/Товары
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
        v-bind:items="services"
        v-bind:search="search"
      >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.owner.name ? props.item.owner.name : props.item.owner.email}}</td>
        <td class="text-xs-right">{{ props.item.description }}</td>
        <td class="text-xs-right">{{ props.item.price }}</td>
        <td class="text-xs-right">{{ $auth.currentUser().type === 'juser' ? props.item.amount : '/-/-/-/-/-/-/-/'}}</td>
        <td class="text-xs-right">{{ props.item.status === 'active' ? 'Активный' : 'Не активный' }}</td>
        <td class="text-xs-right">
          <v-btn flat fab dark small color="grey" @click="goToService(props.item.id)">
            <v-icon>open_in_new</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="pageText" slot-scope="{ pageStart, pageStop }">
        От {{ pageStart }} к {{ pageStop }}
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
  import ServicesService from '@/services/ServicesService'
  export default {
    name: 'TablesPage',
    components: {},
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
          { text: 'Компания', value: 'organization' },
          { text: 'Описание', value: 'description' },
          { text: 'Цена за единицу', value: 'price' },
          { text: 'Количество', value: 'amount' },
          { text: 'Статус', value: 'status' },
          { text: 'Действия', value: 'event' }
        ],
        services: []
      }
    },
    async beforeMount () {
      const response = await ServicesService.getAdminServices()
      this.services = response.data.services
    },
    methods: {
      goToService (_id) {
        this.$router.push({
          name: 'ServiceHistoryPage',
          params: {
            id: _id
          }
        })
      }
    }
  }
</script>