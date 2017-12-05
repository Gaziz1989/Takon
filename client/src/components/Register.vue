<template>
  <v-layout column> 
    <v-flex xs6 offset-xs3>
      <panel title="Регистрация">
        <div class="pl-4 pr-4 pt-2 pb-2">
          <form 
          name="firstApp"
          autocomplete="off">
            <v-text-field
              name="email"
              label="E-mail"
              v-model="email"
            ></v-text-field>
            <br/>
            <v-text-field
              type="password"
              name="password"
              label="Пароль"
              v-model="password"
              autocomplete="new-password"
            ></v-text-field>
            <br/>
            <div class='error' v-html="error"/>
            <v-btn
              @click="register()"
            >Зарегистрироваться</v-btn>
          </form>
        </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import Panel from '@/components/panel'
export default {
  components: {
    Panel
  },
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        if (response.data.user) {
          alert('User was registered with id: ' + response.data.user.id)
          this.$router.push({name: 'login'})
        }
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
  .error {
    color: black;
  }
</style>
