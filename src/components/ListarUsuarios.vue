<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        Lista de Usuarios
      </div>
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Posición</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="usuario in paginatedUsuarios" :key="usuario.id">
              <td>{{ usuario.id }}</td>
              <td>{{ usuario.name }}</td>
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
        <button @click="agregarUsuario" class="btn btn-primary">+ Agregar usuario</button>
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
    agregarUsuario() {
      this.$router.push({ name: 'crearusuarios' });
    },
    editUsuario(id, entityId) {
      console.log('editUsuario method called with entityId:', entityId, 'and id:', id);
      this.consultarUsuarioPorId(id);
      this.$router.push({ name: 'editarusuario', params: { userEntityId: entityId, userId: id } });
      
      
    },
    async borrarUsuario(userId) {
      try {
        const url = `https://redb.qsystems.co/QS3100/QServlet?tna=5&operation=DeleteUser&UserId=${userId}&key=e35d751c-12a8-4789-91d0-a95f055f0630`;
        const response = await axios.get(url);
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
  background-color: #42b983;
  border-color: #42b983;
  color: #000; /* Cambiar el color del texto a negro */
  cursor: pointer; /* Cambiar el cursor al estilo de enlace */
}

.pagination .page-item:not(.disabled) .page-link:hover .button-custom{
  background-color: #42b983; /* Cambiar el color de fondo al pasar el cursor */
  color: #fff; /* Cambiar el color del texto al pasar el cursor */
}
</style>
