import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    accessToken: ''
  },
  mutations: {
    SET_IS_LOGGED_IN(state, status) {
      state.isLoggedIn = status;
    },
    SET_ACCESS_TOKEN(state, token) {
      state.accessToken = token;
    }
  },
  actions: {
    login(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_ROOT_API}/token/`, payload)
          .then(res => {
            if (res.status === 200) {
              context.commit('SET_ACCESS_TOKEN', res.data.access);
              context.commit('SET_IS_LOGGED_IN', true);
              localStorage.setItem('access', res.data.access);
              resolve();
            }
          })
          .catch(error => {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              reject(error.response.data)
              // console.log(error.response.data);
              // console.log(error.response.status);
              // console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              // console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              // console.log('Error', error.message);
            }
          });
      })
    }
  }
})
