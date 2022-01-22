import App from './App'
import api from './common/api'
import store from './store'
// console.log(store);

Vue.prototype.$api = api

// #ifndef VUE3
console.log('不是VUE3');
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	store,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
console.log('是VUE3');
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif