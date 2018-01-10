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
        v-bind:items="users"
        v-bind:search="search"
      >
      <template slot="items" slot-scope="props">
        <td class="text-xs-right">{{ props.item.email }}</td>
        <td class="text-xs-right">{{ props.item.adress }}</td>
        <td class="text-xs-right">{{ props.item.phone }}</td>
        <td class="text-xs-right">{{ props.item.status === 'active' ? 'Активный' : 'Не активный' }}</td>
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
    <user-edit/>
    <add-balance/>
  </v-card>
</template>
<script>
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
        users: []
      }
    },
    methods: {

    }
  }
</script>