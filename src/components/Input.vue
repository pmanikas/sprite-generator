<script setup>
const props = defineProps({
    label: {
        type: String
    },
    type: {
        type: String,
        default: 'text'
    },
    modelValue: {
        default: null,
        required: true
    }
});

const emit = defineEmits(['update:modelValue']);

</script>

<template>
    <div class="input-container">
        <label v-if="label">{{ label }}</label>
        <input class="input" :value="modelValue" :type="type" @change="emit('update:modelValue', $event.target.value)" />
    </div>
</template>

<style scoped lang="scss">
@use './../styles/abstracts' as *;

.input-container {
    display: flex;
    flex-direction: column;
    gap: $s-xs;
}

.input {
    height: $input-height;
    border-radius: $base-radius;
    padding: $s-xs $s-s;
}
</style>
