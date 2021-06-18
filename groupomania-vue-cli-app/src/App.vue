<template>
  <div id="nav" class="container">
    <header class="container text-center mt-5">
      <img src="../src/assets/icon-font.svg" alt="Groupomania" width="200">
      
      <nav class="navbar-brand m-0 p-0 alert alert-danger d-flex flex-wrap">
      <router-link to="/news" class="mx-3">news</router-link>
      <router-link to="/forum" class="mx-3">forum</router-link>
      <router-link to="/myAccount" class="mx-3">mon profil</router-link>
      <router-link to="/myAccount/delete" class="mx-3">suppression compte</router-link>
      <router-link to="/thread" class="mx-3">liste sujets</router-link>
      <router-link to="/sujet/123" class="mx-3">le thread</router-link>
      <router-link to="/" class="mx-3">connexion</router-link>
      <router-link to="/inscription" class="mx-3">inscription</router-link>
      <router-link to="/sujet/new" class="mx-3">nouveau sujet</router-link>
    </nav>

    </header>
    
    
  <router-view></router-view>
  
  <footer class="text-center my-5">
    <div>
      contact - Groupomania
    </div>
    <div><i class="fas fa-phone-alt mr-2"></i> 08.12.12.12.12</div>
    <div><i class="fas fa-envelope mr-2"></i> groupomania@gmail.com</div>
  </footer>
  </div>
</template>

<script>
</script>

<style lang="scss">
</style>
