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
        Usuarios
      </div>
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Nickname</th>
              <th>Documento</th>
              <th>Teléfono</th>
              <th>Posición</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="usuario in paginatedUsuarios" :key="usuario.id">
              <td>{{ usuario.name }}</td>
              <td>{{ usuario.nickname }}</td>
              <td>{{ usuario.document }}</td>
              <td>{{ usuario.phone }}</td>
              <td>{{ usuario.position }}</td>
              <td>
                <button @click="consultarUsuarioPorId(usuario.id)">Editar</button>
                <button @click="confirmDelete(usuario.id)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-footer">
        
          <button @click="agregarUsuario(entityData.idEntity)" class="btn btn-primary">+ Agregar usuario</button>
        
        
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
//import SidebarComp from '../components/SidebarComp.vue'; 
//import ListarUsuarios from 


export default {
  
  data() {
    return {
      usuarios: [],
      currentPage: 1,
      itemsPerPage: 10,
      entityData: {
        idEntity: this.$route.params.idEntity,
      },
    };
  },
  computed: {
    paginatedUsuarios() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.usuarios.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.usuarios.length / this.itemsPerPage);
    },
  },
  created() {
    this.consultarUsuarios();
  },
  methods: {
    consultarUsuarios() {
    // Realiza la solicitud para obtener la lista de usuarios
    fetch(`https://redb.qsystems.co/QS3100/QServlet?operation=queryUserByEntity&tna=5&key=e35d751c-12a8-4789-91d0-a95f055f0630&userEntityId=${this.entityData.idEntity}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Data recibida:', data); // Agrega este log
        if (data.arrayUser) {
          this.usuarios = data.arrayUser;
        } else {
          console.error('La respuesta del servidor no contiene el campo "arrayUser".', data);
        }
      })
      .catch((error) => {
        console.error('Error al cargar la lista de usuarios:', error);
      });
  },
  async consultarUsuarioPorId(userId) {
      try {
        const url = `https://redb.qsystems.co/QS3100/QServlet?operation=queryUserById&tna=5&key=e35d751c-12a8-4789-91d0-a95f055f0630&userId=${userId}`;
        const response = await axios.get(url);

        console.log('Información del usuario:', response.data);

        if (response.data.arrayUser && response.data.arrayUser.length > 0) {
          // Obtén el entityId directamente del usuario
          const entityId = response.data.arrayUser[0].entityID;

          if (entityId) {
            this.editUsuario(userId, entityId);
          } else {
            console.error('No se encontró entityId en la respuesta del servidor.');
          }
        } else {
          console.error('No se encontró arrayUser o está vacío en la respuesta del servidor.');
        }
      } catch (error) {
        console.error('Error al cargar la información del usuario:', error);
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
      const usuarioToDelete = this.usuarios.find((usuario) => usuario.id === id);
      if (usuarioToDelete && confirm(`¿Seguro que deseas eliminar el usuario con ID: ${id}?`)) {
        this.borrarUsuario(usuarioToDelete.id);
      }
    },
    agregarUsuario(entityId) {
      this.$router.push({ name: 'agregarusuarios', params: { userEntityId: entityId } });
    },
    editUsuario(id, entityId) {
      console.log('editUsuario method called with entityId:', entityId, 'and id:', id);
      this.$router.push({ name: 'editarusuario', params: { userEntityId: entityId, userId: id } });
      
      
    },
    async borrarUsuario(userId) {
      try {
        const url = `https://redb.qsystems.co/QS3100/QServlet?tna=5&operation=DeleteUser&userId=${userId}&key=e35d751c-12a8-4789-91d0-a95f055f0630`;
        const response = await axios.get(url);
        console.log('Respuesta del servidor:', url);
        console.log('Respuesta del servidor:', response.data);
        alert('Usuario eliminado con éxito.');

        const index = this.usuarios.findIndex((usuario) => usuario.id === userId);
        if (index !== -1) {
          this.usuarios.splice(index, 1);
        }
      } catch (error) {
        console.error('Error al eliminar el usuario:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Estilos adicionales personalizables aquí */
.pagination .page-item:not(.disabled) .page-link {
  background-color: #2268A5;
  border-color: #2268A5;
  color: #000; /* Cambiar el color del texto a negro */
  cursor: pointer; /* Cambiar el cursor al estilo de enlace */
}

.pagination .page-item:not(.disabled) .page-link:hover .button-custom{
  background-color: #2268A5; /* Cambiar el color de fondo al pasar el cursor */
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
