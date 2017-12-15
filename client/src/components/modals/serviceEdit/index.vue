<style src="./style.css" scoped></style>
<template>
  <modal name="ServiceEdit" width="50%" height="65%" @before-open="beforeOpen">
    <div class="moduleWraper">
      <h6>Услуга/Товар: {{ service.id }}</h6>
      <input-a type="text" :placeholder="service.name" title="Имя" v-model="service.name" full/>
      <div class="fullOf">
        <p class="greyFont">Иная информация</p>
        <textarea class="fullOf" :placeholder="service.description" v-model="service.description"></textarea>
      </div>
      <input-a type="number" :placeholder="'' + service.price" title="Цена за единицу" v-model="'' + service.price" full/>
      <div class="fullOf">
        <p class="greyFont">Статус</p>
        <select v-model="service.status">
          <option value=""></option>
          <option value="active">Активный</option>
          <option value="inactive">Не активный</option>
        </select>
      </div>
      <v-btn @click="editService" small flat>Сохранить</v-btn>
      <v-btn @click="archiveService" small flat>Удалить</v-btn>
    </div>
  </modal>
</template>

<script>
  import ServicesService from '@/services/ServicesService'
  import InputA from '@/components/input'
export default {
    components: {
      InputA
    },
    data () {
      return {
        service: {
          name: '',
          description: '',
          price: '',
          status: '',
          id: ''
        }
      }
    },
    mounted () {},
    computed: {},
    methods: {
      async beforeOpen (event) {
        const response = await ServicesService.getService(event.params.id)
        this.service = response.data.service
      },
      async editService () {
        try {
          const response = await ServicesService.editService(this.service)
          this.service = response.data.service
          alert(response.data.service.name + ' был успешно изменен!')
          this.$modal.hide('ServiceEdit')
          window.location.reload()
        } catch (error) {
          alert(error.response.data.error)
          this.$modal.hide('ServiceEdit')
        }
      },
      async archiveService () {
        try {
          const response = await ServicesService.archiveService(this.service.id)
          alert('Товар/Услуга ' + response.data.service.name + ' успешно удален!')
          this.$modal.hide('ServiceEdit')
          window.location.reload()
        } catch (error) {
          alert(error.response.data.error)
          this.$modal.hide('ServiceEdit')
        }
      }
    }
}
</script>
