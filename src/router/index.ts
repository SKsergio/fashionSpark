import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PerfilView from '@/views/PerfilView.vue'
import DesignerView from '@/views/DesignerView.vue'
import PlanesView from '@/views/PlanesView.vue'
import CreateDesign from '@/components/actions/CreateDesign.vue'
import LoginView from '@/views/LoginView.vue'
//prendas
import VestidoMujer from '@/components/prendas/VestidoMujer.vue'
import CamisaBase from '@/components/prendas/CamisaBase.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/profile',
    name: 'profile',
    component:PerfilView
  },
  {
    path: '/designer',
    name: 'designer',
    component:DesignerView,
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
    component:PlanesView
  },
  {
    path: '/login',
    name: 'login',
    component:LoginView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
