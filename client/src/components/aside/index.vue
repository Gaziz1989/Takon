<style src="./style.css" scoped></style>
<template>
  <ul class="drop_vert_menu"> 
        <li v-if="isUserLoggedIn">
          <router-link to="user">
            <span> <i class="fa fa-user" aria-hidden="true"></i> </span>
          </router-link>
        </li>

        <li v-if="isUserLoggedIn">
          <router-link to="projects">
            <span><i class="fa fa-tasks" aria-hidden="true"></i></span>
          </router-link>
          <ul> 
            <li v-if="isUserLoggedIn">
              <router-link to="projects">
                <span><i class="fa fa-user" aria-hidden="true">Проекты</i></span>
              </router-link>
            </li>

            <li v-if="isUserLoggedIn">
              <router-link to="modules">
                <span><i class="fa fa-user" aria-hidden="true">Модули</i></span>
              </router-link>
            </li>
            
            <li v-if="isUserLoggedIn">
              <router-link to="employees">
                <span><i class="fa fa-user" aria-hidden="true">Сотрудники</i></span>
              </router-link>
            </li>
          </ul>
        </li>

        <li v-if="!isUserLoggedIn">
          <router-link to="register">
            <span><i class="fa fa-user-plus" aria-hidden="true"></i></span>
          </router-link>
        </li>

        <li v-if="!isUserLoggedIn">
          <router-link to="login">
            <span><i class="fa fa-sign-in" aria-hidden="true"></i></span>
          </router-link>
        </li>
        
          <button class="buttons"
            v-if="isUserLoggedIn"
            @click="logout"
          >
            <i class="fa fa-power-off" aria-hidden="true"></i>
          </button>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      isUserLoggedIn: false,
      open: false
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
