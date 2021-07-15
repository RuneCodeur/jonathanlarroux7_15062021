<template>
  <div class="deleteAccount">

    <nav class="navbar-brand m-0 text-center fs-6 d-flex flex-wrap justify-content-center border">
      <router-link to="/news" class="mx-3"> News </router-link>
      <router-link to="/welcome" class="mx-3"> Forum </router-link>
      <router-link to="/myAccount" class="mx-3"> Mon profil </router-link>
      <router-link to="/" class="mx-3" @click="disconnect_user()"> Me deconnecter </router-link>
    </nav>

    <div class="text-center">
      <h2> Suppression du compte </h2>
      <div class="d-flex container flex-column alert alert-warning fs-4">
        Attention: la suppression du compte 
        <div class="mx-2 fw-bold fs-2"> {{$store.state.pseudoStore}} </div>
        est irréversible !
      </div>
      
        <div id="errorMsg" class="text-danger"></div>

      <input type="button" id="buttonDelete" value="Je supprime mon compte" class="my-4 fs-4 btn-danger p-2" @click="deleteAccount()">
    </div>

  </div>
</template>

<script>
import { HTTP } from '../http-constants'
import { mapState } from 'vuex'
import { mapActions } from 'vuex'

export default { 
  computed:{... mapState(['tokenStore','pseudoStore', 'idStore']),
  },

  nape: "app",

  created() {
    if(this.tokenStore == ''){
      if(localStorage.getItem('user')){
      let userStorage = JSON.parse(localStorage.getItem('user'));
      this.$store.dispatch('new_user', userStorage);
      }else{
        this.$router.push('/');
      }
    }
  },

  methods: {
    ... mapActions(['disconnect_user']),
    deleteAccount(){
      document.getElementById('buttonDelete').disabled = true;
      HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
      HTTP.delete('auth/delete', {
        params:{
          id: this.idStore,
          pseudo: this.pseudoStore,
        }
      })
      .then(() =>{
        this.$store.dispatch('disconnect_user');
        this.$router.push('/');
      })
      .catch(err =>{
        document.getElementById('buttonDelete').disabled = false;
        document.getElementById('errorMsg').innerText = 'erreur '+ err.response.status +' : ' + err.response.data.error;
      })
    },

  }
}
</script>

<style scoped lang="scss">
</style>
