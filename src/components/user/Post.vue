<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ getFormattedCreatedDate(post.created_at) }}</h5>
      <p class="card-text">{{ post.text }}</p>
    </div>
  </div>
</template>

<script>
  import * as moment from 'moment';

  export default {
    props: ['post'],
    methods: {
      getFormattedCreatedDate(timestamp) {
        let date = moment(timestamp * 1000);
        return `${date.format("DD-MM-YYYY")} at ${date.format("HH:mm")}`;
      }
    }
  }
</script>

<style scoped>

</style>