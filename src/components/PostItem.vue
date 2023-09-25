<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <li class="post">
    <div>
      <h3>{{ post.title }}</h3>
      <p>{{ post.body }}</p>
    </div>
    <div class="post__btns">
      <UiButton @click="$router.push(`/posts/${post.id}`)">Open</UiButton>
      <UiButton @click="$emit('remove', post)">Delete</UiButton>
    </div>
  </li>
</template>

<style scoped>
.post {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 1px solid #ccc;
}

.post__btns {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>