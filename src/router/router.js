import {createRouter, createWebHistory} from "vue-router";
import Main from "@/pages/Main.vue";
import Posts from "@/pages/Posts.vue";
import About from "@/pages/About.vue";
import PostDetail from "@/pages/PostDetail.vue";
import PostsWithStore from "@/pages/PostsWithStore.vue";
import PostsWithCompositionApi from "@/pages/PostsWithCompositionApi.vue";

const routes = [
  {
    path: '/',
    component: Main
  },
  {
    path: '/posts',
    component: Posts
  },
  {
    path: '/posts/:id',
    component: PostDetail
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/store',
    component: PostsWithStore
  },
  {
    path: '/composition',
    component: PostsWithCompositionApi
  },
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router