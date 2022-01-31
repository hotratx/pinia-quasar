import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import routes from './routes';
import { useAuth } from '../store/useAuthUser'
import useSupabase from 'boot/supabase'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });

  Router.beforeEach((to) => {
    const store = useAuth()
    //const { supabase } = useSupabase()

    console.log('BEFOREEACH')
    // supabase.auth.onAuthStateChange((event, session) => {
    // if (session) {
    //   console.log(`SESSION DO SUPABASE: ${JSON.stringify(session.access_token)}`) }
    // })
    if (
      !store.isLogging &&
      to.meta.requiresAuth
      //se a url contiver o 'fromEmail' então pulará esta verificação
      //ou seja, toda rota com o 'fromEmail' terá permissão para passar esta verificação.
      //&& !Object.keys(to.query).includes('fromEmail')
    ) {
      const value = localStorage.getItem('supabase.auth.token')
      if (typeof value === 'string') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const x = JSON.parse(value)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (x?.currentSession) {

          store.user = x.currentSession.user  // eslint-disable-line
          console.log('vai setar o user', store.user)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          console.log('localStorage supabase: ', x.currentSession.user)
        }



      }
      //return { name: 'login'}
    }

    if (
      to.hash.includes('type=recovery') &&
      to.name !== 'reset-password'
    ) {
      const accessToken = to.hash.split('&')[0]
      const token = accessToken.replace('#access_token=', '')
      return  { name: 'reset-password', query: { token } }
    }
  })
  
  return Router;
});
