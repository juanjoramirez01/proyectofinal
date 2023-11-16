<template>
    <div class="container mt-4">
      <h2 class="mb-3">Autoevaluación</h2>
  
      <form @submit.prevent="submitForm">
        <div v-for="(item, index) in items" :key="index" class="form-check">
          <input v-model="selectedItems[index]" class="form-check-input" type="checkbox" :id="'item' + (index + 1)">
          <label class="form-check-label" :for="'item' + (index + 1)">
            {{ item }}
          </label>
        </div>
  
        <button type="submit" class="btn btn-primary mt-3">Enviar</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        items: [
          'Item 1',
          'Item 2',
          'Item 3',
          'Item 4',
          'Item 5',
          'Item 6',
          'Item 7',
          'Item 8',
          'Item 9',
          'Item 10'
        ],
        selectedItems: Array(10).fill(false)
      };
    },
    methods: {
      submitForm() {
        // Puedes hacer algo con los items seleccionados, por ejemplo, enviarlos al servidor
        console.log('Items seleccionados:', this.selectedItems);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos personalizables aquí */
  </style>
  