import Vue from 'vue'
import VueRouter from 'vue-router'
import ListArticle from '../views/ListArticle.vue'
import CreateArticle from "@/views/CreateArticle"
import test from "@/views/test";
import VideoPlay from "@/views/VideoPlay";
import Search from "@/views/Search";
import Recommend from "@/views/Recommend";
import Login from "@/views/Login";
// import { IonicVueRouter } from '@ionic/vue'
Vue.use(VueRouter)
// Vue.use(IonicVueRouter)
const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/articles/recommend',
  },
  {
    path: '/articles/recommend',
    name: 'Recommend',
    component: Recommend
  },
  {
    path: '/articles/create',
    name: 'CreateArticle',
    component: CreateArticle
  },
  {
    path: '/articles/list',
    name: 'ListArticle',
    component: ListArticle,
    meta: {
      keepAlive: true, //此组件需要被缓存
    }
  },
  {
    path: '/articles/test',
    name: 'test',
    component: test
  },
  {
    path: '/articles/videoplay',
    name: 'video',
    component: VideoPlay,
    meta: {
      keepAlive: true, //此组件需要被缓存
    }
  },
  {
    path: '/articles/search',
    name: 'search',
    component: Search,
    meta: {
      keepAlive: true, //此组件需要被缓存
          }
    },
  {
    path: '/articles/login',
    name: 'login',
    component: Login,
  }
]

const router = new VueRouter({
  routes
})

export default router
