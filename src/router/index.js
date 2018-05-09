import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home' //首页
import Login from '@/components/Login' //登录
import ForgetPwd from '@/components/ForgetPwd' //忘记密码
import TermsOfService from '@/components/TermsOfService' //APP协议
import Bill from '@/components/Bill' //账单
import RentalBill from '@/components/RentalBill' //出租账单
import OrderDetails from '@/components/OrderDetails' //订单详情
import RentingOrder from '@/components/RentingOrder' //出租订单
import HouseList from '@/components/HouseList' //房源列表
import HouseDetail from '@/components/HouseDetail'


import Sets from '@/components/Set' //设置
import Acount from '@/components/Acount' //账号管理
import SetPwd from '@/components/SetPwd' //重置密码

import BankList from '@/components/BankList' //银行卡列表
import AddBank from '@/components/AddBank' //添加银行卡
import AddResult from '@/components/AddResult' //银行卡添加结果
import Recognition from '@/components/Recognition' //身份证认证信息

import Money from '@/components/Money' //钱包
import AreaList from '@/components/AreaList' //小区列表
import AddArea from '@/components/AddArea' //添加小区
import AddHouse from '@/components/AddHouse' //添加房源
import RoomDetail from '@/components/RoomDetail' //房间详情
import AddRoom from '@/components/AddRoom' //添加房间
import City from '@/common/City' //小区列表


Vue.use(Router)
const router = new Router({
  mode:'history',
  base: '/',
  routes: [
    {
      path: '/', 
      redirect:'/login',
      name:'login',
      meta: {
          title:'登录'
      }
    },
    {
      path: '/index', 
      component: Home,
      name:'home',
      meta: {
          title:'安逸客',
          requireLogin:true
      }
    },
    {
      path: '/termsservice', 
      component: TermsOfService,
      name:'termsofservice',
      meta: {
          title:'服务条款',
          requireLogin:true
      }
    },
    {
      path: '/bill', 
      component: Bill,
      name:'bill',
      meta: {
          title:'账单',
           requireLogin:true
      }
    },
    {
      path: '/rentalbill', 
      component: RentalBill,
      name:'RentalBill',
      meta: {
          title:'出租账单',
           requireLogin:true
      }
    },
    {
      path: '/orderdetails', 
      component: OrderDetails,
      name:'OrderDetails',
      meta: {
          title:'订单详情',
           requireLogin:true
      }
    },
    {
      path: '/rentingorder', 
      component: RentingOrder,
      name:'rentingorder',
      meta: {
          title:'出租订单',
           requireLogin:true
      }
    },
    {
      path: '/login', 
      component: Login,
      name:'login',
      meta: {
          title:'登录'
      }
    },
    {
      path: '/forgetPwd', 
      component: ForgetPwd,
      name:'forgetPwd',
      meta: {
          title:'忘记密码'
      }
    },
    {
      path: '/set', 
      component: Sets,
      name:'set',
      meta: {
          title:'设置',
          requireLogin:true
      }
    },
    {
      path: '/setPwd', 
      component: SetPwd,
      name:'setPwd',
      meta: {
          title:'重置密码',
          requireLogin:true
      }
    },
    {
      path: '/acount', 
      component: Acount,
      name:'acount',
      meta: {
          title:'账号管理',
          requireLogin:true
      }
    },
    {
      path: '/bankList', 
      component: BankList,
      name:'bankList',
      meta: {
          title:'银行卡列表',
          requireLogin:true
      }
    },
    {
      path: '/addBank', 
      component: AddBank,
      name:'addBank',
      meta: {
          title:'添加银行卡',
          requireLogin:true
      }
    },
    {
      path: '/addResult', 
      component: AddResult,
      name:'addResult',
      meta: {
          title:'添加结果',
          requireLogin:true
      }
    },
    {
      path: '/recognition', 
      component: Recognition,
      name:'recognition',
      meta: {
          title:'认证信息',
          requireLogin:true
      }
    },
    {
      path: '/money', 
      component: Money,
      name:'money',
      meta: {
          title:'钱包',
          requireLogin:true
      }
    },
    {
      path: '/houselist', 
      component: HouseList,
      name:'houselist',
      meta: {
          title:'房源列表',
          requireLogin:true
      }
    },
    {
      path: '/housedetail', 
      component: HouseDetail,
      name:'housedetail',
      meta: {
          title:'房源详情',
          requireLogin:true
      }
    },
    {
      path: '/areaList', 
      component: AreaList,
      name:'areaList',
      meta: {
          title:'小区列表',
          requireLogin:true
      }
    },
    {
      path: '/addArea', 
      component: AddArea,
      name:'addArea',
      meta: {
          title:'新增小区',
          requireLogin:true
      }
    },
    {
      path: '/addHouse', 
      component: AddHouse,
      name:'addHouse',
      meta: {
          title:'房屋详情',
          requireLogin:true
      }
    },
    {
      path: '/city', 
      component: City,
      name:'City',
      meta: {
          title:'三级联动',
      }
    },
    {
      path: '/addRoom', 
      component: AddRoom,
      name:'addRoom',
      meta: {
          title:'添加房间',
      }
    },
    {
      path: '/roomDetail', 
      component: RoomDetail,
      name:'roomDetail',
      meta: {
          title:'房间详情',
      }
    }
  ],
})



router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireLogin)) {
    // 判断是否需要登录权限
      if (window.sessionStorage.getItem("user")) {
        // 判断是否登录
        next();
    } else {
        // 没登录则跳转到登录界面
        next({
          path: "/login"
        });
    }
  } else {
    next();
  }
});

export default router;