<template>
  <!-- Antes era "harry/vista.html" + renderHarry() en harry/script.js.
       A diferencia del perfil y de "mis gustos" (datos locales, importados
       como JSON), aquí SÍ seguimos usando fetch(): son datos reales que
       vienen de una API externa y pueden tardar o fallar, por eso
       necesitamos "cargando" y "error" además de la lista. -->
  <div id="harry-view">
    <p v-if="cargando" class="aviso">Cargando personajes...</p>
    <p v-else-if="error" class="aviso">No se pudo cargar la vista de Harry Potter.</p>

    <div v-else id="harry-container">

      <TarjetaCard
        v-for="personaje in personajes"
        :key="personaje.name"
        :imagen="personaje.image"
        :titulo="personaje.name"
        :datos="[
          { etiqueta: 'Especie', valor: personaje.species },
          { etiqueta: 'Genero', valor: personaje.gender },
          { etiqueta: 'Color ojos', valor: personaje.eyeColour },
          { etiqueta: 'Color cabello', valor: personaje.hairColour },
          { etiqueta: 'Casa', valor: personaje.house },
          { etiqueta: 'Nacimiento', valor: personaje.yearOfBirth },
        ]"
        variante="harry"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import TarjetaCard from '@/components/TarjetaCard.vue';

const personajes = ref([]);
const cargando = ref(true);
const error = ref(false);

onMounted(async () => {
  try {
    const respuesta = await axios.get('https://hp-api.onrender.com/api/characters');
    personajes.value = respuesta.data.filter((personaje) => personaje.image !== '');
  } catch (err) {
    error.value = true;
    console.error('No carga el api', err);
  } finally {
    cargando.value = false;
  }
});
</script>

<style scoped src="@/assets/estilos/harry.css"></style>
