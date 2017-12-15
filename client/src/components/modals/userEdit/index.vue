<style src="./style.css" scoped></style>
<template>
  <modal name="UserEdit" width="50%" height="60%" @before-open="beforeOpen">
    <div class="moduleWraper">
      <h6>Профиль: {{ user.id }}</h6>
      <input-a type="text" :placeholder="user.name" title="Имя" v-model="user.name"/>
      <input-a type="text" :placeholder="user.phone" title="Телефон" v-model="user.phone"/>
      <input-a type="text" :placeholder="user.adress" title="Адрес" v-model="user.adress"/>
      <input-a type="text" :placeholder="user.email" title="Email" v-model="user.email"/>
      <div class="fullOf">
        <p class="greyFont">Статус</p>
        <select v-model="user.status">
          <option value=""></option>
          <option value="active">Активный</option>
          <option value="inactive">Не активный</option>
        </select>
      </div>
      <div class='error' v-if="checkPass">Пароли не совпадают</div>
      <input-a type="password" placeholder="Пароль" title="Пароль" v-model="checkPassword"/>
      <input-a type="password" placeholder="Пароль" title="Подтвердите пароль" v-model="checkPassword2"/>
      <v-btn @click="editUser" small flat>Сохранить</v-btn>
      <v-btn @click="archiveUser" small flat>Удалить</v-btn>
    </div>
  </modal>
</template>

<script>
  import UsersService from '@/services/UsersService'
  import InputA from '@/components/input'
export default {
    components: {
      InputA
    },
    data () {
      return {
        user: {
          name: '',
          phone: '',
          type: '',
          adress: '',
          email: '',
          password: '',
          status: '',
          id: ''
        },
        checkPassword: '',
        checkPassword2: ''
      }
    },
    mounted () {},
    computed: {
      checkPass () {
        if (this.checkPassword === this.checkPassword2) {
          return false
        } else {
          return true
        }
      }
    },
    methods: {
      async beforeOpen (event) {
        const response = await UsersService.getUser(event.params.id)
        this.user = response.data.user
      },
      async editUser () {
        try {
          const response = await UsersService.editUser(this.user, this.checkPassword)
          this.user = response.data.user
          alert(response.data.user.name + ' был успешно изменен!')
          this.$modal.hide('UserEdit')
          window.location.reload()
        } catch (error) {
          alert(error.response.data.error)
          this.$modal.hide('UserEdit')
        }
      },
      async archiveUser () {
        try {
          const response = await UsersService.archiveUser(this.user.id)
          alert('Пользователь ' + response.data.user.name + ' успешно удален!')
          this.$modal.hide('UserEdit')
          window.location.reload()
        } catch (error) {
          alert(error.response.data.error)
          this.$modal.hide('UserEdit')
        }
      },
      getType (user) {
        if (user.type === 'admin') {
          return true
        } else {
          return false
        }
      }
    }
}
</script>
