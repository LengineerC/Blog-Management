import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/Login.vue'
import MainLayout from '@/components/MainLayout/MainLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  
  routes: [
    {
      path:"/Login",
      component:Login,
    },
    {
      path:'/',
      component:MainLayout,
      children:[
        {
          path:"",
          redirect:"/Home"
        },
        {
          path:"/Home",
          component:()=>import("@/views/Home/Home.vue"),
        },
      ]
    },
  ]
})

export default router;
