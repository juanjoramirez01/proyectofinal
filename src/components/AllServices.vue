<template>
    <div class="container">
      <div class="card">
        <div class="card-header">
          Servicios
        </div>
        <div class="card-body">
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre del Servicio</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="servicio in paginatedServicios" :key="servicio.id">
                <td>{{ servicio.id }}</td>
                <td>{{ servicio.name }}</td>
                <td>{{ servicio.description }}</td>
                <td>
                  <button @click="editServicio(servicio.id)">Editar</button>
                  <button @click="confirmDelete(servicio.id)">Eliminar</button>
                  <!-- Agrega más botones según sea necesario -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="card-footer">
          <button @click="agregarServicio" class="btn btn-primary">+ Agregar servicio</button>
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
        arrayService: [],
        currentPage: 1,
        itemsPerPage: 10,
      };
    },
    computed: {
      paginatedServicios() {
        if (this.arrayService) {
          const startIndex = (this.currentPage - 1) * this.itemsPerPage;
          const endIndex = startIndex + this.itemsPerPage;
          return this.arrayService.slice(startIndex, endIndex);
        }
        return [];
      },
      totalPages() {
        return Math.ceil((this.arrayService && this.arrayService.length) || 0 / this.itemsPerPage);
      },
    },
    created() {
      this.consultarServicios();
    },
  
    methods: {
      consultarServicios() {
        // Realiza la solicitud para obtener la lista de servicios
        const url = 'https://redb.qsystems.co/QS3100/QServlet?operation=queryServiceByTenancy&tna=5&key=e35d751c-12a8-4789-91d0-a95f055f0630';
        //const url = `https://redb.qsystems.co/QS3100/QServlet?operation=queryServicesByEntity&tna=5&key=e35d751c-12a8-4789-91d0-a95f055f0630&entityId=${this.$route.params.idEntity}`;

        axios
          .get(url)
          .then((response) => {
            this.arrayService = response.data.arrayService;
          })
          .catch((error) => {
            console.error('Error al cargar la lista de servicios:', error);
          });
      },
      confirmDelete(id) {
        const servicioToDelete = this.arrayService.find((servicio) => servicio.id === id);
        if (servicioToDelete && confirm(`¿Seguro que deseas eliminar el servicio con ID: ${id}?`)) {
          this.borrarServicio(servicioToDelete.id);
        }
      },
      agregarServicio() {
        // Redirige a la vista para agregar un servicio
        this.$router.push({ name: 'agregarservicio' });
      },
      editServicio(id) {
        // Redirige a la vista de edición y pasa el ID como parámetro
        this.$router.push({ name: 'editarservicio', params: { idServicio: id } });
      },
      
      async borrarServicio(idService) {
      try {
      // Construye la URL de eliminación con el ID del servicio
      const url = `https://redb.qsystems.co/QS3100/QServlet?tna=5&operation=DeleteService&idEntity=${idService}&key=e35d751c-12a8-4789-91d0-a95f055f0630`;

      
      const response = await axios.get(url);

      // Maneja la respuesta del servidor si es necesario
      console.log('Respuesta del servidor:', response.data);
      alert('Servicio eliminado exitosamente');
    
      // Elimina la entidad de la lista local
      const index = this.servicios.findIndex((servicio) => servicio.id === idService);
      if (index !== -1) {
      this.servicios.splice(index, 1);
    }
    } catch (error) {
    // Maneja los errores en caso de que la solicitud falle
    console.error('Error al eliminar el servicio:', error);
  }
},
      
      
    },
  };
  </script>
  
  <style scoped>
  /* Estilos adicionales personalizables aquí */
  </style>