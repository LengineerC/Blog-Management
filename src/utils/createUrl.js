export function createUrl(api,path){
    if(api[0]!=='/'){
        api='/'+api;
    }

    let pathArr=path.split('');
    if(pathArr[0]==='/'){
        pathArr.shift();
    }
    if(pathArr[pathArr.length-1]!=='/'){
        pathArr.push('/');
    }
    const pathUrl=pathArr.join("");
    return api+'/'+pathUrl;
}