// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import { sync } from 'vuex-router-sync'
import VModal from 'vue-js-modal'
import VueSocketio from 'vue-socket.io'
import 'vuetify/dist/vuetify.min.css'
import store from '@/store/store'
import Auth from '@/utils/Auth'

Vue.use(VueSocketio, 'http://127.0.0.1:8081/')
Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(VModal)
Vue.prototype.$auth = new Auth()
sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
