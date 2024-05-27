<template>
    <GLTFModel ref="model" :path="modelFile" :scale="0.7" :position="position" :rotation="rotation" cast-shadow />
</template>

<script lang="ts" setup>
const props = defineProps(["position"]);

const position = computed(() => {
    const randomZ = randomNumber(-0.7, 0.7);
    return [props.position.x , props.position.y, props.position.z + randomZ]
})
const rotation = computed(() =>{
    const randomRotation = randomNumber(-20, 20);
    return [0,randomRotation,0]
}) 
const modelFile = computed(()=>{
    const models = [
    "/islandAssets/models/Tree2.glb",
    "/islandAssets/models/Tree3.glb"
    ]
    return models[Math.floor(Math.random() * models.length)];
})

function randomNumber(min:any,max:any){
    return (Math.random() * (max - min) + min)
}
</script>

<style scoped></style>