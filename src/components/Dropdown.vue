
<script setup lang="ts" name="dropdownItem">

interface DropdownItem {
    label: string;
    value: string;
}

const props = defineProps<{
    items: DropdownItem[];
    disabled?: boolean;
    modelValue: string;
    label?: string;
}>();

const emit = defineEmits(['update:modelValue']);

</script>

<template>
    <label v-if="label" class="label">{{ props.label }}</label>
    <select class="select" :disabled="props.disabled" :value="modelValue" @input="emit('update:modelValue', ($event.target as HTMLSelectElement).value)">
        <option class="option" v-for="item in props.items" :key="item.value" :value="item.value">{{ item.label }}</option>
    </select>
</template>

<style scoped lang="scss">
@use './../styles/abstracts' as *;

.label {
    display: block;
    margin-bottom: $s-xs;
}

.select {
    padding: $s-xs $s-s;
    border: 1px solid $c-gray;
    border-radius: $s-xs;
    width: 100%;
    height: 40px;
}
</style>
