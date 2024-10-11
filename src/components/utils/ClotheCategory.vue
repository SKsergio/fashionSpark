<template>
    <div>
        <div class="text-overline mb-1">
            <h1>Escoge la prenda a crear</h1>
        </div>
        <div class="radio-inputs">
            <label class="radio">
                <input type="radio" name="radio" checked="">
                <span class="name">Deportivo</span>
            </label>

            <label class="radio">
                <input type="radio" name="radio">
                <span class="name">Casual</span>
            </label>

            <label class="radio">
                <input type="radio" name="radio">
                <span class="name">Formal</span>
            </label>
        </div>
    </div>
</template>

<script setup>
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