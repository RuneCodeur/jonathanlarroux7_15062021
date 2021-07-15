<template>
  <div class="forum">

    <nav class="navbar-brand m-0 text-center fs-6 d-flex flex-wrap justify-content-center border">
      <router-link to="/news" class="mx-3"> News </router-link>
      <router-link to="/welcome" class="mx-3"> Forum </router-link>
      <router-link to="/myAccount" class="mx-3"> Mon profil </router-link>
      <router-link to="/" class="mx-3" @click="disconnect_user()"> Me deconnecter </router-link>
    </nav>
    
    <div class="d-flex container flex-column text-center">

      <h2>Forum</h2>
      
      <div class="d-flex align-items-center flex-column ">

        <div class="fs-3 my-2 row col-12" v-for="forum in listForum" :key="forum.id">
          <div class="col-1 p-0"></div>
          <div class="col-10 p-2 btn btn-success p-3 fs-5" @click="goToForum(forum.id, forum.nom_forum)">
          {{forum.nom_forum}}
          </div>
          <div class="col-1 d-flex flex-column p-0 fs-6 justify-content-around">
            <i class="fas fa-cog btn-warning py-2" v-show="showModif && !showAddForum && !showChangeNameForum && !showDeleteForum" @click="showChangeNameForum = !showChangeNameForum, idChangeForum= forum.id, nameChangeForum=forum.nom_forum"></i>
            <i class="fas fa-trash-alt btn-danger py-2 " v-show="showModif && !showAddForum && !showChangeNameForum && !showDeleteForum" @click="destroyForum(forum.id)"></i>
          </div>
        </div>
      </div>
      
      <div id="errorMsg" class="text-danger"></div>


      <div class="d-flex justify-content-center row mt-4" v-if="statusStore == 1">
        <input type="button" class="m-1 col-10 col-sm-6 col-md-4 col-lg-3 col-xl-3" value="supprimer/modifier un forum" @click="showModif = !showModif" v-show="!showModif">
        <input type="button" class="m-1 col-9 col-sm-6 col-md-4 col-lg-3 col-xl-3" value="ajouter un forum" @click="showAddForum = !showAddForum" v-show="showModif && !showAddForum && !showChangeNameForum  && !showDeleteForum">
        
        <form class="d-flex justify-content-center" method="post">
          <fieldset class="my-4 align-items-center flex-column col-6 " v-show="showAddForum">
            <label for="title"> Titre du forum </label>
            <input type="text" class="my-2 col-12" name="title" placeholder="titre du forum" v-model="forumName">
            <input type="button" class="col-9 col-sm-6 col-md-4 col-lg-3 col-xl-3" value="ajouter" @click="newForum()" >
          </fieldset>

          <fieldset class="my-4 align-items-center flex-column col-6" v-show="showChangeNameForum" >
            <label for="title"> Nouveau nom du forum </label>
            <input type="text" name="title"  class="my-2 col-12" v-model="nameChangeForum">
            <input type="button" value="modifier" id="buttonModif" class="col-9 col-sm-6 col-md-4 col-lg-3 col-xl-3" @click="modifyForum()" >
          </fieldset>
        </form>
      </div> 
    </div>
  </div>
</template>

<script>
import { HTTP } from '../http-constants'
import { mapState } from 'vuex'
import { mapActions } from 'vuex'

export default{
  computed:{
    ... mapState(['tokenStore', 'statusStore','idStore', 'idForumStore']),
  },

  nape: "app",

  data() {
    return {
      showModif: false,
      showAddForum: false,
      showDeleteForum: false,
      showChangeNameForum: false,
      listForum: '',
      forumName: '',
      idChangeForum: '',
      nameChangeForum: '',
    }
  },

  created() {
    if(this.tokenStore == ''){
      if(localStorage.getItem('user')){
      let userStorage = JSON.parse(localStorage.getItem('user'));
      this.$store.dispatch('new_user', userStorage);

        HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
        HTTP.get('/forum/')
        .then(response =>{
          this.listForum = response.data.result;
        })
        .catch(err => {
          document.getElementById('errorMsg').innerText = err.response.data.error;
        });
      }else{
        this.$router.push('/');
      }
    }else{
      HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
      HTTP.get('/forum/')
      .then(response =>{
        this.listForum = response.data.result;
      })
      .catch(err => {
        document.getElementById('errorMsg').innerText = 'erreur '+ err.response.status +' : ' + err.response.data.error;
      });
    }
  },

  methods: {
    ... mapActions(['select_Forum', 'disconnect_user', 'new_user']),
    
    newForum(){
      let formulaire= {
        id: this.idStore,
        forumName: this.forumName,
      };
      HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
      HTTP.post('/forum/createForum', formulaire)
      .then(() =>{
          this.$router.go({name: 'Welcome'});
        })
        .catch(err => {
          document.getElementById('errorMsg').innerText = 'erreur '+ err.response.status +' : ' + err.response.data.error;
        });
    },

    goToForum(id, name){
      let response = {
        idForum: id, 
        nameForum: name,
      }
      this.$store.dispatch('select_forum', response);
      this.$router.push({name: 'SujetList', params: {idForum: this.idForumStore}});
    },

    modifyForum(){
      document.getElementById('buttonModif').disabled = true;
      let formulaire= {
        id: this.idStore,
        forumId: this.idChangeForum,
        forumName: this.nameChangeForum,
      };
      HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
      HTTP.put('/forum/modifyForum', formulaire)
      .then(()=>{
      this.$router.go({name: 'Welcome'});
      })
      .catch(err => {
      document.getElementById('buttonModif').disabled = false;
      document.getElementById('errorMsg').innerText = 'erreur '+ err.response.status +' : ' + err.response.data.error;
      });
    },

    destroyForum(idForum){
      this.showDeleteForum = !this.showDeleteForum;
      HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
      HTTP.delete('/forum/'+ idForum)
      .then(() =>{
        this.$router.go({name: 'Welcome'});
      })
      .catch(err => {
        document.getElementById('errorMsg').innerText = 'erreur '+ err.response.status +' : ' + err.response.data.error;
      });
    },

  }
}
</script>

<style scoped lang="scss">
</style>
