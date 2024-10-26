<template>
    <div class="container">
    <!-- Menú con tipos de ropa a la izquierda -->
    <div class="menu-container">
      <h2>Tipos de Ropa</h2>
      <ul class="menu">
        <li
          v-for="item in ropa"
          :key="item.id"
          @click="seleccionarRopa(item)"
          class="menu-item"
        >
          <img :src="item.imagen" :alt="item.tipo" class="menu-imagen" />
          {{ item.tipo }}
        </li>
      </ul>
    </div>

    <!-- Mostrar prenda seleccionada en grande a la derecha -->
    <div v-if="ropaSeleccionada" class="prenda-detalle">
      <h3>{{ ropaSeleccionada.tipo }}</h3>
      <img
        :src="ropaSeleccionada.imagen"
        :alt="ropaSeleccionada.tipo"
        class="imagen-grande"
      />
    </div>
  </div>
</template>

<script setup>
    import { useStore } from 'vuex';

    const store = useStore()
</script>

<style scoped>

</style>