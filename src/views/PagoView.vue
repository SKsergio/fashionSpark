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
                    class="input-field"
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
import { useRouter, useRoute } from 'vue-router';
import Swal from 'sweetalert2';

const router = useRouter();
const route = useRoute();
const cardName = ref('');
const errorMessage = ref('');
const successMessage = ref('');
let stripe;
let card;

// Captura los parámetros de la URL
const planId = route.query.planId;
const amount = route.query.amount; 
const nombreUsuario = route.query.nombreUsuario; // Recibir el nombre de usuario
const emailUsuario = route.query.emailUsuario; // Recibir el correo electrónico
const contrasenaUsuario = route.query.contrasenaUsuario;

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
                border: '1px solid #ccc',
                borderRadius: '5px',
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
        // Aquí deberías realizar la lógica para procesar el pago en tu servidor
        try {
            const response = await fetch('http://127.0.0.1:8000/api/pagos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    planId,
                    amount,
                    paymentMethodId: paymentMethod.id,
                    nombreUsuario, // Incluir el nombre de usuario
                    emailUsuario, // Incluir el correo electrónico
                    contrasenaUsuario, // Incluir la contraseña del usuario
                }),
            });

            if (!response.ok) {
                throw new Error('Error al procesar el pago');
            }

            successMessage.value = 'Pago realizado con éxito';

            // Redirigir después de un pago exitoso
            Swal.fire({
                title: 'Éxito',
                text: 'Tu pago ha sido procesado correctamente.',
                icon: 'success',
                confirmButtonText: 'Continuar',
            }).then(() => {
                router.push({ name: 'login' }); // Cambia 'login' a la ruta deseada
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
    padding: 40px;
    background-color: #e9f7ef; /* Light green background */
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    color: #2c3e50; /* Darker text color for contrast */
}

.title {
    font-size: 2rem;
    color: #27ae60; /* Green color for title */
    margin-bottom: 20px;
}

.payment-form {
    width: 100%;
    max-width: 400px;
    background: rgba(255, 255, 255, 0.8); /* Semi-transparent white background */
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.form-group {
    margin: 15px 0;
}

.input-field {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
}

.input-field:focus {
    border-color: #27ae60; /* Light green border on focus */
    outline: none;
}

.submit-button {
    width: 100%;
    padding: 10px;
    background-color: #27ae60; /* Green button */
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;
}

.submit-button:hover {
    background-color: #219150; /* Darker green on hover */
}

.error {
    color: #e74c3c; /* Red for error messages */
    font-weight: bold;
    margin-top: 10px;
}

.success {
    color: #2ecc71; /* Light green for success messages */
    font-weight: bold;
    margin-top: 10px;
}
</style>
