<template>
  <div class="thread">

    <nav class="navbar-brand m-0 text-center">
      <router-link to="/news" class="mx-3">news</router-link>
      <router-link to="/forum" class="mx-3">forum</router-link>
      <router-link to="/myAccount" class="mx-3">mon profil</router-link>
      <router-link to="/" class="mx-3">me deconnecter</router-link>
    </nav>
    
    <div class="d-flex container flex-column text-center">
      <h2>*nom du sujet*</h2>
      <p>par jean eude pascal</p>

      <div class="d-flex align-items-center flex-column">
        
        <div class="card col-11 text-start border border-primary">
          <div class="border-bottom border-secondary p-1">
            <div class="fw-bold fs-5">jean roger moure</div>
            <div class="row m-0"> 
              <div class="fst-italic p-0 col-8 border">le 12/03/2021 à 12h12</div>
            <i class="fas fa-cog btn-warning py-2 col-2 text-center"></i>
            <i class="fas fa-trash-alt btn-danger py-2 col-2 text-center"></i>
            </div>
          </div>
          <div class="mx-2 my-4">alors voila, moi j'aime bien les saucisses de francfort <br> et vous ????</div>
        </div>

      </div>
      <div class="mt-5 d-flex align-items-center flex-column ">
        <textarea name="commentaire" class="col-10" placeholder="écrit ton commentaire ici !"></textarea>
        <input class="mt-2" type="button" value="poster">
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
