import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CrearEntidades from '../components/CrearEntidades.vue'
import ListarEntidades from '../components/ListarEntidades.vue'
import ListarUsuarios from '../components/ListarUsuarios.vue'
import CrearUsuarios from '../components/CrearUsuarios.vue'
import EditarEntidad from '../components/EditarEntidad.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/listarusuarios',
    name: 'listarusuarios',
    component: ListarUsuarios
  },

  {
    path: '/crearentidades',
    name: 'crearentidades',
    component: CrearEntidades
  },
  {
    path: '/editarentidad/:idEntity',
    name: 'editarentidad',
    component: EditarEntidad
  },


  {
    path: '/listarentidades',
    name: 'listarentidades',
    component: ListarEntidades
  },
  {
    path: '/crearusuarios',
    name: 'crearusuarios',
    component: CrearUsuarios
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
