<template>
  <div class="container mt-5">
    <h2 class="text-center">Crear Usuario</h2>
    <form @submit.prevent="CrearUsuario" class="mt-4">
      <div class="form-group">
        <label for="nameUser">Nombre:</label>
        <input type="text" id="nameUser" v-model="userData.nameUser" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="nickname">Usuario:</label>
        <input type="text" id="nickname" v-model="userData.nickname" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="phoneUser">Teléfono:</label>
        <input type="text" id="phoneUser" v-model="userData.phoneUser" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="passwordUser">Contraseña:</label>
        <input type="password" id="passwordUser" v-model="userData.passwordUser" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="documentUser">Documento:</label>
        <input type="text" id="documentUser" v-model="userData.documentUser" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="positionUser">Posición:</label>
        <input type="text" id="positionUser" v-model="userData.positionUser" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="userType">Tipo de Usuario (int):</label>
        <input type="number" id="userType" v-model="userData.userType" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="userEntityId">ID de Entidad (int):</label>
        <input type="number" id="userEntityId" v-model="userData.userEntityId" class="form-control" required>
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-primary">Aceptar</button>
      </div>
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
        userEntityId: 0, 
      },
      tna: 5,
    };
  },
  methods: {
    CrearUsuario() {
      // Construye la URL y los parámetros de la solicitud
      const url = 'https://redb.qsystems.co/QS3100/QServlet';
      const params = new URLSearchParams();
      params.append('operation', 'SaveUser');
      params.append('nameUser', this.userData.nameUser);
      params.append('nickname', this.userData.nickname);
      params.append('phoneUser', this.userData.phoneUser);
      params.append('documentUser', this.userData.documentUser);
      params.append('passwordUser', this.userData.passwordUser);
      params.append('positionUser', this.userData.positionUser);
      params.append('userType', this.userData.userType);
      params.append('userEntityId', this.userData.userEntityId);
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
              this.data = response.data.arrayUser;
              alert('Usuario creado con éxito'); // Muestra un mensaje de éxito
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
</style>