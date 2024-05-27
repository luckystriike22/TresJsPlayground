
<template>
    

        <TresMesh>
            <TresSphereGeometry ref="sphereRef"></TresSphereGeometry>
            <TresMeshStandardMaterial :color="'red'"/>
        </TresMesh>

</template>

<script lang="ts" setup>
import type { ShallowRef } from "vue";

const sphereRef: ShallowRef<TresInstance | null> = shallowRef(null)


</script>

<style>

</style>