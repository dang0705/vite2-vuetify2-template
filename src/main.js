import Vue from 'vue';
import './style.css';
import App from './App.vue';
import vuetify from './plugins/vuetify.js';
import pinia from '@store';

new Vue({
  vuetify,
  pinia,
  render: (h) => h(App)
}).$mount('#app');
