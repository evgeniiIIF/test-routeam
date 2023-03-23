<template>
  <select class='v-select' :value="modelValue" @change="changeOption">
    <option v-for="option in options"
      :key="option.value"
      :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'v-select',
  props: {
    modelValue: {
      type: Number,
    },
    options: {
      type: Array,
      default: () => [10, 25, 50]
    }
  },
  methods: {
    changeOption(e) {
      this.$emit('update:modelValue', e.target.value)
    }
  }
}
</script>


<style lang='scss'>
.v-select{
  color: #000;
}
</style>
