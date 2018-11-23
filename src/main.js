import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './stylus/main.styl'

axios.defaults.baseURL = process.env.VUE_APP_ROOT_API;

Vue.config.productionTip = false

Vue.filter('faDate', value => {
  if (!value) return '-'
  return new Date(value).toLocaleString('fa', {
    year: '2-digit',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
