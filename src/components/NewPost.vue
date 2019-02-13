<template>
  <div class="new-post">
    <h1>New Post</h1>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="text">Text</label>
        <textarea id="text" class="form-control" v-model="text"
                  :class="{'textarea': true, 'is-invalid': textFieldInvalid}"></textarea>
        <div class="invalid-feedback" v-if="textFieldInvalid">{{ errors.text }}</div>
        <div :class="{'text-length': true, 'text-length--error': textLengthOversized}">Count: {{ this.textLength }}</div>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
  import axios from 'axios';
  import formMixin from './mixins/formMixin';

  export default {
    mixins: [formMixin],
    data() {
      return {
        maxLength: 300,
        text: '',
        errors: {
          text: '',
        }
      }
    },
    computed: {
      textFieldInvalid() {
        return this.checkFieldErrors('text');
      },
      textLength() {
        return this.text.length;
      },
      textLengthOversized() {
        return this.textLength >= this.maxLength;
      }
    },
    methods: {
      onSubmit() {
        const textData = {text: this.text};
        // Очистка ошибок
        this.flushErrors();

        axios.post('posts', textData).then(response => {
          // Успешная публикация
          this.text = '';
          alert('Post was published');
        }).catch(error => {
          let errors = error.response.data.data.errors;

          // Если пришли ошибки по отдельным полям
          if (typeof errors === 'object') {
            for (let index in errors) {
              let error = errors[index];

              this.errors[index] = error[0];
            }
          } else {
            // Если пришла общая ошибка
            this.errors.text = errors;
          }
        });
      }
    }
  }
</script>

<style scoped>
  .text-length {
    text-align: right;
    font-weight: bold;
  }

  .text-length--error {
    color: #ff0000;
  }

  .textarea {
    margin-bottom: 10px;
  }
</style>