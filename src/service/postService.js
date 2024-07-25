import { createUrl } from "@/utils/createUrl";
import { request } from "@/utils/requests/request";

const POST="post"

export function getAllPosts(params){
    return request(createUrl(POST,'getAll'),{
        method:"get",
        params,
    });
}