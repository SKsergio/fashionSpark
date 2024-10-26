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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import logo from '@/img/neto.jpeg';
import { login } from '@/auth';


const email = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = async () => {
  try {
    console.log('Intentando iniciar sesión con:', { email: email.value, password: password.value });

    const response = await fetch('http://127.0.0.1:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Email_Usuario: email.value,
        Contrasena_Usuario: password.value,
      }),
    });

    if (!response.ok) {
      throw new Error('Credenciales inválidas');
    }

    const data = await response.json();
    console.log('Login successful:', data);
    
    // Aquí puedes almacenar el token si usas autenticación basada en tokens
    // localStorage.setItem('token', data.token);

    // Redirigir al usuario después de iniciar sesión
    console.log('Redirigiendo a la página de inicio');
    login();
    router.push('/'); 
  } catch (error) {
    console.error('Error en el login:', error);
    alert('Usuario o contraseña incorrecta');
  }
};


const goToRegister = () => {
  router.push({ name: 'registrar' });
};
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
