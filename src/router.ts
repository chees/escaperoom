import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Game from './views/Game.vue';
import About from './views/About.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/game',
      name: 'game',
      component: Game,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
  ],
});
