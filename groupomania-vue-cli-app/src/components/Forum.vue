<template>
  <div class="forum">

    <nav class="navbar-brand m-0 text-center fs-6 d-flex flex-wrap justify-content-center border">
      <router-link to="/news" class="mx-3">news</router-link>
      <router-link to="/forum" class="mx-3">forum</router-link>
      <router-link to="/myAccount" class="mx-3">mon profil</router-link>
      <router-link to="/" class="mx-3">me deconnecter</router-link>
    </nav>
    
    <div class="d-flex container flex-column text-center">

      <h2>forum</h2>
      
      <div class="d-flex align-items-center flex-column" id="listForum">

        <div class="fs-3 my-2 row col-12" v-for="canal in listCanal" :key="canal.id">
          <div class="col-1"></div>
          <div @click="goToCanal(canal.id, canal.nom_canal)" class="text-decoration-none text-white card col-10 p-2 bg-success fs-5">
          {{canal.nom_canal}}
          </div>
          <div class="col-1 d-flex flex-column p-0 fs-6 justify-content-around">
            <i class="fas fa-cog btn-warning py-2" v-show="showModif" @click="showChangeNameCanal = !showChangeNameCanal; idChangeCanal= canal.id, nameChangeCanal=canal.nom_canal"></i>
            <i class="fas fa-trash-alt btn-danger py-2" v-show="showModif" @click="destroyCanal(canal.id)"></i>
          </div>
        </div>

      </div>
      <div class="d-flex justify-content-center row mt-4" >
        <input type="button" class="m-1 col-6" value="ajouter un forum" @click="showAddForum = !showAddForum" v-show="showAddForum - showModif">
      <form class="d-flex justify-content-center row " method="post">

        <fieldset class="text-center my-4" v-show="!showAddForum">
           <label for="title" class=""> titre du forum: </label>
          <input type="text" name="title" placeholder="titre du forum" class="m-2 col-6" v-model="canalName">
          <input type="button" value="ajouter" class="col-3" @click="newForum" >
        </fieldset>

        <fieldset class="text-center my-4" v-show="showChangeNameCanal">
           <label for="title" class=""> nouveau nom du forum: </label>
          <input type="text" name="title"  class="m-2 col-6" v-model="nameChangeCanal">
          <input type="button" value="modifier" class="col-3" @click="modifyCanal" >

        </fieldset>
      </form>
      <input type="button" class="m-1 col-6" value="supprimer/modifier un forum" @click="showModif = !showModif" v-show="showAddForum - showModif">
      </div> 
    </div>
  </div>
</template>

<script>
import{ HTTP } from '../http-constants'
import {  mapGetters } from 'vuex'
import { mapState } from 'vuex'

export default{
  computed:{
    ... mapState(['tokenStore', 'statusStore', 'idCanalStore']),
    ... mapGetters(['SELECT_CANAL','UNSELECT_CANAL'])
  },

  nape: "app",

  data() {
    return {
      showAddForum: true,
      showModif: false,
      showChangeNameCanal: false,
      listCanal: '',
      canalName: '',
      idChangeCanal: '',
      nameChangeCanal:'',
    }
  },

  mounted() {
    HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
    HTTP.get('/canal/welcome')
    .then(response =>{
      this.listCanal = response.data.response[0]
    })
  },

  methods: {
    newForum(){
    HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
    HTTP.post('/canal/createCanal',{
      params:{
        canalName: this.canalName,
      }
    }).then(() =>{
        this.$router.go('/forum')
      })
      .catch(error =>{
        console.log(error)
      })
    },

    goToCanal(id, name){
      let response = [id, name]
      this.$store.commit('SELECT_CANAL', response)
      this.$router.push({name: 'SujetList', params: {idCanal: this.idCanalStore}})
    },

    modifyCanal(){
      let formulaire= {
        canalId: this.idChangeCanal,
        canalName: this.nameChangeCanal,
      }
      HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
      HTTP.put('/canal/modifyCanal', formulaire)
      .then(()=>{
      this.$router.push({name: 'News'})
      })
    },

    destroyCanal(id){
      const formulaire = {
        idSujet: id,
      }
      HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
      HTTP.delete('/canal/'+ id, formulaire)
      .then(() =>{
        this.$store.commit('UNSELECT_CANAL')
        this.$router.push({name: 'News'})
      })
    },

  }
}
</script>

<style scoped lang="scss">
</style>
