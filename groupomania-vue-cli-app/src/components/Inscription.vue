<template>
  <div class="inscription">
    
    <nav class="navbar-brand m-0 text-center">
      <router-link to="/" class="mx-3">connexion</router-link>
      <router-link to="/inscription" class="mx-3">inscription</router-link>
    </nav>

    <form class="d-flex container flex-column" method="post">
      <fieldset class="text-center">

        <h2>inscription</h2>

        <div class="my-2">
          <label for="pseudo" class="col-3 col-md-2" >pseudo: </label><input type="text" name="pseudo" id="pseudo" v-model="pseudo"> 
        </div>
        <div class="my-2">
          <label for="mail" class="col-3 col-md-2">adresse mail: </label><input type="mail" name="mail" id="mail" v-model="mail">
        </div>
        <div class="my-2">
          <label for="password" class="col-3 col-md-2">mot de passe: </label><input type="password" name="password" id="password" v-model="mdp">
        </div>
        <div id="errorMsg" class="text-danger"></div>
        <input type='button' class="my-4" value="creer un compte" @click="addTodo" id="inscri-button">
       
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
    ... mapState(['tokenStore','pseudoStore', 'idStore', 'mailStore', 'statusStore']),
    ... mapGetters(['NEW_USER'])
  },
  nape: "app",
  data() {
    return {
      pseudo:'',
      mdp:'',
      mail:''
    }
  },

  methods: {
    addTodo() {
      let inscriButton= document.getElementById('inscri-button'); 
      inscriButton.disabled= true;

      const formulaire = {
        pseudo: this.pseudo,
        mail: this.mail,
        mdp: this.mdp
        }

      HTTP.post('/auth/signup/', formulaire)

      .then(() =>{
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
          inscriButton.disabled = false;
        });
      })
      .catch(error => {
        document.getElementById('errorMsg').innerText = error;
        console.log(error);
        inscriButton.disabled= false;
      });
    }
  }
}
</script>

<style scoped lang="scss">
</style>
