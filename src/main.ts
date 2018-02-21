import Vue from 'vue';
import * as firebase from 'firebase';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';

Vue.config.productionTip = false;

firebase.initializeApp({
  apiKey: 'AIzaSyCcPZyHvW9VpEatYNEvqmZFYeLaY3eNie4',
  authDomain: 'escaperoom-786ea.firebaseapp.com',
  databaseURL: 'https://escaperoom-786ea.firebaseio.com',
  projectId: 'escaperoom-786ea',
  storageBucket: 'escaperoom-786ea.appspot.com',
  messagingSenderId: '453854901989',
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
