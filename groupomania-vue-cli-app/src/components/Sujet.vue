<template>
  <div class="thread">

    <nav class="navbar-brand m-0 text-center fs-6 d-flex flex-wrap justify-content-center border">
      <router-link to="/news" class="mx-3">news</router-link>
      <router-link to="/forum" class="mx-3">forum</router-link>
      <router-link to="/myAccount" class="mx-3">mon profil</router-link>
      <router-link to="/" class="mx-3">me deconnecter</router-link>
    </nav>
    
    <div class="d-flex container flex-column text-center">
      <h2>{{$store.state.nameSujetStore}}</h2>
      <p>par {{$store.state.creatorSujetStore}}</p>

      <div class="d-flex align-items-center flex-column">
        
        <div class="card col-11 text-start border border-primary" v-for="msg in listMsg" :key="msg.id">
          <div class="border-bottom border-secondary p-1">
            <div class="fw-bold fs-5">{{msg.name_user}}</div>
            <div class="row m-0"> 
              <div class="fst-italic p-0 col-8 border"> le {{msg.date}}</div>
            <i class="fas fa-cog btn-warning py-2 col-2 text-center"></i>
            <i class="fas fa-trash-alt btn-danger py-2 col-2 text-center" @click="destroyMsg(msg.id)"></i>
            </div>
          </div>
          <div class="mx-2 my-4">{{msg.message}}</div>
        </div>

      </div>
      <div class="mt-5 d-flex align-items-center flex-column ">
        <textarea name="commentaire" class="col-10" placeholder="écrit ton commentaire ici !" v-model="newMsg"></textarea>
        <input class="mt-2" type="button" value="poster" @click="msgCreation">
      </div>
    </div>
  </div>
</template>

<script>
import{ HTTP } from '../http-constants'
import { mapState } from 'vuex'
export default {
  computed:{
    ... mapState(['tokenStore', 'pseudoStore', 'idStore', 'statusStore', 'idCanalStore', 'nameCanalStore', 'idSujetStore', 'nameSujetStore', 'creatorSujetStore']),
  }, 
  nape: "app",
  data() {
    return {
      newMsg:'',
      listMsg:'',
    }
  },
  mounted() {
    HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
    HTTP.get('/messages/'+ this.$route.params.idCanal + '/' + this.$route.params.idSujet)
    .then(response =>{
      this.listMsg = response.data.response[0]
    })
  },
  methods: {
    msgCreation() {
      HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
      const formulaire = {
        id: this.idStore,
        pseudo: this.pseudoStore,
        msg: this.newMsg,
        idCanal: this.idCanalStore,
        idSujet: this.idSujetStore,
        }
      HTTP.post('/messages/'+ this.$route.params.idCanal + '/' + this.$route.params.idSujet + '/create', formulaire)
      .then(() =>{
      this.$router.push({name: 'News'})
      })
      .catch(error =>{
        console.log(error)
      })
    },
    destroyMsg(id){
      HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
      HTTP.delete('/messages/'+ this.$route.params.idCanal + '/' + this.$route.params.idSujet + '/' + id)
      .then(() =>{
        this.$router.push({name: 'News'})
      })
    },
  }
}
</script>

<style scoped lang="scss">
</style>
