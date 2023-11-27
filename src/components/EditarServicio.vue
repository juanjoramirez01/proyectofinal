<template>
    <div class="container mt-5">
      <h2 class="text-center">Edición de datos de servicio</h2>
      <form @submit.prevent="submitForm" class="mt-4">
        <div class="form-group">
          <label for="nameService">Nombre del Servicio:</label>
          <input type="text" id="nameService" class="form-control" v-model="serviceData.nameService" required>
        </div>
        <div class="form-group">
          <label for="descriptionService">Descripción del Servicio:</label>
          <input type="text" id="descriptionService" class="form-control" v-model="serviceData.descriptionService" required>
        </div>
        <!-- Los campos que no cambian permanecen deshabilitados y con un valor predefinido -->
        <div class="form-group">
          <label for="entityIdService">ID de Entidad (int):</label>
          <input type="number" id="entityIdService" class="form-control" v-model="serviceData.entityIdService" disabled>
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
        serviceData: {
          idService: this.$route.params.idService,
          entityIdService: this.$route.params.entityIdService,
          nameService: '',
          descriptionService: '',
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
            operation: 'UpdateService',
            key: 'e35d751c-12a8-4789-91d0-a95f055f0630',
            nameService: this.serviceData.nameService,
            descriptionService: this.serviceData.descriptionService,
            idService: this.serviceData.idService,
            entityIdService: this.serviceData.entityIdService,
          };
  
          // Realiza la solicitud GET con axios y los parámetros
          const response = await axios.get(url, { params });
  
          // Maneja la respuesta del servidor si es necesario
          console.log('Respuesta del servidor:', response.data);
  
          // Asigna el mensaje de éxito
          this.mensaje = 'Servicio actualizado con éxito';
  
          // Restablece el formulario
          this.serviceData = {
            idService: this.$route.params.idService,
            entityIdService: this.$route.params.entityIdService,
            nameService: '',
            descriptionService: '',
        };
        } catch (error) {
          // Maneja los errores en caso de que la solicitud falle
          console.error('Error al enviar la solicitud:', error);
        }
      },
    },
  };
  </script>
  