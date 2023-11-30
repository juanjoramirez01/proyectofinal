<template>
  <div class="sidebar">
    <nav>
      <ul>
        <li><router-link to="/listarusuarios">Usuarios</router-link></li>
        <li><router-link to="/listarservicios">Servicios</router-link></li>
        <li><router-link to="/listarestandares">Estandares</router-link></li>
        <li><router-link to="/listarcriterios">Criterios</router-link></li>
        <li><router-link to="/listararchivos">Archivos</router-link></li>
      </ul>
    </nav>
  </div>
  </template>

<script>
  export default {
  props: ['userType', 'selectedRoute'],
  methods: {
    Usuarios(id) {
      // Redirigir a la vista de listar usuarios y pasar el ID como parámetro
      this.$router.push({ name: 'listarusuarios', params: { idEntity: id } });
    },
    Servicios(id) {
      // Redirigir a la vista de listar servicios y pasar el ID como parámetro
      this.$router.push({ name: 'listarservicios', params: { idEntity: id } });
    },
  },
};
</script>

   
    
    <style>
    #app {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      display: flex; /* Utilizamos flexbox para organizar los elementos */
      height: 100vh; /* Hacemos que la altura ocupe toda la ventana */
      margin: 0;
    }
    
    nav a.router-link-exact-active {
      background-color: #2c3e50; /* Color de fondo para el enlace activo */
    }

    .sidebar {
    width: 200px;
    height: 100%;
    background-color: #333;
    color: white;
    padding: 20px;
    }

    nav ul {
    list-style: none;
    padding: 0;
    }

    nav li {
    margin-bottom: 10px;
    }

    nav a {
    text-decoration: none;
    color: white;
    font-weight: bold;
    }
    </style>
