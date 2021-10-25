import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Services from '@/services'


Vue.config.productionTip = false
const services = new Services()
declare module 'vue/types/vue' {
  // 3. Declare a ampliação para Vue
  interface Vue {
    $services: Services
  }
}

const plugin = {
  install() {
    Vue.prototype.$services = services;
  },
};
Vue.use(plugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
