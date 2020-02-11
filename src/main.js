import Vue from 'vue'
import App from './App.vue'


import vueResource from 'vue-resource';
import Vmodal from 'vue-js-modal';

Vue.use(vueResource);
Vue.use(Vmodal, { dialog: true });



new Vue({
  el: '#app',
  render: h => h(App)
})
