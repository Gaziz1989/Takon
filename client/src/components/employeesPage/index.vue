<style src="./style.css" scoped></style>
<template>
  <v-card>
    <v-card-title>
      Сотрудники
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
        v-bind:items="users"
        v-bind:search="search"
      >
      <template slot="items" slot-scope="props">
        <td>
          <v-edit-dialog
            lazy
          > {{ props.item.name }}
            <v-text-field
              slot="input"
              label="Edit"
              v-model="props.item.name"
              single-line
              counter
              :rules="[max25chars]"
            ></v-text-field>
          </v-edit-dialog>
        </td>
        <td class="text-xs-right">{{ props.item.lastname}}</td>
        <td class="text-xs-right">{{ props.item.gender}}</td>
        <td class="text-xs-right">{{ props.item.phone}}</td>
        <td class="text-xs-right">{{ props.item.email}}</td>
        <td class="text-xs-right">{{ props.item.birthday}}</td>
        <td class="text-xs-right">{{ props.item.role}}</td>
        <td class="text-xs-right">{{ props.item.salary}}</td>
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
            text: 'Имя',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Фамилия', value: 'lastname' },
          { text: 'Пол', value: 'gender' },
          { text: 'Телефон', value: 'phone' },
          { text: 'E-mail', value: 'email' },
          { text: 'День рождения', value: 'birthday' },
          { text: 'Роль', value: 'role' },
          { text: 'Заработная плата', value: 'salary' },
          { text: 'Действия', value: 'event' }
        ],
        users: []
      }
    },
    async beforeMount () {
      const response = await UsersService.getUsers()
      this.users = response.data.users
    },
    methods: {
      openEditModal (_id) {
        this.$modal.show('UserEdit', {id: _id})
      }
    }
}
</script>
