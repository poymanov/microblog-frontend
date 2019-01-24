import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessToken: null
  },
  mutations: {
    authUser(state, accessToken) {
      state.accessToken = accessToken;
    },
    clearAuthData (state) {
      state.accessToken = null;
    }
  },
  actions: {
    login({commit, dispatch}, accessToken) {
      // Запись токена в состояние приложения
      commit('authUser', accessToken);

      // Запись токена в localStorage
      localStorage.setItem('accessToken', accessToken);

      // Редирект на главную страницу
      router.replace('/')
    },
    autoLogin({commit}) {
      // Получение токена из localStorage
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        return;
      }

      // Запись токена в состояние приложения
      commit('authUser', accessToken);
    },
    logout ({commit}) {
      // Удаление данных авторизации из состояния приложения
      commit('clearAuthData');

      // Удаление данных из localStorage
      localStorage.removeItem('accessToken');

      // Редирект на главную страницу
      router.replace('/')
    },
  },
  getters: {
    isAuthenticated (state) {
      return state.accessToken !== null
    }
  }
})
