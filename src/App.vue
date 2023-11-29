<template>
  <div id="app">
    <router-view />

    <!-- Renderizar SidebarComp solo si el usuario es administrador -->
    <SidebarComp v-if="isAdmin" />
  </div>
</template>

<script>
import SidebarComp from './components/SidebarComp.vue';

export default {
  name: 'App',
  computed: {
    isAdmin() {
      SidebarComp
      return this.$store.state.isAdmin;
    },
  },
};
</script>


<style>


/* Estilos globales de la aplicación */
body {
  font-family: 'Arial', sans-serif;
  padding: 0;
  background: src('/assets/fondologin.jpg') center center fixed;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Asegura que el contenido se centre verticalmente en la página */
  width: 1;
  margin: 0; /* Elimina el margen predeterminado del body */
}

#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 100px;
  
}

.button-custom{
  background: #2268A5;
    color: #ffffff;
  
}

.centered-component {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: -50px; /* Ajusta este valor según el espacio deseado entre el componente y el margen superior */
}

</style>
