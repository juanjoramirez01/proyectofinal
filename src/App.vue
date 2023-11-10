<template>
  <div id="app">
    <div class="sidebar">
      <nav>
        <router-link to="/listarentidades">Entidades</router-link>
        
        <router-link to="/">Usuarios</router-link>
        
        <router-link to="/about">Servicios</router-link>
      </nav>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  display: flex; /* Utilizamos flexbox para organizar los elementos */
  height: 100vh; /* Hacemos que la altura ocupe toda la ventana */
  margin: 0;
}

.sidebar {
  background-color: #42b983;
  padding: 20px;
  min-width: 200px; /* Define el ancho mínimo del panel */
}

nav {
  display: flex;
  flex-direction: column; /* Hacemos que los enlaces estén en una columna */
}

nav a {
  font-weight: bold;
  color: #fff; /* Texto en color blanco */
  text-decoration: none; /* Quita el subrayado de los enlaces */
  padding: 5px 0;
}

nav a.router-link-exact-active {
  background-color: #2c3e50; /* Color de fondo para el enlace activo */
}

.content {
  flex-grow: 1; /* Hace que el contenido ocupe el espacio restante */
  padding: 20px;
  color: #2c3e50;
  width: 200vh; /* Hacemos que el ancho se ajuste */
}



</style>

