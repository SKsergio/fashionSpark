<template>
  <div class="app-container">
  
    <LoginView v-if="!isAuthenticated" class="login-view" />

    <div v-else class="protected-view">
      <header>
        <Menu />
      </header>
      
      <main>
        <div class="main__container">
          <router-view />
        </div>
      </main>

      <footer>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { isAuthenticated } from '@/auth';
import Menu from './components/templates/Menu.vue';
import LoginView from './views/LoginView.vue';
</script>

<style scoped>
.app-container {
  height: 100vh; /* Ocupa toda la altura de la ventana */
  display: flex;
  flex-direction: column;
}

.login-view {
  flex: 1; /* Asegura que LoginView ocupe el espacio disponible */
  display: flex;
  align-items: center; /* Centra verticalmente el contenido */
  justify-content: center; /* Centra horizontalmente el contenido */
}

.protected-view {
  flex: 1; /* Asegura que la vista protegida ocupe el espacio disponible */
  display: flex;
  flex-direction: column; /* Organiza los elementos verticalmente */
}

.main__container {
  flex: 1; /* Asegura que el contenedor principal ocupe el espacio restante */
  padding: 1rem;
}
</style>
