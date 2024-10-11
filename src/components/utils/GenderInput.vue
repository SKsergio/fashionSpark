<template>
    <div class="gener">
        <div class="text-overline mb-1">
            <h2>Escoge el genero del maniqui</h2>
        </div>
        <div class="radio-inputs">
            <label class="radio">
                <input type="radio" name="radioGender" value="F" v-model="genero">
                <span class="gender">Femenino</span>
            </label>

            <label class="radio">
                <input type="radio" name="radioGender" value="M" v-model="genero">
                <span class="gender">Masculino</span>
            </label>
        </div>
    </div>
</template>

<script setup>
    import { ref,defineEmits,watch } from 'vue';

    //EMITS
    const emit = defineEmits(["SendGender"])
    let genero = ref('')

    //chqueando los cambio
    watch(genero, (NewVal, OldVal)=>{
        if (NewVal != OldVal) {
            HandleClick(NewVal)
        }
    })

    //funcion de ennvio
    const HandleClick = (value)=>{
        emit("SendGender", value, 'Genero')
    }




</script>

<style scoped>
@import url('@/css/variables.css');

.radio-inputs {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    border-radius: 0.5rem;
    background-color: #c5d8ddd5;
    box-sizing: border-box;
    box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
    padding: 0.25rem;
    width: 300px;
    font-size: 14px;
}

.radio-inputs .radio {
    flex: 1 1 auto;
    text-align: center;
}

.radio-inputs .radio input {
    display: none;
}
.gener{   
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.radio-inputs .radio .gender {
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    border: none;
    padding: .5rem 0;
    color: rgba(51, 65, 85, 1);
    transition: all .15s ease-in-out;
}

.radio-inputs .radio input:checked+.gender {
    background-color: rgb(255, 255, 255);
    font-weight: 600;
}
</style>