<template>
    <!-- dialog -->
    <v-dialog v-model="dialog" width="700px">
        <v-card :color="color" variant="elevated" class="cardi">
            <v-card-item>
                <h1 class="text-overline">Escoge la prenda a crear</h1>
                <section class="body_card">
                    <clothe-category></clothe-category>
                    <gender-input></gender-input>
                </section>
            </v-card-item>

            <v-divider></v-divider>

            <v-card-actions>
                <v-btn variant="elevated" color="red" @click="closedBoton">Cancelar</v-btn>
                <v-btn color="indigo" variant="elevated">Hecho</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, watch, defineProps,defineEmits} from 'vue';
import ClotheCategory from '../utils/ClotheCategory.vue';
import GenderInput from '../utils/GenderInput.vue';

//comunicacion del padre al hijo
const props = defineProps({
  enterdialog: {
    required: true,
    default: false
  },
  color: {
    type: String,
    default: 'lime-accent-4'
  }
});

// Comunicación del hijo al padre
const emits = defineEmits(['closed']);

const dialog = ref(false);

// Función para cerrar el diálogo
const closedBoton = () => {
  dialog.value = false;  
  emits('closed', dialog.value);
};

watch(() => props.enterdialog, (newVal) => {
    dialog.value = newVal;
});
</script>

<style scoped>
.body_card {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center
}

.cardi {
    color: white;
}
</style>