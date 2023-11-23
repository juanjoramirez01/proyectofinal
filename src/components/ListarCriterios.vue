
<template>
    <div class="container">
      <div class="card">
        <div class="card-header">
          Criterios
        </div>
        <div class="card-body">
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Descripción</th>
                <th>Respuesta</th>
                <th>Observación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="criterio in paginatedCriterios" :key="criterio.id">
                <td>{{ criterio.id }}</td>
                <td>{{ criterio.description }}</td>
                <td>{{ criterio.answer }}</td>
                <td>{{ criterio.observation }}</td>
                <td>
                  <button @click="editCriterio(criterio.id)">Editar</button>
                  <button @click="confirmDelete(criterio.id)">Eliminar</button>
                  <!-- Agrega más botones según sea necesario -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="card-footer">
          <button @click="agregarCriterio" class="btn btn-primary">+ Agregar criterio</button>
          <!-- Agrega paginación si es necesario -->
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        arrayCriteria: [],
        currentPage: 1,
        itemsPerPage: 10,
        serviceData: {
            idService: this.$route.params.idService,
      },
        standardData: {
            idStandard: this.$route.params.idStandard,
      },
  
      };
    },
    computed: {
      paginatedCriterios() {
        if (this.arrayCriteria) {
          const startIndex = (this.currentPage - 1) * this.itemsPerPage;
          const endIndex = startIndex + this.itemsPerPage;
          return this.arrayCriteria.slice(startIndex, endIndex);
        }
        return [];
      },
      totalPages() {
        return Math.ceil((this.arrayCriteria && this.arrayCriteria.length) || 0 / this.itemsPerPage);
      },
    },
    created() {
      this.consultarCriterios();
    },
  
    methods: {
      consultarCriterios() {
      // Realiza la solicitud para obtener la lista de criterios
      fetch(`https://redb.qsystems.co/QS3100/QServlet?operation=queryCriteriaByService&tna=5&key=e35d751c-12a8-4789-91d0-a95f055f0630&serviceIdCriteria=${this.serviceData.idService}`, {
      method: 'GET',
    })
  
      .then((response) => response.json())
      .then((data) => {
        
        if (data.arrayCriteria) {
          this.criterios = data.arrayCriteria;
        } else {
          console.error('La respuesta del servidor no contiene el campo "arrayCriteria".', data);
        }
      })
      .catch((error) => {
        console.error('Error al cargar la lista de criterios:', error);
      });
  },
    
      confirmDelete(id) {
        const criterioToDelete = this.arrayCriteria.find((criterio) => criterio.id === id);
        if (criterioToDelete && confirm(`¿Seguro que deseas eliminar el criterio con ID: ${id}?`)) {
          this.borrarCriterio(criterioToDelete.id);
        }
      },
      agregarCriterio() {
        // Redirige a la vista para agregar un criterio
        this.$router.push({ name: 'agregarcriterio' });
      },
      editCriterio(id) {
        // Redirige a la vista de edición y pasa el ID como parámetro
        this.$router.push({ name: 'editarcriterio', params: { idCriteria: id } });
      },
      
      async borrarCriterio(idCriteria) {
      try {
      // Construye la URL de eliminación con el ID del criterio
      const url = `https://redb.qsystems.co/QS3100/QServlet?tna=5&operation=DeleteCriteria&idCriteria=${idCriteria}&key=e35d751c-12a8-4789-91d0-a95f055f0630`;
  
      
      const response = await axios.get(url);
  
      // Maneja la respuesta del servidor si es necesario
      console.log('Respuesta del servidor:', response.data);
      alert('Criterio eliminado exitosamente');
    
      // Elimina el criterio de la lista local
      const index = this.criterios.findIndex((criterio) => criterio.id === idCriteria);
      if (index !== -1) {
      this.criterios.splice(index, 1);
    }
    } catch (error) {
    // Maneja los errores en caso de que la solicitud falle
    console.error('Error al eliminar el criterio:', error);
  }
  },
      
      
    },
  };
  </script>
  
  <style scoped>
  /* Estilos adicionales personalizables aquí */
  </style>