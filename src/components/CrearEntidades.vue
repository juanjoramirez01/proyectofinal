<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2>Crear Entidad</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="nameEntity">Nombre de la Entidad:</label>
            <input type="text" id="nameEntity" class="form-control" v-model="entityData.nameEntity" required>
          </div>
          <div class="form-group">
            <label for="phoneEntity">Teléfono de la Entidad:</label>
            <input type="text" id="phoneEntity" class="form-control" v-model="entityData.phoneEntity" required>
          </div>
          <div class="form-group">
            <label for="addressEntity">Dirección de la Entidad:</label>
            <input type="text" id="addressEntity" class="form-control" v-model="entityData.addressEntity" required>
          </div>
          <button type="submit" class="btn btn-primary">Aceptar</button>
        </form>
        <!-- Mostrar el mensaje de éxito -->
        <div v-if="mensaje" class="alert alert-success mt-3">{{ mensaje }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      entityData: {
        nameEntity: '',
        phoneEntity: '',
        addressEntity: '',
      },
      mensaje: '', // Propiedad para el mensaje
    };
  },
  methods: {
    async submitForm() {
      try {
        // Construye la URL con los datos del formulario
        const url = `https://redb.qsystems.co/QS3100/QServlet?tna=5&operation=SaveEntity&key=e35d751c-12a8-4789-91d0-a95f055f0630&nameEntity=${this.entityData.nameEntity}&phoneEntity=${this.entityData.phoneEntity}&adressEntity=${this.entityData.addressEntity}&idEntity=${this.entityData.idEntity}`;

        const response = await axios.post(url);

        // Maneja la respuesta del servidor si es necesario
        console.log('Respuesta del servidor:', response.data);

        // Asigna el mensaje de éxito
        this.mensaje = 'Entidad creada con éxito';

        // Restablece el formulario si es necesario
        this.entityData = {
          nameEntity: '',
          phoneEntity: '',
          adressEntity: '',
        };
      } catch (error) {
        // Maneja los errores en caso de que la solicitud falle
        console.error('Error al enviar la solicitud:', error);
      }
    }
  }
};
</script>

<style scoped>
.form-group {
  margin-bottom: 20px;
}
</style>
