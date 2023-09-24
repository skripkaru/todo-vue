<script>
import PostList from "@/components/PostList.vue";
import PostForm from "@/components/PostForm.vue";

export default {
  components: {PostList, PostForm},
  data() {
    return {
      posts: [
        {id: 1, title: 'Title', body: 'Description 1'},
        {id: 2, title: 'Title 2', body: 'Description 2'},
        {id: 3, title: 'Title 3', body: 'Description 3'},
      ],
      title: '',
      body: ''
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post)
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    }
  }
}
</script>

<template>
  <div class="app">
    <PostForm @create="createPost"/>
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
}


</style>