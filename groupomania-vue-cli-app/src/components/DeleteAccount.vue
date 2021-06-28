<template>
  <div class="delete text-center">

    <nav class="navbar-brand m-0 text-center">
      <router-link to="/news" class="mx-3">news</router-link>
      <router-link to="/forum" class="mx-3">forum</router-link>
      <router-link to="/myAccount" class="mx-3">mon profil</router-link>
      <router-link to="/" class="mx-3">me deconnecter</router-link>
    </nav>
    <h2>suppression du compte</h2>
    <div class="d-flex container flex-column alert alert-warning fs-4">
      Attention : la suppression du compte est irréversible !
    </div>
    <input type="button" value="je supprime mon compte" class="my-4 fs-4 btn-danger p-2">
    
  </div>
</template>

<script>
export default {
}
</script>

<style scoped lang="scss">
</style>
