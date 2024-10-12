<template>
    <div class="profile-container">
      <div class="header">
        <h1>Perfil</h1>
      </div>

      <div class="profile-info">
        <div class="field">
          <i class="fas fa-user"></i>
          <label>Nombre de la cuenta:</label>
          <p>{{ username }}</p>
        </div>

        <div class="field">
          <i class="fas fa-tag"></i>
          <label>Plan actual:</label>
          <p>{{ planMessage }}</p>
        </div>

        <div class="field">
          <i class="fas fa-calendar-alt"></i>
          <label>Fecha del siguiente pago:</label>
          <p>{{ nextPaymentDate }}</p>
        </div>

        <div class="field">
          <i class="fas fa-dollar-sign"></i>
          <label>Monto del pago:</label>
          <p>{{ paymentAmount }}</p>
        </div>

        <div class="actions">
          <button class="btn primary" @click="openModal">
            <i class="fas fa-key"></i> Cambiar Contraseña
          </button>
          <button class="btn danger" @click="confirmCancelPlan">
            <i class="fas fa-ban"></i> Cancelar Plan
          </button>
          <button class="btn secondary" @click="confirmChangePlan">
            <i class="fas fa-exchange-alt"></i> Cambiar Plan
          </button>
        </div>
      </div>

      <!-- Modal de Cambio de Contraseña -->
      <div v-if="showModal" class="modal-overlay">
        <div class="modal">
          <div class="modal-header">
            <h2>Cambiar Contraseña</h2>
            <button class="close" @click="closeModal">&times;</button>
          </div>
          <div class="modal-body">
            <div class="field">
              <label for="currentPassword">Contraseña Actual</label>
              <input type="password" id="currentPassword" v-model="currentPassword" />
            </div>
            <div class="field">
              <label for="newPassword">Nueva Contraseña</label>
              <input type="password" id="newPassword" v-model="newPassword" />
            </div>
            <div class="field">
              <label for="confirmPassword">Confirmar Nueva Contraseña</label>
              <input type="password" id="confirmPassword" v-model="confirmPassword" />
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn primary" @click="submitPasswordChange">Guardar Cambios</button>
            <button class="btn danger" @click="closeModal">Cancelar</button>
          </div>
        </div>
      </div>

      <!-- Modal de Selección de Plan -->
      <div v-if="showPlanModal" class="modal-overlay">
        <div class="modal">
          <div class="modal-header">
            <h2>Seleccionar Plan</h2>
            <button class="close" @click="closePlanModal">&times;</button>
          </div>
          <div class="modal-body">
            <div class="plan-option" v-for="plan in availablePlans" :key="plan.name">
              <label>
                <input type="radio" v-model="selectedPlan" :value="plan.name" />
                {{ plan.name }} - ${{ plan.price }}
              </label>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn primary" @click="confirmPlanChange">Confirmar Cambio</button>
            <button class="btn danger" @click="closePlanModal">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </template>


  <script setup>
  import { ref } from 'vue';

  const username = ref("Usuario123");
  const plan = ref("Premium");
  const nextPaymentDate = ref("25 de octubre, 2024");
  const paymentAmount = ref("$15.99");

  // Variables para el modal
  const showModal = ref(false);
  const currentPassword = ref("");
  const newPassword = ref("");
  const confirmPassword = ref("");

  // Variables para el modal de selección de plan
  const showPlanModal = ref(false);
  const selectedPlan = ref("");
  const availablePlans = ref([]);

  // Variable para el mensaje del plan
  const planMessage = ref(plan.value);

  // Funciones
  const openModal = () => {
    showModal.value = true;
  };

  const closeModal = () => {
    showModal.value = false;
    currentPassword.value = "";
    newPassword.value = "";
    confirmPassword.value = "";
  };

  const submitPasswordChange = () => {
    if (!currentPassword.value || !newPassword.value || !confirmPassword.value) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (newPassword.value !== confirmPassword.value) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    alert("Contraseña cambiada con éxito.");
    closeModal();
  };

  const confirmCancelPlan = () => {
    if (confirm("¿Estás seguro de que quieres cancelar el plan?")) {
      cancelPlan();
    }
  };

  const cancelPlan = () => {
    planMessage.value = "Has cancelado el plan";
    alert("Plan cancelado.");
  };

  const confirmChangePlan = () => {
    showPlanModal.value = true;
    // Cargar planes disponibles según el plan actual
    loadAvailablePlans();
  };

  const loadAvailablePlans = () => {
    // Aquí definimos los planes según el plan actual
    if (plan.value === "Premium") {
      availablePlans.value = [
        { name: "Básico", price: 5.99 },
        { name: "Intermedio", price: 10.99 }
      ];
    } else if (plan.value === "Básico") {
      availablePlans.value = [
        { name: "Básico", price: 5.99 },
        { name: "Intermedio", price: 10.99 }
      ];
    } else {
      availablePlans.value = [];
    }
  };

  const confirmPlanChange = () => {
    if (!selectedPlan.value) {
      alert("Por favor, selecciona un plan.");
      return;
    }

    plan.value = selectedPlan.value;
    planMessage.value = 'Has cambiado a ${plan.value}';
    alert('Has cambiado tu plan a ${plan.value}.');
    closePlanModal();
  };

  const closePlanModal = () => {
    showPlanModal.value = false;
    selectedPlan.value = ""; // Reiniciar la selección
  };
  </script>


  <style scoped>
  .profile-container {
    padding: 30px;
    background-color: #ffffff;
    border-radius: 12px;
    max-width: 800px;
    margin: 40px auto;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    background: linear-gradient(135deg, #a3e31b, #92fe9d);
  }

  .header {
    text-align: center;
    margin-bottom: 30px;
  }

  h1 {
    font-size: 2.5em;
    font-weight: bold;
    color: #fff;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .profile-info {
    background-color: rgba(255, 255, 255, 0.9);
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  .field {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .field i {
    font-size: 1.5em;
    color: #007bff;
    margin-right: 10px;
  }

  .field label {
    font-weight: bold;
    color: #333;
    margin-right: 15px;
    flex-shrink: 0;
    min-width: 150px;
  }

  .field p {
    font-size: 1.2em;
    color: #555;
  }

  .actions {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }

  .btn {
    display: flex;
    align-items: center;
    padding: 12px 25px;
    border: none;
    border-radius: 8px;
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  .btn i {
    margin-right: 8px;
  }

  .btn.primary {
    background-color: #28a745;
    color: white;
  }

  .btn.primary:hover {
    background-color: #218838;
  }

  .btn.secondary {
    background-color: #17a2b8;
    color: white;
  }

  .btn.secondary:hover {
    background-color: #117a8b;
  }

  .btn.danger {
    background-color: #dc3545;
    color: white;
  }

  .btn.danger:hover {
    background-color: #c82333;
  }

  .btn:active {
    transform: translateY(2px);
  }

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* Oscurecimiento más fuerte */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: linear-gradient(135deg, #fff, #e6e6e6); /* Fondo degradado */
  padding: 30px;
  border-radius: 16px; /* Bordes más redondeados */
  max-width: 500px;
  width: 100%;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  animation: slideDown 0.3s ease; /* Animación de entrada */
}

@keyframes slideDown {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.8em; /* Tamaño de fuente más grande */
  color: #333; /* Color del texto */
}

.modal-header .close {
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  color: #dc3545; /* Color del botón de cerrar */
}

.modal-body .field {
  margin-bottom: 20px;
}

.modal-body label {
  font-weight: bold;
  color: #555; /* Color del texto de las etiquetas */
}

.modal-body input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1em;
  transition: border-color 0.3s ease;
}

.modal-body input:focus {
  border-color: #007bff; /* Color del borde al enfocar */
  outline: none; /* Sin contorno */
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.btn.primary {
  background-color: #28a745;
  color: white;
}

.btn.primary:hover {
  background-color: #218838;
}

.btn.secondary {
  background-color: #17a2b8;
  color: white;
}

.btn.secondary:hover {
  background-color: #117a8b;
}

.btn.danger {
  background-color: #dc3545;
  color: white;
}

.btn.danger:hover {
  background-color: #c82333;
}

.btn:active {
  transform: translateY(2px);
}
.modal-body .plan-option {
  margin-bottom: 10px;
  font-size: 1.2em; /* Tamaño de fuente del plan */
}

</style>
