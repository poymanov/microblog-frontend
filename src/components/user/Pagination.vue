<template>
  <nav>
    <ul class="pagination">
      <li :class="{'page-item': true, 'disabled': !hasPrev}">
        <a class="page-link" :href="getPageLink(current_page - 1)">Prev</a>
      </li>
      <li v-for="n in last_page" :class="{'page-item': true, 'active': n === current_page}">
        <a class="page-link" :href="getPageLink(n)">{{ n }}</a>
      </li>
      <li :class="{'page-item': true, 'disabled': !hasNext}">
        <a class="page-link" :href="getPageLink(current_page + 1)">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    data() {
      return {
        hasPrev: false,
        hasNext: false,
        current_page: null,
        last_page: null,
        id: null,
      }
    },
    props: ['paginationData'],
    methods: {
      getPageLink(page) {
        return `/user/${this.id}?page=${page}`;
      },
    },
    created() {
      if (this.paginationData.prev) {
        this.hasPrev = true;
      }

      if (this.paginationData.next) {
        this.hasNext = true;
      }

      this.id = this.paginationData.id;

      this.last_page = this.paginationData.last_page;
      this.current_page = this.paginationData.current_page;
    }
  }
</script>

<style scoped>

</style>