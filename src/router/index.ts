import { createRouter, createWebHistory } from 'vue-router'
import SignUpView from '@/views/SignupView.vue'
import MainView from '@/views/MainView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView
    },
    {
      path: '/',
      name: 'main',
      component: MainView
    },
    { path: '/login', component: () => import('@/views/LoginView.vue') }, // 필요시 LoginView 생성
    //{ path: '/cart', component: () => import('@/views/CartView.vue') }, // 필요시 CartView 생성
    { path: '/category/:category', component: () => import('@/views/CategoryView.vue') }, // 필요시 CategoryView 생성

    { path: '/verify', component: () => import('@/views/EmailVerifyView.vue') },
    {
      path: '/verified-complete',
      name: 'VerifiedComplete',
      component: () => import('@/views/VerifiedCompleteView.vue') }

  ]
})

export default router
