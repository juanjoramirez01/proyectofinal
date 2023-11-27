<template>
    <div class="container mt-5">
      <h2 class="text-center">Edición de datos de estandar</h2>
      <form @submit.prevent="submitForm" class="mt-4">
        <div class="form-group">
          <label for="nameStandard">Nombre del Estandar:</label>
          <input type="text" id="nameStandard" class="form-control" v-model="standardData.nameStandard" required>
        </div>
        <div class="form-group">
          <label for="descriptionStandard">Descripción del Estandar:</label>
          <input type="text" id="descriptionStandard" class="form-control" v-model="standardData.descriptionStandard" required>
        </div>
        <div class="form-group">
          <label for="serviceIdStandard">ID del Servicio (int):</label>
          <input type="number" id="serviceIdStandard" class="form-control" v-model="standardData.serviceIdStandard" disabled>
        </div>
        <button type="submit" class="btn btn-primary">Aceptar</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        standardData: {
          idStandard: this.$route.params.idStandard,
          serviceIdStandard: this.$route.params.serviceIdStandard,
          nameStandard: '',
          descriptionStandard: '', 
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
            operation: 'UpdateStandard',
            key: 'e35d751c-12a8-4789-91d0-a95f055f0630',
            nameStandard: this.standardData.nameStandard,
            descriptionStandard: this.standardData.descriptionStandard,
            idStandard: this.standardData.idStandard,
            serviceIdStandard: this.standardData.serviceIdStandard,
          };
  
          // Realiza la solicitud GET con axios y los parámetros
          const response = await axios.get(url, { params });
  
          // Maneja la respuesta del servidor si es necesario
          console.log('Respuesta del servidor:', response.data);
  
          // Asigna el mensaje de éxito
          this.mensaje = 'Estandar actualizado con éxito';
  
          // Restablece el formulario
          this.standardData = {
            idStandard: this.$route.params.idStandard,
            serviceIdStandard: this.$route.params.serviceIdStandard,
            nameStandard: '',
            descriptionStandard: '', 
         
          };
        } catch (error) {
          // Maneja los errores en caso de que la solicitud falle
          console.error('Error al enviar la solicitud:', error);
        }
      },
    },
  };
  </script>
  