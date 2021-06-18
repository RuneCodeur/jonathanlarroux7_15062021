<template>
  <div class="threadList">

    <nav class="navbar-brand m-0 text-center">
      <router-link to="/news" class="mx-3">news</router-link>
      <router-link to="/forum" class="mx-3">forum</router-link>
      <router-link to="/myAccount" class="mx-3">mon profil</router-link>
    </nav>
    
    <div class="d-flex container flex-column text-center">

      <h2>nouveau sujet</h2>
  
      <form class="d-flex justify-content-center row my-4" method="post">
        <fieldset class="text-center">

           <label for="title" class=""> titre du sujet: </label>
          <input type="text" name="title" placeholder="titre du sujet" class="m-2 col-6">
        
        <textarea name="commentaire" class="col-10" placeholder="mon commentaire ici !"></textarea>
        </fieldset>
        <input type="button" value="créer un sujet" class="col-5" >
      </form>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped lang="scss">
</style>
