<script setup lang="ts">;
import { ref } from 'vue';

const props = defineProps<{
    photo: string;
    // meta: PhotoMeta;
}>();

const emit = defineEmits<{
    (e: 'remove'): void;
}>();

const removePhoto = () => {
    emit('remove');
};
</script>

<template>
    <div class="image-info-tile">
        <img class="preview-photo" :src="photo" />
        <div class="css-selection-rule">
            <p class="css-code">
                Test text
            </p>
            <button>Copy</button>
        </div>
        <i @click="removePhoto()" class="remove">Remove</i>
    </div>
</template>

<style lang="scss" scoped>
@use './../styles/abstracts' as *;

.image-info-tile {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $s-m;
    border: 1px solid $c-gray-light;
    border-radius: $s-s;
    margin-bottom: $s-m;
}

.preview-photo {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: $s-s;
}

.css-selection-rule {
    flex: 1;
    padding: 0 $s-m;
}
</style>
