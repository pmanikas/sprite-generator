<script setup lang="ts">
import { ref } from 'vue';

const MIN_ZOOM = 0.1;
const MAX_ZOOM = 4;
const zoomLevel = ref(1);

const zoomIn = () => {
    zoomLevel.value = Math.min(MAX_ZOOM, zoomLevel.value + 0.1);
    emit('zoom', zoomLevel.value);
}

const zoomOut = () => {
    zoomLevel.value = Math.max(MIN_ZOOM, zoomLevel.value - 0.1);
    emit('zoom', zoomLevel.value);
}

const emit = defineEmits({
    zoom: (value: number) => value
});
</script>

<template>
    <div class="zoom">
        <div class="zoom-controls">
            <button class="zoom-button" @click="zoomOut">-</button>
            {{ zoomLevel.toFixed(1) }}
            <button class="zoom-button" @click="zoomIn">+</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use './../styles/abstracts/' as *;

.zoom {
    display: flex;
    justify-content: center;
}

.zoom-controls {
    display: flex;
    gap: $s-base;
    align-items: center;
    justify-content: center;
    color: $c-text;
    background-color: $c-bg-trans;
    padding: $s-xs $s-m;
    font-size: 0.75rem;
    border-radius: 12px;
}

.zoom-button {
    background-color: transparent;
    color: $c-text;
    border: none;
    font-family: monospace;
    border-radius: $base-radius;
    cursor: pointer;
}
</style>
