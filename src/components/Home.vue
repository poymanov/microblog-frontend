<template>
  <div class="jumbotron">
    <h1>Welcome to microblog!</h1>
    <p v-if="!auth">
      <router-link to="/register" class="btn btn-lg btn-primary">Register</router-link>
    </p>
    <p v-if="!auth">
      <router-link to="/login" class="btn btn-lg btn-primary">Login</router-link>
    </p>
  </div>
</template>

<script>
  export default {
    computed: {
      auth() {
        return this.$store.getters.isAuthenticated;
      }
    },
  }
</script>
