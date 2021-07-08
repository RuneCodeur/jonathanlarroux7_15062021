<template>
  <div class="myAccount">
    
    <nav class="navbar-brand m-0 text-center fs-6 d-flex flex-wrap justify-content-center border">
      <router-link to="/news" class="mx-3">news</router-link>
      <router-link to="/forum" class="mx-3">forum</router-link>
      <router-link to="/myAccount" class="mx-3">mon profil</router-link>
      <router-link to="/" class="mx-3" @click="disconnect_user()">me deconnecter</router-link>
    </nav>


    <div class="d-flex container flex-column">

      <h2 class="text-center">mon compte</h2>
        <div id="successMsg" class="alert-success text-center"></div>
        <div id="errorMsg" class="alert-danger text-center"></div>

      <div v-if="tokenStore !== ''">
        <div class="d-flex mt-4 align-items-center"> connecté en tant que: <div class="mx-2 fw-bold fs-5 d-flex"> {{$store.state.pseudoStore}} </div></div>
        <input type="button" value="changer de pseudo" class="mt-2 col-6" @click="showPseudo = !showPseudo" v-show="showPseudo">
      
        
        <form method="post" v-show="!showPseudo">
          <fieldset class="my-4">
            <div>
              <label for="pseudo" class="mx-3" > nouveau pseudo: </label> 
            <input type="text" name="pseudo" v-model="newPseudo" >
          </div>
          <input type="button" value="je change de pseudo" class="my-3" @click="modifyAccount">
          </fieldset>
          </form>

        <div class="text-center my-2">
          <router-link to="/myAccount/delete">supprimer mon compte</router-link>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import{HTTP} from '../http-constants'
import { mapState } from 'vuex'
import { mapActions } from 'vuex'

export default { 
  computed:{... mapState(['tokenStore','pseudoStore', 'idStore', 'mailStore']),
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
      let userStorage = JSON.parse(localStorage.getItem('user'))
      this.$store.dispatch('new_user', userStorage);
      }else{
        this.$router.push('/')
      }
    }
  },

  methods: {
    ... mapActions(['change_pseudo','disconnect_user', 'new_user']),
    modifyAccount(){
      HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
      HTTP.put('auth/modify', {
        params:{
          newPseudo: this.newPseudo,
          id: this.idStore,
        }
      })
      .then(() =>{
        this.$store.dispatch('change_pseudo',this.newPseudo);
        document.getElementById('successMsg').innerText = "votre pseudo à été mis à jour ! ";
      })
      .catch(err =>{
        document.getElementById('errorMsg').innerText = err.response.data.error;
      })
    },

  }
}
</script>

<style scoped lang="scss">
</style>
