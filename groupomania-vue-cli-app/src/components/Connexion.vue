<template>
  <div class="connexion">
    
    <nav class="navbar-brand m-0 text-center fs-6 d-flex flex-wrap justify-content-center border">
      <router-link to="/" class="mx-3"> Connexion </router-link>
      <router-link to="/inscription" class="mx-3"> Inscription </router-link>
    </nav>

    <div class="d-flex container flex-column text-center">
      <h2> Connexion </h2>

      <form method="post">
        <fieldset>
          <div class="my-2">
            <label for="mail" class="col-3 col-md-2">adresse mail: </label>
            <input type="mail" name="mail" v-model="mail">
          </div>
          <div class="my-2">
            <label for="password" class="col-3 col-md-2">mot de passe: </label>
            <input type="password" name="password" v-model="mdp">
          </div>
          <div id="errorMsg" class="text-danger"></div>
          <input type="button" value="je me connecte" class="my-4" @click="connection()" id="connect-button">
        </fieldset>
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
    ... mapState(['tokenStore',]),
  },

  nape: "app",

  data() {
    return {
      pseudo:'',
      mdp:'',
      mail:'',
    }
  },

  created() {
    if(this.tokenStore == ''){
      if(localStorage.getItem('user')){
        this.$router.push('/welcome');
      }else{
        this.$store.dispatch('disconnect_user');
      }
    }else{
      if(localStorage.getItem('user')){
        let userStorage = JSON.parse(localStorage.getItem('user'));
        this.$store.dispatch('new_user', userStorage);
        this.$router.push('/welcome');
      }
    }
  },

  methods: {
    ... mapActions(['new_user']),
    connection() {
      let connectButton = document.getElementById('connect-button');
      connectButton.disabled = true;
      HTTP.get('/auth/login/', {
        params:{
          mail: this.mail,
          mdp:this.mdp
        }
      })
      .then(response =>{
        this.$store.dispatch('new_user', response.data);
        this.$router.push('/welcome');
      })
      .catch(err => {
        document.getElementById('errorMsg').innerText = 'erreur '+ err.response.status +' : ' + err.response.data.error;
        connectButton.disabled = false;
      });
    },

  }
}
</script>

<style scoped lang="scss">
</style>