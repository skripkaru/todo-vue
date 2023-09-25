<script>

import {defineComponent} from "vue";
import Navbar from "@/components/Navbar.vue";

export default defineComponent({
  components: {Navbar}
})
</script>

<template>
  <div class="app">
    <Navbar/>
    <RouterView/>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 16px;
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}
</style>