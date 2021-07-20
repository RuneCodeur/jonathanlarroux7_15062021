<template>
  <div class="sujet">

    <nav class="navbar-brand m-0 text-center fs-6 d-flex flex-wrap justify-content-center border">
      <router-link to="/news" class="mx-3"> News </router-link>
      <router-link to="/welcome" class="mx-3"> Forum </router-link>
      <router-link to="/myAccount" class="mx-3"> Mon profil </router-link>
      <router-link to="/" class="mx-3" @click="disconnect_user()"> Me deconnecter </router-link>
    </nav>
    
    <div class="d-flex container flex-column text-center">

      <h2> {{$store.state.nameSujetStore}} </h2>

      <p v-if="$store.state.creatorSujetStore != null"> par {{$store.state.creatorSujetStore}} </p>
      <p v-if="$store.state.creatorSujetStore == null"> par - Utilisateur supprimé - </p>

      <div class="d-flex align-items-center flex-column">
        <div class="card col-11 text-start border border-primary" v-for="msg in listMsg" :key="msg.id">
          <div class="border-bottom border-secondary p-1">
            <div class="fw-bold fs-5" v-if="msg.name_user != null"> {{msg.name_user}} </div>
            <div class="fw-bold fs-5" v-if="msg.name_user == null"> - Utilisateur supprimé - </div>
            <div class="row m-0"> 
              <div class="fst-italic p-0 col-8 border"> le {{msg.date}} </div>
              <div class="col-4" v-if="msg.id_user === idStore || statusStore == 1">
                <i class="fas fa-cog btn-warning py-2 col-6 text-center" @click="modifyMsgId = msg.id, modifyMsgValue = msg.message.replaceAll('<br />', ' '), showModify = !showModify" v-show="!showModify && !showDelete"></i>
                <i class="fas fa-trash-alt btn-danger py-2 col-6 text-center" @click="destroyMsg(msg.id)" v-show="!showModify && !showDelete"></i>
              </div>
            </div>
          </div>
          <div class="p-0 card" v-if="modifyMsgId === msg.id ">

            <div id="errorMsg" class="text-danger text-center"></div>

            <textarea class="m-0 p-2 pt-4" v-model="modifyMsgValue"></textarea>
            <input class="m-0" type="button" value="modifier le message" @click="modifyMsg(msg.id)">
          </div>

          <div class="mx-2 my-4" v-else v-html="msg.message"></div>

          <div class="col-12 d-flex justify-content-center">
            <img v-bind:src=" msg.media" class="img-thumbnail"  style="max-height:200px;">
          </div>
        </div>
      </div>

      <div class="mt-5 d-flex align-items-center flex-column" v-if="modifyMsgId === '' && showDelete === false">

        <div id="errorSendMsg" class="text-danger text-center"></div>

        <textarea name="commentaire" class="col-10" placeholder="écrit ton commentaire ici !" v-model="newMsg" ></textarea>
        <img class="img-thumbnail" style="height:100px;" v-bind:src="myGIF" v-if="myGIF !== '' ">
        <img id="preview" class="img-thumbnail" style="max-height:200px;" v-if="selectMedia === 'file' ">

        <div class="d-flex flex-column col-10 col-md-7 col-lg-5 col-xl-4" v-if=" selectMedia !== 'gif' ">
          <input type="file" @change="checkMedia()" @click="selectMedia= 'file' "  v-if="selectMedia !== 'gif' " id="upload" name="file" class="form-control form-control-lg m-1" >
          <input type="button" value="Choisir un GIF" @click="selectMedia= 'gif' "  v-if="selectMedia !== 'file' " class="form-control form-control-lg m-1">
        </div>

        <div  class="mt-3" v-if=" selectMedia === 'gif'"> 
            <input type="text" placeholder="Chercher un GIF" v-model="valueSearchingGIF">
            <input type="button" @click="searchingGIF()" value="chercher">
        </div>

        <input class="mt-2" type="button" value="Poster mon message" @click="createMsg" id="buttonSend">
        
        <div class="d-flex flex-wrap col-12 justify-content-center" >
          <img  v-for=" gif in gifList" :key="gif.id" v-bind:src="gif.images.original.url" class="m-1 img-thumbnail" style="max-height:300px;" @click="myGIF = gif.images.original.url">
        </div>
      
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP } from '../http-constants'
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
const GphApiClient = require('giphy-js-sdk-core')
const client = GphApiClient("0wqBg77PwEJXOIzxuYCoD2cAVrB6mvOc")

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
      gifList:'',
      modifyMsgValue: '',
      modifyMsgId:'',
      selectMedia: '',
      showModify: false,
      showDelete: false,
    }
  },

  created() {
    if(this.tokenStore == ''){
      if(localStorage.getItem('user')){
      let userStorage = JSON.parse(localStorage.getItem('user'));
      let positionStorage = JSON.parse(localStorage.getItem('position'));
      this.$store.dispatch('new_user', userStorage);
      this.$store.dispatch('select_sujet', positionStorage);
      HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
      HTTP.get('/messages/'+ this.$route.params.idForum + '/' + this.$route.params.idSujet)
      .then(response =>{
        this.listMsg = response.data.result;
      })
      .catch(err =>{
        if(err.response.status == 401){
          this.$store.dispatch('disconnect_user');
          this.$router.push('/');
        }else{
          document.getElementById('errorMsg').innerText = 'erreur '+ err.response.status +' : ' + err.response.data.error;
        }
      })
      }else{
        this.$store.dispatch('disconnect_user');
        this.$router.push('/');
      }
    }else{
      HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
      HTTP.get('/messages/'+ this.$route.params.idForum + '/' + this.$route.params.idSujet)
      .then(response =>{
        this.listMsg = response.data.result;
      })
      .catch(err =>{
        if(err.response.status == 401){
          this.$store.dispatch('disconnect_user');
          this.$router.push('/');
        }else{
          document.getElementById('errorMsg').innerText = 'erreur '+ err.response.status +' : ' + err.response.data.error;
        }
      })
    }
  },

  methods: {
    ... mapActions(['disconnect_user', 'select_sujet', 'new_user']),

    createMsg() {
      document.getElementById('buttonSend').disabled = true;
      HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
      const formulaire = {
        id: this.idStore,
        pseudo: this.pseudoStore,
        gif: this.myGIF,
        msg: this.newMsg
      };
      //message envoyé avec un media
      if( this.selectMedia === 'file' ){
        const jsonResponse = JSON.stringify(formulaire);
        const form = new FormData();
        form.append("image", document.getElementById('upload').files[0], 'title.jpg');
        form.append('message', jsonResponse);
        HTTP.post('/messages/'+ this.$route.params.idForum + '/' + this.$route.params.idSujet + '/create', form)
        .then(() =>{
          this.$router.go({name: 'Sujet', params: {idForum: this.$route.params.idForum, idSujet: this.$route.params.idSujet}});
        })
        .catch(err =>{
          document.getElementById('buttonSend').disabled = false;
          document.getElementById('errorSendMsg').innerText = 'erreur '+ err.response.status +' : ' + err.response.data.error;
        })

      //message envoyé sans media
      }else { 
        HTTP.post('/messages/'+ this.$route.params.idForum + '/' + this.$route.params.idSujet + '/create', formulaire)
        .then(() =>{
        this.$router.go({name: 'Sujet', params: {idForum: this.$route.params.idForum, idSujet: this.$route.params.idSujet}});
        })
        .catch(err =>{
          document.getElementById('buttonSend').disabled = false;
          document.getElementById('errorSendMsg').innerText = 'erreur '+ err.response.status +' : ' + err.response.data.error;
        })
      }
    },

    modifyMsg(idCreator){
      const formulaire = {
        id: this.idStore,
        newMsg: this.modifyMsgValue,
      };
      HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
      HTTP.put('/messages/'+ this.$route.params.idForum + '/' + this.$route.params.idSujet + '/' +idCreator, formulaire)
      .then(()=>{
      this.$router.go({name: 'Sujet', params: {idForum: this.$route.params.idForum, idSujet: this.$route.params.idSujet}});
      })
      .catch(err =>{
        document.getElementById('errorMsg').innerText = 'erreur '+ err.response.status +' : ' + err.response.data.error;
      })
    },

    destroyMsg(idMsg){
      this.showDelete = !this.showDelete;
      HTTP.defaults.headers.common['Authorization'] = `bearer ${this.tokenStore}`;
      HTTP.delete('/messages/'+ this.$route.params.idForum + '/' + this.$route.params.idSujet + '/' + idMsg)
      .then(() =>{
        this.$router.go({name: 'Sujet', params: {idForum: this.$route.params.idForum, idSujet: this.$route.params.idSujet}});
      })
      .catch(err =>{
        document.getElementById('errorMsg').innerText = 'erreur '+ err.response.status +' : ' + err.response.data.error;
      })
    },

    checkMedia(){
      let doc = document.getElementById('upload').files[0]
      if((doc.type === 'image/png') || (doc.type === 'image/jpg') ||(doc.type === 'image/jpeg')){
        document.getElementById('buttonSend').disabled = false;
        document.getElementById('errorSendMsg').innerText = '';
        var mediaPreview = new FileReader();
        mediaPreview.readAsDataURL(doc);
        mediaPreview.onload = function(file){
          document.getElementById('preview').src = file.target.result;
        }
      }else{
        document.getElementById('buttonSend').disabled = true;
          document.getElementById('preview').src = '';
          document.getElementById('errorSendMsg').innerText = 'le fichier doit être au format .jpeg, .jpg ou .png.';
      }
    },
    
    searchingGIF(){
      client.search('gifs', {"q": this.valueSearchingGIF, "limit":10})
      .then((response) => {
        this.gifList = response.data;
      })
      .catch((err) => {
        document.getElementById('errorSendMsg').innerText = err.response.data.error;
      })
    },

  }
}
</script>

<style scoped lang="scss">
</style>
