import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAxios from 'vue-axios'
import Axios from 'axios'
import Calendar from 'v-calendar'


Vue.config.productionTip = false
Vue.use(VueAxios , Axios)
Vue.use(Calendar)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
