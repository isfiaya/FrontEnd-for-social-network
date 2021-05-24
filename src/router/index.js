import Vue from 'vue';
import VueRouter from 'vue-router';
import Log from '../views/Log.vue';
import Sign from '../views/Sign.vue';
import Mur from '../views/Mur.vue';
import Profile from '../views/Profile.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Log
  },
  {
    path: '/',
    name: 'login',
    component: Log
  },

  {
    path: '/signup',
    name: 'signup',
    component: Sign
  },
  {
    path: '/home',
    name: 'home',
    component: Mur
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router