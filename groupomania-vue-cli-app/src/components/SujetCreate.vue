<template>
  <div class="sujetCreate">

    <nav class="navbar-brand m-0 text-center fs-6 d-flex flex-wrap justify-content-center border">
      <router-link to="/news" class="mx-3"> News </router-link>
      <router-link to="/welcome" class="mx-3"> Forum </router-link>
      <router-link to="/myAccount" class="mx-3"> Mon profil </router-link>
      <router-link to="/" class="mx-3" @click="disconnect_user()"> Me deconnecter </router-link>
    </nav>
    
    <div class="d-flex container flex-column text-center">

      <h2> {{$store.state.nameForumStore}} </h2>
      <h3 class="fs-5"> Nouveau sujet </h3>
  
      <form class="d-flex justify-content-center row my-4" method="post">
        <fieldset class="text-center">
          
        <div id="errorMsg" class="text-danger"></div>

        <label for="title" class=""> Titre du sujet: </label>
        <input type="text" id="title" name="title" placeholder="Titre du sujet" class="m-2 col-6" v-model="sujetName">
        <textarea name="commentaire" class="col-10" placeholder="Mon commentaire ici !" v-model="msg"></textarea>
        </fieldset>
        <input type="button" value="créer un nouveau sujet" id="buttonCreate" class="col-5" @click="sujetCreation">
      </form>

    </div>
  </div>
</template>

<script>
import { HTTP } from '../http-constants'
import { mapState } from 'vuex'
import { mapActions } from 'vuex'

export default{
  computed:{
    ... mapState(['tokenStore','pseudoStore', 'idStore']),
  },

  nape: "app",

  data() {
    return {
      sujetName :'',
      msg: '',
    }
  },

  created() {
    if(this.tokenStore == ''){
      if(localStorage.getItem('user')){
      let userStorage = JSON.parse(localStorage.getItem('user'));
      let positionStorage = JSON.parse(localStorage.getItem('position'));
      this.$store.dispatch('new_user', userStorage);
      this.$store.dispatch('select_sujet', positionStorage);
      }else{
        this.$store.dispatch('disconnect_user');
        this.$router.push('/');
      }
    }
  },
  
  methods: {
    ... mapActions(['disconnect_user', 'select_sujet', 'new_user']),
    sujetCreation() {
      document.getElementById('buttonCreate').disabled = true;
      const formulaire = {
        sujetName: this.sujetName,
        id: this.idStore,
        pseudo: this.pseudoStore,
        msg: this.msg,
      };
      HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
      HTTP.post('/forum/' + this.$route.params.idForum + '/createSujet', formulaire)
      .then(() =>{
      this.$router.push({name: 'SujetList', params: {idForum: this.$route.params.idForum}});
      })
      .catch(err =>{
        document.getElementById('buttonCreate').disabled = false;
        document.getElementById('errorMsg').innerText = 'erreur '+ err.response.status +' : ' + err.response.data.error;
      })
    },

  }
}
</script>

<style scoped lang="scss">
</style>
