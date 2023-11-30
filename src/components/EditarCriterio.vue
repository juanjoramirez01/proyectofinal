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
      <h2 class="text-center">Edición de datos de criterio</h2>
      <form @submit.prevent="submitForm" class="mt-4">
        <div class="form-group">
          <label for="descriptionCriteria">Descripción del criterio:</label>
          <input type="text" id="descriptionCriteria" v-model="criteriaData.descriptionCriteria" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="standardIdCriteria">ID del Estandar (int):</label>
          <input type="number" id="standardIdCriteria" v-model="criteriaData.standardIdCriteria" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="serviceIdCriteria">ID del Servicio (int):</label>
          <input type="number" id="serviceIdCriteria" v-model="criteriaData.serviceIdCriteria" class="form-control" required>
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
        criteriaData: {
          idCriteria: this.$route.params.idCriteria,
          standardIdCriteria: this.$route.params.standardIdCriteria,
          serviceIdCriteria: this.$route.params.serviceIdCriteria,
          descriptionCriteria: '',
          answerCriteria: '',
          observationCriteria: '', 
          observationCriteriaAuditor: '',
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
            operation: 'UpdateCriteria',
            key: 'e35d751c-12a8-4789-91d0-a95f055f0630',
            descriptionCriteria: this.criteriaData.descriptionCriteria,
            answerCriteria: this.criteriaData.answerCriteria,
            observationCriteria: this.criteriaData.observationCriteria,
            observationCriteriaAuditor: this.criteriaData.observationCriteriaAuditor,
            idCriteria: this.criteriaData.idCriteria,
            standardIdCriteria: this.criteriaData.standardIdCriteria,
            serviceIdCriteria: this.criteriaData.serviceIdCriteria,
          };
  
          // Realiza la solicitud GET con axios y los parámetros
          const response = await axios.get(url, { params });
  
          // Maneja la respuesta del servidor si es necesario
          console.log('Respuesta del servidor:', response.data);
  
          // Asigna el mensaje de éxito
          this.mensaje = 'Criterio actualizado con éxito';
  
          // Restablece el formulario
          this.criteriaData = {
            idCriteria: this.$route.params.idCriteria,
            standardIdCriteria: this.$route.params.standardIdCriteria,
            serviceIdCriteria: this.$route.params.serviceIdCriteria,
            descriptionCriteria: '',
            answerCriteria: '',
            observationCriteria: '',
            observationCriteriaAuditor: '',
            
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
  