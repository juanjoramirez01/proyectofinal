<template>
  <div class="login-container" alt="fondo login" src="../assets/fondologin.jpg">
    <div class="login-form">
      <h2 class="text-center mb-4">Iniciar Sesión</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="username" class="form-label">Usuario:</label>
          <input type="text" v-model="nickname" class="form-control" required>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Contraseña:</label>
          <input type="password" v-model="password" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-primary w-100">Ingresar</button>
      </form>
      <div class="mt-3">
        <router-link to="/forgot-password">¿Olvidaste tu contraseña?</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'LoginPage',
    data() {
        return {
        data: '',
        nickname: '',
        password: '',
        tna: 5,
        error: false,
        error_msg: "",
      };

  },

  methods: {


    submitForm() {
      const url = 'https://redb.qsystems.co/QS3100/QServlet';
      const params = new URLSearchParams();
      params.append('operation', 'queryLogin');
      params.append('tna', this.tna);
      params.append('nickname', this.nickname);
      params.append('passwordUser', this.password);
      params.append('key', "e35d751c-12a8-4789-91d0-a95f055f0630"); 
      
      axios
        .post(url, params)
        .then((response) => {
          if (response.data.error != undefined && response.data.error != "") {
            // Manejar error si es necesario
            alert(response.data.error);
            this.error = true;
            //this.error_msg = response.data.result.error_msg;

          } 
          else {
            if (response.data.valid) {
              this.data = response.data.arrayUser;
              console.log("Ingreso exitoso", this.data);
              this.$router.push({ name: 'listarusuarios', });
               
              
            }
          }
        })
        .catch((error) => {
          this.error = true;
          this.error_msg = "Contraseña Incorrecta";
          console.error(error);
          alert(error);
        });
    },
  },
};
  </script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
}

.login-form {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
}

.login-form form {
  display: flex;
  flex-direction: column;
}

.login-form button {
  margin-top: 10px;
}

.login-form a {
  display: block;
  text-align: center;
  color: #007bff;
}
</style>
