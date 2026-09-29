<template>
  <header class="hero">
    <h1 class="header-title">Mi tercera clase</h1>
    <p class="header-sub">Programación orientada a la web</p>
    
    <ul class="header-menu">
      <li class="header-items">
        <router-link :to="{ name: 'perfil' }" class="nav-link">Mi perfil</router-link>
      </li>
      <li class="header-items menu-desplegable">
        <button
          type="button"
          class="nav-link"
          :class="{ activo: proyectosActivo }"
          @click="proyectosAbierto = !proyectosAbierto"
        >
          Mis proyectos
        </button>
        <ul class="submenu" v-show="proyectosAbierto">
          <li>
            <router-link :to="{ name: 'gustos' }" class="nav-link" @click="proyectosAbierto = false">
              Mis gustos
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'harry' }" class="nav-link" @click="proyectosAbierto = false">
              Harry Potter
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
    
  </header>

  <!-- Aquí es donde vue-router "inyecta" la vista activa. Antes esto era
       el <main id="main-container"></main> vacío que script.js rellenaba
       a mano con mainContainer.innerHTML -->
  <main id="main-container">
    <router-view />
  </main>

  <footer class="site-footer">
    <div class="footer-grid">
      <div class="footer-col">
        <h4>Sobre este sitio</h4>
        <p>
          Proyecto de clase hecho con Vue 3 y vue-router. La información se
          carga desde archivos JSON y desde una API pública.
        </p>
      </div>
      <div class="footer-col">
        <h4>Secciones</h4>
        <ul>
          <li><router-link :to="{ name: 'perfil' }" class="nav-link">Mi perfil</router-link></li>
          <li><router-link :to="{ name: 'gustos' }" class="nav-link">Mis gustos</router-link></li>
          <li><router-link :to="{ name: 'harry' }" class="nav-link">Harry Potter</router-link></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contacto</h4>
        <!-- Antes esto lo llenaba showFooterContact() desde Sobre mi/script.js.
             Ahora perfil ya es un objeto reactivo disponible aquí mismo,
             así que basta con recorrerlo con v-for. -->
        <ul id="footer-contact">
          <li><a :href="`mailto:${perfil.correo}`">{{ perfil.correo }}</a></li>
          <li v-for="enlace in perfil.enlaces" :key="enlace.nombre">
            <a :href="enlace.url" target="_blank" rel="noopener">{{ enlace.nombre }}</a>
          </li>
        </ul>
      </div>
    </div>
    <p class="footer-linea">
      David Steven &middot; Programación orientada a la web &middot; 2026<br />
      World of Warcraft y sus razas son marcas de Blizzard Entertainment. Harry Potter es una marca de Warner Bros.
      Este sitio es solo un ejercicio académico sin ánimo de lucro.
    </p>
  </footer>
</template>

<script setup>
// sobreMi.json vive en src/data. Al importarlo así (sin fetch) Vue/webpack
// lo empaqueta como un módulo JS normal: no hace falta Live Server ni await,
// el objeto ya está listo apenas carga la página.
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import perfil from '@/data/sobreMi.json';

const route = useRoute();

// Controla si el submenú está desplegado
const proyectosAbierto = ref(false);

// El botón "Mis proyectos" se marca como activo si estás en cualquiera
// de sus dos subrutas, aunque el submenú esté cerrado
const proyectosActivo = computed(() =>
  route.name === 'gustos' || route.name === 'harry'
);
</script>
