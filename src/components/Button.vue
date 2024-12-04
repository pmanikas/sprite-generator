
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    type?: 'primary' | 'secondary' | 'danger';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
}>();

const emit = defineEmits<{
    (e: 'click'): void;
}>();

const buttonClass = computed(() => {
    return [
        'btn',
        props.type ? `btn-${props.type}` : '',
        props.disabled ? 'btn-disabled' : '',
        props.size ? `${props.size}` : ''
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
    padding: $s-m $s-l;
    font-size: 1rem;
    border: none;
    border-radius: $base-radius;
    cursor: pointer;

    &.small {
        padding: $s-s $s-m;
        font-size: 0.75rem;
    }

    &.large {
        padding: $s-l $s-xl;
        font-size: 1.25;
    }
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
