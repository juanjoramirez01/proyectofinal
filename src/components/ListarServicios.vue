
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
      entityData: {
      idEntity: this.$route.params.idEntity,
    },

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
    fetch(`https://redb.qsystems.co/QS3100/QServlet?operation=queryServiceByEntity&tna=5&key=e35d751c-12a8-4789-91d0-a95f055f0630&entityIdService=${this.entityData.idEntity}`, {
    method: 'GET',
  })

    .then((response) => response.json())
    .then((data) => {
      
      if (data.arrayService) {
        this.servicios = data.arrayService;
      } else {
        console.error('La respuesta del servidor no contiene el campo "arrayService".', data);
      }
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
      this.$router.push({ name: 'editarservicio', params: { idService: id } });
    },
    
    async borrarServicio(idService) {
    try {
    // Construye la URL de eliminación con el ID del servicio
    const url = `https://redb.qsystems.co/QS3100/QServlet?tna=5&operation=DeleteService&idService=${idService}&key=e35d751c-12a8-4789-91d0-a95f055f0630`;

    
    const response = await axios.get(url);

    // Maneja la respuesta del servidor si es necesario
    console.log('Respuesta del servidor:', response.data);
    alert('Servicio eliminado exitosamente');
  
    // Elimina el servicio de la lista local
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