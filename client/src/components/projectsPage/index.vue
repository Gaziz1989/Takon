<style src="./style.css" scoped></style>
<template>
  <div
    id="e3"
    style="margin-top: 65px;"
    class="grey lighten-3"
  >
    <v-toolbar color="grey lighten-4" flat>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title class="black--text">Проекты</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat fab @click="trelloSync"><i class="fa fa-trello" aria-hidden="true"></i></v-btn>
      <v-btn flat fab @click="addProject"><i class="fa fa-plus-circle" aria-hidden="true"></i></v-btn>
    </v-toolbar>
    <v-container
      fluid
      grid-list-lg
    >
      <v-layout row wrap>
        <v-flex xs3>
          <v-card color="blue-grey darken-2" class="white--text">
            <v-card-title primary-title>
              <div class="headline">Unlimited music now</div>
              <div>Listen to your favorite artists and albums whenever and wherever, online and offline.</div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat dark>Listen now</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex xs3>
          <v-card color="blue-grey darken-2" class="white--text">
            <v-card-title primary-title>
              <div class="headline">Unlimited music now</div>
              <div>Listen to your favorite artists and albums whenever and wherever, online and offline.</div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat dark>Listen now</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex xs3>
          <v-card color="blue-grey darken-2" class="white--text">
            <v-card-title primary-title>
              <div class="headline">Unlimited music now</div>
              <div>Listen to your favorite artists and albums whenever and wherever, online and offline.</div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat dark>Listen now</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex xs3>
          <v-card color="blue-grey darken-2" class="white--text">
            <v-card-title primary-title>
              <div class="headline">Unlimited music now</div>
              <div>Listen to your favorite artists and albums whenever and wherever, online and offline.</div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat dark>Listen now</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import Panel from '@/components/panel'
  import ProjectsService from '@/services/ProjectsService'
export default {
    name: 'ProjectsPage',
    components: {
      Panel
    },
    computed: {},
    data () {
      return {
        projects: []
      }
    },
    beforeMount () {},
    methods: {
      addProject () {
        this.$router.push({
          name: 'AddingProjectPage'
        })
      },
      async trelloSync () {
        try {
          const response = await ProjectsService.trelloSync()
          alert(response.data.message)
        } catch (error) {
          alert(error.response.data.error)
        }
      },
      async getProjects () {
        try {
          const response = await ProjectsService.getProjects()
          this.projects = response.data.projects
        } catch (error) {
          alert(error.response.data.error)
        }
      }
    }
}
</script>
