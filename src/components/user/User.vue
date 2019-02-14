<template>
  <div class="user-posts">
    <h1>User #{{ this.id }}</h1>
    <Alerts :error="error" :posts="posts"></Alerts>
    <Post v-for="post in posts" :key="post.id" :post="post"></Post>
    <Pagination v-if="paginationData" :paginationData="paginationData"></Pagination>
  </div>
</template>

<script>
  import axios from 'axios';
  import Alerts from './Alerts';
  import Post from './Post';
  import Pagination from './Pagination';

  export default {
    components: {Alerts, Post, Pagination},
    data() {
      return {
        id: null,
        posts: [],
        error: null,
        page: null,
        paginationData: null
      }
    },
    methods: {
      getUserPosts() {
        this.id = this.$route.params.id;
        this.page = this.$route.query.page ? this.$route.query.page : 1;

        axios.get(`posts/${this.id}?page=${this.page}`).then(response => {
          // Успешная загрузка данных

          // Публикации
          this.posts = response.data.data;

          // Пагинация
          if (response.data.meta.total >= response.data.meta.per_page) {
            this.paginationData = {
              id: this.id,
              prev: response.data.links.prev,
              next: response.data.links.next,
              current_page: response.data.meta.current_page,
              last_page: response.data.meta.last_page,
            };
          }
        }).catch(error => {
          this.error = error.response.data.data.message;
        });
      },
    },
    watch: {
      '$route' (to, from) {
        this.getUserPosts();
      }
    },
    created() {
      this.getUserPosts();
    }
  }
</script>

<style scoped>
  .card {
    margin-bottom: 25px;
  }

  .card-title {
    font-weight: bold;
  }
</style>