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
        <div @click="goToSujet(sujet.id, sujet.nom_sujet, sujet.pseudo_creator)" class="btn btn-secondary d-flex row col-11 m-0 p-0 ">
          <div class="col-8 border d-flex flex-column justify-content-around p-3"> {{ sujet.nom_sujet }} </div>
          <div class="col-4 border d-flex flex-column justify-content-around p-3" v-if="sujet.pseudo_creator != null"> {{ sujet.pseudo_creator }} </div> 
          <div class="col-4 border d-flex flex-column justify-content-around p-3" v-if="sujet.pseudo_creator == null"> utilisateur supprimé </div>
      </div>

          <div class="col-1 d-flex flex-column p-0 fs-6 justify-content-around" v-if="sujet.id_creator === idStore || statusStore === 1">
            <i class="fas fa-cog btn-warning py-2" v-show="showModif && !showChangeNameSujet" @click="showChangeNameSujet = !showChangeNameSujet; idChangeSujet= sujet.id, nameChangeSujet=sujet.nom_sujet, idCreator=sujet.id_creator"></i>
            <i class="fas fa-trash-alt btn-danger py-1" v-show="showModif && !showChangeNameSujet" @click="destroySujet(sujet.id, sujet.id_creator)"></i>
          </div>
      </div>
      
      <div id="errorMsg" class="text-danger"></div>

      <div class="d-flex flex-column align-items-center mt-4 ">
        <input type="button" value="nouveau sujet" class="m-1 col-11 col-sm-6 col-md-5 col-lg-4 col-xl-3" v-show="!showModif" @click="newSujet">
        <input type="button" value="supprimer/modifier un sujet" class="col-11 col-sm-6 col-md-5 col-lg-4 col-xl-3" @click="showModif = !showModif" v-show="!showModif" >
      </div>

      <form method="post">
        <fieldset class="text-center my-4 flex-column align-items-center" v-show="showChangeNameSujet">
          <label for="title" class=""> titre du sujet: </label>
          <input type="text" name="title" placeholder="titre du forum" class="m-2 col-8" v-model="nameChangeSujet">
          <input type="button" value="ajouter" class="col-4 col-sm-3 col-md-2 col-lg-2 col-xl-1" @click="modifySujet" >
        </fieldset>
      </form>

    </div>
  </div>
</template>

<script>
import{ HTTP } from '../http-constants'
import { mapState } from 'vuex'
import { mapActions } from 'vuex'

export default {
  computed:{
    ... mapState(['tokenStore', 'idStore', 'statusStore', 'nameCanalStore']),
  }, 

  nape: "app",

  data() {
    return {
      listSujet:'',
      showModif: false,
      showChangeNameSujet: false,
      idChangeSujet: '',
      nameChangeSujet: '',
      idCreator: '',
    }
  },

  
  created() {
    if(this.tokenStore == ''){
      if(localStorage.getItem('user')){
        let userStorage = JSON.parse(localStorage.getItem('user'))
        let positionStorage = JSON.parse(localStorage.getItem('position'))
        this.$store.dispatch('new_user', userStorage);
        this.$store.dispatch('select_sujet', positionStorage);
        HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
        HTTP.get('/canal/'+ this.$route.params.idCanal)
        .then(response =>{
          this.listSujet = response.data.result
        })
        .catch(err =>{
          document.getElementById('errorMsg').innerText = err.response.data.error;
        })
      }else{
        this.$router.push('/')
      }
    }else{
      HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
      HTTP.get('/canal/'+ this.$route.params.idCanal)
      .then(response =>{
        this.listSujet = response.data.result
      })
      .catch(err =>{
        document.getElementById('errorMsg').innerText = err.response.data.error;
      })
    }
  },

  methods: {
    ... mapActions(['select_sujet','disconnect_user', 'new_user',]),
    goToSujet(id, name, creator){
      let response = {
        idCanal: this.$route.params.idCanal,
        nameCanal: this.$store.state.nameCanalStore,
        idSujet: id,
        nameSujet: name,
        creatorSujet: creator,
      }
      this.$store.dispatch('select_sujet', response)
      this.$router.push({name: 'Sujet', params: {idCanal: this.$route.params.idCanal, idSujet: id}})
    },

    modifySujet(){
      let formulaire= {
        id: this.idStore,
        sujetId: this.idChangeSujet,
        sujetName: this.nameChangeSujet,
        idCreator: this.idCreator,
      }
      HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
      HTTP.put('/canal/' + this.$route.params.idCanal + '/modifySujet', formulaire)
      .then(()=>{
      this.$router.go({name: 'SujetList', params: {idCanal: this.$route.params.idCanal}})
      })
      .catch(err =>{
        document.getElementById('errorMsg').innerText = err.response.data.error;
      })
    },

    newSujet(){
      this.$router.push({ name:`SujetCreate`, params: { idCanal: this.$route.params.idCanal }})
    },

    destroySujet(id, creator){
      const formulaire = {
        id: this.idStore,
        idSujet: id,
        idCreator: creator,
      }
      HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
      HTTP.delete('/canal/'+ this.$route.params.idCanal +'/'+ id, formulaire)
      .then(() =>{
        this.$router.go({name: 'SujetList', params: {idCanal: this.$route.params.idCanal}})
      })
      .catch(err =>{
        document.getElementById('errorMsg').innerText = err.response.data.error;
      })
    },

  }
}
</script>

<style scoped lang="scss">
</style>