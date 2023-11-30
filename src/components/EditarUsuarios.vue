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
    <h2 style="text-align: center;">Edición de datos de usuario</h2>
    <form @submit.prevent="submitForm" class="mt-4">
      <div class="form-group">
        <label for="nameUser">Nombre:</label>
        <input type="text" id="nameUser" v-model="userData.nameUser" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="documentUser">Documento:</label>
        <input type="text" id="documentUser" v-model="userData.documentUser" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="phoneUser">Teléfono:</label>
        <input type="text" id="phoneUser" v-model="userData.phoneUser" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="positionUser">Posición:</label>
        <input type="text" id="positionUser" v-model="userData.positionUser" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="userEntityId">ID de Entidad (int):</label>
        <input type="number" id="userEntityId" v-model="userData.userEntityId" class="form-control" required>
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
      userData: {
        userId: this.$route.params.userId,
        userEntityId: this.$route.params.userEntityId,
        nameUser: '',
        documentUser: '', 
        phoneUser: '',
        positionUser: '', 
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
          operation: 'UpdateUser',
          key: 'e35d751c-12a8-4789-91d0-a95f055f0630',
          nameUser: this.userData.nameUser,
          documentUser: this.userData.documentUser,
          phoneUser: this.userData.phoneUser,
          positionUser: this.userData.positionUser,
          userId: this.userData.userId,
          userEntityId: this.userData.userEntityId,
        };

        // Realiza la solicitud GET con axios y los parámetros
        const response = await axios.get(url, { params });

        // Maneja la respuesta del servidor si es necesario
        console.log('Respuesta del servidor:', response.data);

        // Asigna el mensaje de éxito
        this.mensaje = 'Usuario actualizado con éxito';

        // Restablece el formulario
        this.userData = {
          userId: this.$route.params.userId,
          userEntityId: this.$route.params.userEntityId,
          nameUser: '',
          documentUser: '',
          phoneUser: '',
          positionUser: '',
          
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