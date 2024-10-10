<template>
  <!-- <maniqui-mujer></maniqui-mujer> -->
   <div class="design_main">
        <section class="welcome">
            <h1 class="text_deco">Comienza a crear con los hilos de tu imaginación </h1>
        </section>
        <section class="next_ways">
            <v-btn prepend-icon="mdi-pencil" class="btns mydesigns">Mis diseños</v-btn>
            <v-btn prepend-icon="mdi-wizard-hat" class="btns createDesign">Crear nuevo diseño</v-btn>
            <v-btn prepend-icon="mdi-format-paint" class="btns tempaltesDesign">Plantillas</v-btn>
        </section>
        <section class="info">
            <h1>puedes escoger hacer un disenio desde cero</h1>
            <h1>o utilizar una plantilla con un disenio </h1>
            <h1>previamente creado para facilitar tu proceso</h1>
        </section>
   </div>
</template>

<script setup>
//   import ManiquiMujer from '@/components/maniquis/ManiquiMujer.vue';
</script>

<style scoped>
    .design_main{
        /* margin-top: 20px; */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 50px;
        height: 100%;
    }
    .welcome{
        margin-top: 38px;
    }
    .next_ways{
        width: 50%;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        gap: 26px;
        /* background-color: red; */
    }
    .btns{
        width: 212px;
        height: 43px;
        color: white;
    }

    .mydesigns{
        margin-left: 150px;
        background-color: var(--color-bluePrimary);
    }
    .createDesign{
        margin-left: 200px;
        background-color: var(--color-greenPrimary);
    }

    .tempaltesDesign {
        margin-left: 250px;
        background-color: var(--color-orangePrimary);
    }


</style>