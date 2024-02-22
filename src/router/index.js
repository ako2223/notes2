import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import TaskDetail from '../components/TaskDetail.vue';
import AddTask from '../components/AddTask.vue';
import Product from '../pages/Product.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/AboutPage.vue'),
    },
    { path: '/add', component: AddTask },
    { path: '/product/:id', name: 'product', component: Product },
  ],
});

export default router;
