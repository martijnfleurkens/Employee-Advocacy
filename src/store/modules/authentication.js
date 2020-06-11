// import axios from 'axios';

const state = {
  authenticated: false
};

const getters = { authenticated: (state) => state.authenticated };

const actions = {};

const mutations = {
  setAuthentication(state, status) {
    state.authenticated = status;
  }
};

export default{
  state, getters, actions, mutations
}
