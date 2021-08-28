import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue'), name: 'Home'},
      { path: '/offer', component: () => import('pages/Offer.vue'), name: 'Offer'}, 
      { path: '/request', component: () => import('pages/Request.vue'), name: 'Request' },
      { path: '/about', component: () => import('pages/About.vue'), name: 'About' }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
