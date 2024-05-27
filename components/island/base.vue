<script lang="ts" setup>
import IslandGenerator from '../../helpers/island/islandGenerator';

const capybaraAmount = defineModel("capybaraAmount");
const capybarasCatched = defineModel("capybarasCatched");
const textures = {
    dirt: await useTexture({ map: '/islandAssets/dirt.png' }),
    grass: await useTexture({ map: '/islandAssets/grass.jpg' }),
    sand: await useTexture({ map: '/islandAssets/sand.jpg' }),
    stone: await useTexture({ map: '/islandAssets/stone.png' }),
    dirt2: await useTexture({ map: '/islandAssets/dirt2.jpg' }),
    water: await useTexture({ map: '/islandAssets/water.jpg', roughnessMap: '/islandAssets/water.jpg', metalnessMap: '/islandAssets/water.jpg' }),
}

const context = useTresContext();
const generator = ref(new IslandGenerator(textures));
const islandSizeFactor = ref(1);

onMounted(async () => {
    await nextTick();
    startGame();
})

function startGame(){
    const islandHexes = generator.value.GetIslandHexagons(islandSizeFactor.value);
    context.scene.value.add(islandHexes.stone)
    context.scene.value.add(islandHexes.Dirt)
    context.scene.value.add(islandHexes.grass)
    context.scene.value.add(islandHexes.sand)
    context.scene.value.add(islandHexes.baseDirt)
    capybaraAmount.value = generator.value.capybaraLocations.length
}

defineExpose({
    startGame
})

</script>
<template>
    <TresGroup v-rotate:x="0.1">
        <LazyIslandCloudModel :args="{ scale: 0.01, position: [-10, 20, 10] }" />
        <LazyIslandCloudModel :args="{ scale: 0.005, position: [5, 15, 10] }" />
        <LazyIslandCloudModel :args="{ scale: 0.005, position: [-4, 14, -7] }" />
        <LazyIslandCloudModel :args="{ scale: 0.005, position: [10, 17, -7] }" />
        <LazyIslandModel :islandSizeFactor="islandSizeFactor" />
        <LazyIslandTree :position="tree.position" v-for="(tree, i) in generator.treesLocations" :key="i" />
        <Suspense v-for="(capy, i) in generator.capybaraLocations" :key="i">
            <IslandCapybaraSpawner :position="capy.position" v-model="capybarasCatched" />
        </Suspense>

    </TresGroup>
</template>
