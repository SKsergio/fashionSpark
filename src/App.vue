<template>
  <!-- menu -->
  <header>
   <Menu></Menu>
  </header>

  <main>
    <div class="main__container">
        <router-view/>
    </div>
  </main>

  <footer>
    <!-- <h1>Holaaaaa</h1> -->
  </footer>
</template>

<script setup>
    import Menu from './components/templates/Menu.vue';
</script>
