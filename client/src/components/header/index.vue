<style src="./style.css" scoped></style>
<template>
  <v-toolbar fixed flat class="header">
      <router-link to="/">
        <v-toolbar-title></v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <div class="meeting">
        Здравствуйте, <p>{{this.$auth.currentUser().name ? this.$auth.currentUser().name : this.$auth.currentUser().email.split('@')[0]}}</p>
        <span>онлайн</span>
      </div>
  </v-toolbar>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    logout () {
      this.$auth.logout()
      this.$router.push({
        name: 'Hello'
      })
      window.location.reload()
    }
  }
}
</script>
