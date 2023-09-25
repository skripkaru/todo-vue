<script>
import PostList from "@/components/PostList.vue";
import PostForm from "@/components/PostForm.vue";
import UiDialog from "@/components/UI/UiDialog.vue";
import UiButton from "@/components/UI/UiButton.vue";
import axios from "axios";
import UiSelect from "@/components/UI/UiSelect.vue";

export default {
  components: {UiSelect, UiButton, UiDialog, PostList, PostForm},
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostLoading: false,
      selectedSort: '',
      sortOptions: [
        {name: 'By title', value: 'title'},
        {name: 'By description', value: 'body'}
      ]
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
    },
    async fetchPosts() {
      try {
        this.isPostLoading = true
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
        this.posts = response.data
      } catch (e) {
        console.log('Error')
      } finally {
        this.isPostLoading = false
      }
    }
  },
  mounted() {
    this.fetchPosts()
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
    }
  }
}
</script>

<template>
  <div class="app">
    <h1>Post Page</h1>
    <div class="app__btns">
      <UiButton @click="showDialog">Create post</UiButton>
      <UiSelect v-model="selectedSort" :options="sortOptions"/>
    </div>
    <UiDialog v-model:show="dialogVisible">
      <PostForm @create="createPost"/>
    </UiDialog>
    <PostList :posts="sortedPosts" @remove="removePost" v-if="!isPostLoading"/>
    <h3 v-else>Loading...</h3>
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

.app__btns {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;
}
</style>