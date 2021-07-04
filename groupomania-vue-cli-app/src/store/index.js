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
    value_user(state, response){
      state.tokenStore = response.token
      state.pseudoStore = response.pseudo
      state.idStore = response.id
      state.mailStore = response.mail
      state.statusStore = response.status
    },
    value_canal(state, response){
      state.idCanalStore = response.idCanal
      state.nameCanalStore = response.nameCanal
    },
    value_sujet(state, response){
      state.idSujetStore = response.idSujet
      state.nameSujetStore = response.nameSujet
      state.creatorSujetStore = response.creatorSujet
    },
  },
  actions: {
    new_user(context, response){
      context.commit('value_user', response)
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
    },

    select_canal(context, response){
      context.commit('value_canal', response)
    },

    select_sujet(context, response){
      context.commit('value_sujet', response)
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
    }

  },
  modules: {
  }
})
