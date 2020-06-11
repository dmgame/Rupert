import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import workbooks from './modules/workbooks';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    workbooks,
  },
});
