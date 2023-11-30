<template>
 
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="logo text-center mb-4">
          <img src="@/assets/logocodewave.jpeg" alt="Logo de CodeWave">
        </div>
        <div class="card">
          <div class="login-container" style="background-image: url('@/assets/fondologin.jpg');">
          <div class="card-header">

            <h2 class="text-center">Bienvenido!</h2>
          </div>
          <div class="card-body">
            <form @submit.prevent="submitForm">
              <div class="mb-3">
                <label for="nickname" class="form-label">ID del usuario</label>
                <input type="text" class="form-control" id="nickname" v-model="userData.userId" required>
              </div>
              <div class="mb-3">
                <label for="passwordUser" class="form-label">Contraseña actual</label>
                <input type="password" class="form-control" id="passwordUser" v-model="userData.passwordUser" required>
              </div>
              <div class="mb-3">
                <label for="passwordNew" class="form-label">Contraseña nueva</label>
                <input type="password" class="form-control" id="passwordNew" v-model="userData.passwordNew" required>
              </div>
              <button type="submit" class="btn btn-primary">Ingresar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
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
      methods:{
      submitForm(){
      // Construye la URL y los parámetros de la solicitud
      const url = 'https://redb.qsystems.co/QS3100/QServlet';
      const params = new URLSearchParams();
      params.append('operation', 'UpdatePassword');
      params.append('userId', this.userData.userId);
      params.append('passwordNew', this.userData.passwordNew);
      params.append('passwordUser', this.userData.passwordUser);
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
              console.log(response.data)
              alert('Contraseña actualizada con éxito'); // Muestra un mensaje de éxito
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

<style>
.centered-component {
  
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.btn btn-primary{
  
  background: #2268A5;
  color: #ffffff;
  
}


.login-container {
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Agrega sombra al contenedor */
  padding: 20px; /* Agrega espacio interior al contenedor */
}

.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Agrega sombra a la tarjeta */
}

.login_outer {
    width: 360px;
    max-width: 100%;
}
.logo_outer img{
    width:500px;
    margin-bottom: 0px;
}
.h4{
    text-align: center;
}

</style>