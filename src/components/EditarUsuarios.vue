<template>
  <div class="container mt-5">
    <h2 class="text-center">Edición de datos de usuario</h2>
    <form @submit.prevent="submitForm" class="mt-4">
      <div class="form-group">
        <label for="nameUser">Nombre:</label>
        <input type="text" id="nameUser" v-model="userData.nameUser" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="phoneUser">Teléfono:</label>
        <input type="text" id="phoneUser" v-model="userData.phoneUser" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="positionUser">Posición:</label>
        <input type="text" id="positionUser" v-model="userData.positionUser" class="form-control" required>
      </div>
      <!-- Los campos que no cambian permanecen deshabilitados y con un valor predefinido -->
      <div class="form-group">
        <label for="userId">ID de Usuario:</label>
        <input type="text" id="userId" v-model="userData.userId" class="form-control" disabled>
      </div>
      <div class="form-group">
        <label for="userEntityId">ID de Entidad (int):</label>
        <input type="number" id="userEntityId" v-model="userData.userEntityId" class="form-control" disabled>
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
