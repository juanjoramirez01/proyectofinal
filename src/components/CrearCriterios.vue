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
    <div class="container mt-5">
      <h2 class="text-center">Crear Criterio</h2>
      <form @submit.prevent="CrearCriterio" class="mt-4">
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
        <div class="text-center">
          <button type="submit" class="btn btn-primary">Aceptar</button>
        </div>
      </form>
      <div v-if="mensaje" class="alert alert-success mt-3">{{ mensaje }}</div>
    </div>
  </template>
  
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        criteriaData: {
          descriptionCriteria: '',
          answerCriteria: '',
          observationCriteria: '',
          standardIdCriteria: 0, 
          serviceIdCriteria: 0, 
        },
        tna: 5,
      };
    },
    methods: {
      CrearCriterio() {
        // Construye la URL y los parámetros de la solicitud
        const url = 'https://redb.qsystems.co/QS3100/QServlet';
        const params = new URLSearchParams();
        params.append('operation', 'SaveCriteria');
        params.append('descriptionCriteria', this.criteriaData.descriptionCriteria);
        params.append('answerCriteria', this.criteriaData.answerCriteria);
        params.append('observationCriteria', this.criteriaData.observationCriteria);
        params.append('standardIdCriteria', this.criteriaData.standardIdCriteria);
        params.append('serviceIdCriteria', this.criteriaData.serviceIdCriteria);
        params.append('tna', this.tna);
        params.append('key', 'e35d751c-12a8-4789-91d0-a95f055f0630');
  
        // Envía la solicitud POST al servidor
        axios
          .post(url, params)
          .then((response) => {
            if (response.data.error != undefined && response.data.error != '') {
              alert(response.data.error);
            } else {
              if (response.data.valid) {
                this.data = response.data.arrayCriteria;
                alert('Criterio creado con éxito'); // Muestra un mensaje de éxito
              }
            }
          })
          .catch((error) => {
            alert(error);
          });
      },
    },
  };
  </script>
  
  <style scoped>
  .form-group {
    margin-bottom: 10px;
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