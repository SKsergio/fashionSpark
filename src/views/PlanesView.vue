<template>
    <div class="plans-container">
        <h1 class="title">Planes de Suscripción</h1>

        <div v-if="loading" class="loading">Cargando planes...</div>

        <div v-else-if="error" class="error">{{ error }}</div>

        <div v-else class="plan-cards">
            <div v-for="plan in plans" :key="plan.id" :class="['plan-card', getPlanClass(plan.id)]">
                <h2>{{ plan.Nombre_Plan }}</h2>
                <p class="price">${{ plan.Precio_Plan }} / mes</p>
                <p class="description">{{ plan.Descripcion_Plan }}</p>
                <button @click="subscribeToPlan(plan)" class="subscribe-button">Suscribirse</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const plans = ref([]); 
const loading = ref(true); 
const error = ref(''); 

const fetchPlans = async () => {
    loading.value = true;
    try {
        const response = await fetch('http://127.0.0.1:8000/api/planes');
        if (!response.ok) {
            throw new Error('Error al cargar los planes');
        }
        const data = await response.json();
        plans.value = data; 
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    fetchPlans();
});

function subscribeToPlan(plan) {
    const nuevoUsuario = JSON.parse(localStorage.getItem('nuevoUsuario'));
    
    // Aquí podrías enviar la información del usuario y del plan al servidor si es necesario

    // Redirigir a la vista de pago con el ID del plan y el monto
    router.push({
        path: '/pago',
        query: { 
            planId: plan.id, 
            amount: plan.Precio_Plan,
            nombreUsuario: nuevoUsuario.Nombre_Usuario, // También puedes pasar el nombre de usuario si es necesario
            emailUsuario: nuevoUsuario.Email_Usuario, // Y el correo electrónico si es necesario
            contrasenaUsuario: nuevoUsuario.Contrasena_Usuario
        }
    });
}

const getPlanClass = (id) => {
    switch (id) {
        case 1: return 'basic';
        case 2: return 'intermediate';
        case 3: return 'premium';
        default: return '';
    }
}
</script>

<style scoped>
.plans-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    font-family: Arial, sans-serif;
    color: #fff;
}

.title {
    color: #2e2e2e;
    font-size: 2rem;
    margin-bottom: 20px;
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
    background-color: #5ca73e;
}

.intermediate .subscribe-button {
    background-color: #e6b800;
}

.intermediate .subscribe-button:hover {
    background-color: #d1a200;
}

.premium .subscribe-button {
    background-color: #e86b6b;
}

.premium .subscribe-button:hover {
    background-color: #d15353;
}

.loading {
    font-size: 1.5rem;
    color: #2e2e2e;
}

.error {
    color: red;
    font-size: 1.2rem;
}
</style>
