<script lang="ts" setup>
import * as THREE from 'three';
import Hexagon from '~/types/Hexagon';

const orbit = shallowRef();
const hexGeomatries = ref<Hexagon[]>([])

onMounted(async () => {
    await nextTick();
    makeHexGeomatries();
})

function tileToPosition(tilePosition: THREE.Vector2) {
    return new THREE.Vector2((tilePosition.x + (tilePosition.y % 2) * 0.5) * 1.77, tilePosition.y * 1.535)
}

function makeHexGeomatries() {
    const amount = 10;
    const hexagonHeight = 3;

    for (var i = -amount; i < amount; i++) {
        for (var j = -amount; j < amount; j++) {
            const position = tileToPosition(new THREE.Vector2(i, j));

            // return if more than 16 to make a circle
            if (position.length() > 16) continue;

            const tilePos = tileToPosition(new THREE.Vector2(i, j));
            const args = new Hexagon(hexagonHeight, new THREE.Vector3(tilePos.x, hexagonHeight * 0.5, tilePos.y));
            hexGeomatries.value.push(args)
        }
    }
}

</script>
<template>
    <OrbitControls ref="orbit" />
    <TresGroup>
        <TresMesh v-for="(hex, i) in hexGeomatries" :key="i" :position="hex.position">
            <TresCylinderGeometry :args="[1, 1, hex.height, 6, 1, false]" />
            <TresMeshStandardMaterial :color="'gray'" />
        </TresMesh>
    </TresGroup>
</template>
