<style src="./style.css" scoped></style>
<template>
  <modal name="ModuleModal" width="50%" height="65%">
    <div class="moduleWraper">
      <h6> Добавить модуль </h6>
      <div class="name">
        <p>Название: </p>
        <input type="text" v-model="module.name" placeholder="Название"/>
      </div>
      <div class="name">
        <p>Тип:</p>
        <select v-model="module.type">
          <option value=""></option>
          <option value="backend">Backend</option>
          <option value="frontend">Frontend</option>
          <option value="android">Android</option>
          <option value="ios">IOs</option>
        </select>
      </div>
      <div class="summ">
        <p>Стоимость:</p>
          <div class="byposition">
            <p>Джуниор:</p>
            <input type="number" placeholder="Стоимость" v-model="module.junSum">
          </div>
          <div class="byposition">
            <p>Мидл:</p>
            <input type="number" placeholder="Стоимость" v-model="module.midSum">
          </div>
          <div class="byposition">
            <p>Синьор:</p>
            <input type="number" placeholder="Стоимость" v-model="module.senSum">
          </div>
      </div>
      <div class="summ">
        <p>Время:</p>
          <div class="byposition">
            <p>Джуниор:</p>
            <input type="number" placeholder="Время" v-model="module.jundeadline">
          </div>
          <div class="byposition">
            <p>Мидл:</p>
            <input type="number" placeholder="Время" v-model="module.middeadline">
          </div>
          <div class="byposition">
            <p>Синьор:</p>
            <input type="number" placeholder="Время" v-model="module.sendeadline">
          </div>
      </div>
      <v-btn @click="saveModule" small flat>Сохранить</v-btn>
    </div>

  </modal>
</template>

<script>
  import ModuleService from '@/services/ModuleService'
export default {
    data () {
      return {
        module: {
          name: '',
          junSum: '',
          midSum: '',
          senSum: '',
          jundeadline: '',
          middeadline: '',
          sendeadline: '',
          type: ''
        }
      }
    },
    methods: {
      async saveModule () {
        try {
          const response = await ModuleService.addModule(this.module)
          alert('Модуль ' + response.data.module.name + ' успешно сохранен!')
          this.$modal.hide('ModuleModal')
          window.location.reload()
        } catch (error) {
          alert(error.response.data.error)
          this.$modal.hide('ModuleModal')
        }
      }
    }
}
</script>
