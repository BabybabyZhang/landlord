// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import './assets/css/reset.css'
import store from './store'
import axios from 'axios';

Vue.config.productionTip = false;

Vue.use(Vuex)
//懒加载 占位图
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

import Zepto from "n-zepto"

import VueWechatTitle from 'vue-wechat-title';  
Vue.use(VueWechatTitle)

/* eslint-disable no-new */ 
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App },
    beforeCreate:function (){
        
    }
})
 