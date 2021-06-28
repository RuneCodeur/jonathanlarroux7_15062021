<template>
  <div class="myAccount">
    
    <nav class="navbar-brand m-0 text-center">
      <router-link to="/news" class="mx-3">news</router-link>
      <router-link to="/forum" class="mx-3">forum</router-link>
      <router-link to="/myAccount" class="mx-3">mon profil</router-link>
      <router-link to="/" class="mx-3">me deconnecter</router-link>
    </nav>

    <div class="d-flex container flex-column">

      <h2 class="text-center">mon compte</h2>

      <div class="d-flex mt-4 align-items-center"> connecté en tant que: <div class="mx-2 fw-bold fs-5 d-flex"> Didier </div></div>
     <input type="button" value="changer de pseudo" class="mt-2 col-6">
     
     <form method="post">
      <fieldset class="my-4">
        <div>
          <label for="pseudo" class="mx-3" >nouveau pseudo: </label><input type="text" name="pseudo">
        </div>
        <input type="button" value="je change de pseudo" class="my-3">
      </fieldset>
    </form>
    
    <div class="text-center my-2">
      <router-link to="/myAccount/delete">supprimer mon compte</router-link>
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
