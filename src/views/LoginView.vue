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
                  <label for="nickname" class="form-label">Usuario</label>
                  <input type="text" class="form-control" id="nickname" v-model="userData.nickname" required>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Contraseña</label>
                  <input type="password" class="form-control" id="password" v-model="userData.passwordUser" required>
                </div>
                <button type="submit" class="btn btn-primary">Ingresar</button>
              </form>
              <div class="text-center fs-6 mt-3">
                <router-link to="/recuperarcont">Recuperar contraseña</router-link>
              </div>
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
              console.log(this.userData)
              const url = 'https://redb.qsystems.co/QS3100/QServlet';
              const params = new URLSearchParams();
              params.append('operation', 'queryLogin');
              params.append('nickname', this.userData.nickname);
              params.append('passwordUser', this.userData.passwordUser);
              params.append('tna', this.tna);
              params.append('key', 'e35d751c-12a8-4789-91d0-a95f055f0630');

              axios
                .post(url, params)
                .then((response) => {
                  if (response.data.error != undefined && response.data.error != '') {
                    alert(response.data.error);
                  } else {
                    if (response.data.valid) {
                      this.data = response.data.userVO;
                      this.entityID = response.data.userVO.entityID
                      console.log(this.data)
                      console.log(this.entityID)
                      if (response.data.message=='Usuario logueado exitosamente'){
                        //alert('Usuario logueado exitosamente'); 
                        const userType = this.data.userType;
                        console.log(userType)
                        let homeRouteName;
                        switch (userType) {
                          case 0:
                            homeRouteName = 'superadminhome';
                            this.$store.commit('setRoleStatus', { role: 'isSuperAdmin', status: true });
                            break;
                          case 1:
                            homeRouteName = 'adminhome';
                            this.$store.commit('setRoleStatus', { role: 'isAdmin', status: true });
                            break;
                          case 2:
                            homeRouteName = 'autoevaluacion';
                            this.$store.commit('setRoleStatus', { role: 'isUser', status: true });
                            break;
                          case 3:
                            homeRouteName = 'auditorhome';
                            this.$store.commit('setRoleStatus', { role: 'isSuperAdmin', status: true });
                            break;
                          default:
                            // Handle other cases or provide a default route
                            homeRouteName = 'HomeView';
                        }

                      this.$router.push({ name: homeRouteName, params: { idEntity: this.entityID } });
                    } else {
                      this.error = true;
                      this.error_msg = response.data.error_msg;
                    }
                  }
                }
              })
        .catch((error) => {
          this.error = true;
          this.error_msg = 'Error al iniciar sesión';
          console.error(error);
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
  margin-top: -50px; /* Ajusta este valor según el espacio deseado entre el componente y el margen superior */
}

.btn btn-primary{
  
  background: #2268A5;
  color: #ffffff;
  
}


.login-container {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Agrega sombra al contenedor */
  padding: 20px; /* Agrega espacio interior al contenedor */
}

.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Agrega sombra a la tarjeta */
}

.logo {
  /* Estilos para el logo si es necesario */
}


</style>