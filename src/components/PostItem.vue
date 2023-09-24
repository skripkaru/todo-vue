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
      <div><strong>Название: </strong>{{ post.title }}</div>
      <div><strong>Описание: </strong>{{ post.body }}</div>
    </div>
    <div>
      <button>Delete</button>
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
</style>