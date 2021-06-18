<template>
  <div class="inscription">
    
    <nav class="navbar-brand m-0 text-center">
      <router-link to="/" class="mx-3">connexion</router-link>
      <router-link to="/inscription" class="mx-3">inscription</router-link>
    </nav>

    <form class="d-flex container flex-column" method="post">
      <fieldset class="text-center">

        <legend>inscription</legend>

        <div class="my-2">
          <label for="pseudo" class="col-3 col-md-2" >pseudo: </label><input type="text" name="pseudo">
        </div>
        <div class="my-2">
          <label for="mail" class="col-3 col-md-2">adresse mail: </label><input type="mail" name="mail">
        </div>
        <div class="my-2">
          <label for="password" class="col-3 col-md-2">mot de passe: </label><input type="password" name="password">
        </div>
        <input type="submit" value="je m'inscrit" class="my-4">

      </fieldset>
    </form>
  </div>
</template>

<script>
</script>

<style scoped lang="scss">
</style>
