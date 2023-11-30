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
          Archivos por Estándar
        </div>
        <div class="card-body">
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre del Archivo</th>
                <th>URL</th>
                <th>Descripción</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="archivo in paginatedArchivos" :key="archivo.id">
                <td>{{ archivo.id }}</td>
                <td>{{ archivo.name }}</td>
                <td>{{ archivo.link }}</td>
                <td>{{ archivo.description }}</td>
                <td>
                  <button @click="editArchivo(archivo.id)">Editar</button>
                  <button @click="confirmDelete(archivo.id)">Eliminar</button>
                  <!-- Agrega más botones según sea necesario -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="card-footer">
          <button @click="agregarArchivo" class="btn btn-primary">+ Agregar Archivo</button>
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
        archivos: [], // Aquí almacenarás la lista de archivos por estándar
        currentPage: 1,
        itemsPerPage: 10,
        standardData: {
          idStandard: this.$route.params.idStandard,
        },
      };
    },
    computed: {
      paginatedArchivos() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.archivos.slice(startIndex, endIndex);
      },
      totalPages() {
        return Math.ceil(this.archivos.length / this.itemsPerPage);
      },
    },
    created() {
      // Llama a la función para consultar archivos por estándar
      this.consultarArchivosPorEstandar();
    },
    methods: {
      // Función para consultar archivos por estándar
      async consultarArchivosPorEstandar() {
        try {
          const tna = 5; // Reemplaza con el valor correcto de tna
          const fileIdStandard = this.standardData.idStandard; // Reemplaza con el valor correcto de fileIdStandard
          const apiKey = 'e35d751c-12a8-4789-91d0-a95f055f0630'; // Reemplaza con tu clave única
  
          const url = `https://redb.qsystems.co/QS3100/QServlet?operation=queryFileByStandard&tna=${tna}&fileIdStandard=${fileIdStandard}&key=${apiKey}`;
  
          const response = await axios.get(url);
  
          // Registro de la respuesta
          console.log('Respuesta de la API:', response.data);
  
          // Verifica si la respuesta es válida y tiene arrayFiles
          if (response.data.valid && response.data.arrayFiles) {
            this.archivos = response.data.arrayFiles;
          } else {
            console.error('La estructura de la respuesta de la API es incorrecta:', response.data);
          }
        } catch (error) {
          console.error('Error consultando archivos por estándar:', error);
        }
      },
      // Resto de tus métodos, como editArchivo, confirmDelete, agregarArchivo, etc.
      confirmDelete(id) {
        const criterioToDelete = this.archivos.find((archivo) => archivo.id === id);
        if (archivoToDelete && confirm(`¿Seguro que deseas eliminar el archivo con ID: ${id}?`)) {
          this.borrarArchivo(archivoToDelete.id);
        }
      },
      async borrarArchivo(idFile) {
        try {
          const url = `https://redb.qsystems.co/QS3100/QServlet?tna=5&operation=DeleteFile&idFile=${idFile}&key=e35d751c-12a8-4789-91d0-a95f055f0630`;
          const response = await axios.get(url);
          console.log('Respuesta del servidor:', response.data);
          alert('Archivo eliminado con éxito.');
  
          const index = this.archivos.findIndex((archivo) => archivo.id === idFile);
          if (index !== -1) {
            this.archivos.splice(index, 1);
          }
        } catch (error) {
          console.error('Error al eliminar el archivo:', error);
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
  