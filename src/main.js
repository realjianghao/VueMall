import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import Toast from "@/components/common/toast";
import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";

Vue.use(Toast)
Vue.use(VueLazyload,{
  preLoad: 1,
  loading: require('./assets/img/common/placeholder.jpg')
})

FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
