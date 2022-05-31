import { createRouter, createWebHistory } from 'vue-router';

import TeamsList from './pages/TeamsList';
import UsersList from './pages/UsersList';
import TeamMembers from './components/teams/TeamMembers';
import NotFound from './pages/NotFound';
import TeamsFooter from './pages/TeamsFooter';
import UsersFooter from './pages/UsersFooter';

const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', redirect: '/teams' },
      {
        name: 'teams',
        path: '/teams',
        components: {
          default: TeamsList,
          footer: TeamsFooter,
        },
        children: [
          {
            name: 'teams-member',
            path: ':teamId',
            component: TeamMembers,
            props: true,
          },
        ],
      },
      {
        path: '/users',
        components: {
          default: UsersList,
          footer: UsersFooter,
        },
        beforeEnter: (to, from, next) => {
          console.log('users beforeEnter');
          console.log(to, from);
  
          next()
        }
      },
      { path: '/:notFound(.*)', component: NotFound },
    ],
    linkActiveClass: 'active',
    scrollBehavior(_, _2, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      }
      return {
        left: 0,
        top: 0,
      };
    },
  });
  
  router.beforeEach((to, from, next) => {
    console.log('Global beforeEach');
    console.log(to, from);
  
    // if (to.name === 'teams-member') {
    //   next();
    // } else {
    //   next({ name: 'teams-member', params: { teamId: 't2' } })
    // }
  
    next();
  });
  
  router.afterEach((to, from) => {
    // usefull for sending analytics data
    console.log('Global afterEach');
    console.log(to, from);
  })

  export default router