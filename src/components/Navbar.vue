<script>
import UiButton from "@/components/UI/UiButton.vue";

export default {
  name: "Navbar",
  components: {UiButton}
}
</script>

<template>
  <div class="navbar">
    <div @click="$router.push('/')" class="logo">Todo</div>
    <div class="navbar__btns">
      <UiButton @click="$router.push('/posts')">Posts</UiButton>
      <UiButton @click="$router.push('/about')">About</UiButton>
    </div>
  </div>
</template>

<style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-size: 32px;
    font-weight: 700;
  }

  .navbar__btns {
    margin-left: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: center;
  }
</style>