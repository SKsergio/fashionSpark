<template>
    <div class="payment-container">
        <h1 class="title">Formulario de Pago</h1>

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
const amount = route.query.amount; // Asegúrate de que amount sea un número en el backend

onMounted(() => {
    stripe = Stripe('pk_test_51QDLbaIH3ZfLT1PJm54EH5xBxclr0TngOuV8VyGp7TkvQ3g6pPI68fCObLbqsnLfnAWNvPfqLI6rFHmSSs4u39QM005kZEyD9h');
    const elements = stripe.elements();
    card = elements.create('card');
    card.mount('#card-element');
});

const handlePayment = async () => {
    errorMessage.value = '';
    successMessage.value = '';

    const { token, error } = await stripe.createToken(card);

    if (error) {
        errorMessage.value = error.message;
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:8000/api/procesarPago', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: parseInt(amount, 10), // Asegúrate de enviar el valor correcto
                stripeToken: token.id,
                plan_id: planId, // Usa el planId capturado
                pago_id: 1,
            }),
        });

        const result = await response.json();

        if (result.success) {
            await Swal.fire({
                title: 'Pago Realizado',
                text: 'Suscripción completada con éxito.',
                icon: 'success',
                confirmButtonText: 'Aceptar',
            });
            router.push('/');
        } else {
            errorMessage.value = 'El pago no se pudo procesar.';
        }
    } catch (error) {
        errorMessage.value = 'Error al procesar el pago: ' + error.message;
    }
}
</script>

<style scoped>
.payment-container {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.title {
    text-align: center;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.submit-button {
    width: 100%;
    padding: 10px;
    background-color: #28a745; /* Color verde */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
}

.submit-button:hover {
    background-color: #218838; /* Color verde más oscuro al pasar el cursor */
}

.error {
    color: red;
    text-align: center;
    margin-top: 10px;
}

.success {
    color: green;
    text-align: center;
    margin-top: 10px;
}
</style>
