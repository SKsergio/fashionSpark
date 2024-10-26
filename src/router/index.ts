import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { isAuthenticated } from '.././auth';
import HomeView from '../views/HomeView.vue'
import PerfilView from '@/views/PerfilView.vue'
import DesignerView from '@/views/DesignerView.vue'
import PlanesView from '@/views/PlanesView.vue'
import CreateDesign from '@/components/actions/CreateDesign.vue'
import LoginView from '@/views/LoginView.vue'
import PagoView from '@/views/PagoView.vue'
import RegistrarView from '@/views/RegistrarView.vue';



const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'profile',
    component: PerfilView,
    meta: { requiresAuth: true }
  },
  {
    path: '/designer',
    name: 'designer',
    component: DesignerView,
    meta: { requiresAuth: true }
  },
  {
    path: '/designer/create',
    name: 'designerCreate',
    component: CreateDesign,
    meta: { requiresAuth: true }
  },
  {
    path: '/planes',
    name: 'planes',
    component: PlanesView,
    meta: { requiresAuth: true }
  },
  {
    path: '/pago',
    name: 'pago',
    component: PagoView,
    meta: { requiresAuth: true }
  },
  {
    path: '/registrar',
    name: 'registrar',
    component: RegistrarView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({ name: 'login' });
  } else {
    next();
  }
});


export default router
