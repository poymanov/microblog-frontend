<template>
  <div class="signup">
    <h1>Register</h1>

    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" :class="{'is-invalid': nameFieldInvalid}" id="name" v-model="name">
        <div class="invalid-feedback" v-if="nameFieldInvalid">{{ errors.name }}</div>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" :class="{'is-invalid': emailFieldInvalid}" id="email" v-model="email">
        <div class="invalid-feedback" v-if="emailFieldInvalid">{{ errors.email }}</div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" v-model="password" :class="{'is-invalid': passwordFieldInvalid}">
        <div class="invalid-feedback" v-if="passwordFieldInvalid">{{ errors.password }}</div>
      </div>
      <div class="form-group">
        <label for="password">Password Confirmation</label>
        <input type="password" class="form-control" id="password_confirmation" v-model="password_confirmation"
               :class="{'is-invalid': passwordConfirmationFieldInvalid}">
        <div class="invalid-feedback" v-if="passwordConfirmationFieldInvalid">{{ errors.password_confirmation }}</div>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
  import axios from 'axios';
  import router from '../../router';
  import authMixin from './authMixin';

  export default {
    mixins: [authMixin],
    data() {
      return {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        errors: {
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
        }
      }
    },
    computed: {
      nameFieldInvalid() {
        return this.checkFieldErrors('name');
      },
      emailFieldInvalid() {
        return this.checkFieldErrors('email');
      },
      passwordFieldInvalid() {
        return this.checkFieldErrors('password');
      },
      passwordConfirmationFieldInvalid() {
        return this.checkFieldErrors('password_confirmation');
      },
    },
    methods: {
      onSubmit() {
        // Значения полей для запроса
        const signupData = this.getSignupData();

        // Очистка ошибок полей
        this.flushErrors();

        axios.post('auth/signup', signupData).then(response => {
          // Успешная регистрация
          alert('Registration completed successfully');
          router.replace('/login');
        }).catch(error => {
          // Ошибки регистрации
          let errors = error.response.data.data.errors;

          for(let index in errors) {
            let error = errors[index];

            this.errors[index] = error[0];
          }
        });
      },
      getSignupData() {
        return {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
        };
      }
    }
  }
</script>