import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    toast: null,
    toastComment: false,
    toastCommentDeleted: false
  },
  mutations: {
    showToast(state) {
      state.toast = true;
      setTimeout(() => {
        state.toast = false;
      }, 2000);
    },
    showToastComment(state) {
      state.toastComment = true;
      setTimeout(() => {
        state.toastComment = false;
      }, 2000);
    },
    showToastDeleteComment(state) {
      state.toastCommentDeleted = true;
      setTimeout(() => {
        state.toastCommentDeleted = false;
      }, 2000);
    },
  },
  actions: {
  },
  modules: {
  }
})
