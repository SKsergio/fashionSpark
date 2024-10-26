import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { isAuthenticated } from '.././auth';
import HomeView from '../views/HomeView.vue'
import PerfilView from '@/views/PerfilView.vue'
import DesignerView from '@/views/DesignerView.vue'
import PlanesView from '@/views/PlanesView.vue'
import CreateDesign from '@/components/actions/CreateDesign.vue'
import LoginView from '@/views/LoginView.vue'

//prendas
import VestidoMujer from '@/components/prendas/VestidoMujer.vue'
import CamisaBase from '@/components/prendas/CamisaBase.vue'

//pahos
import PagoView from '@/views/PagoView.vue';
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
    component: CreateDesign, // Componente para editar
    children: [
      {
        path: '/vestido',
        name: 'vestido',
        component: VestidoMujer
      },
      {
        path: '/sueter',
        name: 'sueter',
        component: CamisaBase 
      }
    ]
  },
  {
    path: '/planes',
    name: 'planes',
    component: PlanesView
  },
  {
    path: '/pago',
    name: 'pago',
    component: PagoView,
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
  } else if (to.name === 'login' && isAuthenticated.value) {
    next({ name: 'home' }); // Redirige a home si está autenticado y está en login
  } else {
    next();
  }
});



export default router
