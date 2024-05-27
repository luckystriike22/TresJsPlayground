<template>
    <Levioso :floatFactor="2" :range="[-0.5, 0.5]">
        <suspense>
            <primitive :object="model" :scale="props.args.scale" :position="props.args.position" cast-shadow />
        </suspense>
    </Levioso>


</template>

<script lang="ts" setup>
const props = defineProps(["args"])
const model = await useFBX('/islandAssets/models/cloud.fbx')
</script>

<style scoped></style>