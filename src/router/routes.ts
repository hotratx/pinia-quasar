import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', name: 'loginDefault', component: () => import('pages/Login.vue') },
      { path: 'login', name: 'login', component: () => import('pages/Login.vue') },
      { path: 'register', name: 'register', component: () => import('pages/Register.vue') },
      { path: 'email-confirmation', name: 'email-confirmation', component: () => import('pages/EmailConfirmation.vue') },
      { path: 'forgot-password', name: 'forgot-password', component: () => import('pages/ForgotPassword.vue') },
      { path: 'reset-password', name: 'reset-password', component: () => import('pages/ResetPassword.vue') },
    ],
  },  
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/Index.vue') },
      { path: 'me', name: 'me', component: () => import('pages/Me.vue') },
      { path: 'pacientes', name: 'pacientes', component: () => import('pages/pacientes/List.vue') },
      { path: 'form-pacientes/:id?', name: 'form-pacientes', component: () => import('pages/pacientes/Form.vue') },
    ],
    meta: {
      // estas rotas precisam estar com isLogging true
      // as rotas de cima que não tem este meta o resultado será sempre falso
      // logo o primeiro if fo Router.beforeEach será falso, levando a página de login.
      requiresAuth: true
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
