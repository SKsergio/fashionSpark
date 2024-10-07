<template>
    <div class="container">
        <div class="cont">

        </div>
        <div class="botons">
            <button class="btn" @click="ChangeSize(1)">Talla Grande</button>
            <button class="btn" @click="ChangeSize(2)">Talla pequenia</button>
            <button class="btn" @click="ChangeSize(0)">Resetear</button>

        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, watch } from 'vue';
    import * as THREE from 'three'
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

    //variables
    let scene, renderer, camera
    let model, skeleton, mixer, clock

    //varuables para resetear
    let originalScales = {};
    let originalPositions = {};
    let originalRotations = {};

    //contendor

    onMounted(()=>{
        init();

        animate();

    })

    const init = ()=>{
        //asignacion de la escena
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xa0a0a0); //color de la escena
        scene.fog = new THREE.Fog(0xa0a0a0, 10, 50);

        //luz
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 3);
        hemiLight.position.set(0, 20, 0);
        scene.add(hemiLight); //agragando a la escena

        //direccionamiento de la luz
        const dirLight = new THREE.DirectionalLight(0xffffff, 3);
        dirLight.position.set(3, 10, 10);
        dirLight.castShadow = true;
        dirLight.shadow.camera.top = 2;
        dirLight.shadow.camera.bottom = - 2;
        dirLight.shadow.camera.left = - 2;
        dirLight.shadow.camera.right = 2;
        dirLight.shadow.camera.near = 0.1;
        dirLight.shadow.camera.far = 40;
        scene.add(dirLight);

        //fondo
        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshPhongMaterial({ color: 0xcbcbcb, depthWrite: false }));
        mesh.rotation.x = - Math.PI / 2;
        mesh.receiveShadow = true;
        scene.add(mesh);

        //cargando el maniqui
        let loader = new GLTFLoader();
        loader.load('/design/Xbot.glb',(gltf)=>{
            model = gltf.scene;

            scene.add(model);//agregano maniqui a la escena

            //editando maniqui
            model.traverse((object)=>{
                if (object.isMesh && object.skeleton) {
                    const skeleton = object.skeleton //obteniendo el esqueleto

                    skeleton.bones.forEach((bone) => {
                        // Guardar los valores originales de cada hueso
                        originalScales[bone.name] = bone.scale.clone();
                        originalPositions[bone.name] = bone.position.clone();
                        originalRotations[bone.name] = bone.rotation.clone();
                    });

                    watchStateChanges(skeleton);
                }

            })
            
        }, undefined, (error) => {
            console.error('Error cargando el modelo:', error);
        })
        
        //camara
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000 );
        camera.position.set(- 1, 2, 3); //posicion de la camara

        renderer = new THREE.WebGLRenderer({antialias:true})
        SizeRenderer();//funcion para asignar tamanio al modelo

        // Controles de órbita (para mover la cámara)
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false;   // eliminar el zoom
        controls.target.set(0, 1, 0);
        controls.update();

    }   

    //manejar los eventos
    const watchStateChanges = (skeleton) => {
        watch(StateManiqui, (NewValue, OldValue) => {
            if (NewValue === 1) {
                BigSize(skeleton);
            } else if (NewValue === 2) {
                SmallSize(skeleton);
            } else if (NewValue === 0) {
                ResetManiqui(skeleton);
            }
        });
        
    };

    //funcion para adaptar el tamanio de la escena
    const SizeRenderer =()=>{
        const container = document.querySelector('.cont')
        container.appendChild(renderer.domElement);


        const width = container.clientWidth;
        const height = container.clientHeight;

        if (renderer.domElement.width !== width || renderer.domElement.height !== height) {
            // Ajusta el tamaño del renderizador
            renderer.setSize(width, height);
            // Actualiza el aspect ratio de la cámara
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        }
    }

    //funcion para animar todo
    const animate=()=>{
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
    }

            /*
            FUNCIONES PARA CAMBIAR ESTADO DEL MANIQUI
            NOTA IMPORTANTE:
            TODO LO QUE EDITES DE LA PARTE BAJA AFECTARA SIGNIFICATIVAMENTE ARRIBA, ES DECIR, SI EDITAS LA CADERA TAMBIEN AFECTARA 
            AL TORSO, LOS BRAZOS Y LA CABEZA, SI EDITAS LAS PIERNAS AFECTARAS LA CADERA, LOS BRAZOS Y LA CABEZA, Y ASI SUCESIVAMENTE,
            TENELO EN CUENTA PARA QUE NO PAREZCAS UN RETRASADO COMO YO
            
                            ATT: SERGIO
            */

             /*
                OTRA NOTA
            NO SE SI ALGUN DIA ALGUIEN VEA ESTO, PERO POR SI ACASO, SI QUIERES EDITAR CUALQUIER COSA EMEPIZA POR LAS PIERNAS Y 
            TERMINA POR LA CABEZA, YO SE PORQUE TE LO DIGO :(
                            ATT: SERGIO OTRA VEZ
            */


    /*Nota:
    las posiciones son las siguientes:
    X: ancho, Y: alto, Z: profundidad*/

    let StateManiqui = ref(0);

    //validacion de maniqui grande
    const ChangeSize =(num)=>{
        StateManiqui.value = num;
    }

    //funcion para agrandar el maniqui
    const BigSize = (skeleton)=>{

        /*obteniedo las partes del maniqui*/
        
        //cabeza
        const head = skeleton.getBoneByName('mixamorigHead');

        //pecho
        const spine = skeleton.getBoneByName('mixamorigSpine');
        const spine1 = skeleton.getBoneByName('mixamorigSpine1');
        const spine2 = skeleton.getBoneByName('mixamorigSpine2');

        //caderas
        const hips = skeleton.getBoneByName('mixamorigHips');

        //caderas
        hips.scale.set(1.4,1,1.5)

        //editando tamanio del pecho
        spine.scale.set(1.1, 1, 1.2);  // Aumenta el ancho del torso
        // spine2.scale.set(1.1,1.1,1.1); //espalda alta y cuello
        // spine1.scale.set(1.4,1,1.3);

        //cabeza
        head.scale.set(0.9,0.9,0.7) //mantener la cabeza normal

    }

    //funcion para coger el maniqui
    const SmallSize = (skeleton)=>{
        //cabeza
        const head = skeleton.getBoneByName('mixamorigHead');

        //pecho
        const spine = skeleton.getBoneByName('mixamorigSpine');
        const spine1 = skeleton.getBoneByName('mixamorigSpine1');
        const spine2 = skeleton.getBoneByName('mixamorigSpine2');

        //caderas
        const hips = skeleton.getBoneByName('mixamorigHips');

        //caderas
        hips.scale.set(0.9,0.9,0.9)
    }

    //restaurar las medidas 
    const ResetManiqui = (skeleton) => {
        skeleton.bones.forEach((bone) => {
            if (originalScales[bone.name]) {
                bone.scale.copy(originalScales[bone.name]); 
            }
            if (originalPositions[bone.name]) {
                bone.position.copy(originalPositions[bone.name]);  
            }
            if (originalRotations[bone.name]) {
                bone.rotation.copy(originalRotations[bone.name]);  
            }
        });
    };

</script>

<style scoped>
    .container{
        display: flex;
        flex-direction: row-reverse;
        background-color: rgb(34, 207, 126);
    }
    .cont{
        width: 50%;
        height: 500px;
        background-color: rebeccapurple;
    }
    .botons{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 50%;
        margin: 0 auto;
        background: rgb(126, 153, 133);
    }
    .btn{
        width: 150px;
        height: 50px;
        color: red;
        cursor: pointer;
    }
</style>