<style src="./style.css" scoped></style>
<template>
  <modal name="StaticEdit" width="50%" height="30%" @before-open="beforeOpen">
    <div class="moduleWraper">
      <h6>Редактирование статических расходов</h6>
      <div class="name">
        <p>Название: </p>
        <input type="text" v-model="editedExpence.name" :placeholder="expence.name"/>
      </div>
      <div class="name">
        <p>Сумма: </p>
        <input type="number" v-model="editedExpence.amount" :placeholder="expence.amount"/>
      </div>
      <v-btn @click="editExpence" small flat>Сохранить</v-btn>
      <v-btn @click="archiveExpence" small flat>Удалить</v-btn>
    </div>
  </modal>
</template>

<script>
  import ExpenceService from '@/services/ExpenceService'
export default {
    components: {},
    computed: {},
    data () {
      return {
        expence: {
          id: '',
          name: '',
          amount: ''
        },
        editedExpence: {
          name: '',
          amount: ''
        }
      }
    },
    beforeMount () {},
    methods: {
      async beforeOpen (event) {
        const response = await ExpenceService.getExpence(event.params.id)
        this.expence = response.data.expence
      },
      async editExpence () {
        try {
          const response = await ExpenceService.editExpence(this.editedExpence, this.expence.id)
          alert('Статический расход ' + response.data.expence.name + ' успешно сохранен!')
          this.$modal.hide('StaticEdit')
          window.location.reload()
        } catch (error) {
          alert(error.response.data.error)
          this.$modal.hide('StaticEdit')
        }
      },
      async archiveExpence () {
        try {
          const response = await ExpenceService.archiveExpence(this.expence.id)
          alert('Статический расход ' + response.data.expence.name + ' успешно удален!')
          this.$modal.hide('StaticEdit')
          window.location.reload()
        } catch (error) {

        }
      }
    }
}
</script>
