<style src="./style.css" scoped></style>
<template>
  <v-toolbar fixed flat class="header">
      <router-link to="/">
        <v-toolbar-title ><em>Планер</em></v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      
      <v-toolbar-items>

      </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  data () {
    return {
      isUserLoggedIn: false
    }
  },
  methods: {
    logout () {
      this.$auth.logout()
      this.$router.push({
        name: 'Hello'
      })
      window.location.reload()
    }
  },
  beforeMount () {
    var token = this.$auth.getToken()
    if (token) {
      this.isUserLoggedIn = true
    } else {
      this.isUserLoggedIn = false
    }
  }
}
</script>
