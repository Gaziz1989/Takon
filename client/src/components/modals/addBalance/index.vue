<style src="./style.css" scoped></style>
<template>
  <modal name="AddBalance" width="40%" height="25%" @before-open="beforeOpen">
    <div class="moduleWraper">
      <h6>Добавление баланса</h6>
      <input-a type="text" placeholder="0" title="Баланс" v-model="user.balance" full/>
      <v-btn @click="addBalance" small flat>Сохранить</v-btn>
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
          balance: '',
          id: ''
        }
      }
    },
    methods: {
      async beforeOpen (event) {
        const response = await UsersService.getUser(event.params.id)
        this.user = response.data.user
      },
      async addBalance () {
        try {
          const response = await UsersService.addBalance(this.user.id, this.user.balance)
          alert(response.data.message)
          this.$modal.hide('AddBalance')
          window.location.reload()
        } catch (error) {
          alert(error.response.data.error)
          this.$modal.hide('AddBalance')
        }
      }
    }
}
</script>
