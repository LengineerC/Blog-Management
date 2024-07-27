import { login } from "@/service/loginService";
import { ElMessage } from "element-plus";
import { defineStore } from "pinia";

import 'element-plus/dist/index.css';

export const useUserStore=defineStore("user",{
    store:()=>({
        username:null,
    }),
    getters:{
        isLoggedIn:(state)=>!!state.username,
    },
    actions:{
        clearUser(){
            this.username=null;
        },

        async login(payload,callback){
            const response=await login(payload);
            const {code}=response;
            if(code===1){
                const {data}=response;
                localStorage.setItem("token",data);
                const {username}=payload;
                this.username=username;
                ElMessage({
                    showClose:true,
                    message:"Login successfully",
                    type:"success"
                })

            }else{
                ElMessage.error("账号或用户名错误");
            }

            if(typeof callback==="function"){
                callback(code);
            }
        }
    }
})