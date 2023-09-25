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
        console.log('Error')
      } finally {
        this.isPostLoading = false
      }
    },
    // changePage(pageNumber) {
    //   this.page = pageNumber
    // },
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
        console.log('Error')
      }
    },
  },
  mounted() {
    this.fetchPosts()
    console.log(this.$refs.observer)
    const options = {
      rootMargin: '0px',
      threshold: 1.0,
    }
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting && this.page < this.totalPages) {
        this.loadMorePosts()
      }
    }
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer)
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
  watch: {
    // page() {
    //   this.fetchPosts()
    // }
  }
}
</script>

<template>
  <div class="app">
    <h1>Post Page</h1>
    <UiInput v-model="searchQuery" placeholder="Search"/>
    <div class="app__btns">
      <UiButton @click="showDialog">Create post</UiButton>
      <UiSelect v-model="selectedSort" :options="sortOptions"/>
    </div>
    <UiDialog v-model:show="dialogVisible">
      <PostForm @create="createPost"/>
    </UiDialog>
    <PostList :posts="sortedAndSearchedPosts" @remove="removePost" v-if="!isPostLoading"/>
    <h3 v-else>Loading...</h3>
<!--    <UiPagination :total-pages="totalPages" :page="page" @change-page="changePage"/>-->
    <div ref="observer" class="observer"></div>
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