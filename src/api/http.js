
import axios from "axios";
import qs from "qs";
import router from "../router";
import store from '../store'
//开发环境
const url = 'http://192.168.1.11:2002';
const Axios = axios.create({
    baseURL: url, 
    timeout: 10000,
    responseType: "json",
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    }
});
Axios.interceptors.request.use(
    config => {
        // 若是有做鉴权token , 就给头部带上token
        if (window.sessionStorage.getItem('user')) {
            let loginInfo = JSON.parse(window.sessionStorage.getItem('user'));
            if(loginInfo.token){
                config.headers.token = loginInfo.token;
            }
        }
        return config;
    },
    error => {
        store.dispatch('TAlert',{
            show: true,
            content: '服务器出错了',
            cancel: true,
            onSure: function (){
               
            },
            onCancel:function(){

            }
        })
        return Promise.reject(error.data.error.message);
    }
);
//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
    res => {
        //对响应数据做些事
        if(res.data.code == "111") {
            store.dispatch('TAlert',{
                show: true,
                content: '请先登陆',
                cancel: true,
                onSure: function (){
                    router.push({
                        path: "/login"
                    });
                },
                onCancel:function(){

                }
            })
        }else{
            if(res.config.url.indexOf('findUser') != -1){//判断用户实名认证
                if(!res.data.success || res.data.status == 0){
                    store.dispatch('TAlert',{
                        show: true,
                        content: '请到APP进行实名认证',
                        cancel: true,
                        onSure: function (){
                           window.location.href = 'http://download.5izhujia.com';
                        },
                        onCancel:function(){

                        }
                    })
                }
            }else{
                if(!res.data.success && (res.config.url.indexOf('isRegister') == -1)){
                    store.dispatch('TAlert',{
                        show: true,
                        content: res.data.msg,
                        cancel: true,
                        onSure: function (){
                           
                        },
                        onCancel:function(){

                        }
                    })
                }
            }
        }
            
        return res;
    },
    error => {
        store.dispatch('TAlert',{
            show: true,
            content: '服务器出错了',
            cancel: true,
            onSure: function (){
               
            },
            onCancel:function(){

            }
        })
        return Promise.reject(error);
    }
);
export default Axios;

