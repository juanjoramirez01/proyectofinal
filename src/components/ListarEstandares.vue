
<template>
    <div class="container">
      <div class="card">
        <div class="card-header">
          Estandares
        </div>
        <div class="card-body">
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre del Estandar</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="estandar in paginatedEstandares" :key="estandar.id">
                <td>{{ estandar.id }}</td>
                <td>{{ estandar.name }}</td>
                <td>{{ estandar.description }}</td>
                <td>
                  <button @click="editEstandar(estandar.id)">Editar</button>
                  <button @click="confirmDelete(estandar.id)">Eliminar</button>
                  <!-- Agrega más botones según sea necesario -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="card-footer">
          <button @click="agregarEstandar" class="btn btn-primary">+ Agregar estandar</button>
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
        arrayStandard: [],
        currentPage: 1,
        itemsPerPage: 10,
        serviceData: {
            idService: this.$route.params.idService,
      },
  
      };
    },
    computed: {
      paginatedEstandares() {
        if (this.arrayStandard) {
          const startIndex = (this.currentPage - 1) * this.itemsPerPage;
          const endIndex = startIndex + this.itemsPerPage;
          return this.arrayStandard.slice(startIndex, endIndex);
        }
        return [];
      },
      totalPages() {
        return Math.ceil((this.arrayStandard && this.arrayStandard.length) || 0 / this.itemsPerPage);
      },
    },
    created() {
      this.consultarEstandares();
    },
  
    methods: {
      consultarEstandares() {
      // Realiza la solicitud para obtener la lista de estandares
      fetch(`https://redb.qsystems.co/QS3100/QServlet?operation=queryStandardByService&tna=5&key=e35d751c-12a8-4789-91d0-a95f055f0630&serviceIdStandard=${this.serviceData.idService}`, {
      method: 'GET',
    })
  
      .then((response) => response.json())
      .then((data) => {
        
        if (data.arrayStandard) {
          this.estandares = data.arrayStandard;
        } else {
          console.error('La respuesta del servidor no contiene el campo "arrayStandard".', data);
        }
      })
      .catch((error) => {
        console.error('Error al cargar la lista de estandares:', error);
      });
  },
    
      confirmDelete(id) {
        const estandarToDelete = this.arrayStandard.find((estandar) => estandar.id === id);
        if (estandarToDelete && confirm(`¿Seguro que deseas eliminar el estandar con ID: ${id}?`)) {
          this.borrarEstandar(estandarToDelete.id);
        }
      },
      agregarEstandar() {
        // Redirige a la vista para agregar un estandar
        this.$router.push({ name: 'agregarestandar' });
      },
      editEstandar(id) {
        // Redirige a la vista de edición y pasa el ID como parámetro
        this.$router.push({ name: 'editarestandar', params: { idStandard: id } });
      },
      
      async borrarEstandar(idStandard) {
      try {
      // Construye la URL de eliminación con el ID del estandar
      const url = `https://redb.qsystems.co/QS3100/QServlet?tna=5&operation=DeleteStandard&idStandard=${idStandard}&key=e35d751c-12a8-4789-91d0-a95f055f0630`;
  
      
      const response = await axios.get(url);
  
      // Maneja la respuesta del servidor si es necesario
      console.log('Respuesta del servidor:', response.data);
      alert('Estandar eliminado exitosamente');
    
      // Elimina el estandar de la lista local
      const index = this.estandares.findIndex((estandar) => estandar.id === idStandard);
      if (index !== -1) {
      this.estandares.splice(index, 1);
    }
    } catch (error) {
    // Maneja los errores en caso de que la solicitud falle
    console.error('Error al eliminar el estandar:', error);
  }
  },
      
      
    },
  };
  </script>
  
  <style scoped>
  /* Estilos adicionales personalizables aquí */
  </style>