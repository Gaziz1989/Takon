<style src="./style.css" scoped></style>
<template>
  <div class="modules-wraper">
    <div class="modules">
      <v-toolbar dense flat>
        <v-toolbar-title>Модули</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat>Link One</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </div>
    <div class="modules">
      <v-toolbar dense flat>
        <v-toolbar-title>Статические расходы</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat>Link One</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModulesPage',
  components: {},
  computed: {},
  data () {
    return {}
  },
  beforeMount () {},
  methods: {}
}
</script>
