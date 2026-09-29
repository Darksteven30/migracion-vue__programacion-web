<template>
  <!-- Antes era "Mi tema libre/vista.html" + renderLikes() en script.js -->
  <div id="likes-view">
    <section class="portada">
      <p class="portada-mini">Mi juego favorito</p>
      <h2 class="portada-titulo">World of Warcraft</h2>
      <p class="portada-texto">
        Azeroth lleva más de veinte años en guerra. Aquí reuní a los personajes
        que más me marcaron y a las razas que se pueden jugar, con su capital,
        su líder y el rasgo que las hace distintas.
      </p>

      <!-- Antes: showCounters() escribía este bloque con innerHTML -->
      <div class="contadores">
        <div class="contador"><strong>{{ personajesData.personajes.length }}</strong><span>personajes</span></div>
        <div class="contador"><strong>{{ razasData.razas.length }}</strong><span>razas</span></div>
        <div class="contador alianza"><strong>{{ totalAlianza }}</strong><span>de la Alianza</span></div>
        <div class="contador horda"><strong>{{ totalHorda }}</strong><span>de la Horda</span></div>
      </div>
    </section>

    <!-- Antes: enableFilters() agregaba un addEventListener por botón y
         applyFilter() ocultaba tarjetas cambiando .hidden a mano.
         Aquí "filtro" es un ref reactivo: cambiarlo recalcula solas
         las listas filtradas (computed) y Vue vuelve a pintar. -->
    <div class="filtros">
      <span class="filtros-texto">Filtrar por facción</span>
      <button
        v-for="opcion in opcionesFiltro"
        :key="opcion.valor"
        class="filtro"
        :class="{ activo: filtro === opcion.valor }"
        @click="filtro = opcion.valor"
      >{{ opcion.etiqueta }}</button>
    </div>

    <section class="seccion">
      <h3 class="seccion-titulo">Personajes</h3>
      <p class="seccion-texto">{{ personajesData.tema }}</p>
      <div class="rejilla">
        <TarjetaCard
          v-for="personaje in personajesFiltrados"
          :key="personaje.nombre"
          :imagen="personaje.imagen"
          :icono="personaje.icono"
          :etiqueta="personaje.faccion"
          :titulo="personaje.nombre"
          :subtitulo="personaje.rol"
          :datos="[
            {etiqueta: 'Raza', valor: personaje.raza},
            {etiqueta: 'Clase', valor: personaje.clase},
          ]"
          :descripcion="personaje.descripcion"
          :variante="factionClass(personaje.faccion)"
        />
      </div>
    </section>

    <section class="seccion">
      <h3 class="seccion-titulo">Razas jugables</h3>
      <p class="seccion-texto">{{ razasData.descripcion }}</p>
      <div class="rejilla rejilla-razas">
        <TarjetaCard
          v-for="raza in razasFiltradas"
          :key="raza.nombre"
          :icono="raza.icono"
          :etiqueta="`${raza.faccion} · ${raza.tipo}`"
          :titulo="raza.nombre"
          :datos="[
            {etiqueta: 'Capital', valor: raza.capital},
            {etiqueta: 'Lider', valor: raza.lider},
            {etiqueta: 'Rasgo', valor: raza.rasgo},
          ]"
          :descripcion="raza.descripcion"
          :extra="raza.clases"
          :variante="factionClass(raza.faccion)"
        />
      </div>
    </section>

    <p class="sin-resultados" v-if="sinResultados">
      No hay nada de esa facción todavía. Prueba con otro filtro.
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import personajesData from '@/data/personajes.json';
import razasData from '@/data/razas.json';
import TarjetaCard from '@/components/TarjetaCard.vue';

const opcionesFiltro = [
  { valor: 'todas', etiqueta: 'Todas' },
  { valor: 'alianza', etiqueta: 'Alianza' },
  { valor: 'horda', etiqueta: 'Horda' },
  { valor: 'otros', etiqueta: 'Neutrales' },
];

// Antes el filtro activo se leía del botón que tuviera la clase .activo.
// Aquí es un simple ref con el valor seleccionado.
const filtro = ref('todas');

function factionClass(faccion) {
  if (faccion === 'Horda') return 'horda';
  if (faccion === 'Alianza') return 'alianza';
  return 'otros';
}

const personajesFiltrados = computed(() =>
  personajesData.personajes.filter(
    (personaje) => filtro.value === 'todas' || factionClass(personaje.faccion) === filtro.value
  )
);

const razasFiltradas = computed(() =>
  razasData.razas.filter(
    (raza) => filtro.value === 'todas' || factionClass(raza.faccion) === filtro.value
  )
);

const sinResultados = computed(
  () => personajesFiltrados.value.length === 0 && razasFiltradas.value.length === 0
);

const totalAlianza = computed(
  () => razasData.razas.filter((raza) => raza.faccion === 'Alianza').length
);
const totalHorda = computed(
  () => razasData.razas.filter((raza) => raza.faccion === 'Horda').length
);
</script>

<style scoped src="@/assets/estilos/mi-tema-libre.css"></style>
