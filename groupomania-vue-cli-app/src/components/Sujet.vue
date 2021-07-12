<template>
  <div class="thread">

    <nav class="navbar-brand m-0 text-center fs-6 d-flex flex-wrap justify-content-center border">
      <router-link to="/news" class="mx-3">news</router-link>
      <router-link to="/forum" class="mx-3">forum</router-link>
      <router-link to="/myAccount" class="mx-3">mon profil</router-link>
      <router-link to="/" class="mx-3" @click="disconnect_user()">me deconnecter</router-link>
    </nav>
    
    <div class="d-flex container flex-column text-center">
      <h2>{{$store.state.nameSujetStore}}</h2>
      <p v-if="$store.state.creatorSujetStore != null">par {{$store.state.creatorSujetStore}}</p>
      <p v-if="$store.state.creatorSujetStore == null">par - utilisateur supprimé -</p>

      <div class="d-flex align-items-center flex-column">
        
        <div id="errorMsg" class="text-danger"></div>
        <div class="card col-11 text-start border border-primary" v-for="msg in listMsg" :key="msg.id">
          <div class="border-bottom border-secondary p-1">
            <div class="fw-bold fs-5" v-if="msg.name_user != null">{{msg.name_user}}</div>
            <div class="fw-bold fs-5" v-if="msg.name_user == null">- utilisateur supprimé -</div>
            <div class="row m-0"> 
              <div class="fst-italic p-0 col-8 border"> le {{msg.date}}</div>
              <div class="col-4" v-if="msg.id_user === idStore || statusStore === 1">
                <i class="fas fa-cog btn-warning py-2 col-6 text-center" @click="modifyMsgId = msg.id, modifyMsgValue = msg.message, showModify = !showModify" v-show="showModify"></i>
                <i class="fas fa-trash-alt btn-danger py-2 col-6 text-center" @click="destroyMsg(msg.id)" v-show="showModify"></i>
              </div>
            
            </div>
          </div>
          <div class="p-0 card" v-if="modifyMsgId === msg.id ">
            <textarea class="m-0 p-2 pt-4" v-model="modifyMsgValue"></textarea>
            <input class="m-0" type="button" value="modifier le message" @click="modifyMsg(msg.id_user)">
          </div>
          <div class="mx-2 my-4" v-else>{{msg.message}}</div>
          <div class="col-12 d-flex justify-content-center">
            <img v-bind:src=" msg.media" class="img-thumbnail"  style="max-height:200px;">
          </div>
        </div>



      </div>
      <div class="mt-5 d-flex align-items-center flex-column" v-if="modifyMsgId === ''">
        <textarea name="commentaire" class="col-10" placeholder="écrit ton commentaire ici !" v-model="newMsg"></textarea>
        <img class="img-thumbnail" style="height:100px;" v-bind:src="myGIF" v-if="selectMedia === 'gif' ">
        <img id="preview" class="img-thumbnail" style="max-height:200px;" v-if="selectMedia === 'file' ">

        <div class="d-flex col-12" v-if=" selectMedia !== 'gif' ">
          <input type="file" @change="checkMedia()" @click="selectMedia = 'file' "  v-if="selectMedia !== 'gif' " id="upload" name="file" class="form-control form-control-lg m-1" >
          <input type="button" value="choisir un GIF" @click="selectMedia= 'gif' "  v-if="selectMedia !== 'file' " class="form-control form-control-lg m-1">
        </div>

        <div v-if=" selectMedia === 'gif' "> 
            <input type="text" placeholder="chercher un GIF" v-model="valueSearchingGIF">
            <input type="button" @click="searchingGIF()" value="chercher">
            
        </div>

        <input class="mt-2" type="button" value="poster mon message" @click="createMsg">
        
        <div class="d-flex flex-wrap col-12 border justify-content-center" >
          <img  v-for=" gif in giflist" :key="gif.id" v-bind:src="gif.images.original.url" class="col-4 m-1" @click="myGIF = gif.images.original.url">
        </div>
      
      </div>
    </div>
  </div>
</template>

<script>
import{ HTTP } from '../http-constants'
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
var GphApiClient = require('giphy-js-sdk-core')
let client = GphApiClient("0wqBg77PwEJXOIzxuYCoD2cAVrB6mvOc")

