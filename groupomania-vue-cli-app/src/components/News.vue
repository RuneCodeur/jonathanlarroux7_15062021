<template>
  <div class="news">

    <nav class="navbar-brand m-0 text-center fs-6 d-flex flex-wrap justify-content-center border">
      <router-link to="/news" class="mx-3">news</router-link>
      <router-link to="/forum" class="mx-3">forum</router-link>
      <router-link to="/myAccount" class="mx-3">mon profil</router-link>
      <router-link to="/" class="mx-3">me deconnecter</router-link>
    </nav>
    
    <div class="d-flex container flex-column text-center">

      <h2>news</h2>

      <div class="d-flex align-items-center flex-column">
        
        <div class="text-decoration-none text-dark card col-10 my-2 text-start border border-primary" v-for="msg in newMsg" :key="msg.id">
          <div class="border-bottom border-secondary p-1 mb-4">
            <div class="fw-bold fs-5">{{msg.name_user}}</div>
            <div class="fst-italic px-3">le {{msg.date}}</div>
          </div>
          <div class="mx-2">{{msg.message}}</div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import{ HTTP } from '../http-constants'
import { mapState } from 'vuex'
export default{
  computed:{
    ... mapState(['tokenStore', 'statusStore', 'idCanalStore']),
  },
  nape: "app",
  data() {
    return {
      newMsg:'',
    }
  },
  mounted() {
    HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
    HTTP.get('/messages/New')
    .then(response =>{
      this.newMsg = response.data.response[0].reverse()
    })
    .catch(err=>{
      console.log(err)
    })
  },
}
</script>

<style scoped lang="scss">
</style>
