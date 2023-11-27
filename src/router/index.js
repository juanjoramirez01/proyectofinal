import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import CrearEntidades from '../components/CrearEntidades.vue'
import ListarEntidades from '../components/ListarEntidades.vue'
import ListarUsuarios from '../components/ListarUsuarios.vue'
import CrearUsuarios from '../components/CrearUsuarios.vue'
import CrearServicios from '../components/CrearServicios.vue'
import EditarEntidad from '../components/EditarEntidad.vue'
import SuperAdminHome from '../components/SuperAdminHome.vue'
import AdminHome from '../components/AdminHome.vue'
import UserHome from '../components/UserHome.vue'
import AuditorHome from '../components/AuditorHome.vue'
import ListarServicios from '../components/ListarServicios.vue'
import EditarServicio from '../components/EditarServicio.vue'
import LoginForm from '../components/LoginForm.vue'
import EditarUsuario from '../components/EditarUsuarios.vue'
import AllUsers from '../components/AllUsers.vue'
import AllServices from '../components/AllServices.vue'
import AllStandard from '../components/AllStandard.vue'
import AllCriteria from '../components/AllCriteria.vue'
import Autoevaluacion from '../views/UserView.vue'
import CrearEstandares from '../components/CrearEstandares.vue'
import ListarEstandares from '../components/ListarEstandares.vue'
import EditarEstandar from '../components/EditarEstandar.vue'
import CrearCriterios from '../components/CrearCriterios.vue'
import ListarCriterios  from '../components/ListarCriterios.vue'
import EditarCriterio from '../components/EditarCriterio.vue'
import CumplimientosTable from '../components/CumplimientosTable.vue'
import EstadoChart from '../components/EstadoChart.vue'
import DashBoard from '../components/DashBoard.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/listarusuarios',
    name: 'usuarios',
    component: AllUsers
  },
  {
    path: '/listarservicios',
    name: 'servicios',
    component: AllServices
  },
  {
    path: '/listarestandares',
    name: 'estandares',
    component: AllStandard
  },
  {
    path: '/listarcriterios',
    name: 'criterios',
    component: AllCriteria
  },
  {
    path: '/home',
    name: 'superadminhome',
    component: SuperAdminHome
  },
  {
    path: '/adminhome',
    name: 'adminhome',
    component: AdminHome
  },
  {
    path: '/userhome',
    name: 'userhome',
    component: UserHome
  },
  {
    path: '/auditorhome',
    name: 'auditorhome',
    component: AuditorHome
  },
  {
    path: '/listarusuarios/:idEntity',
    name: 'listarusuarios',
    component: ListarUsuarios
  },
  {
    path: '/listarservicios/:idEntity',
    name: 'listarservicios',
    component: ListarServicios
  },

  {
    path: '/autoevaluacion',
    name: 'autoevaluacion',
    component: Autoevaluacion
  },

  {
    path: '/crearentidades',
    name: 'crearentidades',
    component: CrearEntidades
  },
  {
    path: '/crearservicios',
    name: 'crearservicios',
    component: CrearServicios
  },

  {
    path: '/editarentidad/:idEntity',
    name: 'editarentidad',
    component: EditarEntidad
  },
  {
    path: '/editarusuario/:userEntityId/:userId',
    name: 'editarusuario',
    component: EditarUsuario
  },
  {
    path: '/editarservicio/:entityIdService/:idService',
    name: 'editarservicio',
    component: EditarServicio
  },
  {
    path: '/editarestandar/:serviceIdStandard/:idStandard',
    name: 'editarestandar',
    component: EditarEstandar
  },
  {
    path: '/editarcriterio/:serviceIdCriteria/:idCriteria',
    name: 'editarcriterio',
    component: EditarCriterio
  },
  {
    path: '/login',
    name: 'login',
    component: LoginForm
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
    path: '/crearestandares',
    name: 'crearestandares',
    component: CrearEstandares
  },
  {
    path: '/listarestandares/:idService',
    name: 'listarestandares',
    component: ListarEstandares
  },
  {
    path: '/crearcriterios',
    name: 'crearcriterios',
    component: CrearCriterios
  },
  {
    path: '/listarcriterios/:idService',
    name: 'listarcriterios',
    component: ListarCriterios
  },
  {
    path: '/cumplimientostable/',
    name: 'cumplimientostable',
    component: CumplimientosTable
  },
  {
    path: '/estadochart/',
    name: 'estadochart',
    component: EstadoChart
  },
  {
    path: '/dashboard/',
    name: 'dashboard',
    component: DashBoard
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



export default router
