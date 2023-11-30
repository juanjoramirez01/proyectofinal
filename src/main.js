import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './components/styles.css';  // Ajusta la ruta según tu estructura de archivos


const app = createApp(App);

app.use(router);
app.use(store);

app.mount('#app');