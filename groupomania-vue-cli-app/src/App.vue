<template>
  <div id="nav" class="container">
    <header class="container text-center my-5">
      <img src="../src/assets/icon-font.svg" alt="Groupomania" width="200">
      <nav class="navbar-brand m-0 p-0 alert alert-danger text-center">
      <router-link to="/" class="mx-3">news</router-link>
      <router-link to="/" class="mx-3">forum</router-link>
      <router-link to="/" class="mx-3">règles du forum</router-link>
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
