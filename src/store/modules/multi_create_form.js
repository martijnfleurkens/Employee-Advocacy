// import axios from 'axios';

const state = {
  formDataObj: {}
};

const getters = { formDataObj: (state) => state.formDataObj };

const actions = {};

const mutations = {
  ADD_FORMDATA: (state, formData) =>{
    state.formDataObj = formData;
  }
};

export default{
  state, getters, actions, mutations
}
