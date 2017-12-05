<style src="./style.css" scoped></style>
<template>
  <modal name="ModuleEdit" width="50%" height="65%" @before-open="beforeOpen">
    <div class="moduleWraper">
      <h6> Редактировать модуль </h6>
      <div class="name">
        <p>Название: </p>
        <input type="text" v-model="editedModule.name" :placeholder="module.name"/>
      </div>
      <div class="name">
        <p>Тип:</p>
        <select v-model="editedModule.type">
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
            <input type="number" :placeholder="module.junSum" v-model="editedModule.junSum">
          </div>
          <div class="byposition">
            <p>Мидл:</p>
            <input type="number" :placeholder="module.midSum" v-model="editedModule.midSum">
          </div>
          <div class="byposition">
            <p>Синьор:</p>
            <input type="number" :placeholder="module.senSum" v-model="editedModule.senSum">
          </div>
      </div>
      <div class="summ">
        <p>Время:</p>
          <div class="byposition">
            <p>Джуниор:</p>
            <input type="number" :placeholder="module.jundeadline" v-model="editedModule.jundeadline">
          </div>
          <div class="byposition">
            <p>Мидл:</p>
            <input type="number" :placeholder="module.middeadline" v-model="editedModule.middeadline">
          </div>
          <div class="byposition">
            <p>Синьор:</p>
            <input type="number" :placeholder="module.sendeadline" v-model="editedModule.sendeadline">
          </div>
      </div>
      <v-btn @click="editModule" small flat>Сохранить</v-btn>
      <v-btn @click="archiveModule" small flat>Удалить</v-btn>
    </div>

  </modal>
</template>

<script>
  import ModuleService from '@/services/ModuleService'
export default {
    data () {
      return {
        module: {
          id: '',
          name: '',
          junSum: '',
          midSum: '',
          senSum: '',
          jundeadline: '',
          middeadline: '',
          sendeadline: '',
          type: ''
        },
        editedModule: {
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
      async beforeOpen (event) {
        const response = await ModuleService.getModule(event.params.id)
        this.module = response.data.module
      },
      async editModule () {
        try {
          const response = await ModuleService.editModule(this.editedModule, this.module.id)
          alert('Модуль ' + response.data.module.name + ' успешно сохранен!')
          this.$modal.hide('ModuleEdit')
          window.location.reload()
        } catch (error) {
          alert(error.response.data.error)
          this.$modal.hide('ModuleEdit')
        }
      },
      async archiveModule () {
        try {
          const response = await ModuleService.archiveModule(this.module.id)
          alert('Модуль ' + response.data.module.name + ' успешно удален!')
          this.$modal.hide('ModuleEdit')
          window.location.reload()
        } catch (error) {

        }
      }
    }
}
</script>
