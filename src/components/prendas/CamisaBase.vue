<template>
    <div class="container">
        <div class="cont">

        </div>
        <div class="comands">
            <section class="buttons">
                <button class="btn" @click="changeSize(1)">Talla Grande</button>
                <button class="btn" @click="changeSize(2)">Talla pequenia</button>
                <button class="btn" @click="changeSize(0)">Resetear</button>
            </section>

            <section class="color">
                <h3>Escoja el color del sueter</h3>
                <input type="color" name="colored" id="clothColor" v-model="clothColor">
                <h3>Aplicar a: </h3>

                <section class="buttons_colors">
                    <button class="btn_color" @click="checkClothPart(1, $event)">Torso</button>
                    <button class="btn_color" @click="checkClothPart(2, $event)">Ruedo</button>
                    <button class="btn_color" @click="checkClothPart(3, $event)">Manga</button>
                    <button class="btn_color" @click="checkClothPart(4, $event)">Cuello</button>
                    <button class="btn_color" @click="checkClothPart(4, $event)">Prenda completa</button>
                </section>

            </section>
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
    let model

    //varuables para resetear
    let originalSueterScale

    onMounted(()=>{
        init()

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

        //cargando el sueter
        let loader = new GLTFLoader();
        loader.load('/design/sueltermujer.glb',(gltf)=>{
            model = gltf.scene;
            scene.add(model);//agregano sueter a la escena

            /*PARA EDITAR TAMANIO OCUPAREMOS EL OBJETO*/
            model.traverse((object) => {
                originalSueterScale = object.scale.clone();

                if (object.isMesh) {
                    watchStateChanges(model) //funcion para alterar el tamanio
                    CallColorChange(model); //funcion para editar el color

                    object.material.map = null; //quitar textura(volvera color blanco)

                    object.material.color.set(0x050505);
                }
                console.log(model);
                
            });
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

    const animate=()=>{
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
    }

    //manejar los eventos
    const watchStateChanges = (object) => {
        watch(stateSueter, (NewValue, OldValue) => {
            if (NewValue === 1) {
                BigSize(object);
            } else if (NewValue === 2) {
                SmallSize(object);
            } else if (NewValue === 0) {
                ResetSueter(object);
            }
        });
        
    };

    let stateSueter = ref(0)

    const changeSize = (num)=>{
        stateSueter.value = num;
    }

    const ResetSueter =(sueter)=> {
        if (originalSueterScale) {
            sueter.scale.copy(originalSueterScale);  // Restaurar la escala original
        }
    }

    const BigSize = (sueter)=>{
        sueter.scale.set(1.3,1.2,1.9)
    }   

    const SmallSize = (sueter)=>{
        sueter.scale.set(0.9,0.9,0.8)
    } 

    //obtener color
    let clothColor = ref('#050505');

    //variable de evaluacion
    let clothesPart = ref(0);

    //chequear prenda a cambiar
    const checkClothPart = (num, e)=>{
        clothesPart.value = num;

        let boton = e.srcElement;
        console.log(boton);
        
        // boton.classList.toogle('active')
        boton.classList.toggle('active');
        
    }
    
    //cambiar de colores
    const changeColor =(sueter, parte)=>{

        // const torso = sueter.getObjectByName('weld_chompa_varon_3b_Material719171_0');
        // const manga = sueter.getObjectByName('weld_chompa_varon_3b_FABRIC_7_FRONT_719593_0');
        // const cuello = sueter.getObjectByName('weld_chompa_varon_3b_FABRIC_8_FRONT_720664_0');
        // const ruedo = sueter.getObjectByName('weld_chompa_varon_3b_FABRIC_6_FRONT_719499_0');

        let colorpart = '';
        let ClothePart = '';

        //evaluar cada posible respuesta
        switch (parte) {
            case 'torso':
                ClothePart = sueter.getObjectByName('weld_chompa_varon_3b_Material719171_0');
                break;
            case 'cuello':
                ClothePart = sueter.getObjectByName('weld_chompa_varon_3b_FABRIC_8_FRONT_720664_0');
                break;
            case 'ruedo':
                ClothePart = sueter.getObjectByName('weld_chompa_varon_3b_FABRIC_6_FRONT_719499_0');
                break;
            case 'manga':
                ClothePart = sueter.getObjectByName('weld_chompa_varon_3b_FABRIC_7_FRONT_719593_0');
                break;        
            default:
                console.log('No se encontro la parte de la ropa');
                break;
        }     
        
        // Verificar si ClothePart no es undefined y es un Mesh
        if (ClothePart && ClothePart.isMesh) {
            // Reemplazar el valor del color
            ClothePart.material.color.set(clothColor.value);
            
        } else {
            console.log('Error: ClothePart no se encontró o no es un Mesh.');
        }
        
    }

    //funcion para llamar el cambio de color 
    function CallColorChange (sueter){
       
        watch([clothesPart, clothColor], ([newPart, newColor], [oldPart, oldColor])=>{
            if (newColor != oldColor) {
                if (newPart == 1) {
                    changeColor(sueter, 'torso')   
                }else if(newPart == 2){
                    changeColor(sueter, 'ruedo')
                }else if(newPart == 3){
                    changeColor(sueter, 'manga')
                }else if(newPart == 4){
                    changeColor(sueter, 'cuello')
                }
            }
        })
    }


</script>

<style scoped>
.container{
    display: flex;
    flex-direction: row-reverse;
}
.cont{
    width: 50%;
    height: 500px;
}
.comands{
    display: grid;
    grid-template-columns: 1fr 2fr;
    justify-content: center;
    align-items: center;
    width: 50%;
    background: rgb(126, 153, 133);
    height: 500px;
}
.buttons{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
}
.btn{
    width: 150px;
    height: 50px;
    color: rgb(205, 229, 240);
    cursor: pointer;
    border-radius: 10px;
    background: rgb(25, 139, 105);
}

.buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

.color {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.buttons_colors {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}
.btn:hover, .btn_color:hover {
  background-color: #0056b3;
}
.color{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}
.btn_color{
    width: 120px;
    height: 39px;
    background-color: #c4771ee3;
    border-radius: 10px;
    cursor: pointer;
    transition: all .5 ease;
}
.buttons_colors{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 30px;
}
.active{
    background-color: rgb(230, 194, 35);
    transform: scale(1.1);
    color: white;
}
</style>