<template>
    <Levioso :floatFactor="2" :range="[-0.5, 0.5]">
        <suspense>
            <primitive :object="nodes.cloud_A_01" :scale="props.args.scale" :position="props.args.position" cast-shadow />
        </suspense>
    </Levioso>


</template>

<script lang="ts" setup>
const props = defineProps(["args"])
const { nodes } = await useGLTF('/islandAssets/models/cloud.glb', { draco: true });
</script>

<style scoped></style>