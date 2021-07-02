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
            <i class="fas fa-cog btn-warning py-2" v-show="showModif"></i>
            <i class="fas fa-trash-alt btn-danger py-2" v-show="showModif" @click="destroySujet(sujet.id)"></i>
          </div>
      </div>

      <router-link :to="{ name:`SujetCreate`, params: { idCanal: idCanalStore }}" class="mx-3">nouveau sujet</router-link>
      
      <div class="d-flex justify-content-center row mt-4 " >
      
      <input type="button" class="m-1 col-6" value="supprimer/modifier un sujet" @click="showModif = !showModif" >
      
      </div> 
    </div>
  </div>
</template>

<script>
import{ HTTP } from '../http-constants'
import {  mapGetters } from 'vuex'
import { mapState } from 'vuex'
export default {
  computed:{
    ... mapState(['tokenStore', 'statusStore', 'idCanalStore', 'nameCanalStore', 'idSujetStore']),
    ... mapGetters(['SELECT_SUJET', 'UNSELECT_SUJET'])
  }, 
  nape: "app",
  data() {
    return {
      listSujet:'',
      showModif: false,
    }
  },
  mounted() {
    HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
    HTTP.get('/canal/'+ this.$route.params.idCanal)
    .then(response =>{
      this.listSujet = response.data.response[0]
    })
  },
  methods: {
    goToSujet(id, name, creator){
      let response = [id, name, creator]
      this.$store.commit('SELECT_SUJET', response)
      this.$router.push({name: 'Sujet', params: {idCanal: this.idCanalStore, idSujet: this.idSujetStore}})
    },
    destroySujet(id){
      const formulaire = {
        idSujet: id,
      }
      HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
      HTTP.delete('/canal/'+ this.$route.params.idCanal +'/'+ id, formulaire)
      .then(() =>{
        this.$store.commit('UNSELECT_SUJET')
        this.$router.push({name: 'forum'})
      })
    },
  }
}
</script>

<style scoped lang="scss">
</style>
