import NProgress from 'nprogress'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        authenticated: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Auth/SignIn.vue'),
      meta: {
        hideForAuth: true,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Auth/SignUp.vue'),
      meta: {
        hideForAuth: true,
      },
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('../views/Auth/ForgotPassword.vue'),
      meta: {
        hideForAuth: true,
      },
    },
  ],
})

// isAuthenticated meta
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.matched.some((record) => record.meta.authenticated)) {
    if (authStore.isAuthenticated) {
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    next()
  }
})

// hideForAuth meta
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.matched.some((record) => record.meta.hideForAuth)) {
    if (authStore.isAuthenticated) {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    next()
  }
})

router.beforeEach(() => {
  NProgress.start()
})
router.afterEach(() => {
  NProgress.done()
})

export default router
