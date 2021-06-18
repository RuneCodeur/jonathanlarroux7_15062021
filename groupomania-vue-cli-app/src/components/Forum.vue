<template>
  <div class="forum">

    <nav class="navbar-brand m-0 text-center">
      <router-link to="/news" class="mx-3">news</router-link>
      <router-link to="/forum" class="mx-3">forum</router-link>
      <router-link to="/myAccount" class="mx-3">mon profil</router-link>
    </nav>
    
    <div class="d-flex container flex-column text-center">

      <h2>forum</h2>
      
      <div class="d-flex align-items-center flex-column">

        <div class="fs-3 my-2 row col-12">
          <router-link to="/thread" class="text-decoration-none text-white card col-10 p-2 bg-success">
          *faire des trucs le Week-end*
          </router-link>
          <input type="button" value="X" class="col-2 btn-danger">
        </div>
        
        

      </div>
      <div class="d-flex justify-content-center row mt-4" >
        <input type="button" class="m-1 col-6" value="ajouter un forum">
      <form class="d-flex justify-content-center row my-4" method="post">
        <fieldset class="text-center">
           <label for="title" class=""> titre du forum: </label>
          <input type="text" name="title" placeholder="titre du forum" class="m-2 col-6">
        </fieldset>
        <input type="button" value="ajouter" class="col-3" >
      </form>
      <input type="button" class="m-1 col-6" value="supprimer un forum" >
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
