import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PerfilView from '@/views/PerfilView.vue'
import DesignerView from '@/views/DesignerView.vue'
import PlanesView from '@/views/PlanesView.vue'

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
    component:DesignerView
  },
  {
    path: '/planesView',
    name: 'planes',
    component:PlanesView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
