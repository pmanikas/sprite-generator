<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

import Button from './components/Button.vue';
import Dropdown from './components/Dropdown.vue';
import Input from './components/Input.vue';
import ZoomControls from './components/ZoomControls.vue';

import ImageInfoTile from './components/ImageInfoTile.vue';
import { paintImages } from './utilities/canvas';

const addedImages = ref<string[]>([]);
const input = ref<HTMLInputElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);
const selectedArrangement = ref<'horizontal' | 'diagonal' | 'vertical'>('horizontal');
const spacing = ref<number>(0);

const arrangeOptions = [
    {
        label: 'Diagonal',
        value: 'diagonal'
    }, {
        label: 'Horizontal',
        value: 'horizontal'
    }, {
        label: 'Vertical',
        value: 'vertical'
    }
];

const addImage = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const files = target.files ? Array.from(target.files) : [];
    if (files.length === 0) return;
    const newImages = files.map((file) => URL.createObjectURL(file));
    addedImages.value = [...addedImages.value, ...newImages];

    target.value = '';
}

const removePhoto = (index: number) => {
    addedImages.value = addedImages.value.filter((_, i) => i !== index);
}

const triggerInput = () => {
    input.value?.click();
}

const downloadSprite = () => {
    const canvas = ctx.value?.canvas;
    const dataUrl = canvas?.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl || '';
    a.download = 'sprite.png';
    a.click();
    a.remove();
}

const paint = () => {
    if(!ctx.value) return;
    paintImages({ ctx: ctx.value, imageUrls: [...addedImages.value], arrange: selectedArrangement.value, spacing: spacing.value ?? 0 });
}

const updateZoomVariable = (value: number) => {
    document.documentElement.style.setProperty('--canvas-zoom-level', value.toString());
    paint();
}

onMounted(() => {
    const canvas = document.querySelector('[data-element=canvas]');
    ctx.value = (canvas as HTMLCanvasElement)?.getContext('2d');
});

watch(addedImages, () => paint());
watch(selectedArrangement, () => paint());
watch(spacing, () => paint());
</script>

<template>
    <h1 class="text-center framed-hide">Sprite Generator</h1>
    <div class="options">
        <Dropdown :items="arrangeOptions" v-model="selectedArrangement" label="Arrangement"></Dropdown>
        <Input type="number" min="1" v-model="spacing" label="Spacing" />
    </div>
    <div class="sprite-generator">
        <div class="selection-container" :class="{ 'empty' : !addedImages.length }">
            <Button title="Add new image" @click="triggerInput" class="add-new-image">+</Button>
            <input ref="input" type="file" accept="image/*" multiple @change="addImage" style="display: none" />
            <ul class="added-images" v-if="addedImages.length">
                <li v-for="(photo, i) of addedImages" :key="'photo' + i">
                    <ImageInfoTile :photo="photo" @remove="removePhoto(i)" />
                </li>
            </ul>
        </div>
        <div class="results-container">
            <p v-if="!addedImages.length" class="canvas-message">Images not added yet</p>
            <div v-show="addedImages.length" class="canvas-container">
                <canvas data-element="canvas" class="canvas"></canvas>
                <ZoomControls class="zoom" @zoom="updateZoomVariable"/>
            </div>
        </div>
    </div>
    <div v-if="addedImages.length" class="actions text-center">
        <Button @click="downloadSprite()">Download Sprite</Button>
    </div>
</template>

<style scoped lang="scss">
@use './styles/abstracts' as *;

.options {
    display: flex;
    justify-content: center;
    gap: $s-base;
}

.sprite-generator {
    --tool-window-size: 400px;

    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: $s-base;
    background-color: $c-gray-light;
    padding: $s-base;
    border-radius: $base-radius;
}

.selection-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $s-base;
    width: var(--tool-window-size);
    height: var(--tool-window-size);
    max-width: 100%;
    padding-top: $s-base;
    overflow: auto;
    background-color: $c-primary;
    border: 1px solid $c-gray-dark;
    border-radius: $base-radius;

    &.empty {
        justify-content: center;
        padding-top: 0;
    }
}

.add-new-image {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 2rem;
    background-color: transparent;
    color: $c-light;
    border: 2px solid $c-light;
    transition: scale 0.3s;

    &:hover {
        scale: 1.1;
    }
}

.added-images {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: $s-m;
}

.results-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: var(--tool-window-size);
    height: var(--tool-window-size);
    max-width: 100%;
    overflow: auto;
    color: $c-secondary;
    border: 1px solid $c-gray-dark;
    border-radius: $base-radius;

    &:hover .zoom {
        opacity: 1;
    }
}

.zoom {
    position: absolute;
    bottom: $s-base;
    right: 0;
    left: 0;
    opacity: 0;
    transition: opacity 0.3s;
}

.canvas-container {
    width: var(--tool-window-size);
    height: var(--tool-window-size);
    overflow: auto;
}

.canvas {
    $size: 5px;

    background-color: $c-gray-dark;
    background-image:
        linear-gradient(45deg, $c-gray 25%, transparent 25%, transparent 75%, $c-gray 75%, $c-gray),
        linear-gradient(45deg, $c-gray 25%, transparent 25%, transparent 75%, $c-gray 75%, $c-gray);
    background-size: $size * 2 $size * 2;
    background-position: 0 0, $size $size;
}

@include desktop {

    .sprite-generator {
        --tool-window-size: 700px;

    }
}

@include widescreen {
    .sprite-generator {
        flex-direction: row;
    }
}
</style>
