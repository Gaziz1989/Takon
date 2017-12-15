<style src="./style.css" scoped></style>
<template>
  <panel>
      <h6>Добавление товара/услуги</h6>
      <p>Добавьте товар/услугу заполнив следующие поля.</p>
      <div class='error' v-html="error"/>
      <input-a type="text" title="Название" v-model="service.name" full/>
      <input-a type="text" title="Цена за единицу" v-model="service.price" full/>
      <div class="fullOf">
        <p class="greyFont">Иная информация</p>
        <textarea class="fullOf" placeholder="..." v-model="service.description"></textarea>
      </div>
      <v-btn @click="createService" small flat>Сохранить</v-btn>
  </panel>
</template>

<script>
  import Panel from '@/components/panel'
  import InputA from '@/components/input'
  import ServicesService from '@/services/ServicesService'
export default {
    name: 'AddServicePage',
    components: {
      Panel,
      InputA
    },
    computed: {},
    data () {
      return {
        service: {
          name: '',
          description: '',
          price: ''
        },
        error: ''
      }
    },
    beforeMount () {},
    mounted () {},
    methods: {
      async createService () {
        try {
          const response = await ServicesService.addService(this.service, this.$auth.currentUser().id)
          alert('Услуга/товар ' + response.data.service.name + ' был добавлен!')
          this.$router.go(-1)
        } catch (error) {
          this.error = error.response.data.error
        }
      }
    }
}
</script>
