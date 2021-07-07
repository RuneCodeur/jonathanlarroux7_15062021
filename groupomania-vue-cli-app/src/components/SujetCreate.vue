<template>
  <div class="threadList">

    <nav class="navbar-brand m-0 text-center fs-6 d-flex flex-wrap justify-content-center border">
      <router-link to="/news" class="mx-3">news</router-link>
      <router-link to="/forum" class="mx-3">forum</router-link>
      <router-link to="/myAccount" class="mx-3">mon profil</router-link>
      <router-link to="/" class="mx-3" @click="disconnect_user()">me deconnecter</router-link>
    </nav>
    
    <div class="d-flex container flex-column text-center">

      <h2>{{$store.state.nameCanalStore}}</h2>
      <h3 class="fs-5">nouveau sujet</h3>
  
      <form class="d-flex justify-content-center row my-4" method="post">
        <fieldset class="text-center">
          
        <div id="errorMsg" class="text-danger"></div>

           <label for="title" class=""> titre du sujet: </label>
          <input type="text" name="title" placeholder="titre du sujet" class="m-2 col-6" v-model="sujetName">
        
        <textarea name="commentaire" class="col-10" placeholder="mon commentaire ici !" v-model="msg"></textarea>
        </fieldset>
        <input type="button" value="créer un nouveau sujet" id="button-create" class="col-5" @click="sujetCreation">
      </form>
    </div>
  </div>
</template>

<script>
import{HTTP} from '../http-constants'
import { mapState } from 'vuex'
import { mapActions } from 'vuex'

export default{
  computed:{
    ... mapState(['tokenStore','pseudoStore', 'idStore', 'mailStore', 'statusStore']),
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
      let userStorage = JSON.parse(localStorage.getItem('user'))
      this.$store.dispatch('new_user', userStorage);
      console.log('je fait un appel pour recevoir le nom du canal en utilisant this.$route.params.idCanal')
      }else{
        this.$router.push('/')
      }
    }else{
      console.log('je fait un appel pour recevoir le nom du canal en me servant de this.$route.params.idCanal')
    }
  },
  
  methods: {
    ... mapActions(['disconnect_user', 'select_sujet', 'new_user']),
    sujetCreation() {
      let buttonCreate= document.getElementById('button-create'); 
      buttonCreate.disabled = true;
      const formulaire = {
        sujetName: this.sujetName,
        id: this.idStore,
        idCanal: this.$route.params.idCanal,
        pseudo: this.pseudoStore,
        msg: this.msg,
        }
      HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
      HTTP.post('/canal/' + this.$route.params.idCanal + '/createSujet', formulaire)
      .then(() =>{
      this.$router.push({name: 'SujetList', params: {idCanal: this.$route.params.idCanal}})
      })
      .catch(err =>{
        buttonCreate.disabled = false;
        document.getElementById('errorMsg').innerText = err.response.data.error; //receptionne pas correctement l'erreur
      })
    },

  }
}
</script>

<style scoped lang="scss">
</style>
