GuardarArchivo.vue
--------------------------
<template>
  <div class="container mt-5">
    <h2 class="text-center">Guardar archivo</h2>
    <form @submit.prevent="filesdata" class="mt-4">
        <div class="form-group">
            <label for="nameFile">Nombre del archivo:</label>
            <input type="text" id="nameFile" v-model="filesdata.nameFile" class="form-control" required>
        </div>
        <div class="form-group">
            <label for="urlFile">URL</label>
            <input type="text" id="urlFile" v-model="filesdata.urlFile" class="form-control" required>
        </div>
        <div class="form-group">
            <label for="descriptionFile">Descripcion</label>
            <input type="text" id="descriptionFile" v-model="filesdata.descriptionFile" class="form-control" required>
        </div>
        <div class="form-group">
            <label for="fileIdCriteria">ID criterio (int):</label>
            <input type="number" id="fileIdCriteria" v-model="filesdata.fileIdCriteria" class="form-control" required>
        </div>
        <div class="form-group">
            <label for="fileIdStandard">ID estandar (int):</label>
            <input type="number" id="fileIdStandard" v-model="filesdata.fileIdStandard" class="form-control" required>
        </div>
        <div class="text-center">
            <button type="submit" class="btn btn-primary">Guardar</button>
        </div>
    </form>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      filesdata: {
        nameFile: '',
        urlFile: '',
        descriptionFile: '',
        fileIdCriteria: 0, // Set default value
        fileIdStandard: 0, // Set default value
      },
      mensaje: '', // Assuming you have a variable to store success/error messages
    };
  },
  methods: {
    async submitForm() {
      try {
        // Construct the URL with the form data
        const url = `https://redb.qsystems.co/QS3100/QServlet?operation=SaveFile&tna=5&nameFile=${this.filesdata.nameFile}&urlFile=${this.filesdata.urlFile}&descriptionFile=${this.filesdata.descriptionFile}&fileIdCriteria=${this.filesdata.fileIdCriteria}&fileIdStandard=${this.filesdata.fileIdStandard}&key=e35d751c-12a8-4789-91d0-a95f055f0630`;

        const response = await axios.get(url);

        // Handle the server response if necessary
        console.log('Server Response:', response.data);

        // Assign the success message
        this.mensaje = 'Archivo guardado con éxito';

        // Reset the form if necessary
        this.filesdata = {
          nameFile: '',
          urlFile: '',
          descriptionFile: '',
          fileIdCriteria: 0,
          fileIdStandard: 0,
        };
      } catch (error) {
        // Handle errors in case the request fails
        console.error('Error sending request:', error);
        this.mensaje = 'Error al guardar el archivo';
      }
    }
  }
};
</script>
-------------------------------------------
import GuardarArchivo from '../components/GuardarArchivo.vue'
import ListarArchivo from '../components/ListarArchivo.vue'
  {
    path: '/guardararchivo',
    name: 'guardararchivo',
    component: GuardarArchivo
  },
  {
    path: '/listararchivo',
    name: 'listararchivo',
    component: ListarArchivo
  },