// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ()=>import('@/views/Home.vue')
  },
  {
    path:'/search',
    name:'SearchPage',
    component:()=>import('@/views/SearchPage.vue'),
    props:true,
    children: [{
      path: ':param',
      name: 'DetailPage',
      component: ()=>import ('@/views/DetailPage.vue'),
      props:true
    }]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
