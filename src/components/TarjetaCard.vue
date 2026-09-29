<template>
  <!-- Componente único de tarjeta. Antes eran PersonajeCard, RazaCard y
       HarryCard por separado. Ahora cada vista le pasa la información ya
       "traducida" a esta forma común: titulo, datos (pares etiqueta/valor),
       etc. Lo único que cambia entre vistas es la información, no la plantilla. -->
  <article class="carta" :class="variante" :data-faccion="variante">
    <div v-if="imagen" class="carta-imagen">
      <img :src="imagen" :alt="titulo" loading="lazy" />
    </div>

    <div v-if="icono || etiqueta" class="carta-top">
      <span v-if="icono" class="icono">{{ icono }}</span>
      <span v-if="etiqueta" class="etiqueta">{{ etiqueta }}</span>
    </div>

    <h4 class="carta-nombre">{{ titulo }}</h4>
    <p v-if="subtitulo" class="carta-rol">{{ subtitulo }}</p>

    <ul v-if="datos.length" class="carta-datos">
      <li v-for="dato in datos" :key="dato.etiqueta">
        <span>{{ dato.etiqueta }}</span>
        <strong>{{ dato.valor }}</strong>
      </li>
    </ul>

    <p v-if="descripcion" class="carta-descripcion">{{ descripcion }}</p>

    <ul v-if="extra.length" class="clases">
      <li v-for="item in extra" :key="item">{{ item }}</li>
    </ul>
  </article>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  imagen: { type: String, default: '' },
  icono: { type: String, default: '' },
  etiqueta: { type: String, default: '' },
  titulo: { type: String, required: true },
  subtitulo: { type: String, default: '' },
  // Pares { etiqueta, valor } que se muestran como fila. Ej:
  // { etiqueta: 'Raza', valor: 'Humano' }
  datos: { type: Array, default: () => [] },
  descripcion: { type: String, default: '' },
  // Lista simple de chips (ej: las clases jugables de una raza)
  extra: { type: Array, default: () => [] },
  // Controla el color de acento: 'horda' | 'alianza' | 'otros' | 'harry'
  variante: { type: String, default: 'otros' },
});
</script>

<style scoped>
/* Movido tal cual desde mi-tema-libre.css: ya no depende de estar
   dentro de LikesView, porque ahora vive en el propio componente. */
.carta{
    position: relative;
    background: linear-gradient(180deg, var(--piedra-clara), var(--piedra));
    border: 1px solid var(--borde);
    border-radius: 5px;
    padding: 18px;
    overflow: hidden;
}

.carta::before{
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background-color: var(--acento);
}

.carta.alianza{ --acento: var(--alianza); }
.carta.horda{   --acento: var(--horda); }
.carta.otros{   --acento: var(--neutral); }
.carta.harry{   --acento: #a01f1f; }

.carta-imagen{
    width: calc(100% + 36px);
    margin: -18px -18px 12px -18px;
    height: 160px;
    overflow: hidden;
    background-color: var(--negro);
}

.carta-imagen img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    display: block;
}

.carta-top{
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 10px;
}

.icono{
    font-size: 30px;
    line-height: 1;
}

.etiqueta{
    font-size: 11px;
    letter-spacing: 1px;
    color: var(--pergamino);
    background-color: color-mix(in srgb, var(--acento) 55%, black);
    border: 1px solid var(--acento);
    border-radius: 999px;
    padding: 3px 10px;
}

.carta-nombre{
    margin: 0 0 2px 0;
    color: var(--oro-claro);
    font-size: 19px;
}

.carta-rol{
    margin: 0 0 12px 0;
    font-size: 13px;
    color: var(--texto-suave);
    font-style: italic;
}

.carta-datos{
    list-style: none;
    margin: 0 0 12px 0;
    padding: 0;
    font-size: 13px;
}

.carta-datos li{
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 5px 0;
    border-bottom: 1px solid rgba(255,255,255,0.07);
}

.carta-datos span{
    color: var(--texto-suave);
}

.carta-datos strong{
    color: var(--pergamino);
    font-weight: 400;
    text-align: right;
}

.carta-descripcion{
    margin: 0;
    font-size: 14px;
    color: var(--texto);
}

.clases{
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin: 14px 0 0 0;
    padding: 0;
}

.clases li{
    font-size: 11px;
    color: var(--texto);
    border: 1px solid rgba(200,170,110,0.3);
    border-radius: 3px;
    padding: 3px 8px;
}

.carta.harry .carta-imagen{
    height: 250px;
}

.carta.harry .carta-imagen img{
    object-position: center;
}
</style>