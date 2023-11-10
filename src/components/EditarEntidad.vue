<template>
  <div>
    <h2>Editar Entidad</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="nameEntity">Nombre de la Entidad:</label>
        <input type="text" id="nameEntity" v-model="entityData.nameEntity" required>
      </div>
      <div class="form-group">
        <label for="adressEntity">Dirección:</label>
        <input type="text" id="adressEntity" v-model="entityData.adressEntity" required>
      </div>
      <div class="form-group">
        <label for="phoneEntity">Teléfono:</label>
        <input type="text" id="phoneEntity" v-model="entityData.phoneEntity" required>
      </div>
      <button type="submit" class="btn btn-primary">Guardar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      entityData: {
        idEntity: this.$route.params.idEntity,
        nameEntity: '',
        phoneEntity: '',
        adressEntity: '',
      },
    };
  },
  methods: {
    async submitForm() {
  try {
    // Construye la URL con los datos del formulario
    const url = `https://redb.qsystems.co/QS3100/QServlet`;
    
    // Configuración de los parámetros de la solicitud (en formato de consulta)
    const params = {
      tna: 5,
      operation: 'UpdateEntity',
      key: 'e35d751c-12a8-4789-91d0-a95f055f0630',
      nameEntity: this.entityData.nameEntity,
      phoneEntity: this.entityData.phoneEntity,
      adressEntity: this.entityData.adressEntity,
      idEntity: this.entityData.idEntity,
    };

    // Realiza la solicitud GET con axios y los parámetros
    const response = await axios.get(url, { params });

    // Maneja la respuesta del servidor si es necesario
    console.log('Respuesta del servidor:', response.data);

    // Asigna el mensaje de éxito
    this.mensaje = 'Entidad actualizada con éxito';

    // Restablece el formulario
    this.entityData = {
      nameEntity: '',
      phoneEntity: '',
      adressEntity: '',
    };
  } catch (error) {
    // Maneja los errores en caso de que la solicitud falle
    console.error('Error al enviar la solicitud:', error);
  }
},

  },
};
</script>
