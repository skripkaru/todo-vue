import {createRouter, createWebHistory} from "vue-router";
import Main from "@/pages/Main.vue";
import Posts from "@/pages/Posts.vue";
import About from "@/pages/About.vue";
import PostDetail from "@/pages/PostDetail.vue";

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
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router