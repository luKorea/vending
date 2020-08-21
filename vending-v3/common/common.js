import 'babel-polyfill';
// 请求方法
function ajaxFun(url,type,userToken,data){
    return $.ajax({
        type,
        url,
        timeout: 10000,
        data,
        headers: {
          token: userToken,
          "Content-Type": "application/json",
        },
      })
}
// 请求方法
function loadAjax(url,type,userToken,data,mask,element,elementChild){
    return new Promise(function(resolve,reject){
        ajaxFun(url,type,userToken,data).then(res=>{
            if(mask){
                loadingOut();
            }
            if(res.code==200){
                if(element){

                }
                resolve(res)
            }else if(res.code==403){
                window.location.href="M_login.html"
            }else{
                reject(res);
            }
        }).catch(err=>{
            if(mask){
                loadingOut();
            }
            hui.iconToast('服务器请求超时', 'error');
            return ;
        })
    })
};
// loading 数据处理中
function loadingWith(title){
    hui.loading(title);
}
// 关闭loading
function loadingOut(){
    hui.loading(false,true)
}
//带图标提示
function toastTitle(title,icon){
    hui.iconToast(title, icon)
}
export {loadAjax,loadingWith,loadingOut,toastTitle}