<script setup lang="ts">
import SpriteGenerator from './SpriteGenerator.vue';
</script>

<template>
    <div class="wrapper">
        <SpriteGenerator />
    </div>
</template>

<style lang="scss" scoped>
@use './styles/abstracts/' as *;

.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $s-base;
    width: 100%;
}
</style>
