<template>
    <div class="payment-container">
        <h1 class="title">Formulario de Pago</h1>
        <p>Plan seleccionado: {{ planId }}</p>
        <p>Monto a pagar: ${{ amount }}</p>

        <form @submit.prevent="handlePayment" class="payment-form">
            <div class="form-group" ref="cardElement" id="card-element"></div>
            <div id="card-errors" role="alert"></div>

            <div class="form-group">
                <label for="cardName">Nombre del titular</label>
                <input
                    type="text"
                    id="cardName"
                    v-model="cardName"
                    placeholder="Nombre del titular"
                    required
                />
            </div>

            <div class="form-group">
                <button type="submit" class="submit-button">Pagar</button>
            </div>
        </form>

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'; // Importa useStore para acceder a Vuex
import Swal from 'sweetalert2';

const router = useRouter();
const store = useStore(); // Crea una instancia de Vuex
const cardName = ref('');
const errorMessage = ref('');
const successMessage = ref('');
let stripe;
let card;

// Captura los datos del usuario desde Vuex
const nombreUsuario = store.state.nombreUsuario; // Cambia esto según tu estado Vuex
const emailUsuario = store.state.emailUsuario; // Cambia esto según tu estado Vuex
const contrasenaUsuario = store.state.contrasenaUsuario; // Cambia esto según tu estado Vuex

// Captura el planId y el monto desde el estado o de donde lo estés obteniendo
const planId = store.state.planId; // Asegúrate de que este dato esté en Vuex
const amount = store.state.amount; // Asegúrate de que este dato esté en Vuex

onMounted(() => {
    stripe = Stripe('pk_test_51QDLbaIH3ZfLT1PJm54EH5xBxclr0TngOuV8VyGp7TkvQ3g6pPI68fCObLbqsnLfnAWNvPfqLI6rFHmSSs4u39QM005kZEyD9h'); // Cambiar a tu clave pública de Stripe
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
});

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
            // Procesar el pago en el backend
            const response = await fetch('http://127.0.0.1:8000/api/pagos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    planId,
                    amount,
                    paymentMethodId: paymentMethod.id,
                    nombreUsuario,
                    emailUsuario,
                    contrasenaUsuario,
                }),
            });

            if (!response.ok) {
                throw new Error('Error al procesar el pago');
            }

            // Registrar al usuario si el pago fue exitoso
            const registerResponse = await fetch('http://127.0.0.1:8000/api/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Nombre_Usuario: nombreUsuario,
                    Email_Usuario: emailUsuario,
                    Contrasena_Usuario: contrasenaUsuario,
                    Plan_Id: planId,
                    Rol_Id: 1, // Rol predeterminado
                }),
            });

            if (!registerResponse.ok) {
                throw new Error('Error al registrar el usuario');
            }

            successMessage.value = 'Pago y registro exitoso';

            // Mostrar mensaje de éxito y redirigir al usuario
            Swal.fire({
                title: 'Éxito',
                text: 'Tu pago ha sido procesado y te has registrado correctamente.',
                icon: 'success',
                confirmButtonText: 'Continuar',
            }).then(() => {
                router.push({ name: 'login' }); // Redirigir a la página de login o la que prefieras
            });
        } catch (error) {
            errorMessage.value = error.message;
        }
    }
};
</script>

<style scoped>
.payment-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}

.title {
    font-size: 1.8rem;
    color: #2e2e2e;
}

.payment-form {
    width: 100%;
    max-width: 400px;
}

.form-group {
    margin: 10px 0;
}

.submit-button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.submit-button:hover {
    background-color: #0056b3;
}

.error {
    color: red;
}

.success {
    color: green;
}
</style>
