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
    <input
        v-model="post.title"
        class="input"
        type="text"
        placeholder="Title"
    >
    <input
        v-model="post.body"
        class="input"
        type="text"
        placeholder="Body"
    >
    <button @click="createPost" class="btn">Create</button>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input {
  width: 100%;
  padding: 16px;
  border: 1px solid #ccc;
}

.btn {
  align-self: flex-end;
  padding: 16px;
  border: none;
  background-color: #ccc;
}
</style>