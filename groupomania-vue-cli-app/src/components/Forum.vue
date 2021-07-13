<template>
  <div class="forum">

    <nav class="navbar-brand m-0 text-center fs-6 d-flex flex-wrap justify-content-center border">
      <router-link to="/news" class="mx-3">news</router-link>
      <router-link to="/forum" class="mx-3">forum</router-link>
      <router-link to="/myAccount" class="mx-3">mon profil</router-link>
      <router-link to="/" class="mx-3" @click="disconnect_user()">me deconnecter</router-link>
    </nav>
    
    <div class="d-flex container flex-column text-center">

      <h2>forum</h2>
      
      <div class="d-flex align-items-center flex-column " id="listForum">

        <div class="fs-3 my-2 row col-12" v-for="canal in listCanal" :key="canal.id">
          <div class="col-1 p-0"></div>
          <div @click="goToCanal(canal.id, canal.nom_canal)" class="col-10 p-2 btn btn-success p-3 fs-5">
          {{canal.nom_canal}}
          </div>
          <div class="col-1 d-flex flex-column p-0 fs-6 justify-content-around">
            <i class="fas fa-cog btn-warning py-2" v-show="showModif && !showAddForum && !showChangeNameForum" @click="showChangeNameForum = !showChangeNameForum, idChangeCanal= canal.id, nameChangeCanal=canal.nom_canal"></i>
            <i class="fas fa-trash-alt btn-danger py-2 " v-show="showModif && !showAddForum && !showChangeNameForum" @click="destroyCanal(canal.id) "></i>
          </div>
        </div>
      </div>
      
      <div id="errorMsg" class="text-danger"></div>


      <div class="d-flex justify-content-center row mt-4" v-if=" statusStore === 1 ">
        <input type="button" value="supprimer/modifier un forum" class="m-1 col-10 col-sm-6 col-md-4 col-lg-3 col-xl-3" @click="showModif = !showModif" v-show="!showModif">
        <input type="button" class="m-1 col-9 col-sm-6 col-md-4 col-lg-3 col-xl-3" value="ajouter un forum" @click="showAddForum = !showAddForum" v-show="showModif && !showAddForum && !showChangeNameForum">
        
        <form class="d-flex justify-content-center" method="post">
          <fieldset class="my-4 align-items-center flex-column col-6 " v-show="showAddForum">
            <label for="title"> titre du forum </label>
            <input type="text" name="title" placeholder="titre du forum" class="my-2 col-12" v-model="canalName">
            <input type="button" value="ajouter" class="col-9 col-sm-6 col-md-4 col-lg-3 col-xl-3" @click="newForum" >
          </fieldset>

          <fieldset class="my-4 align-items-center flex-column col-6" v-show="showChangeNameForum" >
            <label for="title" class=""> nouveau nom du forum </label>
            <input type="text" name="title"  class="my-2 col-12" v-model="nameChangeCanal">
            <input type="button" value="modifier" class="col-9 col-sm-6 col-md-4 col-lg-3 col-xl-3" @click="modifyCanal" >
          </fieldset>
        </form>
      </div> 
    </div>
  </div>
</template>

<script>
import{ HTTP } from '../http-constants'
import { mapState } from 'vuex'
import { mapActions } from 'vuex'

export default{
  computed:{
    ... mapState(['tokenStore', 'statusStore','idStore', 'idCanalStore']),
  },

  nape: "app",

  data() {
    return {
      showModif: false,
      showAddForum: false,
      showChangeNameForum: false,
      listCanal: '',
      canalName: '',
      idChangeCanal: '',
      nameChangeCanal: '',
    }
  },

  created() {
    if(this.tokenStore == ''){
      if(localStorage.getItem('user')){
      let userStorage = JSON.parse(localStorage.getItem('user'))
      this.$store.dispatch('new_user', userStorage);

        HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
        HTTP.get('/canal/welcome')
        .then(response =>{
          this.listCanal = response.data.result
        })
        .catch(err => {
          document.getElementById('errorMsg').innerText = err.response.data.error;
        });

      }else{
        this.$router.push('/')
      }
    }else{
      HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
      HTTP.get('/canal/welcome')
      .then(response =>{
        this.listCanal = response.data.result
      })
      .catch(err => {
        document.getElementById('errorMsg').innerText = err.response.data.error;
      });

    }
  },

  methods: {
    ... mapActions(['select_canal', 'disconnect_user', 'new_user']),
    
    newForum(){
      let formulaire= {
        id: this.idStore,
        canalName: this.canalName,
      }
      HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
      HTTP.post('/canal/createCanal', formulaire)
      .then(() =>{
          this.$router.go({name: 'Forum'})
        })
        .catch(err => {
          document.getElementById('errorMsg').innerText = err.response.data.error;
        });
    },

    goToCanal(id, name){
      let response = {
        idCanal: id, 
        nameCanal: name,
      }
      this.$store.dispatch('select_canal', response)
      this.$router.push({name: 'SujetList', params: {idCanal: this.idCanalStore}})
    },

    modifyCanal(){
      let formulaire= {
        id: this.idStore,
        canalId: this.idChangeCanal,
        canalName: this.nameChangeCanal,
      }
      HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
      HTTP.put('/canal/modifyCanal', formulaire)
      .then(()=>{
      this.$router.go({name: 'Forum'})
      })
      .catch(err => {
        document.getElementById('errorMsg').innerText = err.response.data.error;
      });
    },

    destroyCanal(id){
      HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
      HTTP.delete('/canal/'+ id)
      .then(() =>{
        this.$router.go({name: 'Forum'})
      })
      .catch(err => {
        document.getElementById('errorMsg').innerText = err.response.data.error;
      });
    },

  }
}
</script>

<style scoped lang="scss">
</style>
