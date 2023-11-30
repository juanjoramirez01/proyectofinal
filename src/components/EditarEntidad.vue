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
    <h2 class="text-center">Editar Entidad</h2>
    <form @submit.prevent="submitForm" class="mt-4">
      <div class="form-group">
        <label for="nameEntity">Nombre de la Entidad:</label>
        <input type="text" id="nameEntity" v-model="entityData.nameEntity" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="adressEntity">Dirección:</label>
        <input type="text" id="adressEntity" v-model="entityData.adressEntity" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="phoneEntity">Teléfono:</label>
        <input type="text" id="phoneEntity" v-model="entityData.phoneEntity" class="form-control" required>
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-primary">Guardar</button>
      </div>
    </form>
    <!-- Mostrar el mensaje de éxito -->
    <div v-if="mensaje" class="alert alert-success mt-3">{{ mensaje }}</div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      entityData: {
        idEntity: this.$route.params.idEntity,
        nameEntity: '',
        phoneEntity: '',
        adressEntity: '',
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
      operation: 'UpdateEntity',
      key: 'e35d751c-12a8-4789-91d0-a95f055f0630',
      nameEntity: this.entityData.nameEntity,
      phoneEntity: this.entityData.phoneEntity,
      adressEntity: this.entityData.adressEntity,
      idEntity: this.entityData.idEntity,
    };

    // Realiza la solicitud GET con axios y los parámetros
    const response = await axios.get(url, { params });

    // Maneja la respuesta del servidor si es necesario
    console.log('Respuesta del servidor:', response.data);

    // Asigna el mensaje de éxito
    this.mensaje = 'Entidad actualizada con éxito';

    // Restablece el formulario
    this.entityData = {
      nameEntity: '',
      phoneEntity: '',
      adressEntity: '',
    };
  } catch (error) {
    // Maneja los errores en caso de que la solicitud falle
    console.error('Error al enviar la solicitud:', error);
  }
},

  },
};
</script>

<style scoped>

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.form-group {
  margin-bottom: 20px;
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