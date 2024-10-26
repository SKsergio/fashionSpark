<template>
  <v-container class="d-flex align-center justify-center fill-height">
    <v-row class="align-center justify-center">
      <v-col cols="12" md="5">
        <v-card class="elevation-12 mx-auto my-0 position-relative" max-width="600">
          <v-card-title class="text-center justify-center">
            <h2 class="font-weight-bold mb-8">Login</h2>
          </v-card-title>
          <div class="logo-container">
            <v-img
              :src="logo"
              alt="Company Logo"
              class="logo-img"
            ></v-img>
          </div>

          <v-card-text>
            <v-form @submit.prevent="handleLogin">
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                prepend-icon="mdi-email"
                outlined
                dense
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                prepend-icon="mdi-lock"
                outlined
                dense
                required
              ></v-text-field>
              <v-btn color="success" class="mt-4" block @click="handleLogin">
                Ingresar
              </v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="secondary">
              Forgot password?
            </v-btn>
            <v-btn text color="primary" @click="goToRegister">
              Registrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import logo from '@/img/neto.jpeg';
import { login } from '@/auth';

const email = ref('');
const password = ref('');
const users = ref([]);
const router = useRouter();

const fetchUsers = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/usuarios'); // Reemplaza con la URL de tu endpoint
    if (!response.ok) {
      throw new Error('Error al obtener usuarios');
    }
    users.value = await response.json(); // Asumiendo que la API devuelve un array de usuarios
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const handleLogin = () => {
  const user = users.value.find(
    (user) => user.Email_Usuario === email.value && user.Contrasena_Usuario === password.value
  );

  if (user) {
    console.log('Login successful');
    login(); // Marca el estado como autenticado
    router.push('/'); // Redirige a la página principal
  } else {
    console.log('Invalid credentials');
    alert('Usuario o contraseña incorrecta');
  }
};

const goToRegister = () => {
  console.log('Navigating to register');
  router.push({ name: 'registrar' });
};

// Cargar usuarios al montar el componente
onMounted(fetchUsers);
</script>

<style scoped>
.v-card {
  position: relative;
  padding-top: 100px;
  padding-bottom: 40px;
  max-width: 600px;
}

.logo-container {
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

.logo-img {
  border-radius: 50%;
  border: 5px solid white;
  width: 140px;
  height: 140px;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.mb-8 {
  margin-bottom: 2rem;
}
</style>
