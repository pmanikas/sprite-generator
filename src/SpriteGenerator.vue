<script setup>
import { ref, watch, onMounted, reactive } from 'vue';

import Button from './components/Button.vue';
import Dropdown from './components/Dropdown.vue';
import Input from './components/Input.vue';

import ImageInfoTile from './components/ImageInfoTile.vue';
import { loadImagesAsync } from './utilities/images';
import { paintImages } from './utilities/canvas';

const addedImages = ref([]);
const input = ref(null);
const ctx = ref(null);
const selectedArrangement = ref('horizontal');
const spacing = ref(0);

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

async function loadImages(imageSources) {
    try {
        return await loadImagesAsync(imageSources);
    } catch (error) {
        console.error('Error loading one or more images:', error);
        throw error;
    }
}

const addImage = ({ target }) => {
    const files = Array.from(target.files);
    if (files.length === 0) return;
    const newImages = files.map((file) => URL.createObjectURL(file));
    addedImages.value = [...addedImages.value, ...newImages];

    target.value = '';
}

const removePhoto = (index) => {
    addedImages.value = addedImages.value.filter((_, i) => i !== index);
}

const triggerInput = () => {
    input.value.click();
}

const downloadSprite = () => {
    const canvas = ctx.value.canvas;
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'sprite.png';
    a.click();
    a.remove();
}

const paint = () => {
    paintImages({ ctx: ctx.value, imageUrls: [...addedImages.value], arrange: selectedArrangement.value, spacing: Number(spacing.value) });
}

onMounted(() => {
    const canvas = document.querySelector('[data-element=canvas]');
    ctx.value = canvas.getContext('2d');
});

watch(addedImages, () => paint());
watch(selectedArrangement, () => paint());
watch(spacing, () => paint());
</script>

<template>
    <h1 class="text-center">Sprite Generator</h1>
    <div class="options">
        <Dropdown :items="arrangeOptions" v-model="selectedArrangement" label="Arrangement"></Dropdown>
        <Input type="number" min="1" v-model="spacing" label="Spacing" />
    </div>
    <br>
    <div class="sprite-generator">
        <div class="selection-container">
            <Button @click="triggerInput" class="add-new-image">Add Images</Button>
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
                <canvas  data-element="canvas" class="canvas"></canvas>
            </div>
        </div>
    </div>
    <br>
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
    justify-content: center;
    gap: $s-base;
    width: var(--tool-window-size);
    height: var(--tool-window-size);
    overflow: auto;
    background-color: $c-primary;
    border: 1px solid $c-gray-dark;
    border-radius: $base-radius;
}

.added-images {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: $s-m;
}

.results-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: var(--tool-window-size);
    height: var(--tool-window-size);
    overflow: auto;
    color: $c-secondary;
    border: 1px solid $c-gray-dark;
    border-radius: $base-radius;
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

        flex-direction: row;
    }
}
</style>
