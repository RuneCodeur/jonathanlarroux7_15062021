<template>
  <div class="myAccount">
    
    <nav class="navbar-brand m-0 text-center fs-6 d-flex flex-wrap justify-content-center border">
      <router-link to="/news" class="mx-3"> News </router-link>
      <router-link to="/welcome" class="mx-3"> Forum </router-link>
      <router-link to="/myAccount" class="mx-3"> Mon profil </router-link>
      <router-link to="/" class="mx-3" @click="disconnect_user()"> Me deconnecter </router-link>
    </nav>

    <div class="d-flex container flex-column">
      
      <h2 class="text-center"> Mon compte </h2>

        <div id="successMsg" class="alert-success text-center"></div>
        <div id="errorMsg" class="alert-danger text-center"></div>

      <div class="d-flex flex-column align-items-center" v-if="tokenStore !== ''">
        <div class="d-flex mt-4 align-items-center"> 
          Connecté en tant que: 
          <div class="mx-2 fw-bold fs-5 d-flex"> 
            {{$store.state.pseudoStore}} 
          </div>
        </div>

        <input type="button" value="Changer de pseudo" class="mt-2 col-8 col-sm-4 col-md-3 col-lg-2 col-xl-2" @click="showPseudo = !showPseudo" v-show="showPseudo">
      
        <form method="post" v-show="!showPseudo">
          <fieldset class="my-4 border">
              <label for="pseudo" class="mx-3"> Nouveau pseudo: </label> 
            <input type="text" name="pseudo" v-model="newPseudo">
            <input type="button" id="buttonModif" value="Je change de pseudo" class="m-3" @click="modifyAccount()">
          </fieldset>
        </form>

        <div class="text-center mt-5">
          <router-link to="/myAccount/delete">Supprimer mon compte</router-link>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { HTTP } from '../http-constants'
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
let regex = new RegExp ('^([a-zA-Z0-9_-]){3,20}$')

export default { 
  computed:{... mapState(['tokenStore','pseudoStore', 'idStore']),
  },

  nape: "app",

  data () {
    return{
    showPseudo: true,
    newPseudo:'',
    }
  },

  created() {
    if(this.tokenStore == ''){
      if(localStorage.getItem('user')){
      let userStorage = JSON.parse(localStorage.getItem('user'));
      this.$store.dispatch('new_user', userStorage);
      }else{
        this.$store.dispatch('disconnect_user');
        this.$router.push('/');
      }
    }
  },

  methods: {
    ... mapActions(['change_pseudo','disconnect_user', 'new_user']),
    modifyAccount(){
      if(regex.test(this.newPseudo) === true){
        document.getElementById('buttonModif').disabled = true;
        const formulaire = {
            newPseudo: this.newPseudo,
            id: this.idStore,
        };
        HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
        HTTP.put('auth/modify', formulaire)
        .then(() =>{
          document.getElementById('buttonModif').disabled = false;
          this.$store.dispatch('change_pseudo',this.newPseudo);
          this.newPseudo= '';
          document.getElementById('successMsg').innerText = "votre pseudo à été mis à jour ! ";
          document.getElementById('errorMsg').innerText = "";
        })
        .catch(err =>{
          document.getElementById('buttonModif').disabled = false;
          document.getElementById('errorMsg').innerText = 'erreur '+ err.response.status +' : ' + err.response.data.error;
          document.getElementById('successMsg').innerText = "";
        })

      }else{
        document.getElementById('errorMsg').innerHTML = "Votre pseudo doit être composée comme ceci: <br> Entre 3-20 caractères <br> Uniquement des chiffres, des lettres majuscules, minuscules, et des tirets '-' '_'.";
      }
    },

  }
}
</script>

<style scoped lang="scss">
</style>
