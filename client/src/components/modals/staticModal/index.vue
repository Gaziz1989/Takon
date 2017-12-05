<style src="./style.css" scoped></style>
<template>
  <modal name="StaticModal" width="50%" height="30%">
    <div class="moduleWraper">
      <h6>Добавление статических расходов</h6>
      <div class="name">
        <p>Название: </p>
        <input type="text" v-model="expence.name" placeholder="Название"/>
      </div>
      <div class="name">
        <p>Сумма: </p>
        <input type="number" v-model="expence.amount" placeholder="Сумма"/>
      </div>
      <v-btn @click="saveExpence" small flat>Сохранить</v-btn>
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
          name: '',
          amount: ''
        }
      }
    },
    beforeMount () {},
    methods: {
      async saveExpence () {
        try {
          const response = await ExpenceService.addExpences(this.expence)
          alert('Статический расход ' + response.data.expence.name + ' успешно сохранен!')
          this.$modal.hide('StaticModal')
          window.location.reload()
        } catch (error) {

        }
      }
    }
}
</script>
