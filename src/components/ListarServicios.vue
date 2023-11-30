<template>
  <div class="sidebar">
    <nav>
      
      <router-link to="/listarusuarios">Usuarios</router-link>

      <router-link to="/listarservicios">Servicios</router-link>

      <router-link to="/listarestandares">Estandares</router-link>

      <router-link to="/listarcriterios">Criterios</router-link>

    </nav>
</div>
  <div class="container">
    <div class="card">
      <div class="card-header">
        Lista de Servicios
      </div>
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="servicio in paginatedServicios" :key="servicio.id">
              <td>{{ servicio.name }}</td>
              <td>{{ servicio.description }}</td>
              <td>
                <button @click="consultarServicioPorId(servicio.id)">Editar</button>
                <button @click="confirmDelete(servicio.id)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-footer">
        <button @click="agregarServicio" class="btn btn-primary">+ Agregar servicio</button>
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center d-flex">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a class="page-link" @click="previousPage" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only"></span>
              </a>
            </li>
            <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
              <a class="page-link" @click="goToPage(page)">{{ page }}</a>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <a class="page-link" @click="nextPage" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only"></span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      servicios: [],
      currentPage: 1,
      itemsPerPage: 10,
      entityData: {
        idEntity: this.$route.params.idEntity,
      },
    };
  },
  computed: {
    paginatedServicios() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.servicios.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.servicios.length / this.itemsPerPage);
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
        console.log('Data recibida:', data); // Agrega este log
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
      const servicioToDelete = this.servicios.find((servicio) => servicio.id === id);
      if (servicioToDelete && confirm(`¿Seguro que deseas eliminar el servicio con ID: ${id}?`)) {
        this.borrarServicio(servicioToDelete.id);
      }
    },
    agregarServicio() {
      this.$router.push({ name: 'crearservicios' });
    },
    editServicio(id, entityId) {
      console.log('editServicio method called with entityId:', entityId, 'and id:', id);
      this.$router.push({ name: 'editarservicio', params: { entityIdService: entityId, idService: id } });
      
      
    },
    async borrarServicio(idService) {
      try {
        const url = `https://redb.qsystems.co/QS3100/QServlet?tna=5&operation=DeleteService&idService=${idService}&key=e35d751c-12a8-4789-91d0-a95f055f0630`;
        const response = await axios.get(url);
        console.log('Respuesta del servidor:', response.data);
        alert('Servicio eliminado con éxito.');

        const index = this.servicios.findIndex((servicio) => servicio.id === idService);
        if (index !== -1) {
          this.servicios.splice(index, 1);
        }
      } catch (error) {
        console.error('Error al eliminar el servicio:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Estilos adicionales personalizables aquí */
.pagination .page-item:not(.disabled) .page-link {
  background-color: #42b983;
  border-color: #42b983;
  color: #000; /* Cambiar el color del texto a negro */
  cursor: pointer; /* Cambiar el cursor al estilo de enlace */
}

.pagination .page-item:not(.disabled) .page-link:hover .button-custom{
  background-color: #42b983; /* Cambiar el color de fondo al pasar el cursor */
  color: #fff; /* Cambiar el color del texto al pasar el cursor */
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  display: flex; /* Utilizamos flexbox para organizar los elementos */
  height: 100vh; /* Hacemos que la altura ocupe toda la ventana */
  margin: 0;
}

.sidebar {
  background-color: #2268A5;
  color: #fff;
  padding: 20px;
  height: 100vh;
  min-width: 25px; /* Define el ancho mínimo del panel */
}

nav {
  display: flex;
  flex-direction: column; /* Hacemos que los enlaces estén en una columna */
}

nav a {
  font-weight: bold;
  border-color:#2268A5;
  color: #fff; /* Texto en color blanco */
  text-decoration: none; /* Quita el subrayado de los enlaces */
  padding: 5px 0;
}

nav a.router-link-exact-active {
  background-color: #2c3e50; /* Color de fondo para el enlace activo */
}


.container {
  margin-left: 200px;
}
</style>
