import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

const token = localStorage.getItem('accessToken');

if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
