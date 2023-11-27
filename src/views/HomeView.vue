<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">
            Login
          </div>
          <div class="card-body">
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label for="nickname">Usuario</label>
                <input type="text" class="form-control" id="nickname" v-model="userData.nickname" required>
              </div>
              <div class="form-group">
                <label for="password">Contraseña</label>
                <input type="password" class="form-control" id="password" v-model="userData.passwordUser" required>
              </div>
              <button type="submit" class="btn btn-primary">Ingresar</button>
            </form>
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
                      console.log(this.data)
                      if (response.data.message=='Usuario logueado exitosamente'){
                        alert('Usuario logueado exitosamente'); 
                        const userType = this.data.userType;
                        console.log(userType)
                        let homeRouteName;
                        switch (userType) {
                          case 0:
                            homeRouteName = 'Home';
                            break;
                          case 1:
                            homeRouteName = 'AdminHome';
                            break;
                          case 2:
                            homeRouteName = 'UserHome';
                            break;
                          case 3:
                            homeRouteName = 'AuditorHome';
                            break;
                          default:
                            // Handle other cases or provide a default route
                            homeRouteName = 'HomeView';
                        }

                      this.$router.push({ name: homeRouteName});
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
