import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

import Login from './views/Login.vue';
import Dashboard from './views/Dashboard.vue';
import TeamManagement from './views/TeamManagement.vue';
import SourceCodeManagement from './views/SourceCodeManagement.vue';
import GameManagement from './views/GameManagement.vue';
import QualificationGames from './views/QualificationGames.vue';
import QualificationStanding from './views/QualificationStanding.vue';
import FinalGames from './views/FinalGames.vue';
import Payment from './views/Payment.vue';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      component: Dashboard,
      children: [
        {
          path: '',
          name: 'teamManagement',
          component: TeamManagement
        },
        {
          path: '/sourcecode',
          name: 'SourceCodeManagement',
          component: SourceCodeManagement
        },
        {
          path: '/game',
          name: 'GameManagement',
          component: GameManagement
        },
        {
          path: '/qualification',
          name: 'QualificationGames',
          component: QualificationGames
        },
        {
          path: '/qualification-standing',
          name: 'QualificationStanding',
          component: QualificationStanding
        },
        {
          path: '/finalgames',
          name: 'FinalGames',
          component: FinalGames
        },
        {
          path: '/payment',
          name: 'Payment',
          component: Payment,
          beforeEnter: (to, from, next) => {
            if (store.state.teamInfo.qualified) next();
          }
        }
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const authRequired = to.path !== '/login';
  const loggedIn = store.state.isLoggedIn;

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
});

export default router;
