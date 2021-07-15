<template>
  <div class="inscription">
    
    <nav class="navbar-brand m-0 text-center fs-6 d-flex flex-wrap justify-content-center border">
      <router-link to="/" class="mx-3"> Connexion </router-link>
      <router-link to="/inscription" class="mx-3"> Inscription </router-link>
    </nav>

    <div class="d-flex container flex-column text-center">
        
        <h2> Inscription </h2>

      <form method="post">
        <fieldset class="text-center">
          <div class="my-2">
            <label for="pseudo" class="col-3 col-md-2"> pseudo: </label>
            <input type="text" name="pseudo" v-model="pseudo"> 
          </div>
          <div class="my-2">
            <label for="mail" class="col-3 col-md-2"> adresse mail: </label>
            <input type="mail" name="mail" v-model="mail">
          </div>
          <div class="my-2">
            <label for="password" class="col-3 col-md-2"> mot de passe: </label>
            <input type="password" name="password" v-model="mdp">
          </div>

          <div id="errorMsg" class="text-danger"></div>

          <input type='button' class="my-4" value="creer un compte" @click="inscription" id="inscri-button">
        </fieldset>
      </form>

    </div>
  </div>
</template>

<script>
import { HTTP } from '../http-constants'
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
let regexPseudo = new RegExp ('^([a-zA-Z-_0-9]){3,20}$')
let regexMail = new RegExp ('^[A-Za-z-_0-9.]+@([A-Za-z-_0-9-]+.)+[A-Za-z]$')
let regexMdp = new RegExp ('^.{5,}$')
export default{
  computed:{
    ... mapState(['tokenStore']),
  },

  nape: "app",

  data() {
    return {
      pseudo:'',
      mdp:'',
      mail:''
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
    ... mapActions(['new_user','disconnect_user']),
    inscription() {
      if(regexPseudo.test(this.pseudo) === true){
        if(regexMail.test(this.mail) === true){
          if(regexMdp.test(this.mdp) === true){
            let inscriButton= document.getElementById('inscri-button'); 
            inscriButton.disabled= true;
            const formulaire = {
              pseudo: this.pseudo,
              mail: this.mail,
              mdp: this.mdp,
              };
            HTTP.post('/auth/signup/', formulaire)
            .then(() =>{
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
                inscriButton.disabled = false;
              });
            })
            .catch(err => {
              document.getElementById('errorMsg').innerText = 'erreur '+ err.response.status +' : ' + err.response.data.error;
              inscriButton.disabled= false;
            });
          }else{
            document.getElementById('errorMsg').innerText = "Votre mot de passe doit être composé au minimum de 5 caractères.";
          }
        }else{
          document.getElementById('errorMsg').innerText = "Votre adresse mail n'est pas valide";
        }
      }else{
        document.getElementById('errorMsg').innerHTML = "Votre pseudo doit être composée comme ceci: <br> Entre 3-20 caractères <br> Uniquement des chiffres, des lettres majuscules, minuscules, et des tirets '-' '_'.";
      }
    },
    
  }
}
</script>

<style scoped lang="scss">
</style>
