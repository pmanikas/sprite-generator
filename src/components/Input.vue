<script setup lang="ts">
const props = defineProps({
    label: {
        type: String
    },
    type: {
        type: String,
        default: 'text'
    },
    modelValue: {
        type: Number,
        default: null,
        required: true
    }
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (event: Event) => {
    return Number((event.target as HTMLInputElement)?.value || 0);
}

</script>

<template>
    <div class="input-container">
        <label v-if="props.label">{{ props.label }}</label>
        <input class="input" :value="modelValue" :type="props.type" @change="emit('update:modelValue', updateValue($event))" />
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
