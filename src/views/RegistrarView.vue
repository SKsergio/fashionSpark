<template>
  <div class="container">
    <h1>Registro de Usuario</h1>

    <!-- Paso 1: Registro -->
    <div v-if="step === 0">
      <h2>Ingresa tus datos</h2>
      <form @submit.prevent="handleNext">
        <div class="form-group">
          <label for="nombre">Nombre de Usuario:</label>
          <input type="text" v-model="nombreUsuario" required />
        </div>
        <div class="form-group">
          <label for="email">Correo Electrónico:</label>
          <input type="email" v-model="emailUsuario" required />
        </div>
        <div class="form-group">
          <label for="contrasena">Contraseña:</label>
          <input type="password" v-model="contrasenaUsuario" required />
        </div>
        <button type="submit">Continuar</button>
      </form>
    </div>

    <!-- Paso 2: Selección de Planes -->
    <div v-if="step === 1">
      <h2>Selecciona un Plan</h2>
      <div v-if="loading">Cargando planes...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <div v-for="plan in plans" :key="plan.id" :class="getPlanClass(plan.id)">
          <h3>{{ plan.Nombre_Plan }}</h3>
          <p>Precio: {{ plan.Precio_Plan }}$</p>
          <button @click="subscribeToPlan(plan)">Seleccionar Plan</button>
        </div>
      </div>
    </div>

    <!-- Paso 3: Pago -->
    <div v-if="step === 2">
      <h2>Pago</h2>
      <form @submit.prevent="handlePayment">
        <div class="form-group">
          <label for="card-name">Nombre en la Tarjeta:</label>
          <input type="text" v-model="cardName" required />
        </div>
        <!-- Este elemento debe estar aquí para ser montado por Stripe -->
        <div id="card-element"></div>
        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
        <button type="submit">Pagar {{ amount }}$</button>
      </form>
      <div v-if="successMessage" class="success">{{ successMessage }}</div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';

import Swal from 'sweetalert2';

const nombreUsuario = ref('');
const emailUsuario = ref('');
const contrasenaUsuario = ref('');
const step = ref(0); // 0: Registro, 1: Selección de Planes, 2: Pago
const plans = ref([]);
const loading = ref(true);
const error = ref('');
const planId = ref(null);
const amount = ref(0);
const cardName = ref('');
const errorMessage = ref('');
const successMessage = ref('');
let stripe;
let card;

// Fetch plans from API
const fetchPlans = async () => {
  loading.value = true;
  try {
    const response = await fetch('http://127.0.0.1:8000/api/planes');
    if (!response.ok) throw new Error('Error al cargar los planes');
    plans.value = await response.json();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

// Initialize Stripe and fetch plans on component mount
onMounted(() => {
  stripe = Stripe('pk_test_51QDLbaIH3ZfLT1PJm54EH5xBxclr0TngOuV8VyGp7TkvQ3g6pPI68fCObLbqsnLfnAWNvPfqLI6rFHmSSs4u39QM005kZEyD9h');
  fetchPlans();
});

// Move the logic to handle next step
const handleNext = () => {
  step.value = 1; // Cambiar a la vista de selección de planes
};

// Subscribe to a selected plan
const subscribeToPlan = (plan) => {
  planId.value = plan.id;
  amount.value = plan.Precio_Plan;
  step.value = 2; // Cambiar a la vista de pago
};

// Initialize the card element
const initializeCardElement = () => {
  const elements = stripe.elements();
  card = elements.create('card', {
    style: {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        lineHeight: '24px',
        padding: '10px',
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  });
  card.mount('#card-element');
};

// Watch for changes in step and mount the card element when it changes to 2
watch(step, async (newStep) => {
  if (newStep === 2) {
    await nextTick(); // Espera a que el DOM se actualice
    const elements = stripe.elements();
    card = elements.create('card', {
      style: {
        base: {
          color: '#32325d',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          lineHeight: '24px',
          padding: '10px',
        },
        invalid: {
          color: '#fa755a',
          iconColor: '#fa755a',
        },
      },
    });
    card.mount('#card-element');
  }
});


// Handle payment processing
const handlePayment = async () => {
  errorMessage.value = '';
  successMessage.value = '';

  const { error, paymentMethod } = await stripe.createPaymentMethod({
    type: 'card',
    card: card,
    billing_details: {
      name: cardName.value,
    },
  });

  if (error) {
    errorMessage.value = error.message;
  } else {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/pagos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId: planId.value,
          amount: amount.value,
          paymentMethodId: paymentMethod.id,
          Nombre_Usuario: nombreUsuario.value,
          Email_Usuario: emailUsuario.value,
          Contrasena_Usuario: contrasenaUsuario.value,
        }),
      });

      if (!response.ok) throw new Error('Error al procesar el pago');

      const registerResponse = await fetch('http://127.0.0.1:8000/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Nombre_Usuario: nombreUsuario.value,
          Email_Usuario: emailUsuario.value,
          Contrasena_Usuario: contrasenaUsuario.value,
          Plan_Id: planId.value,
          Rol_Id: 1, // Rol predeterminado
        }),
      });

      if (!registerResponse.ok) throw new Error('Error al registrar el usuario');

      successMessage.value = 'Pago y registro exitoso';

      Swal.fire({
        title: 'Éxito',
        text: 'Tu pago ha sido procesado y te has registrado correctamente.',
        icon: 'success',
        confirmButtonText: 'Continuar',
      }).then(() => {
        // Aquí puedes redirigir a la página de login o donde prefieras
      });
    } catch (error) {
      errorMessage.value = error.message;
    }
  }
};

const getPlanClass = (id) => {
  switch (id) {
    case 1: return 'basic';
    case 2: return 'intermediate';
    case 3: return 'premium';
    default: return '';
  }
};
</script>


<style scoped>
h1 {
  text-align: center;
}
.plans-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
.loading {
  font-size: 1.5rem;
  color: #2e2e2e;
}
.error {
  color: red;
  font-size: 1.2rem;
}
.plan-cards {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
.plan-card {
  width: 80%;
  max-width: 300px;
  padding: 20px;
  margin: 15px;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  text-align: center;
}
.price {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 10px 0;
}
.description {
  font-size: 1rem;
  margin: 10px 0;
}
.subscribe-button {
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.basic {
  background-color: #9bde7e;
}
.intermediate {
  background-color: #ffd966;
}
.premium {
  background-color: #ff7f7f;
}
.basic .subscribe-button {
  background-color: #76c457;
}
.basic .subscribe-button:hover {
  background-color: #66b24e;
}
.intermediate .subscribe-button {
  background-color: #ffbe00;
}
.intermediate .subscribe-button:hover {
  background-color: #ffab00;
}
.premium .subscribe-button {
  background-color: #ff4040;
}
.premium .subscribe-button:hover {
  background-color: #e63939;
}
.payment-container {
  padding: 20px;
  text-align: center;
}
.payment-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.submit-button {
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  background-color: #007bff;
  transition: background-color 0.3s ease;
}
.submit-button:hover {
  background-color: #0056b3;
}
.error {
  color: red;
  font-size: 1rem;
}
.success {
  color: green;
  font-size: 1rem;
}
</style>
