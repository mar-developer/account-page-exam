// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Profile from '../views/Profile.vue';

const routes = [{ path: '/', component: Profile }];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
