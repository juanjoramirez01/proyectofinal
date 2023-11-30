<template>
  <div class="sidebar">
    <nav>
      <router-link to="/listarentidades">Entidades</router-link>
      
      <router-link to="/listarusuarios">Usuarios</router-link>

      <router-link to="/listarservicios">Servicios</router-link>

      <router-link to="/listarestandares">Estandares</router-link>

      <router-link to="/listarcriterios">Criterios</router-link>

    </nav>
</div>
  <div class="container">
    <div class="card">
      <div class="card-header">
        Lista de Entidades
      </div>
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre de la Entidad</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th></th>
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
        <button @click="agregarEntidad" class="btn btn-primary">+ Agregar entidad</button>
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