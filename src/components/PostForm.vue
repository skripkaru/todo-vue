<script>
export default {
  data() {
    return {
      post: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    createPost() {
      this.post.id = Date.now()
      this.$emit('create', this.post)
      this.post = {
        title: '',
        body: ''
      }
    }
  }
}
</script>

<template>
  <form @submit.prevent class="form">
    <h3>Create post</h3>
    <UiInput
        v-model="post.title"
        type="text"
        placeholder="Title"
    />
    <UiInput
        v-model="post.body"
        type="text"
        placeholder="Body"
    />
    <UiButton @click="createPost">Create</UiButton>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}
</style>