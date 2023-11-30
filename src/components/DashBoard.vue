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
  <div class="dashboard">
    <h1>Dashboard de Cumplimiento</h1>
    <estado-chart :data="chartData" />
  </div>
</template>

<script>
import EstadoChart from './EstadoChart.vue';

export default {
  components: {
    EstadoChart,
  },
  data() {
    return {
      chartData: {
        labels: ['Estándar 1', 'Estándar 2', 'Estándar 3'], // Ejemplo de etiquetas
        values: [80, 60, 90], // Ejemplo de valores de cumplimiento (porcentajes)
      },
    };
  },
};
</script>

<style scoped>
.dashboard {
  max-width: 800px;
  margin: 0 auto;
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
