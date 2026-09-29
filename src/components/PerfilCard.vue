<template>
  <!-- Antes vivía directo en ProfileView.vue. Ahora es un componente propio
       (igual que TarjetaCard), porque el docente pidió que "Mi perfil"
       también sea un componente. ProfileView solo trae el JSON y se lo
       pasa por props. -->
  <article class="ficha" :class="`faccion-${faccionClase}`">
    <aside class="ficha-lateral">
      <div class="retrato">
        <img v-if="perfil.foto" :src="perfil.foto" :alt="`Foto de ${perfil.nombre}`" />
        <span v-else class="iniciales">{{ iniciales }}</span>
      </div>

      <h2 class="ficha-nombre">{{ perfil.nombre }}</h2>
      <p class="ficha-titulo">{{ perfil.titulo }}</p>
      <span class="insignia">{{ perfil.faccion }}</span>

      <ul class="datos">
        <li><span>Clase</span><strong>{{ perfil.clase }}</strong></li>
        <li><span>Nivel</span><strong>{{ perfil.edad }}</strong></li>
        <li><span>Reino</span><strong>{{ perfil.ciudad }}</strong></li>
        <li><span>Correo</span><strong>{{ perfil.correo }}</strong></li>
      </ul>

      <div class="enlaces">
        <a
          v-for="enlace in perfil.enlaces"
          :key="enlace.nombre"
          class="enlace"
          :href="enlace.url"
          target="_blank"
          rel="noopener"
        >{{ enlace.nombre }}</a>
      </div>
    </aside>

    <div class="ficha-cuerpo">
      <blockquote class="frase">{{ perfil.fraseFavorita }}</blockquote>

      <section class="bloque">
        <h3>Quién soy</h3>
        <p class="presentacion">{{ perfil.presentacion }}</p>
      </section>

      <section class="bloque">
        <h3>Habilidades</h3>
        <ul class="lista-habilidades">
          <li v-for="habilidad in perfil.habilidades" :key="habilidad.nombre" class="habilidad">
            <span class="habilidad-nombre">{{ habilidad.nombre }}</span>
            <span class="barra">
              <span class="barra-llena" :style="{ width: habilidad.nivel + '%' }"></span>
            </span>
            <span class="habilidad-valor">{{ habilidad.nivel }}%</span>
          </li>
        </ul>
      </section>

      <section class="bloque">
        <h3>Lo que me gusta</h3>
        <ul class="lista-gustos">
          <li v-for="(gusto, index) in perfil.gustos" :key="index">{{ gusto }}</li>
        </ul>
      </section>

      <section class="bloque">
        <h3>Logros</h3>
        <ul class="lista-logros">
          <li v-for="logro in perfil.logros" :key="logro.titulo" class="logro">
            <h4>{{ logro.titulo }}</h4>
            <p>{{ logro.descripcion }}</p>
          </li>
        </ul>
      </section>

      <section class="bloque meta">
        <h3>Mi meta</h3>
        <p>{{ perfil.metaProfesional }}</p>
      </section>
    </div>
  </article>
</template>

<script setup>
import { computed, defineProps } from 'vue';

const props = defineProps({
  perfil: {
    type: Object,
    required: true,
  },
});

const iniciales = computed(() =>
  props.perfil.nombre
    .split(' ')
    .map((palabra) => palabra.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()
);

const faccionClase = computed(() => (props.perfil.faccion || 'Neutral').toLowerCase());
</script>

<style scoped>
/* Movido tal cual desde sobre-mi.css: como este componente puede
   usarse fuera de ProfileView, necesita su propio CSS, no depender
   del scope de la vista. */
.ficha{
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 0;
    border: 1px solid var(--borde);
    border-radius: 6px;
    overflow: hidden;
    background-color: var(--piedra);
    box-shadow: 0 18px 40px rgba(0,0,0,0.55);
}

.ficha.faccion-alianza{ --acento: var(--alianza); }
.ficha.faccion-horda{   --acento: var(--horda); }
.ficha.faccion-neutral{ --acento: var(--neutral); }

.ficha-lateral{
    align-self: start;
    border-bottom: 1px solid var(--borde);
    background:
        linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0.75)),
        var(--acento);
    border-right: 1px solid var(--borde);
    padding: 30px 24px;
    text-align: center;
}

.retrato{
    width: 150px;
    height: 150px;
    margin: 0 auto 18px auto;
    border-radius: 50%;
    border: 3px solid var(--oro);
    background-color: #0d1016;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    box-shadow: 0 0 0 6px rgba(0,0,0,0.35), 0 0 24px rgba(200,170,110,0.35);
}

