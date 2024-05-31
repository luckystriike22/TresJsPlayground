<template>
    <div class="d-flex flex-row">
        <h3 class="text-center uiText my-2">Found capybara's: {{ capybarasCatched }} / {{ capybaraAmount }}</h3>
    </div>
    <CanvasContainer id="canvasContainer">
        <TresCanvas :clear-color="'#244675'" preset="realistic" shadows>
            <GlobalAudio :loop="true" playTrigger="islandGameDialogBtn" :src="bgMusic" />
            <TresPerspectiveCamera :position="[60, 20, 0]" />
            <OrbitControls ref="orbit" damping make-default  />
            <Suspense>
                <IslandBase v-model:capybaraAmount="capybaraAmount"
                    v-model:capybarasCatched="capybarasCatched" />
            </Suspense>
            <TresDirectionalLight ref="TresDirectionalLightRef" :position="[45, 33.3, 52]" :intensity="0.5"
                cast-shadow />
            <TresPointLight :position="[1, 20, 1]" :intensity="100" :color="'#FFCB8E'" cast-shadow />
        </TresCanvas>
    </CanvasContainer>

    <!-- Start dialog -->
    <v-dialog attach="#canvasContainer" v-model="showInfoDialog" width="auto" persistent :scrim="false">
        <v-card max-width="400" :title="dialogInfo.title" :text="dialogInfo.text">
            <v-img :width="150" aspect-ratio="16/9" cover :src="dialogInfo.png" class="align-self-center"></v-img>
            <template v-slot:actions>
                <v-btn variant="tonal" :text="dialogInfo.btnText" @click="restartGame" width="100%"
                    id="islandGameDialogBtn"></v-btn>
            </template>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>

const { onLoop } = useRenderLoop();
const TresDirectionalLightRef = ref();
const bgMusic = ref("/islandAssets/Capy_bg_music.mp3");
const capybaraAmount = ref(0);
const capybarasCatched = ref(0);
const showPositioner = ref(true);
const showInfoDialog = ref(true);
const dialogInfo = ref({
    title: "Hey can you help me?",
    text: "Oh no, my capybaras have escaped! They've spread all over the island, hiding and playing like little furry adventurers. Can you help me track them down? Click on those sneaky critters to send them back home!",
    btnText: "Start game",
    png: "/islandAssets/farmer.png",
    restart: false
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


onLoop(() => {
    TresDirectionalLightRef.value.shadow.bias = -0.01
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