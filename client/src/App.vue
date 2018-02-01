<template>
  <div id="app">
    <v-app>
      <page-header v-if="isUserLoggedIn"/>
      <aside-nav/>
      <main>
        <v-container fluid>
          <router-view/>
        </v-container>
      </main>
    </v-app>
  </div>
</template>

<script>
import PageHeader from '@/components/header'
import AsideNav from '@/components/aside'
export default {
  name: 'app',
  components: {
    PageHeader,
    AsideNav
  },
  data () {
    return {
      isUserLoggedIn: false
    }
  },
  beforeMount () {
    var token = this.$auth.getToken()
    if (token) {
      this.isUserLoggedIn = true
    } else {
      this.isUserLoggedIn = false
    }
  },
  methods: {}
}
</script>

<style>
a {
  text-decoration: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #fff;
}
.application--light a {
  color: #3f51b5;
}
.container {
  margin-left: 5%!important;
}
.fa {
  font-size: 1.5em;
  color: grey;
}
.toolbar__content {
  height: 1%!important;
}
</style>
