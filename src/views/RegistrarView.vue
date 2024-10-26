<template>
  <div class="register-container">
    <h1>Registrar</h1>
    <v-form @submit.prevent="handleRegister" class="form">
      <v-text-field
        v-model="nombreUsuario"
        label="Nombre de Usuario"
        outlined
        color="green"
        required
      ></v-text-field>

      <v-text-field
        v-model="emailUsuario"
        label="Correo Electrónico"
        type="email"
        outlined
        color="green"
        required
      ></v-text-field>

      <v-text-field
        v-model="contrasenaUsuario"
        label="Contraseña"
        type="password"
        outlined
        color="green"
        required
      ></v-text-field>

      <v-select
        v-model="suscripcionId"
        :items="planes"
        item-value="id"
        item-text="nombre"
        label="Seleccionar Plan"
        outlined
        color="green"
        required
      ></v-select>

      <v-btn type="submit" color="success" class="submit-btn">Registrar</v-btn>
    </v-form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'RegistrarView',
  setup() {
    const nombreUsuario = ref('');
    const emailUsuario = ref('');
    const contrasenaUsuario = ref('');
    const suscripcionId = ref(null);
    const router = useRouter();

    const planes = [
      { id: 1, nombre: 'Plan Básico' },
      { id: 2, nombre: 'Plan Intermedio' },
      { id: 3, nombre: 'Plan Avanzado' },
    ];

    const handleRegister = async () => {
      try {
        const nuevoUsuario = {
          Nombre_Usuario: nombreUsuario.value,
          Email_Usuario: emailUsuario.value,
          Contrasena_Usuario: contrasenaUsuario.value,
          Suscripcion_Id: suscripcionId.value,
          Rol_Id: 1,
        };

        const response = await fetch('http://127.0.0.1:8000/api/usuarios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuevoUsuario),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al registrar el usuario');
        }

        alert('Usuario registrado exitosamente');
        router.push({ name: 'planes' });
      } catch (error) {
        console.error('Error registering user:', error);
        alert('Error al registrar el usuario: ' + error.message);
      }
    };

    return {
      nombreUsuario,
      emailUsuario,
      contrasenaUsuario,
      suscripcionId,
      planes,
      handleRegister,
    };
  },
};
</script>

<style scoped>
.register-container {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #e0f7e9;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 128, 0, 0.15);
  text-align: center;
}

h1 {
  color: #388e3c;
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.submit-btn {
  background-color: #4caf50;
  color: #fff;
  font-weight: bold;
  font-size: 1.1rem;
  border-radius: 8px;
  padding: 10px 0;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #388e3c;
}

.v-input input {
  color: #388e3c;
}

.v-label {
  color: #66bb6a !important;
}

.v-select__selections, .v-text-field__details {
  color: #388e3c;
}
</style>
