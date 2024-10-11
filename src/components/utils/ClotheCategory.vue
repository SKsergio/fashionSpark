<template>
    <div>
        <div class="text-overline mb-1">
            <h1>Escoge la categoria de la prenda</h1>
        </div>
        <div class="radio-inputs">
            <label class="radio">
                <input type="radio" name="radio" checked="" v-model="categoria" value="Deportivo">
                <span class="name">Deportivo</span>
            </label>

            <label class="radio">
                <input type="radio" name="radio" v-model="categoria" value="Casual">
                <span class="name">Casual</span>
            </label>

            <label class="radio">
                <input type="radio" name="radio" v-model="categoria" value="Formal">
                <span class="name">Formal</span>
            </label>
        </div>
    </div>
</template>

<script setup>
    import { ref, defineEmits, watch } from 'vue';

    //EMITS
    const emit = defineEmits(["sendCategory"])

    //valor a enviar
    let categoria = ref('');

    //chequeando cualquier cambio
    watch(categoria, (NewVal, OldVal)=>{
        if (NewVal != OldVal) {
            HandleClick(NewVal)
        }
    })

    //funcion de encvio
    const HandleClick = (value)=>{
        emit("sendCategory",value,'Categoria')
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

.radio-inputs .radio .name {
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

.radio-inputs .radio input:checked+.name {
    background-color: rgb(85, 224, 108);
    font-weight: 600;
}
</style>