<template>
    <FBXModel ref="model" path="/islandAssets/models/Island.fbx" :scale="0.03 * $props.islandSizeFactor" :position="[-0.9,0.8,6]" cast-shadow receive-shadow :rotation="[0,1.3,0]"/>
</template>

<script lang="ts" setup>
const args = defineProps(["islandSizeFactor"])
</script>

<style scoped></style>