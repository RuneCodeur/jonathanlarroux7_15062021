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
    creatorSujetStore:'',
  },
  mutations: {
    value_user(state, res){
      state.tokenStore = res.token
      state.pseudoStore = res.pseudo
      state.idStore = res.id
      state.mailStore = res.mail
      state.statusStore = res.status
    },
    value_canal(state, res){
      state.idCanalStore = res.idCanal
      state.nameCanalStore = res.nameCanal
    },
    value_sujet(state, res){
      state.idCanalStore = res.idCanal
      state.nameCanalStore = res.nameCanal
      state.idSujetStore = res.idSujet
      state.nameSujetStore = res.nameSujet
      state.creatorSujetStore = res.creatorSujet
    },
    user_sessionStorage(state, res){
      let response = {
        token: res.token,
        pseudo: res.pseudo,
        id: res.id,
        mail: res.mail,
        status: res.status,
      };
      localStorage.setItem('user', JSON.stringify(response));
    },
    position_sessionStorage(state, res){
      let response = {
        idCanal: res.idCanal,
        nameCanal: res.nameCanal,
        idSujet: res.idSujet,
        nameSujet: res.nameSujet,
        creatorSujet: res.creatorSujet,
      };
      localStorage.setItem('position', JSON.stringify(response));
    },
  },
  actions: {
    new_user(context, res){
      context.commit('value_user', res)
      context.commit('user_sessionStorage', res)
    },

    disconnect_user(context){
      let response = {
        token: '',
        pseudo: '',
        id: '',
        mail: '',
        status: '',
      }
      context.commit('value_user', response)
      localStorage.clear();
    },

    select_canal(context, res){
      context.commit('value_canal', res)
      context.commit('position_sessionStorage', res)
    },

    select_sujet(context, res){
      context.commit('value_sujet', res)
      context.commit('position_sessionStorage', res)
    },

    change_pseudo(context, res){
      let response = {
        token: context.state.tokenStore,
        pseudo: res,
        id: context.state.idStore,
        mail: context.state.mailStore,
        status: context.state.statusStore,
      }
      context.commit('value_user', response)
      context.commit('user_sessionStorage', response)
    }

  },
  modules: {
  }
})
