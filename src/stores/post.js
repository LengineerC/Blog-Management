import { getAllPosts } from '@/service/postService';
import { ElMessage } from 'element-plus';
import { defineStore } from 'pinia'

export const usePostStore=defineStore("post",{
    state:()=>({
        posts:[],
        tags:[],
        categories:[],
    }),
    getters:{

    },
    actions:{
        async getAllPosts(){
            const response=await getAllPosts();
            const {code}=response;
            if(code===1){
                const {data}=response;
                this.posts=data;
            }else{
                ElMessage({
                    showClose: true,
                    message: '获取文章失败',
                    type: 'success',
                });
            }
        }
    }
});