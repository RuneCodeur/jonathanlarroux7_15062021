<template>
  <div class="connexion">
    
    <nav class="navbar-brand m-0 text-center">
      <router-link to="/" class="mx-3">connexion</router-link>
      <router-link to="/inscription" class="mx-3">inscription</router-link>
    </nav>

    <form class="d-flex container flex-column" method="post">
      <fieldset class="text-center">

        <h2>connexion</h2>

        <div class="my-2">
          <label for="mail" class="col-3 col-md-2">adresse mail: </label><input type="mail" name="mail" v-model="mail">
        </div>
        <div class="my-2">
          <label for="password" class="col-3 col-md-2">mot de passe: </label><input type="password" name="password" v-model="mdp">
        </div>
        <div id="errorMsg" class="text-danger"></div>
        <input type="button" value="je me connecte" class="my-4" @click="connection" id="connect-button">

      </fieldset>
    </form>
  </div>
</template>

<script>
import{HTTP} from '../http-constants'
import {  mapGetters } from 'vuex'
import { mapState } from 'vuex'
export default{
  computed:{
    ... mapState(['token','pseudoData', 'id', 'mailData', 'status']),
    ... mapGetters(['NEW_USER'])
  },
  nape: "app",
  data() {
    return {
      pseudo:'',
      mdp:'',
      mail:'',
    }
  },
  methods: {
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
        this.$store.commit("NEW_USER", response.data)
        this.$router.push('/forum')
      })
      .catch(error => {
        document.getElementById('errorMsg').innerText = error;
        connectButton.disabled = false;
      });
    }
  }
}
</script>

<style scoped lang="scss">
</style>