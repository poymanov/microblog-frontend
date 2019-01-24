export default {
  methods: {
    flushErrors() {
      for(let index in this.errors) {
        this.errors[index] = '';
      }
    },
    checkFieldErrors(field) {
      return this.errors[field].length > 0;
    }
  }
};