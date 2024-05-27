<template>
    <v-app-bar absolute title="My TresJs demo's" height="50">
        <template v-slot:prepend>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </template>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" temporary>
        <v-list>
            <v-list-item v-for="path in pages" :key="path.name">
                <NuxtLink :to="path.path" class="menuLink">
                    <h4>
                        {{ path.name }}
                    </h4>
                </NuxtLink>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts" setup>

const drawer = ref(false)
const pages = ref([
    { name: "Home", path: "/" },
    { name: "Dancing music blob", path: "/musicblob" },
    { name: "Random floating island", path: "/island" },
])

</script>

<style scoped>
a {
    text-decoration: none;
    color: inherit;
}
</style>
