<style src="./style.css" scoped></style>
<template>
  <v-card>
    <v-card-title>
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
        <td class="text-xs-right"></td>
      </template>
      <template slot="pageText" slot-scope="{ pageStart, pageStop }">
        От {{ pageStart }} к {{ pageStop }}
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
  import HistoriesService from '@/services/HistoriesService'
  export default {
    name: 'TablesPage',
    components: {

    },
    data () {
      return {
        max25chars: (v) => v.length <= 25 || 'Input too long!',
        tmp: '',
        search: '',
        pagination: {},
        headers: [
          { text: 'Услуга', value: 'email' },
          { text: 'Общее количество', value: 'adress' },
          { text: 'Заказчик', value: 'phone' },
          { text: 'Статус', value: 'status' },
          { text: 'Действия', value: 'event' }
        ],
        services: []
      }
    },
    async beforeMount () {
      const response = await HistoriesService.getDataForAdmin(this.headers)
      console.log(response.data.message)
    },
    methods: {

    }
  }
</script>