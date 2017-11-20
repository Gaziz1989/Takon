<style src="./style.css" scoped></style>
<template>
  <panel>
      <h6>Профиль: {{user.id}}</h6>
      <div class='error' v-html="error"/>
      <input-a type="text" :placeholder="user.name" title="Имя" v-model="user.name"/>
      <input-a type="text" :placeholder="user.lastname" title="Фамилия" v-model="user.lastname"/>
      <input-a type="text" :placeholder="user.email" title="Email" v-model="user.email"/>
      <input-a type="text" :placeholder="user.phone" title="Телефон" v-model="user.phone"/>
      <div class="halfOf">
        <p class="greyFont">Пол</p>
        <select v-model="user.gender">
          <option value=""></option>
          <option value="Мужчина">Мужчина</option>
          <option value="Женщина">Женщина</option>
          <option value="Иное">Иное</option>
        </select>
      </div>
      <input-a type="date" :placeholder="user.birthday" title="День рождения" v-model="user.birthday"/>
      <input-a type="date" :placeholder="user.entry" title="Дата начала работы" v-model="user.entry"/>
      <input-a type="date" :placeholder="user.exit" title="Дата увольнения" v-model="user.exit"/>
      <div class="halfOf">
        <p class="greyFont">Роль</p>
        <select v-model="user.role">
          <option value=""></option>
          <option value="Программист">Программист</option>
          <option value="Дизайнер">Дизайнер</option>
          <option value="Маркетолог">Маркетолог</option>
          <option value="Копирайтер">Копирайтер</option>
          <option value="Фатима">Фатима</option>
        </select>
      </div>
      <input-a type="text" :placeholder="user.trello" title="Trello" v-model="user.trello"/>
      <div class='error' v-if="checkPass">Пароли не совпадают</div>
      <input-a type="password" placeholder="Пароль" title="Пароль" v-model="checkPassword"/>
      <input-a type="password" placeholder="Пароль" title="Подтвердите пароль" v-model="checkPassword2"/>
      <v-btn @click="editUser" small class="mainbtn">Сохранить</v-btn>
      <v-btn @click="back" small class="mainbtn">Назад</v-btn>
  </panel>
</template>

<script>
  import Panel from '@/components/panel'
  import InputA from '@/components/input'
  import UsersService from '@/services/UsersService'
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
      }
    },
    data () {
      return {
        user: {
          name: '',
          lastname: '',
          gender: '',
          phone: '',
          image: '',
          birthday: '',
          entry: '',
          exit: '',
          role: '',
          trello: '',
          email: '',
          id: '',
          password: ''
        },
        checkPassword: '',
        checkPassword2: '',
        error: ''
      }
    },
    beforeMount () {
      this.getUser()
    },
    methods: {
      async editUser () {
        try {
          const response = await UsersService.editUser(this.user)
          this.user = response.data.user
          alert(response.data.user.name + ' ' + response.data.user.lastname + ' был успешно изменен!')
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
