<template>
  <div class="v-select">
    <select name="countCards" :value="modelValue" @change="changeOption">
      <option v-for="(option, index) in options"
        :key="option.value"
        :selected="index === 0"
        :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'v-select',
  props: {
    modelValue: {
      type: Number,
      default: () => 10
    },
    options: {
      type: Array,
      default: () => [10, 25, 50]
    }
  },
  methods: {
    changeOption(e) {
      let option = e.target.value
      this.$emit('update:modelValue', option)
      this.$emit('on-change-option', option)
    }
  }
}
</script>


<style lang='scss'>
.v-select {
  select {
    position: relative;
    width: 71px;
    padding: 8px 5px;
    background: #FFFFFF;
    border: 1px solid #A2A3A4;
    border-radius: 3px;
    font-size: 16px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
}

.v-select:after {
  content: "▼";
  font-size: 24px;
  position: absolute;
  right: 8px;
  top: 50%;
  z-index: 1;
  pointer-events: none;
  box-sizing: border-box;
  transform: translateY(-50%);
  color: #C4C4C4;
}
</style>
