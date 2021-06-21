<template>
  <div class="threadList">

    <nav class="navbar-brand m-0 text-center">
      <router-link to="/news" class="mx-3">news</router-link>
      <router-link to="/forum" class="mx-3">forum</router-link>
      <router-link to="/myAccount" class="mx-3">mon profil</router-link>
    </nav>
    
    <div class="d-flex container flex-column text-center">

      <h2>*nom du forum*</h2>
      <div class="row col-12">
        <div class="col-7 border">nom du sujet</div>
        <div class="col-4 border">auteur du sujet</div>
      </div>
      <div>
        <router-link to="/sujet/123" class="text-decoration-none text-dark d-flex row col-12">
          <div class="col-7 border">que pensez vous des saucisses de francfort ???</div>
          <div class="col-4 border"> jean eude pascal</div>
          <div class="col-1 d-flex flex-column p-0 fs-6 justify-content-around">
            <i class="fas fa-cog btn-warning py-2"></i>
            <i class="fas fa-trash-alt btn-danger py-2"></i>
          </div>
      </router-link>
      </div>

      <router-link to="/sujet/new" class="mx-3">nouveau sujet</router-link>
      
      <div class="d-flex justify-content-center row mt-4 " >
      
      <input type="button" class="m-1 col-6" value="supprimer un sujet" >
      
      </div> 
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped lang="scss">
</style>
