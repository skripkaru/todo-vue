<script>
import PostItem from "@/components/PostItem.vue";

export default {
  components: {PostItem},
  props: {
    posts: {
      type: Array,
      required: true,
    }
  }
}
</script>

<template>
  <ul class="post-list">
    <PostItem
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @remove="$emit('remove', post)"
    />
  </ul>
</template>

<style scoped>
.post-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>