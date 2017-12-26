<style src="./style.css" scoped></style>
<template>
  <panel>
      <h6>Добавление нового сотрудника</h6>
      <p>Добавьте нового сотрудника заполнив следующие поля.</p>
      <div class='error' v-html="error"/>
      <input-a type="text" title="Логин" v-model="user.name" full/>
      <input-a type="text" title="Email" v-model="user.email" full/>
      <div class='error' v-if="checkPass">Пароли не совпадают</div>
      <input-a type="password" title="Пароль" v-model="user.password" full/>
      <input-a type="password" title="Подтверждение пароля" v-model="checkPassword" full/>
      <input-a type="text" title="Телефон" v-model="user.phone" full/>
      <input-a type="text" title="Адрес" v-model="user.adress" full/>
      <v-btn @click="createPartner" small flat :disabled="disabled">Сохранить</v-btn>
  </panel>
</template>

<script>
  import Panel from '@/components/panel'
  import InputA from '@/components/input'
  import UsersService from '@/services/UsersService'
export default {
    name: 'AddEmployeePage',
    components: {
      Panel,
      InputA
    },
    computed: {
      checkPass () {
        if (this.user.password === this.checkPassword) {
          return false
        } else {
          return true
        }
      },
      disabled () {
        if (this.user.name.length > 0 && this.user.phone.length > 0 && this.user.adress.length > 0 && this.user.email.length > 0 && this.user.password.length > 0) {
          return false
        } else {
          return true
        }
      }
    },
    data () {
      return {
        user: {
          name: '',
          phone: '',
          type: 'employee',
          adress: '',
          email: '',
          password: ''
        },
        checkPassword: '',
        error: ''
      }
    },
    beforeMount () {},
    mounted () {},
    methods: {
      async createPartner () {
        try {
          this.user.type = this.$auth.currentUser().type === 'juser' ? 'user' : this.$auth.currentUser().type === 'partner' ? 'employee' : 'user'
          const response = await UsersService.addEmployee(this.user, this.$auth.currentUser().id)
          alert('Пользователь ' + response.data.user.name + ' был добавлен!')
          this.$router.go(-1)
        } catch (error) {
          this.error = error.response.data.error
        }
      }
    }
}
</script>
