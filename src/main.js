import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Estilos compartidos (colores, header y footer). Antes se cargaba con un
// <link> en index.html; en Vue se importa una sola vez aquí y queda global
// para toda la aplicación.
import './assets/estilos/tema-wow.css';

createApp(App)
  .use(router)
  .mount('#app');
