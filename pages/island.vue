<template>
    <!-- <TresLeches /> -->
    <div class="d-flex flex-row">
        <h3 class="text-center uiText my-2">Found capybara's: {{ capybarasCatched }} / {{ capybaraAmount }}</h3>
    </div>

    <CanvasContainer id="canvasContainer">
        <TresCanvas :clear-color="'gray'" preset="realistic" ref="sphereRef"  shadows>
            <StatsGl />
            <GlobalAudio :loop="true" playTrigger="islandGameDialogBtn" :src="bgMusic"  />
            <TresPerspectiveCamera :position="[60, 20, 0]" />
            <OrbitControls ref="orbit" />
            <Suspense>
                <IslandBase ref="islandRef" v-model:capybaraAmount="capybaraAmount"
                    v-model:capybarasCatched="capybarasCatched" />
            </Suspense>
            <TresDirectionalLight ref="TresDirectionalLightRef" :position="[100, 80, 100]" :intensity="0.4"
                cast-shadow />
            <TresPointLight :position="[1, 50, 1]" :intensity="700" :color="'#FFCB8E'" cast-shadow />
            <TresDirectionalLightHelper v-if="TresDirectionalLightRef" :args="[TresDirectionalLightRef, 10]" />
            <TresMesh ref="boxRef" :scale="1" v-if="showPositioner"
                :position="[pointLight.position.x, pointLight.position.y, pointLight.position.z]">
                <TresBoxGeometry :args="[1, 1, 1]" />
                <TresMeshNormalMaterial />
            </TresMesh>
        </TresCanvas>
    </CanvasContainer>
    <v-dialog attach="#canvasContainer" v-model="showInfoDialog" width="auto" persistent>
        <v-card max-width="400" :title="dialogInfo.title" :text="dialogInfo.text">
            <v-img :width="150" aspect-ratio="16/9" cover :src="dialogInfo.png" class="align-self-center"></v-img>
            <template v-slot:actions>
                <v-btn variant="tonal" :text="dialogInfo.btnText" @click="restartGame" width="100%" id="islandGameDialogBtn"></v-btn>
            </template>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import { Vector3 } from "three";
import type { ShallowRef } from "vue";

const sphereRef: ShallowRef<TresInstance | null> = shallowRef(null)
const TresDirectionalLightRef = ref();
const bgMusic = ref("/islandAssets/Capy_bg_music.mp3");
const capybaraAmount = ref(0);
const capybarasCatched = ref(0);
const showPositioner = ref(false);
const showInfoDialog = ref(true);
const musicBtnRef = ref();
const dialogInfo = ref({
    title: "Hey can you help me?",
    text: "Oh no, my capybaras have escaped! They've spread all over the island, hiding and playing like little furry adventurers. Can you help me track them down? Click on those sneaky critters to send them back home!",
    btnText: "Start game",
    png: "/islandAssets/farmer.png",
    restart: false
});

const islandRef = ref();
const PointLightControls = useControls('positioner', {
    hideBox: false,
    position: new Vector3(-4, 1.3, 41)
})

const pointLight = reactive({
    position: PointLightControls.positionerPosition.value.value,
    hideBox: PointLightControls.positionerHideBox.value.value,
});

watch(capybarasCatched, (value) => {
    if (value < capybaraAmount.value) return;
    dialogInfo.value.title = "Thank you!!";
    dialogInfo.value.text = "Fantastic work! You tracked down all the sneaky capybaras and brought them back to their cozy home. Now they can kick back and relax!";
    dialogInfo.value.btnText = "restart";
    dialogInfo.value.png = "/islandAssets/happy_capy.png";
    dialogInfo.value.restart = true;
    showInfoDialog.value = true
})

const { onLoop } = useRenderLoop();

onLoop(() => {
    TresDirectionalLightRef.value.shadow.bias = -0.01
    showPositioner.value = PointLightControls.positionerHideBox.value.value;
})

function restartGame() {
    if (dialogInfo.value.restart)
        location.reload();
    else
        showInfoDialog.value = false;
}

</script>

<style scoped>
canvas {
    position: static !important;
}

.uiText {
    display: block;
    width: 100%;
}
</style>