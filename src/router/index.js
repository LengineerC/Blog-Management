import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/Login.vue'
import MainLayout from '@/components/MainLayout/MainLayout.vue'
import { useUserStore } from '@/stores/user'
import axios from 'axios'
import { NOT_LOGIN } from '@/utils/requests/enum'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  
  routes: [
    {
      path:"/Login",
      name:"Login",
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
          name:"Home",
          component:()=>import("@/views/Home/Home.vue"),
        },
      ]
    },
  ]
})

router.beforeEach((to,from,next)=>{
  const userStore=useUserStore();

  if(to.name!=="Login"&& !userStore.isLoggedIn){
    next({name:"Login"});
  }else{
    next();
  }
})

axios.interceptors.response.use(response=>{
  const {data,data:{msg}}=response;

  if(msg===NOT_LOGIN){
    router.push("/Login");
  }
  return data;
},error=>{
  console.log(error);
  return Promise.reject(error);
})

export default router;
