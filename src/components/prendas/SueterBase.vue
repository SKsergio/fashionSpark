<template>

</template>

<script setup>
    import * as THREE from 'three';
    import { ref, onMounted, watch, computed } from 'vue';
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

    // let scene = computed(()=>store.getters.scene);

    const props = defineProps({
        scene: Object  // Ruta del modelo de la prenda
    });

    let prenda;

     function centerModel(model) {
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);  // Ajustar al centro
    }

    onMounted(() => {
        let loader = new GLTFLoader();
        loader.load('/design/sueltermujer.glb',(gltf)=>{
            prenda = gltf.scene;
            props.scene.add(prenda)
            // Ajustar la escala del suéter si es necesario
            // prenda.scale.set(1.1, 1, 1.5);
            prenda.position.set(0, 0, 0);  // Ajustar la posición adecuada
            prenda.rotation.set(0, 0, 0);

            /*PARA EDITAR TAMANIO OCUPAREMOS EL OBJETO*/
            prenda.traverse((object) => {
                originalSueterScale = object.scale.clone();

                if (object.isMesh) {
                    // watchStateChanges(model) //funcion para alterar el tamanio
                    // CallColorChange(model); //funcion para editar el color
                    prenda.position.set(2, 0, 0)


                    object.material.map = null; //quitar textura(volvera color blanco)
                    object.material.color.set(0x050505);
                }
                console.log(prenda);
                
            });
        }, undefined, (error) => {
            console.error('Error cargando la prenda:', error);
        })
    });
</script>

<style scoped>
</style>