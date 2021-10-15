import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

import store from "../store/"

import Dashboard from '../views/dashboard/Dashboard.vue'
import SignUp from '../views/SignUp.vue'
import Login from '../views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/sign-up',
    name: "SignUp",
    component: SignUp
  },
  {
    path: '/log-in',
    name: "Login",
    component: Login
  },
  {
    path: '/dashboard',
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/dashboard/clients',
    name: "Clients",
    component: () => import('../views/dashboard/Clients.vue'),
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/dashboard/clients/add',
    name: "AddClient",
    component: () => import('../views/dashboard/AddClient.vue'),
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/dashboard/clients/edit/:id/',
    name: "EditClient",
    component: () => import('../views/dashboard/EditClient.vue'),
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/dashboard/clients/:id/',
    name: 'Client',
    component: () => import('../views/dashboard/Client.vue'),
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/dashboard/invoices',
    name: "Invoices",
    component: () => import('../views/dashboard/Invoices.vue'),
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/dashboard/invoices/:id',
    name: "Invoice",
    component: () => import('../views/dashboard/Invoice.vue'),
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/dashboard/invoices/add',
    name: "AddInvoice",
    component: () => import('../views/dashboard/AddInvoice.vue'),
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/dashboard/my-account',
    name: "MyAccount",
    component: () => import('../views/dashboard/MyAccount.vue'),
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/dashboard/my-account/edit-team',
    name: "EditTeam",
    component: () => import('../views/dashboard/EditTeam.vue'),
    meta: {
      requireLogin: true
    }
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach( (to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated)
    next('/log-in')
  else
    next()
})

export default router
