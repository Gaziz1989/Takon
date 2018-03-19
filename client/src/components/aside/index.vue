<style src="./style.css" scoped></style>
<template>
  <div>
    <ul class="drop_vert_menu"> 
      <li v-if="isUserLoggedIn">
        <router-link to="user">
          <span><i class="fa fa-user" aria-hidden="true"></i> </span>
        </router-link>
      </li>

      <li v-if="isUserLoggedIn && isUserAdmin">
        <router-link to="partners">
          <span><i class="fa fa-user-secret" aria-hidden="true"></i></span>
        </router-link>
        <ul>
          <li v-if="isUserLoggedIn && isUserAdmin">
            <router-link to="partners">
              <span><i class="fa fa-user-secret" aria-hidden="true"> Список партнеров</i></span>
            </router-link>
          </li>
          <li v-if="isUserLoggedIn && isUserAdmin">
            <router-link to="addpartner">
              <span><i class="fa fa-user-secret" aria-hidden="true"> Добавить нового партнера</i></span>
            </router-link>
          </li>
        </ul>
      </li>

      <li v-if="isUserLoggedIn && isUserAdmin">
        <router-link to="jusers">
          <span><i class="fa fa-id-card" aria-hidden="true"></i></span>
        </router-link>
        <ul>
          <li v-if="isUserLoggedIn && isUserAdmin">
            <router-link to="jusers">
              <span><i class="fa fa-id-card" aria-hidden="true"> Список юридических пользователей</i></span>
            </router-link>
          </li>
          <li v-if="isUserLoggedIn && isUserAdmin">
            <router-link to="addjuser">
              <span><i class="fa fa-id-card" aria-hidden="true"> Добавить нового юридического пользователя</i></span>
            </router-link>
          </li>
        </ul>
      </li>

      <li v-if="isUserLoggedIn && isUserAdmin">
        <router-link to="users">
          <span><i class="fa fa-users" aria-hidden="true"></i></span>
        </router-link>
        <ul>
          <li v-if="isUserLoggedIn && isUserAdmin">
            <router-link to="users">
              <span><i class="fa fa-users" aria-hidden="true"> Список всех пользователей</i></span>
            </router-link>
          </li>
        </ul>
      </li>

      <li v-if="isUserLoggedIn && isUserPartner">
        <router-link to="employees">
          <span><i class="fa fa-user-circle-o" aria-hidden="true"></i></span>
        </router-link>
        <ul>
          <li v-if="isUserLoggedIn && isUserPartner">
            <router-link to="employees">
              <span><i class="fa fa-user-circle-o" aria-hidden="true"> Список всех сотрудников</i></span>
            </router-link>
          </li>
          <li v-if="isUserLoggedIn && isUserPartner">
            <router-link to="addemployees">
              <span><i class="fa fa-user-circle-o" aria-hidden="true"> Добавить нового сотрудника</i></span>
            </router-link>
          </li>
        </ul>
      </li>

      <li v-if="isUserLoggedIn && isUserPartner">
        <router-link to="services">
          <span><i class="fa fa-superpowers" aria-hidden="true"></i></span>
        </router-link>
        <ul>
          <li v-if="isUserLoggedIn && isUserPartner">
            <router-link to="services">
              <span><i class="fa fa-superpowers" aria-hidden="true"> Список всех услуг/товаров</i></span>
            </router-link>
          </li>
          <li v-if="isUserLoggedIn && isUserPartner">
            <router-link to="addservices">
              <span><i class="fa fa-superpowers" aria-hidden="true"> Добавить услугу/товар</i></span>
            </router-link>
          </li>
        </ul>
      </li>

      <li v-if="isUserLoggedIn && isUserJUser">
        <router-link to="services">
          <span><i class="fa fa-tags" aria-hidden="true"></i></span>
        </router-link>
        <ul>
          <li v-if="isUserLoggedIn && isUserJUser">
            <router-link to="services">
              <span><i class="fa fa-tag" aria-hidden="true"> Список всех купленных услуг/товаров</i></span>
            </router-link>
          </li>
          <li v-if="isUserLoggedIn && isUserJUser">
            <router-link to="partnerslist">
              <span><i class="fa fa-tag" aria-hidden="true"> Купить услугу/товар</i></span>
            </router-link>
          </li>
        </ul>
      </li>

      <li v-if="isUserLoggedIn && isUserAdmin || isUserLoggedIn && isUserPartner || isUserLoggedIn && isUserJUser">
        <router-link to="tablespage">
          <span><i class="fa fa-table" aria-hidden="true"></i></span>
        </router-link>
      </li>

      <li v-if="!isUserLoggedIn">
        <router-link to="login">
          <span><i class="fa fa-sign-in" aria-hidden="true"></i></span>
        </router-link>
      </li>

      <li v-if="isUserLoggedIn" class="buttons">
        <button @click="logout">
          <i class="fa fa-power-off" aria-hidden="true"></i>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isUserLoggedIn: false,
      isUserAdmin: false,
      isUserPartner: false,
      isUserJUser: false
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
      if (this.$auth.currentUser().type === 'admin') {
        this.isUserAdmin = true
      } else if (this.$auth.currentUser().type === 'partner') {
        this.isUserPartner = true
      } else if (this.$auth.currentUser().type === 'juser') {
        this.isUserJUser = true
      }
      this.isUserLoggedIn = true
    } else {
      this.isUserLoggedIn = false
    }
  }
}
</script>
