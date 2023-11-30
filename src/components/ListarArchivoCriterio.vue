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
                  <td>{{ archivo.nameFile }}</td>
                  <td>{{ archivo.urlFile }}</td>
                  <td>{{ archivo.descriptionFile }}</td>
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
            const fileIdStandard = 1; // Reemplaza con el valor correcto de fileIdStandard
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
      },
    };
  
    
    </script>
    