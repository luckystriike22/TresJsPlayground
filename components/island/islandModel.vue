<template>
     <primitive :object="nodes.Island__1_" :scale="0.03 * $props.islandSizeFactor" :position="[-5,0.8,6]" cast-shadow receive-shadow :rotation="[1.6,0,-1]" />
</template>

<script lang="ts" setup>
const args = defineProps(["islandSizeFactor"])
const { nodes } = await useGLTF('/islandAssets/models/Island.glb', { draco: true });
console.log(nodes)
</script>

<style scoped></style>