<template>
  
  <div class="container">
    <div class="card">
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre de la Entidad</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="entidad in paginatedEntidades" :key="entidad.id">
              <td>{{ entidad.id }}</td>
              <td>{{ entidad.name }}</td>
              <td>{{ entidad.phone }}</td>
              <td>{{ entidad.adress }}</td>
              <td>
                <button @click="editEntidad(entidad.id)">Editar</button>
                <button @click="confirmDelete(entidad.id)">Eliminar</button>
                <button @click="Usuarios(entidad.id)">Usuarios</button>
                <button @click="Servicios(entidad.id)">Servicios</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-footer">
        <div aria-label="First group">
          <button @click="agregarEntidad" class="btn btn-primary">+ Agregar entidad</button>
          
        </div>
        <div class="pagination-container">
          <nav aria-label="Second group">
            <ul class="pagination justify-content-center">
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
  </div>
</template>
    

<script>
import axios from 'axios';
export default {
  data() {
    return {
      entidades: [],
      currentPage: 1,
      itemsPerPage: 10,
      entityData: {
        idEntity: this.$route.params.idEntity,
      },
    };
  },
  computed: {
    paginatedEntidades() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.entidades.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.entidades.length / this.itemsPerPage);
    },
  },
  created() {
    this.consultarEntidades();
  },

  
  methods: {
    
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

    consultarEntidades() {
      // Realiza la solicitud para obtener la lista de entidades
      fetch('https://redb.qsystems.co/QS3100/QServlet?operation=queryEntityByTenancy&tna=5&key=e35d751c-12a8-4789-91d0-a95f055f0630', {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((data) => {
          this.entidades = data.arrayEntity;
        })
        .catch((error) => {
          console.error('Error al cargar la lista de entidades:', error);
        });
    },
  
    confirmDelete(id) {
      const entidadToDelete = this.entidades.find((entidad) => entidad.id === id);
      if (entidadToDelete && confirm(`¿Seguro que deseas eliminar la entidad con ID: ${id}?`)) {
        // Llama al método borrarEntidad con el ID de la entidad
        this.borrarEntidad(entidadToDelete.id);
      }
    },
    agregarEntidad() {
    // Redirige a la vista crearentidades.vue
    this.$router.push({ name: 'crearentidades' });
    },
    
    editEntidad(id) {
      // Redirigir a la vista de edición y pasar el ID como parámetro
      this.$router.push({ name: 'editarentidad', params: { idEntity: id } });

    },

    Usuarios(id) {
      // Redirigir a la vista de listar usarios y pasar el ID como parámetro
      this.$router.push({ name: 'listarusuarios', params: { idEntity: id } });
    },

    Servicios(id) {
      // Redirigir a la vista de listar servicios y pasar el ID como parámetro
      this.$router.push({ name: 'listarservicios', params: { idEntity: id } });
    },
  
  async borrarEntidad(idEntity) {
  try {
    // Construye la URL de eliminación con el ID de la entidad
    const url = `https://redb.qsystems.co/QS3100/QServlet?tna=5&operation=deleteEntity&idEntity=${idEntity}&key=e35d751c-12a8-4789-91d0-a95f055f0630`;

    const response = await axios.get(url);

    // Maneja la respuesta del servidor si es necesario
    console.log('Respuesta del servidor:', response.data);
    alert('Entidad eliminada con éxito.');
    
    // Elimina la entidad de la lista local
    const index = this.entidades.findIndex((entidad) => entidad.id === idEntity);
    if (index !== -1) {
      this.entidades.splice(index, 1);
    }
  } catch (error) {
    // Maneja los errores en caso de que la solicitud falle
    console.error('Error al eliminar la entidad:', error);
  }
}
  },
};
</script>

<style scoped>

.pagination .page-item:not(.disabled) .page-link {
  background-color: #2268A5;
  border-color:#2268A5;
  color: #fff; /* Cambiar el color del texto a negro */
  cursor: pointer; /* Cambiar el cursor al estilo de enlace */
}

.pagination .page-item:not(.disabled) .page-link:hover .button-custom{
  background-color: #2268A5; 
  border-color:#2268A5;/* Cambiar el color de fondo al pasar el cursor */
  color: #fff; /* Cambiar el color del texto al pasar el cursor */
}

.btn {
  background-color: #2268A5;
  border-color: #2268A5; /* Cambiar el color de fondo al pasar el cursor */
  color: #fff; /* Cambiar el color del texto al pasar el cursor */
}

.card-body {
  display: flex;
  align-items: center;
}

.button .button-custom{
  background-color: #2268A5;
  border-color: #2268A5; /* Cambiar el color de fondo al pasar el cursor */
  color: #fff; /* Cambiar el color del texto al pasar el cursor */
}

.btn .btn-primary
{
  background-color: #2268A5;
  border-color: #2268A5; /* Cambiar el color de fondo al pasar el cursor */
  color: #fff; /* Cambiar el color del texto al pasar el cursor */
  align-self: flex-start;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}

.pagination-container {
  display: flex;
  justify-content: center;
  flex-direction: row;
}

.pagination {
  margin: 0 auto;
  display: flex;
  justify-content: center; /* Alinea la paginación al centro */
  align-items: center;
}


</style>