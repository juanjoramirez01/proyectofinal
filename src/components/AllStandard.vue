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
                  <button @click="Criterios(estandar.id)">Criterios</button>
                  <button @click="Archivos(estandar.id)">Archivos</button></td>
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
        const url = 'https://redb.qsystems.co/QS3100/QServlet?operation=queryStandardByTenancy&tna=5&key=e35d751c-12a8-4789-91d0-a95f055f0630';
        //const url = `https://redb.qsystems.co/QS3100/QServlet?operation=queryStandardByService&tna=5&key=e35d751c-12a8-4789-91d0-a95f055f0630&idService=${this.$route.params.idService}`;

        axios
          .get(url)
          .then((response) => {
            this.arrayStandard = response.data.arrayStandard;
          })
          .catch((error) => {
            console.error('Error al cargar la lista de estandares:', error);
          });
      },
      
      async consultarEstandarPorId(idStandard) {
      try {
        const url = `https://redb.qsystems.co/QS3100/QServlet?operation=queryStandardById&tna=5&key=e35d751c-12a8-4789-91d0-a95f055f0630&idStandard=${idStandard}`;
        const response = await axios.get(url);

        console.log('Información del estandar:', response.data);

        if (response.data.arrayStandard && response.data.arrayStandard.length > 0) {
          // Obtén el idService directamente del estandar
          const idService = response.data.arrayStandard[0].serviceID;

          if (idService) {
            this.editEstandar(idStandard, idService);
          } else {
            console.error('No se encontró idService en la respuesta del estandar.');
          }
        } else {
          console.error('No se encontró arrayStandard o está vacío en la respuesta del servidor.');
        }
      } catch (error) {
        console.error('Error al cargar la información del estandar:', error);
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
        const estandarToDelete = this.arrayStandard.find((estandar) => estandar.id === id);
        if (estandarToDelete && confirm(`¿Seguro que deseas eliminar el estandar con ID: ${id}?`)) {
          this.borrarEstandar(estandarToDelete.id);
        }
      },
      agregarEstandar() {
        // Redirige a la vista para agregar un estandar
        this.$router.push({ name: 'agregarestandar' });
      },
      editEstandar(id, idService) {
        console.log('editEstandar method called with idService:', idService, 'and id:', id);
        this.consultarEstandarPorId(id);
        this.$router.push({ name: 'editarestandar', params: { serviceIdStandard: idService, idStandard: id } });
        // Redirige a la vista de edición y pasa el ID como parámetro
      },

      Estandares(id) {
        // Redirigir a la vista de listar usarios y pasar el ID como parámetro
        this.$router.push({ name: 'listarestandares', params: { idStandard: id } });
      },

      Criterios(id) {
        // Redirigir a la vista de listar estandares y pasar el ID como parámetro
        this.$router.push({ name: 'listarcriterios', params: { idStandard: id } });
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