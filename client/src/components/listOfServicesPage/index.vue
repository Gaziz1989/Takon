<style src="./style.css" scoped></style>
<template>
  <div
    id="e3"
    style="margin-top: 65px;"
    class="grey lighten-3"
  >
    <v-toolbar color="grey lighten-4" flat>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title class="black--text">Доступные услуги/товары</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container
      fluid
      grid-list-lg
    >
      <v-layout row wrap>
        <v-flex xs3 v-for="service in services" :key="service.id">
          <v-card color="blue darken-1" class="white--text" hover>
            <v-card-title primary-title>
              <div>Название: "{{service.name}}"</div>
              <div>Описание: {{service.description}}</div>
              <div>Цена: {{service.price}}</div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat dark @click="openBuyModal(service)">Купить</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <buy-service/>
  </div>
</template>

<script>
  import BuyService from '@/components/modals/buyServiceModal'
  import ServicesService from '@/services/ServicesService'
export default {
    name: 'listOfServicesPage',
    components: {
      BuyService
    },
    computed: {},
    data () {
      return {
        services: []
      }
    },
    async beforeMount () {
      const response = await ServicesService.getServsForCoupons(this.$route.params.id)
      this.services = response.data.services
    },
    methods: {
      openBuyModal (service) {
        this.$modal.show('BuyService', {service})
      }
    }
}
</script>
