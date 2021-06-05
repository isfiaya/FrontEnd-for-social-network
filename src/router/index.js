import Vue from 'vue';
import VueRouter from 'vue-router';
import Log from '../views/Log.vue';
import Sign from '../views/Sign.vue';
import Mur from '../views/Mur.vue';
import Profile from '../views/Profile.vue';
import Card from '../components/Card.vue';
import Panel from '../components/Panel.vue';
import InfoUser from '../components/InfoUser.vue';
import InfoEdit from '../components/InfoEdit.vue';
import NoPostsYet from '../components/NoPostsYet.vue';

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
    component: Mur,
  },
  {
    path: '/profile:id',
    name: 'profile',
    component: Profile,
    children: [
      {
        path: '',
        name: 'profile',
        props: true,
        components: {
          NoPostsYet,
          Panel,
          Card,
        }
      },
      {
        path: 'about',
        name: 'about',
        props: true,
        components: {
          InfoUser
        }
      },
      {
        path: 'about/edit',
        name: 'about',
        props: true,
        components: {
          InfoEdit
        }
      }
    ]
  },
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router