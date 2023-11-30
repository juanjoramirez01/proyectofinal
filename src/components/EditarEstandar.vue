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
    <div class="form-container">
      <h2 class="text-center">Edición de datos de estandar</h2>
      <form @submit.prevent="submitForm" class="mt-4">
        <div class="form-group">
          <label for="nameStandard">Nombre del Estandar:</label>
          <input type="text" id="nameStandard" class="form-control" v-model="standardData.nameStandard" required>
        </div>
        <div class="form-group">
          <label for="descriptionStandard">Descripción del Estandar:</label>
          <input type="text" id="descriptionStandard" class="form-control" v-model="standardData.descriptionStandard" required>
        </div>
        <div class="form-group">
          <label for="serviceIdStandard">ID del Servicio (int):</label>
          <input type="number" id="serviceIdStandard" class="form-control" v-model="standardData.serviceIdStandard" required>
        </div>
        <button type="submit" class="btn btn-primary">Aceptar</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        standardData: {
          idStandard: this.$route.params.idStandard,
          serviceIdStandard: this.$route.params.serviceIdStandard,
          nameStandard: '',
          descriptionStandard: '', 
        },
      };
    },
    methods: {
      async submitForm() {
        try {
          // Construye la URL con los datos del formulario
          const url = `https://redb.qsystems.co/QS3100/QServlet`;
  
          // Configuración de los parámetros de la solicitud (en formato de consulta)
          const params = {
            tna: 5,
            operation: 'UpdateStandard',
            key: 'e35d751c-12a8-4789-91d0-a95f055f0630',
            nameStandard: this.standardData.nameStandard,
            descriptionStandard: this.standardData.descriptionStandard,
            idStandard: this.standardData.idStandard,
            serviceIdStandard: this.standardData.serviceIdStandard,
          };
  
          // Realiza la solicitud GET con axios y los parámetros
          const response = await axios.get(url, { params });
  
          // Maneja la respuesta del servidor si es necesario
          console.log('Respuesta del servidor:', response.data);
  
          // Asigna el mensaje de éxito
          this.mensaje = 'Estandar actualizado con éxito';
  
          // Restablece el formulario
          this.standardData = {
            idStandard: this.$route.params.idStandard,
            serviceIdStandard: this.$route.params.serviceIdStandard,
            nameStandard: '',
            descriptionStandard: '', 
         
          };
        } catch (error) {
          // Maneja los errores en caso de que la solicitud falle
          console.error('Error al enviar la solicitud:', error);
        }
      },
    },
  };
  </script>
  
<style>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  display: flex; /* Utilizamos flexbox para organizar los elementos */
  height: 100vh; /* Hacemos que la altura ocupe toda la ventana */
  margin: 0;
}

.sidebar {
  
  position: fixed;
  top: 0;
  left: 0;
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