import { getAllCategories, getAllPosts, getAllTags } from '@/service/postService';
import { ElMessage } from 'element-plus';
import { defineStore } from 'pinia'

import 'element-plus/dist/index.css';

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
                    type: 'error',
                });
            }
        },

        async getAllTags(){
            const response=await getAllTags();
            const {code}=response;
            if(code===1){
                const {data}=response;
                this.tags=data;
            }else{
                ElMessage({
                    showClose: true,
                    message: '获取标签失败',
                    type: 'error',
                });
            }
        },

        async getAllCategories(){
            const response=await getAllCategories();
            const {code}=response;
            if(code===1){
                const {data}=response;
                this.categories=data;
            }else{
                ElMessage({
                    showClose: true,
                    message: '获取分类失败',
                    type: 'error',
                });
            }
        }
    }
});