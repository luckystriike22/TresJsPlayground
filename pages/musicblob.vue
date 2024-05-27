<template>
    <CanvasContainer>
        <TresCanvas :clear-color="'#0c1a30'">
            <TresPerspectiveCamera :position="cameraPosition" />
            <OrbitControls />
            <Suspense>
                <MusicBlobModel ref="blob" />
            </Suspense>
            <TresDirectionalLight :position="[1, 1, 1]" />
            <TresAmbientLight :intensity="1" />
        </TresCanvas>
    </CanvasContainer>
</template>

<script lang="ts" setup>
import { Vector3 } from 'three';
import { useDisplay } from 'vuetify'

const { smAndDown } = useDisplay();
const blob = shallowRef();

const cameraPosition = computed((): Vector3 => {
    return smAndDown.value ? new Vector3(20, 0, 0) : new Vector3(13, 0, 0);
})
</script>

<style></style>
