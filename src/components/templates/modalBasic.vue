<template>
    <!-- dialog -->
    <v-dialog v-model="dialog" width="700px">
        <v-card>
            <v-card-title>
                Este es el titulo maestro
            </v-card-title>
            <v-card-text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti optio
                consequuntur ratione vero in esse illum quis est nisi sunt dolor, maxime 
                magni laboriosam, mollitia cupiditate nesciunt earum qui modi.
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn @click="dialog=false">Cerrar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
    import { ref, defineProps } from 'vue';
    let dialog = ref(true);


    // const props = defineProps({
    //     enterdialog:{
    //         required:true
    //     },
    //     texto:{
    //         type:String,
    //         required: true
    //     },
    //     title:{
    //         required:false
    //     }
    // })



</script>

<style scoped>
</style>