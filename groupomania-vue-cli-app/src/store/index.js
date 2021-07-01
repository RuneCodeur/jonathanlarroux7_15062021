import { createStore } from 'vuex'

export default createStore({
  state: {
    tokenStore:'',
    pseudoStore:'',
    idStore:'',
    mailStore:'',
    statusStore:'',
    idCanalStore:'',
    nameCanalStore:'',
    idSujetStore:'',
    nameSujetStore:'',
  },
  mutations: {
    NEW_USER(state, response){
      state.tokenStore = response.token;
      state.pseudoStore = response.pseudo;
      state.idStore = response.id;
      state.mailStore = response.mail;
      state.statusStore = response.status;
    },
    CHANGE_PSEUDO(state, response){
      state.pseudoStore = response;
    },
    DISCONNECT_USER(state){
      state.tokenStore = '';
      state.pseudoStore = '';
      state.idStore = '';
      state.mailStore = '';
      state.statusStore = '';
      state.idCanalStore = '';
      state.idSujetStore = '';
    },
    SELECT_CANAL(state, response){
      state.idCanalStore = response[0]
      state.nameCanalStore = response[1]
    },
    SELECT_SUJET(state, response){
      state.idSujetStore = response[0]
      state.nameSujetStore = response[1]
    },
  },
  actions: {
  },
  modules: {
  }
})
