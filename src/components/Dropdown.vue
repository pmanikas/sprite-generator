
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
    <div class="dropdown">
        <label v-if="label" class="label">{{ props.label }}</label>
        <select class="select" :disabled="props.disabled" :value="modelValue" @input="emit('update:modelValue', ($event.target as HTMLSelectElement).value)">
            <option class="option" v-for="item in props.items" :key="item.value" :value="item.value">{{ item.label }}</option>
        </select>
    </div>
</template>

<style scoped lang="scss">
@use './../styles/abstracts' as *;

.dropdown {
    display: flex;
    flex-direction: column;
    gap: $s-xs;
}

.select {
    padding: $s-xs $s-s;
    border: 1px solid $c-gray;
    border-radius: $base-radius;
    height: $input-height;
    min-width: 300px;
}
</style>
