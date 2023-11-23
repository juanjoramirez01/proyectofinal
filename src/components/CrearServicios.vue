<template>
  <div class="container mt-5">
    <h2 class="text-center">Crear Servicio</h2>
    <form @submit.prevent="CrearServicio" class="mt-4">
      <div class="form-group">
        <label for="nameService">Nombre del Servicio:</label>
        <input type="text" id="nameService" class="form-control" v-model="serviceData.nameService" required>
      </div>
      <div class="form-group">
        <label for="descriptionService">Descripción del Servicio:</label>
            <input type="text" id="descriptionService" class="form-control" v-model="serviceData.descriptionService" required>
      </div>
      <div class="form-group">
        <label for="entityIdService">ID de Entidad (int):</label>
            <input type="number" id="entityIdService" class="form-control" v-model="serviceData.entityIdService" required>
      </div>
      <div class="text-center">
          <button type="submit" class="btn btn-primary">Aceptar</button>
      </div>
    </form>
    <div v-if="mensaje" class="alert alert-success mt-3">{{ mensaje }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      serviceData: {
        nameService: '',
        descriptionService: '',
        entityIdService: 0, 
      },
      tna: 5,
    };
  },
  methods: {
    CrearServicio() {
      // Construye la URL y los parámetros de la solicitud
      const url = 'https://redb.qsystems.co/QS3100/QServlet';
      const params = new URLSearchParams();
      params.append('operation', 'SaveService');
      params.append('nameService', this.serviceData.nameService);
      params.append('descriptionService', this.serviceData.descriptionService);
      params.append('entityIdService', this.serviceData.entityIdService);
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
              this.data = response.data.arrayService;
              alert('Servicio creado con éxito'); // Muestra un mensaje de éxito
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
  margin-bottom: 20px;
}
</style>
