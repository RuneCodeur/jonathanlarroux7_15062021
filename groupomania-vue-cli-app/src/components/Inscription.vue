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
        <button class="my-4" id="buttonSubmit" @click="addTodo"> je m'inscrit </button>

      </fieldset>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default{
  nape: "app",

  //si je veux faire un POST--ok
  methods: {
    addTodo() {
      const formulaire = {
        pseudo: this.pseudo,
        mail: this.mail,
        mdp: this.mdp,}

        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        };
      axios.post('http://localhost:3000/api/auth/signup/', config, formulaire)
      .then(function(){
        console.log('SUCCESS!!');
      })
      .catch(function(){
        console.log('FAILURE!!');
      });
    }
  }
}
</script>

<style scoped lang="scss">
</style>
