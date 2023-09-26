<script>
import PostList from "@/components/PostList.vue";
import PostForm from "@/components/PostForm.vue";
import UiDialog from "@/components/UI/UiDialog.vue";
import UiButton from "@/components/UI/UiButton.vue";
import axios from "axios";
import UiSelect from "@/components/UI/UiSelect.vue";
import UiInput from "@/components/UI/UiInput.vue";
import UiPagination from "@/components/UI/UiPagination.vue";

export default {
  name: 'PostPage',
  components: {UiPagination, UiInput, UiSelect, UiButton, UiDialog, PostList, PostForm},
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostLoading: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
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
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = response.data
      } catch (e) {
        console.log(e)
      } finally {
        this.isPostLoading = false
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = [...this.posts, ...response.data]
      } catch (e) {
        console.log(e)
      }
    },
  },
  mounted() {
    this.fetchPosts()
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
}
</script>

<template>
  <h1>Posts</h1>
  <UiInput v-focus v-model="searchQuery" placeholder="Search"/>
  <div class="app__btns">
    <UiButton @click="showDialog">Create post</UiButton>
    <UiSelect v-model="selectedSort" :options="sortOptions"/>
  </div>
  <UiDialog v-model:show="dialogVisible">
    <PostForm @create="createPost"/>
  </UiDialog>
  <PostList :posts="sortedAndSearchedPosts" @remove="removePost" v-if="!isPostLoading"/>
  <h3 v-else>Loading...</h3>
  <div v-intersection="loadMorePosts"></div>
</template>

<style scoped>
.app__btns {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;
}
</style>