<script>
import toggleMixin from "@/mixins/toggleMixin";

export default {
  name: "UiDialog",
  mixins: [toggleMixin],
}
</script>

<template>
  <div v-if="show" @click="hideDialog" class="dialog">
    <div @click.stop class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.dialog {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
}

.dialog__content {
  min-width: 500px;
  margin: auto;
  padding: 32px;
  background-color: #fff;
  border-radius: 8px;
}
</style>