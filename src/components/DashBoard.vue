<template>
  <div class="dashboard">
    <h1>Dashboard de Cumplimiento</h1>
    <estado-chart :data="chartData" />
  </div>
</template>

<script>
import EstadoChart from './EstadoChart.vue';

export default {
  components: {
    EstadoChart,
  },
  data() {
    return {
      chartData: {
        labels: ['Estándar 1', 'Estándar 2', 'Estándar 3'], // Ejemplo de etiquetas
        values: [80, 60, 90], // Ejemplo de valores de cumplimiento (porcentajes)
      },
    };
  },
};
</script>

<style scoped>
.dashboard {
  max-width: 800px;
  margin: 0 auto;
}
</style>
