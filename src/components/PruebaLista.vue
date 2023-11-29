<template>
<form action="/procesar" method="post">
    <label for="menuDesplegable">Selecciona una entidad:</label>
    <select id="menuDesplegable" name="entidad">
        <!-- Las opciones se agregarán dinámicamente aquí -->
    </select>

    <!-- Otros campos del formulario aquí -->

    <input type="submit" value="Enviar">
</form>
</template>
<script>
export default {
  data() {
    return {
      entidades: []
    };
  },
methods: {
consultarEntidades() {
  // Realiza la solicitud para obtener la lista de entidades
  fetch('https://redb.qsystems.co/QS3100/QServlet?operation=queryEntityByTenancy&tna=5&key=e35d751c-12a8-4789-91d0-a95f055f0630', {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => {
      this.entidades = data.arrayEntity;

      // Llama a la función para construir el menú desplegable
      this.construirMenuDesplegable();
    })
    .catch((error) => {
      console.error('Error al cargar la lista de entidades:', error);
    });
},

construirMenuDesplegable() {
  // Obtén la referencia al menú desplegable
  var menuDesplegable = document.getElementById('menuDesplegable');

  // Elimina todas las opciones existentes (en caso de que haya alguna)
  menuDesplegable.innerHTML = '';

  // Agrega las nuevas opciones al menú desplegable
  this.entidades.forEach(function(entidad) {
    var opcion = document.createElement('option');
    opcion.value = entidad.id;  // Asigna el id como el valor de la opción
    opcion.text = entidad.name; // Asigna el name como el texto de la opción
    menuDesplegable.add(opcion);
  });
}
}
}
</script>
