
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    type?: 'primary' | 'secondary' | 'danger';
    disabled?: boolean;
}>();

const emit = defineEmits<{
    (e: 'click'): void;
}>();

const buttonClass = computed(() => {
    return [
        'btn',
        props.type ? `btn-${props.type}` : '',
        props.disabled ? 'btn-disabled' : ''
    ];
});

const handleClick = () => {
    if (!props.disabled) emit('click');
};
</script>

<template>
    <button :class="buttonClass" @click="handleClick">
        <slot></slot>
    </button>
</template>

<style scoped lang="scss">
@use './../styles/abstracts' as *;

.btn {
    padding: $s-s $s-m;
    border: none;
    cursor: pointer;
}

.btn-primary {
    background-color: $c-primary;
    color: $c-white;
}

.btn-secondary {
    background-color: $c-secondary;
    color: $c-white;
}

.btn-danger {
    background-color: $c-danger;
    color: $c-white;
}

.btn-disabled {
    background-color: $c-gray;
    color: $c-gray-dark;
    cursor: not-allowed;
}
</style>
