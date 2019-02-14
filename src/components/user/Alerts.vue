<template>
  <div class="alerts">
    <div class="alert alert-danger" v-if="error">{{ error }}</div>
    <div class="alert alert-info" v-else-if="posts.length === 0">User has no posts</div>
  </div>
</template>

<script>
  export default {
    props: ['error', 'posts']
  }
</script>

<style scoped>

</style>