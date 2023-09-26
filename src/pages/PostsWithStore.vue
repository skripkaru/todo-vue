<script>
import PostList from "@/components/PostList.vue";
import PostForm from "@/components/PostForm.vue";
import UiDialog from "@/components/UI/UiDialog.vue";
import UiButton from "@/components/UI/UiButton.vue";
import UiSelect from "@/components/UI/UiSelect.vue";
import UiInput from "@/components/UI/UiInput.vue";
import UiPagination from "@/components/UI/UiPagination.vue";
import {mapState, mapGetters, mapMutations, mapActions} from "vuex";

export default {
  name: 'PostPage',
  components: {UiPagination, UiInput, UiSelect, UiButton, UiDialog, PostList, PostForm},
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort',
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts',
    }),
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
  },
  mounted() {
    this.fetchPosts()
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostLoading: state => state.post.isPostLoading,
      selectedSort: state => state.post.selectedSort,
      searchQuery: state => state.post.searchQuery,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
      sortOptions: state => state.post.sortOptions,
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts',
    })
  },
}
</script>

<template>
  <h1>Posts</h1>
  <UiInput v-focus :model-value="searchQuery" @update:model-value="setSearchQuery" placeholder="Search"/>
  <div class="app__btns">
    <UiButton @click="showDialog">Create post</UiButton>
    <UiSelect :model-value="selectedSort" @update:model-value="setSelectedSort" :options="sortOptions"/>
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