export default {
  computed:{
    ... mapState(['tokenStore', 'pseudoStore', 'idStore', 'statusStore', 'nameSujetStore', 'creatorSujetStore']),
  },

  nape: "app",

  data() {
    return {
      newMsg:'',
      myGIF:'',
      valueSearchingGIF:'',
      listMsg:'',
      giflist:'',
      modifyMsgValue: '',
      modifyMsgId:'',
      selectMedia: '',
      showModify: true,
    }
  },

  created() {
    if(this.tokenStore == ''){
      if(localStorage.getItem('user')){
      let userStorage = JSON.parse(localStorage.getItem('user'))
      let positionStorage = JSON.parse(localStorage.getItem('position'))
      this.$store.dispatch('new_user', userStorage);
      this.$store.dispatch('select_sujet', positionStorage);
      HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
      HTTP.get('/messages/'+ this.$route.params.idCanal + '/' + this.$route.params.idSujet)
      .then(response =>{
        this.listMsg = response.data.result
      })
      .catch(err =>{
        document.getElementById('errorMsg').innerText = err.response.data.error;
      })
      }else{
        this.$router.push('/')
      }
    }else{
      HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
      HTTP.get('/messages/'+ this.$route.params.idCanal + '/' + this.$route.params.idSujet)
      .then(response =>{
        this.listMsg = response.data.result
      })
      .catch(err =>{
        document.getElementById('errorMsg').innerText = err.response.data.error;
      })
    }
  },

  methods: {
    ... mapActions(['disconnect_user', 'select_sujet', 'new_user']),

    createMsg() {
      HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
      const formulaire = {
        id: this.idStore,
        pseudo: this.pseudoStore,
        gif: this.myGIF,
        msg: this.newMsg
      }
      if( this.selectMedia === 'file' ){ //message envoyé avec un media
        const jsonResponse = JSON.stringify(formulaire)
        const form = new FormData();
        form.append("image", document.getElementById('upload').files[0], 'title.jpg');
        form.append('message', jsonResponse)
        HTTP.post('/messages/'+ this.$route.params.idCanal + '/' + this.$route.params.idSujet + '/create', form)
        .then(() =>{
          this.$router.go({name: 'Sujet', params: {idCanal: this.$route.params.idCanal, idSujet: this.$route.params.idSujet}})
        })
        .catch(err =>{
          document.getElementById('errorMsg').innerText = err.response.data.error;
        })
      
      }else { //message envoyé sans media
        HTTP.post('/messages/'+ this.$route.params.idCanal + '/' + this.$route.params.idSujet + '/create', formulaire)
        .then(() =>{
        this.$router.go({name: 'Sujet', params: {idCanal: this.$route.params.idCanal, idSujet: this.$route.params.idSujet}})
        })
        .catch(err =>{
          document.getElementById('errorMsg').innerText = err.response.data.error;
        })
      }
    },

    modifyMsg(idCreator){
      let formulaire = {
        id: this.idStore,
        idMsg: this.modifyMsgId,
        newMsg: this.modifyMsgValue,
        idCreator: idCreator,
      }
      HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
      HTTP.put('/messages/'+ this.$route.params.idCanal + '/' + this.$route.params.idSujet + '/' + this.modifyMsgId, formulaire)
      .then(()=>{
      this.$router.go({name: 'Sujet', params: {idCanal: this.$route.params.idCanal, idSujet: this.$route.params.idSujet}})
      })
      .catch(err =>{
        document.getElementById('errorMsg').innerText = err.response.data.error;
      })
    },

    destroyMsg(id){
      HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
      HTTP.delete('/messages/'+ this.$route.params.idCanal + '/' + this.$route.params.idSujet + '/' + id)
      .then(() =>{
        this.$router.go({name: 'Sujet', params: {idCanal: this.$route.params.idCanal, idSujet: this.$route.params.idSujet}})
      })
      .catch(err =>{
        document.getElementById('errorMsg').innerText = err.response.data.error;
      })
    },

    checkMedia(){
      var mediaPreview = new FileReader();
      mediaPreview.readAsDataURL(document.getElementById('upload').files[0]);
      mediaPreview.onload = function(file){
        document.getElementById('preview').src = file.target.result;
      }
    },
    
    searchingGIF(){
      client.search('gifs', {"q": this.valueSearchingGIF, "limit":10})
      .then((response) => {
          this.giflist = response.data;
          console.log(this.giflist)
      })
      .catch((err) => {
        console.log(err)
      })
    },

  }
}
</script>

<style scoped lang="scss">
</style>
