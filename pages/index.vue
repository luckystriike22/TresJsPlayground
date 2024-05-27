<template>
    <v-btn>hello</v-btn>
    <CanvasContainer>
        <TresCanvas :clear-color="'gray'">
            <TresMesh>
                <TresSphereGeometry ref="sphereRef" />
                <TresMeshStandardMaterial :color="'red'" />
            </TresMesh>
            <TresDirectionalLight :position="[1, 1, 1]" />
        </TresCanvas>
    </CanvasContainer>
</template>

<script lang="ts" setup>
import type { ShallowRef } from "vue";
const sphereRef: ShallowRef<TresInstance | null> = shallowRef(null)
</script>

<style></style>