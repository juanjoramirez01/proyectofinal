<template>
  <div class="container card card-header" style="width: 30rem;">
    <div class="m-0 row justify-content-center">
      <form v-on:submit.prevent="queryUser">
        <div class="form-group">
          <label for="nickname">Usuario</label>
          <input type="text" v-model="userData.nickname" name="nickname" class="form-control" id="nickname" aria-describedby="emailHelp">
          <small id="emailHelp" class="form-text text-muted"></small>
        </div>
        <div class="form-group">
          <label for="passwordUser">Contraseña</label>
          <input type="password" v-model="userData.passwordUser" name="passwordUser" class="form-control" id="passwordUser" >
        </div>
        
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      <br/><br/>
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
      queryUser(){
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
                      if (response.data.message=='Usuario logueado exitosamente'){
                        alert('Usuario logueado exitosamente'); // Muestra un mensaje de éxito
                        console.log(this.data['userType'])
                        if (this.data['userType'] == 0){
                          window.location.href = 'AdminHome'
                        }else if (this.data['userType'] == 1) {
                          window.location.href = 'UserHome'                  
                        }else {
                          alert('El usuario o la contraseña están mal');
                        }
                      }
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