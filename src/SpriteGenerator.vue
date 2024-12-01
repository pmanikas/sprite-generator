<script setup>
import { ref, watch, onMounted, reactive } from 'vue';

import Button from './components/Button.vue';

import ImageInfoTile from './components/ImageInfoTile.vue';
import { loadImagesAsync } from './utilities/images';
import { paintImages } from './utilities/canvas';

const addedImages = ref([]);
const input = ref(null);
const ctx = ref(null);

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
    addedImages.value = files.map((file) => URL.createObjectURL(file));
    paintImages({ ctx: ctx.value, imageUrls: [...addedImages.value], arrange: 'diagonal' });
    target.value = '';
}

const removePhoto = (index) => {
    addedImages.value.splice(index, 1);
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

onMounted(() => {
    const canvas = document.querySelector('[data-element=canvas]');
    ctx.value = canvas.getContext('2d');
});

watch(addedImages, () => {
    console.log('WATCHER: addedImages:', addedImages);
});


</script>

<template>
    <h1 class="text-center">Sprite Generator</h1>
    <div class="sprite-generator">
        <div class="selection-container">
            <Button @click="triggerInput" class="add-new-image">Add Images</Button>
            <input ref="input" type="file" accept="image/*" multiple @change="addImage" style="display: none" />
            <ul class="added-images">
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
    <div v-if="addedImages.length" class="actions">
        <Button @click="downloadSprite()">Download Sprite</Button>
    </div>
</template>

<style scoped lang="scss">
@use './styles/abstracts' as *;

.sprite-generator {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $s-base;
    background-color: $c-gray-light;
    padding: $s-base;
}

.selection-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: $s-base;
    width: 600px;
    height: 600px;
    overflow: auto;
    background-color: $c-primary;
    border: 1px solid $c-gray-dark;
}

.results-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 600px;
    height: 600px;
    overflow: auto;
    color: $c-secondary;
    border: 1px solid $c-gray-dark;
}

.canvas-container {
    width: 600px;
    height: 600px;
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
        flex-direction: row;
    }
}
</style>
