<style src="./style.css" scoped></style>
<template>
  <div
    id="e3"
    style="margin-top: 65px;"
    class="grey lighten-3"
  >
    <v-toolbar color="grey lighten-4" flat>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title class="black--text">Организации</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container
      fluid
      grid-list-lg
    >
      <v-layout row wrap>
        <v-flex xs3 v-for="organization in organizations" :key="organization.id">
          <v-card color="green darken-3" class="white--text" hover>
            <v-card-title primary-title>
              <div class="headline">
                {{organization.name}}
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat dark @click="goToServices(organization.id)">Посмотреть доступные услуги</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import UsersService from '@/services/UsersService'
export default {
    name: 'ListOfPartnersPage',
    components: {},
    computed: {},
    data () {
      return {
        organizations: []
      }
    },
    async beforeMount () {
      const response = await UsersService.getUsers('partner')
      this.organizations = response.data.users
    },
    methods: {
      goToServices (_id) {
        this.$router.push({
          name: 'ListOfServicesPage',
          params: {
            id: _id
          }
        })
      }
    }
}
</script>
