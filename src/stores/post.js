import { getAllCategories, getAllPosts, getAllTags, getPostByPage } from '@/service/postService';
import { ElMessage } from 'element-plus';
import { defineStore } from 'pinia'

import 'element-plus/dist/index.css';

export const usePostStore=defineStore("post",{
    state:()=>({
        //全部的文章 
        posts:[],

        pagination:{
            page:0,
            pageSize:0,
        },
        postList:[],//分页的文章
        total:0,

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

        async getPostByPage(payload){
            const response=await getPostByPage(payload);
            const {code}=response;
            if(code===1){
                const {data:{page,pageSize,total,list}}=response;
                this.pagination={
                    page,
                    pageSize
                };
                this.total=total;
                this.postList=list;
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