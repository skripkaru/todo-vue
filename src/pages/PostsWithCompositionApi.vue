<script>
import PostList from "@/components/PostList.vue";
import PostForm from "@/components/PostForm.vue";
import UiDialog from "@/components/UI/UiDialog.vue";
import UiButton from "@/components/UI/UiButton.vue";
import UiSelect from "@/components/UI/UiSelect.vue";
import UiInput from "@/components/UI/UiInput.vue";
import UiPagination from "@/components/UI/UiPagination.vue";
import usePosts from "@/hooks/usePosts";
import useSortedPosts from "@/hooks/useSortedPosts";
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts";

export default {
  name: 'PostPage',
  components: {UiPagination, UiInput, UiSelect, UiButton, UiDialog, PostList, PostForm},
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        {name: 'By title', value: 'title'},
        {name: 'By description', value: 'body'}
      ]
    }
  },
  setup(props) {
    const {posts, totalPages, isPostLoading} = usePosts(10)
    const {selectedSort, sortedPosts} = useSortedPosts(posts)
    const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts)

    return {
      posts,
      totalPages,
      isPostLoading,
      selectedSort,
      sortedPosts,
      searchQuery,
      sortedAndSearchedPosts,
    }
  }
}
</script>

<template>
  <h1>Posts</h1>
  <UiInput v-focus v-model="searchQuery" placeholder="Search"/>
  <div class="app__btns">
<!--    <UiButton @click="showDialog">Create post</UiButton>-->
    <UiSelect v-model="selectedSort" :options="sortOptions"/>
  </div>
<!--  <UiDialog v-model:show="dialogVisible">-->
<!--    <PostForm @create="createPost"/>-->
<!--  </UiDialog>-->
  <PostList :posts="sortedAndSearchedPosts" v-if="!isPostLoading"/>
<!--  <h3 v-else>Loading...</h3>-->
<!--  <div v-intersection="loadMorePosts"></div>-->
</template>

<style scoped>
.app__btns {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;
}
</style>