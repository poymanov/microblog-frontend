import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'

Vue.use(Router);

const redirectIfAuth = (to, from, next) => {
  // Если есть токен доступа, то пользователь авторизован
  // и его нужно переадресовать на главную страницу
  if (localStorage.getItem('accessToken')) {
    next('/');
  } else {
    next();
  }
};

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./components/auth/Register.vue'),
      beforeEnter: redirectIfAuth
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./components/auth/Login.vue'),
      beforeEnter: redirectIfAuth
    },
  ],
});
