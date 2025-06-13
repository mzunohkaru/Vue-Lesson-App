import LoginPage from '@/views/LoginPage.vue'
import NotFoundPage from '@/views/NotFoundPage.vue'
import TaskDetailPage from '@/views/TaskDetailPage.vue'
import TodoPage from '@/views/TodoPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store/useUserStore'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/todo',
    component: TodoPage,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: ':id',
        component: TaskDetailPage,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFoundPage,
    meta: {
      requiresAuth: false,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  console.log('Navigation guard:', {
    to: to.path,
    requiresAuth: to.meta.requiresAuth,
    isAuthenticated: userStore.isAuthenticated,
  })

  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
