import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    toast: null,
    toastComment: false,
    toastCommentDeleted: false,
    imgProfile: null,
    picProfile: null
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
    getOneUser(state) {
      const userId = localStorage.getItem("id");
      axios.get("https://social-network-groupmonia.herokuapp.com/home/users").then((response) => {
        if (response.data) {
          const data = response.data;
          const dataFilter = data.filter((user) => user.id == parseInt(userId));
          state.imgProfile = dataFilter[0].imageUser;
        }
      });
    },
  },
  actions: {
  },
  modules: {
  }
})