.retrato img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.retrato .iniciales{
    font-family: 'Cinzel', Georgia, serif;
    font-size: 48px;
    color: var(--oro);
}

.ficha-nombre{
    color: #fff;
    margin: 0;
    font-size: 26px;
}

.ficha-titulo{
    color: var(--oro-claro);
    margin: 6px 0 14px 0;
    font-size: 14px;
}

.insignia{
    display: inline-block;
    padding: 4px 16px;
    border: 1px solid var(--oro);
    border-radius: 999px;
    color: var(--oro-claro);
    font-size: 12px;
    letter-spacing: 1px;
    background-color: rgba(0,0,0,0.45);
}

.datos{
    list-style: none;
    margin: 26px 0 22px 0;
    padding: 0;
    text-align: left;
}

.datos li{
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 9px 0;
    border-bottom: 1px solid rgba(255,255,255,0.12);
    font-size: 14px;
}

.datos span{
    color: var(--oro);
    font-family: 'Cinzel', Georgia, serif;
}

.datos strong{
    color: #f2efe6;
    font-weight: 400;
    text-align: right;
    word-break: break-word;
}

.enlaces{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
}

.enlace{
    color: var(--oro-claro);
    text-decoration: none;
    font-size: 13px;
    padding: 6px 12px;
    border: 1px solid rgba(240,217,168,0.4);
    border-radius: 3px;
    transition: 0.2s;
}

.enlace:hover{
    background-color: var(--oro);
    color: #1a1206;
}

.ficha-cuerpo{
    padding: 34px 38px 38px 38px;
}

.frase{
    margin: 0 0 28px 0;
    padding: 4px 0 4px 20px;
    border-left: 3px solid var(--acento);
    font-family: 'Cinzel', Georgia, serif;
    font-size: 19px;
    color: var(--pergamino);
    font-style: italic;
}

.bloque{
    margin-bottom: 30px;
    max-width: 68ch;
}

.bloque h3{
    color: var(--oro);
    font-size: 17px;
    margin: 0 0 12px 0;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(200,170,110,0.25);
}

.presentacion{
    margin: 0;
}

.lista-habilidades{
    list-style: none;
    margin: 0;
    padding: 0;
}

.habilidad{
    display: grid;
    grid-template-columns: 130px 1fr 46px;
    align-items: center;
    gap: 12px;
    margin-bottom: 11px;
    font-size: 14px;
}

.habilidad-nombre{
    color: var(--pergamino);
}

.barra{
    display: block;
    height: 10px;
    background-color: #0a0c10;
    border: 1px solid var(--borde);
    border-radius: 999px;
    overflow: hidden;
}

.barra-llena{
    display: block;
    height: 100%;
    background: linear-gradient(90deg, var(--acento), var(--oro));
}

.habilidad-valor{
    text-align: right;
    color: var(--texto-suave);
    font-size: 13px;
}

.lista-gustos{
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 0;
    padding: 0;
}

.lista-gustos li{
    background-color: var(--piedra-clara);
    border: 1px solid var(--borde);
    border-radius: 3px;
    padding: 8px 14px;
    font-size: 14px;
    color: var(--pergamino);
}

.lista-logros{
    list-style: none;
    margin: 0;
    padding: 0;
}

.logro{
    position: relative;
    padding: 0 0 14px 24px;
    border-left: 1px solid rgba(200,170,110,0.25);
    margin-left: 6px;
}

.logro:last-child{
    padding-bottom: 0;
}

.logro::before{
    content: "";
    position: absolute;
    left: -5px;
    top: 7px;
    width: 9px;
    height: 9px;
    background-color: var(--oro);
    transform: rotate(45deg);
}

.logro h4{
    margin: 0 0 2px 0;
    color: var(--pergamino);
    font-family: 'Cinzel', Georgia, serif;
    font-size: 15px;
}

.logro p{
    margin: 0;
    font-size: 14px;
    color: var(--texto-suave);
}

.meta{
    background-color: rgba(200,170,110,0.07);
    border: 1px solid var(--borde);
    border-radius: 4px;
    padding: 18px 22px;
    margin-bottom: 0;
}

.meta h3{
    margin-top: 0;
}

.meta p{
    margin: 0;
    color: var(--pergamino);
}

@media (max-width: 860px){
    .ficha{
        grid-template-columns: 1fr;
    }
    .ficha-lateral{
        border-right: none;
        border-bottom: 1px solid var(--borde);
    }
    .ficha-cuerpo{
        padding: 26px 22px 30px 22px;
    }
    .habilidad{
        grid-template-columns: 100px 1fr 42px;
    }
}
</style>