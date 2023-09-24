<script>
export default {
  name: 'UiButton'
}
</script>

<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<style scoped>
.btn {
  padding: 16px;
  border: none;
  background-color: #ccc;
}
</style>