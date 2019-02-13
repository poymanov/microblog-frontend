<template>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <a class="navbar-brand" href="#">Microblog</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
            aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarCollapse">
      <ul class="navbar-nav mr-auto">
        <router-link to="/" tag="li" class="nav-item" active-class="active" exact>
          <a class="nav-link">Home</a>
        </router-link>
        <router-link to="/register" tag="li" class="nav-item" active-class="active" v-if="!auth">
          <a class="nav-link">Register</a>
        </router-link>
        <router-link to="/login" tag="li" class="nav-item" active-class="active" v-if="!auth">
          <a class="nav-link">Login</a>
        </router-link>
        <router-link to="/newPost" tag="li" class="nav-item" active-class="active" v-if="auth">
          <a class="nav-link">New Post</a>
        </router-link>
        <li class="nav-item" v-if="auth">
          <a href="#" class="nav-link" @click="onLogout">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  export default {
    computed: {
      auth() {
        return this.$store.getters.isAuthenticated;
      }
    },
    methods: {
      onLogout() {
        this.$store.dispatch('logout')
      }
    }
  }
</script>

<style scoped>

</style>