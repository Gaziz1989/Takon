<style src="./style.css" scoped></style>
<template>
  <modal name="UserEdit" width="50%" height="87%" @before-open="beforeOpen">
    <div class="moduleWraper">
      <h6>Профиль: {{user.id}}</h6>
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
      <input-a type="text" :placeholder="user.salary" title="Заработная плата" v-model="user.salary"/>
      <input-a type="text" :placeholder="user.trellotoken" title="Token Trello" v-model="user.trellotoken" v-if="getType(user)"/>
      <input-a type="text" :placeholder="user.trelloname" title="Имя пользователя Trello (username)" v-model="user.trelloname" v-if="getType(user)"/>
      <input-a type="text" :placeholder="user.trelloname" title="Имя пользователя Trello (username)" v-model="user.trelloname" v-else full/>
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
          lastname: '',
          gender: '',
          phone: '',
          image: '',
          birthday: '',
          entry: '',
          exit: '',
          role: '',
          salary: '',
          trellotoken: '',
          trelloname: '',
          email: '',
          id: '',
          password: ''
        },
        checkPassword: '',
        checkPassword2: '',
        editedModule: {
          name: '',
          lastname: '',
          gender: '',
          phone: '',
          image: '',
          birthday: '',
          entry: '',
          exit: '',
          role: '',
          salary: '',
          trellotoken: '',
          trelloname: '',
          email: '',
          password: ''
        }
      }
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
    methods: {
      async beforeOpen (event) {
        const response = await UsersService.getUser(event.params.id)
        this.user = response.data.user
      },
      async editUser () {
        try {
          const response = await UsersService.editUser(this.user, this.checkPassword)
          this.user = response.data.user
          alert(response.data.user.name + ' ' + response.data.user.lastname + ' был успешно изменен!')
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
