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
                  <button @click="Estandares(servicio.id)">Estandares</button>
                  <button @click="Criterios(servicio.id)">Criterios</button></td>
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
      
      async consultarServicioPorId(idService) {
      try {
        const url = `https://redb.qsystems.co/QS3100/QServlet?operation=queryServiceById&tna=5&key=e35d751c-12a8-4789-91d0-a95f055f0630&idService=${idService}`;
        const response = await axios.get(url);

        console.log('Información del servicio:', response.data);

        if (response.data.arrayService && response.data.arrayService.length > 0) {
          // Obtén el entityId directamente del servicio
          const entityId = response.data.arrayService[0].entityID;

          if (entityId) {
            this.editServicio(idService, entityId);
          } else {
            console.error('No se encontró entityId en la respuesta del servidor.');
          }
        } else {
          console.error('No se encontró arrayService o está vacío en la respuesta del servidor.');
        }
      } catch (error) {
        console.error('Error al cargar la información del servicio:', error);
      }
    },

      previousPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }
      },
      goToPage(page) {
        this.currentPage = page;
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
      editServicio(id, entityId) {
        console.log('editServicio method called with entityId:', entityId, 'and id:', id);
        this.consultarServicioPorId(id);
        this.$router.push({ name: 'editarservicio', params: { entityIdService: entityId, idService: id } });
        // Redirige a la vista de edición y pasa el ID como parámetro
      },

      Estandares(id) {
        // Redirigir a la vista de listar usarios y pasar el ID como parámetro
        this.$router.push({ name: 'listarestandares', params: { idService: id } });
      },

      Criterios(id) {
        // Redirigir a la vista de listar servicios y pasar el ID como parámetro
        this.$router.push({ name: 'listarcriterios', params: { idService: id } });
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