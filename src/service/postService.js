import { createUrl } from "@/utils/createUrl";
import { request } from "@/utils/requests/request";
import { POST_API } from "@/utils/requests/enum";

export function getAllPosts(params){
    return request(createUrl(POST_API.POST,'getAll'),{
        method:"get",
        params
    });
}

export function getAllTags(params){
    return request(createUrl(POST_API.TAG,"getAll"),{
        method:'get',
        params
    })
}

export function getAllCategories(params){
    return request(createUrl(POST_API.CATEGORY,"getAll"),{
        method:"get",
        params
    })
}