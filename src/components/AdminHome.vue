<template>
  <div class="sidebar">
    <nav>
      <router-link to="/listarentidades">Entidades</router-link>
      
      <router-link to="/listarusuarios">Usuarios</router-link>

      <router-link to="/listarservicios">Servicios</router-link>

      <router-link to="/listarestandares">Estandares</router-link>

      <router-link to="/listarcriterios">Criterios</router-link>

    </nav>
</div>
  <div>
    <button @click="Usuarios(idEntity)">Usuarios</button>
    <button @click="Servicios(idEntity)">Servicios</button>
    <SidebarAdmin @usuarios="Usuarios" @servicios="Servicios" />
  </div>
    <div class="container">
      <ListarUsuarios />
    </div>
</template>

<script>
import SidebarAdmin from '../components/SidebarAdmin.vue';
import ListarUsuarios from '../components/ListarUsuarios.vue';

export default {
  data() {
    return {
      idEntity: this.$route.params.idEntity
    }
  },
  components: {
    SidebarAdmin,
    ListarUsuarios,
  },
  methods: {
    Usuarios(id) {
      // Redirigir a la vista de listar usuarios y pasar el ID como parámetro
      console.log(id)
      this.$router.push({ name: 'adminlistarusuarios', params: { idEntity: id } });
    },
    Servicios(id) {
      // Redirigir a la vista de listar servicios y pasar el ID como parámetro
      console.log(id)
      this.$router.push({ name: 'adminlistarservicios', params: { idEntity: id } });
    },
  },
};
</script>

<style>
#app {
font-family: 'Arial', sans-serif;
margin: 0;
/*padding: 0;*/
height: 100vh;
}

.container {
display: flex;
height: 100%; /* Utilizamos flexbox para la disposición en fila */
}

/* Estilos específicos para la barra lateral */
.sidebar {
width: 200px; /* Ajusta el ancho según tus necesidades */
background-color:#2268A5; /* Color de fondo de la barra lateral */
color: #fff; /* Color de texto en la barra lateral */
}

/* Estilos específicos para el contenido principal */
.list-entidades {
flex: 1; /* Hace que el contenido principal ocupe el espacio restante */
}

.button-custom{
background: #2268A5;
color: #ffffff;

}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  display: flex; /* Utilizamos flexbox para organizar los elementos */
  height: 100vh; /* Hacemos que la altura ocupe toda la ventana */
  margin: 0;
}

.sidebar {
  background-color: #2268A5;
  color: #fff;
  padding: 20px;
  height: 100vh;
  min-width: 25px; /* Define el ancho mínimo del panel */
}

nav {
  display: flex;
  flex-direction: column; /* Hacemos que los enlaces estén en una columna */
}

nav a {
  font-weight: bold;
  border-color:#2268A5;
  color: #fff; /* Texto en color blanco */
  text-decoration: none; /* Quita el subrayado de los enlaces */
  padding: 5px 0;
}

nav a.router-link-exact-active {
  background-color: #2c3e50; /* Color de fondo para el enlace activo */
}
</style>