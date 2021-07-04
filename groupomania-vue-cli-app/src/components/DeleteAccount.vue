<template>
  <div class="delete text-center">

    <nav class="navbar-brand m-0 text-center fs-6 d-flex flex-wrap justify-content-center border">
      <router-link to="/news" class="mx-3">news</router-link>
      <router-link to="/forum" class="mx-3">forum</router-link>
      <router-link to="/myAccount" class="mx-3">mon profil</router-link>
      <router-link to="/" class="mx-3">me deconnecter</router-link>
    </nav>
    <div ><div v-if="tokenStore !== ''"></div>
      <h2>suppression du compte</h2>
      <div class="d-flex container flex-column alert alert-warning fs-4">
        Attention : la suppression du compte <div class="mx-2 fw-bold fs-2">{{$store.state.pseudoStore}}</div> est irréversible !
      </div>
      
        <div id="errorMsg" class="text-danger"></div>

      <input type="button" value="je supprime mon compte" class="my-4 fs-4 btn-danger p-2" @click="deleteAccount">
    </div>
  </div>
</template>

<script>
import{HTTP} from '../http-constants'
import {  mapGetters } from 'vuex'
import { mapState } from 'vuex'	

export default { 
  computed:{... mapState(['tokenStore','pseudoStore', 'idStore', 'mailStore']),
    ... mapGetters(['DISCONNECT_USER'])
  },

  nape: "app",

  methods: {
    deleteAccount(){
      HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
      HTTP.delete('auth/delete', {
        params:{
          mail: this.mailStore,
          id: this.idStore,
          pseudo: this.pseudoStore,
        }
      })
      .then(() =>{
        this.$store.commit('DISCONNECT_USER');
        this.$router.push('/');
      })
      .catch(err =>{
        document.getElementById('errorMsg').innerText = err;
      })
    }

  }
}
</script>

<style scoped lang="scss">
</style>
