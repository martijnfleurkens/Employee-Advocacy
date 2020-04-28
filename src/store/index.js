import Vuex from 'vuex';
import Vue from 'vue';
import multi_create_form from './modules/multi_create_form';

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules:{
    multi_create_form
  }
})
