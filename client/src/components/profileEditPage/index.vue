<style src="./style.css" scoped></style>
<template>
  <panel>
      <h6>Профиль: {{user.name ? user.name : this.$auth.currentUser().email.split('@')[0]}}</h6>
      <div class='error' v-html="error"/>
      <input-a type="text" :placeholder="user.name" title="Имя" v-model="user.name" full/>
      <input-a type="text" :placeholder="user.email" title="Email" v-model="user.email" full/>
      <input-a type="text" :placeholder="user.phone" title="Телефон" v-model="user.phone" full/>
      <input-a type="text" :placeholder="user.adress" title="Адрес" v-model="user.adress" full/>
      <div class="fullOf">
        <p class="greyFont">Иная информация</p>
        <textarea class="fullOf" placeholder="..." v-model="user.bio"></textarea>
      </div>
      <div class='error' v-if="checkPass">Пароли не совпадают</div>
      <input-a type="password" placeholder="Пароль" title="Пароль" v-model="checkPassword" full/>
      <input-a type="password" placeholder="Пароль" title="Подтвердите пароль" v-model="checkPassword2" full/>
      <v-btn @click="editUser" small flat>Сохранить</v-btn>
      <v-btn @click="back" small flat>Назад</v-btn>
  </panel>
</template>

<script>
  import Panel from '@/components/panel'
  import InputA from '@/components/input'
  import UsersService from '@/services/UsersService'
  import eventBus from '@/eventBus'
export default {
    name: 'ProfileEditPage',
    components: {
      Panel,
      InputA
    },
    computed: {
      checkPass () {
        if (this.checkPassword2 === this.checkPassword) {
          return false
        } else {
          return true
        }
      },
      getType () {
        if (this.$auth.currentUser().type === 'admin') {
          return true
        } else {
          return false
        }
      }
    },
    data () {
      return {
        user: {
          name: '',
          lastname: '',
          phone: '',
          email: '',
          adress: '',
          id: '',
          password: '',
          bio: ''
        },
        checkPassword: '',
        checkPassword2: '',
        error: ''
      }
    },
    beforeMount () {
      this.getUser()
    },
    mounted () {
      eventBus.$on('roleDegree', _degree => {
        if (_degree.title === 'Front-end') {
          this.user.front = _degree.degree
        } else if (_degree.title === 'Back-end') {
          this.user.back = _degree.degree
        } else if (_degree.title === 'IOS') {
          this.user.ios = _degree.degree
        } else if (_degree.title === 'Android') {
          this.user.android = _degree.degree
        }
      })
    },
    methods: {
      async editUser () {
        try {
          const response = await UsersService.editUser(this.user, this.checkPassword)
          this.user = response.data.user
          alert(response.data.user.name + ' был успешно изменен!')
          this.$router.go(-1)
        } catch (error) {
          this.error = error.response.data.error
        }
      },
      async getUser () {
        try {
          const { id } = this.$auth.currentUser()
          const response = await UsersService.getUser(id)
          this.user = response.data.user
        } catch (error) {
          this.error = error.response.data.error
        }
      },
      back () {
        this.$router.go(-1)
      }
    }
}
</script>
