<template>
    <!-- <maniqui-mujer></maniqui-mujer> -->
    <div class="design__container_welcome">
        <div class="design_main">
            <article class="capa">
                <section class="welcome">
                    <h1 class="text_deco">Comienza a crear con los hilos de tu imaginación </h1>
                </section>
                <section class="next_ways">
                    <v-btn prepend-icon="mdi-pencil" class="btns mydesigns">Mis diseños</v-btn>
                    <v-btn prepend-icon="mdi-wizard-hat" class="btns createDesign" @click="dialog = true">Crear nuevo diseño</v-btn>
                    <v-btn prepend-icon="mdi-format-paint" class="btns tempaltesDesign">Plantillas</v-btn>
                </section>
            </article>

        </div>
        <section class="info">
            <h1>Creamos tus propios configuradores 3D personalizados</h1>
            <h1>Los consumidores pueden personalizar facil y rapidamente sus productos.</h1>
        </section>

        <modalBasic></modalBasic>
    </div>

</template>

<script setup>
//   import ManiquiMujer from '@/components/maniquis/ManiquiMujer.vue';
    import modalBasic from '@/components/templates/modalBasic.vue';

</script>

<style scoped>
.design__container_welcome{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 43px;
}
.design_main {
    color: white;
    background-image: url(../img/pexels-35.jpeg);
    background-position: center;
    background-size: cover;
    border-radius: 20px;
}

.capa {
    background-color: rgba(57, 143, 255, 0.473);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
    height: 100%;
}

.welcome {
    margin-top: 35px;
}

.next_ways {
    width: 50%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 26px;
}

.btns {
    width: 212px;
    height: 37px;
    color: white;
    margin-bottom: 17px;
    transition: all .9 ease;
}
.btns:hover{
    transform: scale(1.1);
}

.mydesigns {
    margin-right: 90px;
    background-color: var(--color-bluePrimary);
}

.createDesign {
    background-color: var(--color-greenPrimary);
}

.tempaltesDesign {
    margin-left: 90px;
    background-color: var(--color-orangePrimary);
}

.info {
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
}
</style>