<template>
    <div class="d-flex flex-row">
        <v-color-picker class="py-0" v-model="color" mode="hex" hide-canvas hide-inputs></v-color-picker>
    </div>
   
    <CanvasContainer>
        <TresCanvas :clear-color="'gray'" ref="canvasRef" shadows>
            <TresAmbientLight :intensity="1" />
            <OrbitControls :enableRotate="false"/>
            <TresPerspectiveCamera :position="[cameraPosition.x, cameraPosition.y, cameraPosition.z]" :rotation="[12, 6, 0]" ref="cameraRef" />
            <plane :rotation="[0, 0, 0]" :position="[-0.2, 0, 0]" scale="30" receive-shadow cast-shadow>
                <TresMeshToonMaterial color="#82DBC5" />
            </plane>

            <Suspense>
                <Text3D text="Hello world" font="/index_font.json" cast-shadow receive-shadow>
                    <TresMeshPhysicalMaterial color="#578f81" />
                </Text3D>
            </Suspense>
            <TresPointLight :position="[lightPosition.x, lightPosition.y, lightPosition.z]" :intensity="0.4" :color="color"
                 cast-shadow />
        </TresCanvas>
    </CanvasContainer>
</template>

<script lang="ts" setup>
import { OrbitControls } from "@tresjs/cientos";
import { Vector2, Vector3 } from "three";
import { useDisplay } from 'vuetify'

const { platform } = useDisplay();
const canvasRef = ref();
const cameraRef = ref();
const color = ref("#62FFB4");
const text = shallowRef("Hello World");
const lightPosition = ref(new Vector3(1, 1, 1));
const cameraPosition = ref(new Vector3(0, 0, 5))
const mouse = ref(new Vector2(0, 0));
const newPos = ref(new Vector3(0, 0, 0))

function onMouseMove(event: any) {
    event.preventDefault();
    mouse.value.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.value.y = - (event.clientY / window.innerHeight) * 2 + 1;
    newPos.value = new Vector3(mouse.value.x, mouse.value.y, 0);
};

function mobileoOnMouseMove(event: any) {
    event.preventDefault();
    const touch = event.touches[0];
    mouse.value.x = (touch.clientX / window.innerWidth) * 2 - 1;
    mouse.value.y = - (touch.clientY / window.innerHeight) * 2 + 1;
    newPos.value = new Vector3(mouse.value.x, mouse.value.y * 2, 0);
};

const { onLoop } = useRenderLoop()

onLoop(() => {
    lightPosition.value = new Vector3(newPos.value.x, newPos.value.y, 0);
})


onMounted(() => {
    console.log(platform.value.touch)
 if(!platform.value.touch)
    window.addEventListener('mousemove', onMouseMove);
 else
    window.addEventListener('touchmove', mobileoOnMouseMove , { passive: false });

 if(platform.value.touch)
   cameraPosition.value = new Vector3(-2, 0, 10);
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('touchmove', mobileoOnMouseMove);
})

const changerControls = useControls('positioner', {
    hideBox: false,
    position: new Vector3(0, 0, 0),
    rotation: new Vector3(0, 0, 0),
})

const changer = reactive({
    position: changerControls.positionerPosition.value.value,
    rotation: changerControls.positionerRotation.value.value,
    hideBox: changerControls.positionerHideBox.value.value,
});
</script>

<style>
.v-color-picker__controls{
    padding-top: 3px !important;
    padding-bottom: 3px !important;
}
</style>