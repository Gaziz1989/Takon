<template>
  <v-layout column> 
    <v-flex xs6 offset-xs3>
      <panel title="Войти">
        <div >
          <form 
            name="firstApp">
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
            ></v-text-field>
            <br/>
            <div class='error' v-html="error"/>
            <v-btn
              @click="login()"
            >Войти</v-btn>
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
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$auth.saveToken(response.data.token)
        this.$router.push({
          name: 'Main'
        })
        window.location.reload()
      } catch (error) {
        console.log(error)
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
