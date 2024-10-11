<template>
    <!-- dialog -->
    <v-dialog v-model="dialog" width="700px">
        <v-card :color="color" variant="elevated" class="cardi">
            <v-card-item>
                <h1 class="text-overline">Escoge la prenda a crear</h1>
                <section class="body_card">
                    <clothe-category @sendCategory="setDataManiqui"></clothe-category>
                    <gender-input @SendGender="setDataManiqui"></gender-input>
                </section>
            </v-card-item>

            <v-divider></v-divider>

            <v-card-actions>
                <v-btn variant="elevated" color="red" @click="closedBoton">Cancelar</v-btn>
                <v-btn color="indigo" variant="elevated" @click="save">Hecho</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, watch, defineProps,defineEmits, computed} from 'vue';
import ClotheCategory from '../utils/ClotheCategory.vue';
import GenderInput from '../utils/GenderInput.vue';
import { useStore } from 'vuex';
import router from '@/router';

//estados 
const store = useStore()

//variable del modal
const dialog = ref(false);
// Comunicación del hijo al padre
const emits = defineEmits(['closed']);


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

// Función para cerrar el diálogo
const closedBoton = () => {
  dialog.value = false;  
  emits('closed', dialog.value);
};

watch(() => props.enterdialog, (newVal) => {
    dialog.value = newVal;
});

//funcion para recibir los envios del hijo
//DATOS QUE LUEGO SE GUARDARAN EN LA BD
const setDataManiqui =(data, tipo)=>{
    if (tipo === 'Categoria') {
        store.dispatch('ActionCurrentDesignCategory',data) 
    }else if(tipo === 'Genero'){
        store.dispatch('ActionCurrentDesignGender', data)
    }
}

const save = ()=>{
    const currentDesign = computed(() => store.getters.getCurrentDesign);
    const genero = computed(() => currentDesign.value.Genero);
    const categoria = computed(() => currentDesign.value.Category);


    if (genero.value && categoria.value) {
        router.push({ name: 'designerCreate' })   
    }else{
        alert('Los campos son requeridos')
    }
}
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