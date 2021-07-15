import { createStore } from 'vuex'

export default createStore({
  state: {
    tokenStore:'',
    pseudoStore:'',
    idStore:'',
    statusStore:'',
    idForumStore:'',
    nameForumStore:'',
    idSujetStore:'',
    nameSujetStore:'',
    creatorSujetStore:'',
  },
  mutations: {
    value_user(state, res){
      state.tokenStore = res.token
      state.pseudoStore = res.pseudo
      state.mailStore= res.mail
      state.idStore = res.id
      state.statusStore = res.status
    },
    value_forum(state, res){
      state.idForumStore = res.idForum
      state.nameForumStore = res.nameForum
    },
    value_sujet(state, res){
      state.idForumStore = res.idForum
      state.nameForumStore = res.nameForum
      state.idSujetStore = res.idSujet
      state.nameSujetStore = res.nameSujet
      state.creatorSujetStore = res.creatorSujet
    },
    user_sessionStorage(state, res){
      localStorage.setItem('user', JSON.stringify(res));
    },
    position_sessionStorage(state, res){
      let response = {
        idForum: res.idForum,
        nameForum: res.nameForum,
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
        token:'',
        pseudo:'',
        mail: '',
        id:'',
        status:'',
      }
      context.commit('value_user', response)
      localStorage.clear();
    },

    select_forum(context, res){
      context.commit('value_forum', res)
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
        mail: context.state.mailStore,
        id: context.state.idStore,
        status: context.state.statusStore,
      }
      context.commit('value_user', response)
      context.commit('user_sessionStorage', response)
    }

  },
  modules: {
  }
})
