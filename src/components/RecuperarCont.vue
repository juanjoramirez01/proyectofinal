<template>
<!-- Bootstrap CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous" />

<!-- font awesome  -->
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous" />


<div class="container-fluid">
  <div class="row d-flex justify-content-center align-items-center m-0" style="height: 100vh;">
    <div class="login-container">
      <div class="col-md-12 logo_outer">
        <img src="@/assets/logocodewave.jpeg" alt="Logo de CodeWave">
      </div>
    <form @submit.prevent="submitForm" class="bg-light border p-3">
        <div class="form-row">
          <h4 class="title my-3" style="font-family:Verdana, Geneva, Tahoma, sans-serif">Bienvenido</h4>
          <div class="col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1"><i class="fas fa-user"></i></span>
              </div>
              <input v-model="userData.nickname" name="nickname" type="text" value="" class="input form-control" id="nickname" placeholder="nickname" aria-label="Username" aria-describedby="basic-addon1" />
            </div>
          </div>
          <div class="col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1"><i class="fas fa-lock"></i></span>
              </div>
              <input v-model="userData.passwordUser" name="password" type="password" value="" class="input form-control" id="password" placeholder="password" required="true" aria-label="password" aria-describedby="basic-addon1" />
              <div class="input-group-append">
                <span class="input-group-text" onclick="password_show_hide();">
                  <i class="fas fa-eye" id="show_eye"></i>
                  <i class="fas fa-eye-slash d-none" id="hide_eye"></i>
                </span>
              </div>
            </div>
          </div>
          <div class="col-sm-12 pt-3 text-right">
            <a href="#">Recuperar contraseña</a>
          </div>
          <div class="col-12">
            <button class="btn btn-primary" type="submit" name="signin">Login</button>
          </div>
        </div>
      </form>
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
                            homeRouteName = 'userhome';
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