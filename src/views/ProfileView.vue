<template>
  <section id="profile-view">
    <PerfilCard :perfil="perfil" />
  </section>
</template>

<script setup>
import perfil from '@/data/sobreMi.json';
import PerfilCard from '@/components/PerfilCard.vue';
</script>

<style scoped src="@/assets/estilos/sobre-mi.css"></style>