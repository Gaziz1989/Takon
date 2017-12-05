<style src="./style.css" scoped></style>
<template>
  <panel>
      <h6>Добавление проекта</h6>
      <div class='error' v-html="error"/>
      <input-a full v-model="project.name" title="Название" type="text"/>
      <input-a full v-model="project.starttime" title="Дата начала" type="date"/>
      <div class="fullOf">
        <p>Модули</p>
      </div>


<!--       <v-btn @click="addProject" small flat>Сохранить</v-btn>
 -->      <v-btn @click="back" small flat>Назад</v-btn>
  </panel>
</template>

<script>
  import Panel from '@/components/panel'
  import InputA from '@/components/input'
  // import ProjectsService from '@/services/ProjectsService'
export default {
    name: 'AddingProjectPage',
    components: {
      Panel,
      InputA
    },
    computed: {},
    data () {
      return {
        project: {
          name: '',
          employees: [],
          starttime: new Date()
        }
      }
    },
    beforeMount () {
    },
    methods: {
      back () {
        this.$router.go(-1)
      },
      async addProject () {
      }
    }
}
</script>
