<script>
import PostList from "@/components/PostList.vue";
import PostForm from "@/components/PostForm.vue";
import UiDialog from "@/components/UI/UiDialog.vue";
import UiButton from "@/components/UI/UiButton.vue";

export default {
  components: {UiButton, UiDialog, PostList, PostForm},
  data() {
    return {
      posts: [
        {id: 1, title: 'Title', body: 'Description 1'},
        {id: 2, title: 'Title 2', body: 'Description 2'},
        {id: 3, title: 'Title 3', body: 'Description 3'},
      ],
      dialogVisible: false
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post)
      this.dialogVisible = false
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true
    }
  }
}
</script>

<template>
  <div class="app">
    <h1>Post Page</h1>
    <div>
      <UiButton @click="showDialog">Create post</UiButton>
    </div>
    <UiDialog v-model:show="dialogVisible">
      <PostForm @create="createPost"/>
    </UiDialog>
    <PostList :posts="posts" @remove="removePost"/>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 16px 0;
  max-width: 600px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}


</style>