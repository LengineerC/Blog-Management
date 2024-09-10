import axios from "axios";
import { URL } from "../ip";
// import { useRouter } from "vue-router";
// import { NOT_LOGIN } from "./enum";

export function request(url,payload){
    const {method,params}=payload;
    const requestUrl=URL+url;
    let options={};
    // if(method==='get'){
    //     options={
    //         url:requestUrl,
    //         ...payload,
    //     }
    // }else if(method==='post'){
    //     options={
    //         url:requestUrl,
    //         method,
    //         data:params
    //     }
    // }
    switch(method){
        case 'get':
        case 'delete':
            options={
                url:requestUrl,
                ...payload,
            };
            break;

        case 'post':
            options={
                url:requestUrl,
                method,
                data:params
            };
            break;

    }

    const token=localStorage.getItem("token");
    const headers={
        token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };
    options['headers']=headers;
    return axios(options);
}