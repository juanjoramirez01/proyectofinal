<template>
    <div class="container mt-5">
      <h2 class="text-center">Edición de datos de criterio</h2>
      <form @submit.prevent="submitForm" class="mt-4">
        <div class="form-group">
          <label for="descriptionCriteria">Descripción del criterio:</label>
          <input type="text" id="descriptionCriteria" v-model="criteriaData.descriptionCriteria" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="answerCriteria">Respuesta del criterio:</label>
          <input type="text" id="answerCriteria" v-model="criteriaData.answerCriteria" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="observationCriteria">Observación del criterio:</label>
          <input type="text" id="observationCriteria" v-model="criteriaData.observationCriteria" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="standardIdCriteria">ID del Estandar (int):</label>
          <input type="number" id="standardIdCriteria" v-model="criteriaData.standardIdCriteria" class="form-control" disabled>
        </div>
        <div class="form-group">
          <label for="serviceIdCriteria">ID del Servicio (int):</label>
          <input type="number" id="serviceIdCriteria" v-model="criteriaData.serviceIdCriteria" class="form-control" disabled>
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
        criteriaData: {
          idCriteria: this.$route.params.idCriteria,
          standardIdCriteria: this.$route.params.standardIdCriteria,
          serviceIdCriteria: this.$route.params.serviceIdCriteria,
          descriptionCriteria: '',
          answerCriteria: '',
          observationCriteria: '', 
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
            operation: 'UpdateCriteria',
            key: 'e35d751c-12a8-4789-91d0-a95f055f0630',
            descriptionCriteria: this.criteriaData.descriptionCriteria,
            answerCriteria: this.criteriaData.answerCriteria,
            observationCriteria: this.criteriaData.observationCriteria,
            idCriteria: this.criteriaData.idCriteria,
            standardIdCriteria: this.criteriaData.standardIdCriteria,
            serviceIdCriteria: this.criteriaData.serviceIdCriteria,
          };
  
          // Realiza la solicitud GET con axios y los parámetros
          const response = await axios.get(url, { params });
  
          // Maneja la respuesta del servidor si es necesario
          console.log('Respuesta del servidor:', response.data);
  
          // Asigna el mensaje de éxito
          this.mensaje = 'Criterio actualizado con éxito';
  
          // Restablece el formulario
          this.criteriaData = {
            idCriteria: this.$route.params.idCriteria,
            standardIdCriteria: this.$route.params.standardIdCriteria,
            serviceIdCriteria: this.$route.params.serviceIdCriteria,
            descriptionCriteria: '',
            answerCriteria: '',
            observationCriteria: '',
            
          };
        } catch (error) {
          // Maneja los errores en caso de que la solicitud falle
          console.error('Error al enviar la solicitud:', error);
        }
      },
    },
  };
  </script>
  