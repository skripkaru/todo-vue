<script>
export default {
  name: "UiInput",
  props: {
    modelValue: [String, Number],
  },
  methods: {
    updateInput(e) {
      this.$emit('update:modelValue', e.target.value)
    }
  }
}
</script>

<template>
  <input
      :value="modelValue"
      @input="updateInput"
      class="input"
      type="text"
  >
</template>

<style scoped>
.input {
  width: 100%;
  padding: 16px;
  border: 1px solid #ccc;
}
</style>