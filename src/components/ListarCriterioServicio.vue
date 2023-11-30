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
          Lista de Criterios
        </div>
        <div class="card-body">
          <table class="table">
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Respuesta</th>
                <th>Observación</th>
                <th>Estandar</th>
                <th>Servicio</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="criterio in paginatedCriterios" :key="criterio.id">
                <td>{{ criterio.description }}</td>
                <td>{{ criterio.answer }}</td>
                <td>{{ criterio.observation }}</td>
                <td>{{ criterio.standardName }}</td>
                <td>{{ criterio.serviceName }}</td>
                <td>
                  <button @click="consultarCriterioPorId(criterio.id)">Editar</button>
                  <button @click="confirmDelete(criterio.id)">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="card-footer">
          <button @click="agregarCriterio" class="btn btn-primary">+ Agregar criterio</button>
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
        criterios: [],
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
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.criterios.slice(startIndex, endIndex);
      },
      totalPages() {
        return Math.ceil(this.criterios.length / this.itemsPerPage);
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
          console.log('Data recibida:', data); // Agrega este log
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
    async consultarCriterioPorId(idCriteria) {
        try {
          const url = `https://redb.qsystems.co/QS3100/QServlet?operation=queryCriteriaById&tna=5&key=e35d751c-12a8-4789-91d0-a95f055f0630&idCriteria=${idCriteria}`;
          const response = await axios.get(url);
  
          console.log('Información del criterio:', response.data);
  
          if (response.data.arrayCriteria && response.data.arrayCriteria.length > 0) {
            // Obtén el idService directamente del criterio
            const idService = response.data.arrayCriteria[0].serviceID;
  
            if (idService) {
              this.editCriterio(idCriteria, idService);
            } else {
              console.error('No se encontró idService en la respuesta del servidor.');
            }
          } else {
            console.error('No se encontró arrayCriteria o está vacío en la respuesta del servidor.');
          }
        } catch (error) {
          console.error('Error al cargar la información del criterio:', error);
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
        const criterioToDelete = this.criterios.find((criterio) => criterio.id === id);
        if (criterioToDelete && confirm(`¿Seguro que deseas eliminar el criterio con ID: ${id}?`)) {
          this.borrarCriterio(criterioToDelete.id);
        }
      },
      agregarCriterio() {
        this.$router.push({ name: 'crearcriterios' });
      },
      editCriterio(id, idService) {
        console.log('editCriterio method called with idService:', idService, 'and id:', id);
        this.$router.push({ name: 'editarcriterio', params: { serviceIdCriteria: idService, idCriteria: id } });
        
        
      },
      async borrarCriterio(idCriteria) {
        try {
          const url = `https://redb.qsystems.co/QS3100/QServlet?tna=5&operation=DeleteCriteria&idCriteria=${idCriteria}&key=e35d751c-12a8-4789-91d0-a95f055f0630`;
          const response = await axios.get(url);
          console.log('Respuesta del servidor:', response.data);
          alert('Criterio eliminado con éxito.');
  
          const index = this.criterios.findIndex((criterio) => criterio.id === idCriteria);
          if (index !== -1) {
            this.criterios.splice(index, 1);
          }
        } catch (error) {
          console.error('Error al eliminar el criterio:', error);
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
  </style>
  