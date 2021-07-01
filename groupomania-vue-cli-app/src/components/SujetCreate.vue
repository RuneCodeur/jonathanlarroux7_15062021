<template>
  <div class="threadList">

    <nav class="navbar-brand m-0 text-center fs-6 d-flex flex-wrap justify-content-center border">
      <router-link to="/news" class="mx-3">news</router-link>
      <router-link to="/forum" class="mx-3">forum</router-link>
      <router-link to="/myAccount" class="mx-3">mon profil</router-link>
      <router-link to="/" class="mx-3">me deconnecter</router-link>
    </nav>
    
    <div class="d-flex container flex-column text-center">

      <h2>{{$store.state.nameCanalStore}}</h2>
      <h3 class="fs-5">nouveau sujet</h3>
  
      <form class="d-flex justify-content-center row my-4" method="post">
        <fieldset class="text-center">

           <label for="title" class=""> titre du sujet: </label>
          <input type="text" name="title" placeholder="titre du sujet" class="m-2 col-6" v-model="sujetName">
        
        <textarea name="commentaire" class="col-10" placeholder="mon commentaire ici !" v-model="msg"></textarea>
        </fieldset>
        <input type="button" value="créer un sujet" class="col-5" @click="sujetCreation">
      </form>
    </div>
  </div>
</template>

<script>
import{HTTP} from '../http-constants'
import {  mapGetters } from 'vuex'
import { mapState } from 'vuex'	
export default{
  computed:{
    ... mapState(['tokenStore','pseudoStore', 'idStore', 'mailStore', 'statusStore']),
    ... mapGetters(['NEW_USER'])
  },
  nape: "app",
  data() {
    return {
      sujetName :'',
      msg: '',
    }
  },

  methods: {
    sujetCreation() {
      HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
      const formulaire = {
        sujetName: this.sujetName,
        id: this.idStore,
        idCanal: this.$route.params.idCanal,
        pseudo: this.pseudoStore,
        msg: this.msg,
        }
      HTTP.post('/canal/' + this.$route.params.idCanal + '/createSujet', formulaire)
      .then(() =>{
      this.$router.push({name: 'SujetList', params: {idCanal: this.$route.params.idCanal}})
      })
      .catch(error =>{
        console.log(error)
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
