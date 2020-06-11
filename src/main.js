import Vue from 'vue';
import App from './App.vue';
import store from './store';
import date from './filters/date';
import passedTime from './filters/passedTime';

Vue.filter('date', date);
Vue.filter('passedTime', passedTime);

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
