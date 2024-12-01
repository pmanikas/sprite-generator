<script setup lang="ts">
import SpriteGenerator from './SpriteGenerator.vue';
</script>

<template>
    <div class="wrapper">
        <header></header>
        <main>
            <SpriteGenerator />
        </main>
        <footer></footer>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100vh;
}
</style>
