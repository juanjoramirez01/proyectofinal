<template>
    <div>
      <h2>Editar Datos de Usuario</h2>
      <form @submit.prevent="CrearUsuario">
        <div class="form-group">
          <label for="nameUser">Nombre:</label>
          <input type="text" id="nameUser" v-model="userData.nameUser" required>
        </div>
        <div class="form-group">
          <label for="nickname">Usuario:</label>
          <input type="text" id="nickname" v-model="userData.nickname" required>
        </div>
        <div class="form-group">
          <label for="phoneUser">Teléfono:</label>
          <input type="text" id="phoneUser" v-model="userData.phoneUser" required>
        </div>
        <div class="form-group">
          <label for="passwordUser">Contraseña:</label>
          <input type="password" id="passwordUser" v-model="userData.passwordUser" required>
        </div>
        <div class="form-group">
          <label for="documentUser">Documento:</label>
          <input type="text" id="documentUser" v-model="userData.documentUser" required>
        </div>
        <div class="form-group">
          <label for="positionUser">Posición:</label>
          <input type="text" id="positionUser" v-model="userData.positionUser" required>
        </div>
        <div class="form-group">
          <label for="userType">Tipo de Usuario (int):</label>
          <input type="number" id="userType" v-model="userData.userType" required>
        </div>
        <div class="form-group">
          <label for="userEntityId">ID de Entidad (int):</label>
          <input type="number" id="userEntityId" v-model="userData.userEntityId" required>
        </div>
        <button type="submit">Aceptar</button>
      </form>
    </div>
  </template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
        
      userData: {
       
        nameUser: '',
        phoneUser: '',
        nickname: '',
        passwordUser: '',
        documentUser: '',
        positionUser: '',
        userType: 0, 
      },
      tna: 5,
    };
  },
  computed: {
    userEntityId() {
      return this.$route.params.idEntity;
    },
    userId() {
      return this.$route.params.userId;
    },
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
      nameEntity: this.userData.nameUser,
      phoneEntity: this.userData.phoneUser,
      idEntity: this.userData.idEntity,
    };

    // Realiza la solicitud GET con axios y los parámetros
    const response = await axios.get(url, { params });

    // Maneja la respuesta del servidor si es necesario
    console.log('Respuesta del servidor:', response.data);

    // Asigna el mensaje de éxito
    this.mensaje = 'Entidad actualizada con éxito';

    // Restablece el formulario
    this.userData = {
        nameUser: '',
        phoneUser: '',
        nickname: '',
        passwordUser: '',
        documentUser: '',
        positionUser: '',
        userType: 0, 
    };
  } catch (error) {
    // Maneja los errores en caso de que la solicitud falle
    console.error('Error al enviar la solicitud:', error);
  }
},

  },
};
</script>


