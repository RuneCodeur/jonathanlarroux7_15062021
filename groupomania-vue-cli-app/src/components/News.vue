<template>
  <div class="news">

    <nav class="navbar-brand m-0 text-center fs-6 d-flex flex-wrap justify-content-center border">
      <router-link to="/news" class="mx-3">news</router-link>
      <router-link to="/forum" class="mx-3">forum</router-link>
      <router-link to="/myAccount" class="mx-3">mon profil</router-link>
      <router-link to="/" class="mx-3" @click="disconnect_user()">me deconnecter</router-link>
    </nav>
    
    <div class="d-flex container flex-column text-center">

      <h2>news</h2>
      
      <div id="errorMsg" class="text-danger"></div>

      <div class="d-flex align-items-center flex-column">
        
        <div class="btn btn-white col-10 my-2 text-start border border-primary" @click="selectMessage(msg.idCanal, msg.idSujet, msg.nomSujet, msg.pseudo)" v-for="msg in newMsg" :key="msg.id">
          
          <div class="border-bottom border-secondary p-1 mb-4">
            <div class="fs-3 fw-bold"> canal: {{msg.nomCanal}}</div>
            <div class="fs-4 fw-bold"> sujet: {{msg.nomSujet}}</div>
            <div class="fw-bold fs-5" v-if="msg.pseudo != null"> par {{msg.pseudo}} </div>
            <div class="fw-bold fs-5" v-if="msg.pseudo == null"> par - utilisateur supprimé -</div>
            <div class="fst-italic px-3">le {{msg.date}}</div>
          </div>
          <div class="mx-2">{{msg.message}}</div>
          <div class="col-12 d-flex justify-content-center">
            <img v-bind:src=" msg.media" class="img-thumbnail" style="max-height:200px;">
          </div>
        </div>
        
      </div>

    </div>
  </div>
</template>

<script>
import{ HTTP } from '../http-constants'
import { mapState } from 'vuex'
import { mapActions } from 'vuex'

export default{
  computed:{
    ... mapState(['tokenStore',]),
  },

  nape: "app",

  data() {
    return {
      newMsg:'',
    }
  },
  
  created() {
    if(this.tokenStore == ''){
      if(localStorage.getItem('user')){
      let userStorage = JSON.parse(localStorage.getItem('user'))
      this.$store.dispatch('new_user', userStorage);
      HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
      HTTP.get('/messages/New')
      .then(response =>{
        this.newMsg = response.data.result.reverse()
      })
      .catch(err=>{
        document.getElementById('errorMsg').innerText = err.response.data.error;
      })
      }else{
        this.$router.push('/')
      }
    }else{
      HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
      HTTP.get('/messages/New')
      .then(response =>{
        this.newMsg = response.data.result.reverse()
       })
      .catch(err=>{
        document.getElementById('errorMsg').innerText = err.response.data.error;
      })
    }
  },

  methods: {
    ... mapActions(['disconnect_user', 'new_user']),
    selectMessage(idCanal, idSujet, nameSujet, creatorSujet){
      let response = {
        idCanal: idCanal,
        idSujet: idSujet,
        nameSujet: nameSujet,
        creatorSujet: creatorSujet
      }
      this.$store.dispatch('select_sujet', response)
      this.$router.push({name: 'Sujet', params: {idCanal: idCanal, idSujet: idSujet}})
    },
    
  }
}
</script>

<style scoped lang="scss">
</style>
