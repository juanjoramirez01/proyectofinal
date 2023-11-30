<template>

    <div class="container">
      <ListarEntidades/>
    </div>


  </template>

<script>
import ListarEntidades from '../components/ListarEntidades.vue';

export default {
  components: {
    ListarEntidades
  }
}
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

</style>
  

  
  