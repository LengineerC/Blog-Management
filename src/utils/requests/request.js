import axios from "axios";
import { URL } from "../ip";

export function request(url,payload){
    const requestUrl=URL+url;
    const options={
        url:requestUrl,
        ...payload,
    }

    return axios(options)
            .then(res=>res.data)
            .catch(e=>{
                console.log(e);
            })
}