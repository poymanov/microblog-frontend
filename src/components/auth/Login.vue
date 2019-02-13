<template>
  <div class="login">
    <h1>Login</h1>

    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" type="email" class="form-control" v-model="email"
               :class="{'is-invalid': emailFieldInvalid}">
        <div class="invalid-feedback" v-if="emailFieldInvalid">{{ errors.email }}</div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" v-model="password"
               :class="{'is-invalid': passwordFieldInvalid}">
        <div class="invalid-feedback" v-if="passwordFieldInvalid">{{ errors.password }}</div>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
  import axios from 'axios';
  import formMixin from '../mixins/formMixin';

  export default {
    mixins: [formMixin],
    data() {
      return {
        email: '',
        password: '',
        errors: {
          email: '',
          password: '',
        }
      }
    },
    computed: {
      emailFieldInvalid() {
        return this.checkFieldErrors('email');
      },
      passwordFieldInvalid() {
        return this.checkFieldErrors('password');
      },
    },
    methods: {
      onSubmit() {
        const loginData = this.getLoginData();

        // Очистка ошибок авторизации
        this.flushErrors();

        axios.post('auth/login', loginData).then(response => {
          // Успешная авторизация
          this.$store.dispatch('login', response.data.data.access_token);
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
            this.errors.email = errors;
          }
        });
      },
      getLoginData() {
        return {
          email: this.email,
          password: this.password,
        };
      }
    }
  }
</script>