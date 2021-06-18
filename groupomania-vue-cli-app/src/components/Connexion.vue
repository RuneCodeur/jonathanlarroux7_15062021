<template>
  <div class="connexion">
    
    <nav class="navbar-brand m-0 text-center">
      <router-link to="/" class="mx-3">connexion</router-link>
      <router-link to="/inscription" class="mx-3">inscription</router-link>
    </nav>

    <form class="d-flex container flex-column" method="post">
      <fieldset class="text-center">

        <legend>connexion</legend>

        <div class="my-2">
          <label for="mail" class="col-3 col-md-2">adresse mail: </label><input type="mail" name="mail">
        </div>
        <div class="my-2">
          <label for="password" class="col-3 col-md-2">mot de passe: </label><input type="password" name="password">
        </div>
        <input type="submit" value="je me connecte" class="my-4">

      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped lang="scss">
</style>
