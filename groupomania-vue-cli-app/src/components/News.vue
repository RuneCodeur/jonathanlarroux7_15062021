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
        
        <router-link to="/" class="text-decoration-none text-dark card col-10 my-2 text-start border border-primary">
          <div class="border-bottom border-secondary p-1 mb-4">
            <div class="fw-bold fs-5">jean roger moure</div>
            <div class="fst-italic px-3">le 12/03/2021 à 12h41</div>
          </div>
          <div class="mx-2">alors voila, moi j'aime bien les saucisses de francfort</div>
        </router-link>

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
