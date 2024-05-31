<template>
    <primitive :object="capybaraModel.Capybara_mesh" @click="clicked" @touchend="clicked" :scale="scale" ref="capyRef"
        :position="position" :rotation="rotation" cast-shadow receive-shadow />
</template>

<script lang="ts" setup>
import { Vector3 } from 'three';

const { nodes: capybaraModel } = await useGLTF("/islandAssets/models/Capybara.glb", { draco: true });
const props = defineProps(["position"]);
const capybarasCatched = defineModel<number>();
const scale = ref(0.05);
const capyRef = ref();
const position = ref();
const randomZ = (Math.random() * (0.7 - -0.7) + -0.7);
const found = ref(false)
position.value = new Vector3(props.position.x, props.position.y, props.position.z + randomZ)

const rotation = computed(() => {
    const randomRotation = (Math.random() * (20 - -20) + -20);
    return [0, randomRotation, 0]
})

function clicked() {
    if(found.value) return;
    
    scale.value = 0.1;
    capybarasCatched.value = capybarasCatched.value! + 1;
    found.value = true;
    position.value = new Vector3((Math.random() * (-23 - -15) + -15), -0.2, (Math.random() * (43 - 41) + 41))
}
</script>

<style scoped></style>