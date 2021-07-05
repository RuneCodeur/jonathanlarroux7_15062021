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
      <div class="row col-11 ">
        <div class="col-8 border">nom du sujet</div>
        <div class="col-4 border">auteur du sujet</div>
      </div>
      <div class="my-1 d-flex row col-12" v-for="sujet in listSujet" :key="sujet.id">
        <div @click="goToSujet(sujet.id, sujet.nom_sujet, sujet.pseudo_creator)" class="text-decoration-none text-dark row col-11 m-0 p-0 ">
          <div class="col-8 border d-flex flex-column justify-content-around"> {{ sujet.nom_sujet }} </div>
          <div class="col-4 border d-flex flex-column justify-content-around"> {{ sujet.pseudo_creator }} </div> 
      </div>

          <div class="col-1 d-flex flex-column p-0 fs-6 justify-content-around">
            <i class="fas fa-cog btn-warning py-2" v-show="showModif" @click="showChangeNameSujet = !showChangeNameSujet; idChangeSujet= sujet.id, nameChangeSujet=sujet.nom_sujet"></i>
            <i class="fas fa-trash-alt btn-danger py-2" v-show="showModif" @click="destroySujet(sujet.id)"></i>
          </div>
      </div>
      
      <div id="errorMsg" class="text-danger"></div>

      <form class="d-flex justify-content-center row " method="post">
        <fieldset class="text-center my-4" v-show="showChangeNameSujet">
          <label for="title" class=""> titre du sujet: </label>
          <input type="text" name="title" placeholder="titre du forum" class="m-2 col-6" v-model="nameChangeSujet">
          <input type="button" value="ajouter" class="col-3" @click="modifySujet" >
        </fieldset>
      </form>

      <div class="d-flex justify-content-center row mt-4 " >
      
        <input type="button" value="nouveau sujet" class="m-1 col-6" v-show="!showModif" @click="newSujet">
        <input type="button" class="m-1 col-6" value="supprimer/modifier un sujet" @click="showModif = !showModif" >
      
      </div> 
    </div>
  </div>
</template>

<script>
import{ HTTP } from '../http-constants'
import { mapState } from 'vuex'
import { mapActions } from 'vuex'

export default {
  computed:{
    ... mapState(['tokenStore', 'statusStore', 'idCanalStore', 'nameCanalStore', 'idSujetStore']),
  }, 

  nape: "app",

  data() {
    return {
      listSujet:'',
      showModif: false,
      showChangeNameSujet: false,
      idChangeSujet: '',
      nameChangeSujet: '',
    }
  },

  created() {
    if(this.tokenStore ==''){
      let userStorage = JSON.parse(localStorage.getItem('user'))
      let positionStorage = JSON.parse(localStorage.getItem('position'))
      this.$store.dispatch('new_user', userStorage);
      this.$store.dispatch('select_sujet', positionStorage);
      if(this.tokenStore ==''){
        console.log(this.$store)
        this.$router.push('/')
      }
      else{
        HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
        HTTP.get('/canal/'+ this.$route.params.idCanal)
        .then(response =>{
          this.listSujet = response.data.response[0]
        })
        .catch(err =>{
          document.getElementById('errorMsg').innerText = err;
        })
      }
    }
    else{
      HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
      HTTP.get('/canal/'+ this.$route.params.idCanal)
      .then(response =>{
        this.listSujet = response.data.response[0]
      })
      .catch(err =>{
        document.getElementById('errorMsg').innerText = err;
      })
    }
  },

  methods: {
    ... mapActions(['select_sujet','disconnect_user', 'new_user',]),
    goToSujet(id, name, creator){
      let response = {
        idCanal: this.$store.state.idCanalStore,
        nameCanal: this.$store.state.nameCanalStore,
        idSujet: id,
        nameSujet: name,
        creatorSujet: creator,
      }
      this.$store.dispatch('select_sujet', response)
      this.$router.push({name: 'Sujet', params: {idCanal: this.idCanalStore, idSujet: this.idSujetStore}})
    },

    modifySujet(){
      let formulaire= {
        sujetId: this.idChangeSujet,
        sujetName: this.nameChangeSujet,
      }
      console.log(this.idCanalStore)
      HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
      HTTP.put('/canal/' + this.idCanalStore + '/modifySujet', formulaire)
      .then(()=>{
      this.$router.push({name: 'News'})
      })
      .catch(err =>{
        document.getElementById('errorMsg').innerText = err;
      })
    },

    newSujet(){
      this.$router.push({ name:`SujetCreate`, params: { idCanal: 'idCanalStore' }})
    },

    destroySujet(id){
      const formulaire = {
        idSujet: id,
      }
      HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
      HTTP.delete('/canal/'+ this.$route.params.idCanal +'/'+ id, formulaire)
      .then(() =>{
        this.$router.push({name: 'Forum'})
      })
      .catch(err =>{
        document.getElementById('errorMsg').innerText = err;
      })
    },

  }
}
</script>

<style scoped lang="scss">
</style>
