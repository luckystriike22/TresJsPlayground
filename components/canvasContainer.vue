<template>
    <v-sheet class="canvasHeight d-flex align-center justify-center">
        <slot />
    </v-sheet>
</template>

<script lang="ts" setup></script>

<style>
.canvasHeight {
    height: calc(100vh - 100px);
}
</style>