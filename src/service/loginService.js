import { createUrl } from "@/utils/createUrl";
import { request } from "@/utils/requests/request";

const LOGIN='login';

export function login(params){
    return request(createUrl(LOGIN,''),{
        method:"post",
        params,
    })
}