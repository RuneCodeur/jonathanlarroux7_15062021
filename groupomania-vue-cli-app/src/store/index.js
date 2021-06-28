import { createStore } from 'vuex'

export default createStore({
  state: {
    token:'',
    pseudoData:'',
    id:'',
    mailData:'',
    status:'',
  },
  mutations: {
    NEW_USER(state, response){
      state.token = response.token;
      state.pseudoData = response.pseudo;
      state.id = response.id;
      state.mailData = response.mail;
      state.status = response.status;
    }
  },
  actions: {
  },
  modules: {
  }
})
