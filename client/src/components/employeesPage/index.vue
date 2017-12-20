<style src="./style.css" scoped></style>
<template>
  <v-card>
    <v-card-title>
      Сотрудники
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
        <td class="text-xs-left">{{ props.item.name }}</td>
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
  </v-card>
</template>

<script>
  import UsersService from '@/services/UsersService'
  import UserEdit from '@/components/modals/userEdit'
export default {
    name: 'EmployeesPage',
    components: {
      UserEdit
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
            text: 'Логин',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Email', value: 'email' },
          { text: 'Адрес', value: 'adress' },
          { text: 'Телефон', value: 'phone' },
          { text: 'Статус', value: 'status' },
          { text: 'Действия', value: 'event' }
        ],
        users: []
      }
    },
    async beforeMount () {
      const response = await UsersService.getEmployees(this.$auth.currentUser().id)
      this.users = response.data.users
    },
    methods: {
      openEditModal (_id) {
        this.$modal.show('UserEdit', {id: _id})
      }
    }
}
</script>
