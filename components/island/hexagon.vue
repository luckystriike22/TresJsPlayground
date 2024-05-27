<script lang="ts" setup>
const props = defineProps(["hexArgs"]);
</script>
<template>
    <TresMesh :position="props.hexArgs.position" receive-shadow cast-shadow>
        <TresCylinderGeometry :args="[1, 1, props.hexArgs.height, 6, 1, false]" />
        <TresMeshPhysicalMaterial :map="props.hexArgs.texture.map" />
    </TresMesh>
    <Suspense v-if="props.hexArgs.showCapybara" suspensible>
        <LazyIslandCapybara :args="props.hexArgs"/>
    </Suspense>
    <Suspense v-if="props.hexArgs.showTree" suspensible>
        <LazyIslandTree :args="props.hexArgs"/>
    </Suspense>
</template>
