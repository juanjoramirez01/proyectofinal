import { createRouter, createWebHistory } from 'vue-router'

//import SuperadminLayout from '../components/SuperadminLayout.vue';
//import HomeView from '../views/HomeView.vue'
import CrearEntidades from '../components/CrearEntidades.vue'
import ListarEntidades from '../components/ListarEntidades.vue'
import ListarUsuarios from '../components/ListarUsuarios.vue'
import CrearUsuarios from '../components/CrearUsuarios.vue'
import CrearServicios from '../components/CrearServicios.vue'
import EditarEntidad from '../components/EditarEntidad.vue'
import SuperAdminHome from '../views/SuperAdminHome.vue'
import AdminHome from '../components/AdminHome.vue'
import AuditorHome from '../components/AuditorHome.vue'
import ListarServicios from '../components/ListarServicios.vue'
import EditarServicio from '../components/EditarServicio.vue'
//import SidebarAdmin from '../components/SidebarAdmin.vue'
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
import ListarCriterioEstandar  from '../components/ListarCriterioEstandar.vue'
import ListarCriterioServicio  from '../components/ListarCriterioServicio.vue'
import EditarCriterio from '../components/EditarCriterio.vue'
import CumplimientosTable from '../components/CumplimientosTable.vue'
import EstadoChart from '../components/EstadoChart.vue'
import DashBoard from '../components/DashBoard.vue'
import Login from '../views/LoginView.vue'
import GuardarArchivo from '../components/GuardarArchivo.vue'
import ListarArchivoEstandar from '../components/ListarArchivoEstandar.vue'
import RecuperarCont from '../components/RecuperarCont.vue'



const routes = [

  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/adminhome',
    component: AdminHome, 
    name: 'adminhome',
    children: [

      {
        path: '/listarusuarios/',
        name: 'listarusuarios',
        component: ListarUsuarios
      },
      {
        path: '/listarservicios/',
        name: 'listarservicios',
        component: ListarServicios
      },
      
      // Agrega más rutas según sea necesario
    ],
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
    path: '/adminhome/:idEntity',
    name: 'adminhome',
    component: AdminHome
  },
  {
    path: '/superadminhome',
    name: 'superadminhome',
    component: SuperAdminHome
  },
  
  {
    path: '/auditorhome',
    name: 'auditorhome',
    component: AuditorHome
  },
  {
    path: '/recuperarcont',
    name: 'recuperarcont',
    component: RecuperarCont
  },
  {
    path: '/listarusuarios/:idEntity',
    name: 'listarusuarios',
    component: ListarUsuarios,
    props: true,
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
    path: '/crearusuarios/:idEntity',
    name: 'agregarusuarios',
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
    path: '/listarcriterios/:idStandard',
    name: 'listarcriterioestandar',
    component: ListarCriterioEstandar
  },
  {
    path: '/listarcriterios/:idService',
    name: 'listarcriterioservicio',
    component: ListarCriterioServicio
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
  {
    path: '/guardararchivo',
    name: 'guardararchivo',
    component: GuardarArchivo
  },
  {
    path: '/listararchivos/:idStandard',
    name: 'listararchivoestandar',
    component: ListarArchivoEstandar
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



export default router
