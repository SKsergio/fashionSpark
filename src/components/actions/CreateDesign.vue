<template>
    <div class="container_g">
        <!-- Menú con tipos de ropa a la izquierda -->
        <div class="menu-container">
            <ul class="menu">
                <li v-for="item in prendas" :key="item.id" class="menu-item">
                     <router-link :to="{ name: item.link }">

                        <img :src="item.imagen" :alt="item.tipo" class="menu-imagen" />
                        <h3>{{ item.tipo }}</h3>
                    </router-link>
                </li>
            </ul>
        </div>

        <!-- Mostrar prenda seleccionada en grande a la derecha -->
        <div class="prenda-detalle">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { onMounted, computed } from 'vue';

const store = useStore()
const prendas = computed(() => store.getters.getClothes);

</script>

<style scoped>
.container_g {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    gap: 10px;
}

.menu-container {
    width: 25%;
    padding-right: 20px;
    border-right: 2px solid #ccc;
}

.menu {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
}

.menu-item {
    margin: 10px 0;
    cursor: pointer;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.menu-imagen {
    width: 100px;
    height: 100px;
    border: 1px solid #000;
    margin-bottom: 5px;
}
.imagen-grande {
    width: 300px;
    height: 400px;
    border: 2px solid #000;
}
</style>