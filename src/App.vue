<template>
  <!-- menu -->
  <header>
   <Menu></Menu>
  </header>

  <main>
    <router-view/>
  </main>

  <footer>
  </footer>
</template>

<script setup>
    import Menu from './components/Menu.vue';
</script>
