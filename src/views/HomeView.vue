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
                <input type="text" class="form-control" id="nickname" v-model="nickname" required>
              </div>
              <div class="form-group">
                <label for="password">Contraseña</label>
                <input type="password" class="form-control" id="password" v-model="password" required>
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
  name: 'LoginForm',
  data() {
    return {
      nickname: '',
      password: '',
    };
  },
  methods: {
    submitForm() {
      const url = `https://redb.qsystems.co/QS3100/QServlet?operation=login&nickname=${this.nickname}&passwordUser=${this.password}`;
      axios
        .post(url)
        .then((response) => {
          if (response.data.valid) {
            const userType = response.data.userType;
            let homeRouteName;

            switch (userType) {
              case 0:
                homeRouteName = 'AdminHome';
                break;
              case 1:
                homeRouteName = 'UserHome';
                break;
              case 2:
                homeRouteName = 'AuditorHome';
                break;
              default:
                // Handle other cases or provide a default route
                homeRouteName = 'DefaultHome';
            }

            this.$router.push({ name: homeRouteName });
          } else {
            this.error = true;
            this.error_msg = response.data.error_msg;
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
