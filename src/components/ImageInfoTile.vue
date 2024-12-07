<script setup lang="ts">;
const props = defineProps<{
    photo: string;
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
        <img class="preview-photo" :src="props.photo" />
        <i @click="removePhoto()" title="Remove image" class="remove">Remove</i>
    </div>
</template>

<style lang="scss" scoped>
@use './../styles/abstracts' as *;

.image-info-tile {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: $s-m;
    width: 100%;
    padding: $s-m;
    border: 1px solid $c-gray-light;
    border-radius: $s-s;
    margin-bottom: $s-m;
}

.preview-photo {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: $s-s;
}

.css-selection-rule {
    flex: 1;
    padding: 0 $s-m;
}

.remove {
    font-size: 1rem;
    cursor: pointer;
}
</style>
