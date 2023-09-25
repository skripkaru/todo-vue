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
  <ul class="post-list" v-if="posts.length > 0">
    <TransitionGroup name="post-list">
      <PostItem
          v-for="post in posts"
          :key="post.id"
          :post="post"
          @remove="$emit('remove', post)"
      />
    </TransitionGroup>
  </ul>
  <h2 v-else>Post list is empty</h2>
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

.post-list-enter-active,
.post-list-leave-active {
  transition: all .5s ease-in-out;
}

.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.post-list-move {
  transition: transform .5s ease-in-out;
}
</style>