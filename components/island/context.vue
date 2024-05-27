<template>
   
</template>

<script lang="ts" setup>
const context = useTresContext();
watch(context, (value)=>{
    console.log("hello");
})
</script>

<style scoped></style>