export function createUrl(api,path){
    let url;

    if(api[0]!=='/'){
        api='/'+api;
    }
    
    let pathArr=path.split('');
    if(pathArr[0]==='/'){
        pathArr.shift();
    }
    // if(pathArr[pathArr.length-1]!=='/' && pathArr.length>0){
    //     pathArr.push('/');
    // }
    if(pathArr.length>0){
        if(pathArr[pathArr.length-1]==='/'){
            pathArr.pop();
        }
        const pathUrl=pathArr.join("");
        url=api+'/'+pathUrl;
    }else if(pathArr.length===0){
        url=api;
    }
    return url;
}