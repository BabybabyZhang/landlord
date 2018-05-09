<template>
    <div id="login" >
        <div class="head">
            <img :src="imgurl+'login-pic.png'" />
        </div>
        <div class="login-con">
            <div class="title">
                <span @click="tab(1)" :class="activeTab == 1 ?'active':''">密码登录</span>
                <span @click="tab(2)" :class="activeTab == 2 ?'active':''">快速登录</span>
            </div>
            <div>
                <div class="item" v-show="activeTab == 1">
                    <p><input type="text" v-model="phone1" placeholder="请输入手机号码" /></p>
                    <p><input v-model="psw" :type="changeTypeFlag?'password':'text'" type="password" placeholder="请输入密码" /><i class="delect" @click="delect"></i><i class="eyes" @click="changeType" :class="{activeeyes:!changeTypeFlag}"></i></p>
                </div>
                <div class="item" v-show="activeTab == 2">
                    <p><input type="text" v-model="phone2" placeholder="请输入手机号码" /><i :class="{color:colorActive}" @click="getCode" class="code">{{msg}}</i></p>
                    <p><input type="text" v-model="code" placeholder="请输入验证码" /></p>
                </div>
            </div>
            <div class="foot">
                <button class="btn1" @click="login">登录</button>
                <span @click="forget">忘记密码？</span>
            </div>
        </div>
    </div>
</template>

<script>
import API from '@/api/index';
// import MenuUtils from '@/utils/MenuUtils'
import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'
var routers = [];
export default {
    name:'login',
    data() {
      return {
          t:0,
          logining: true,
          activeTab:1,
          msg:'获取验证码',
          phone1:'',
          phone2:'',
          code:'',
          psw:'',
          colorActive:false,
          decrease:null,
          changeTypeFlag:true,
          from:{},
          getCodeFlag:true,
      };
    },
    computed:{
      ...mapState([
        'user',
        'isLoading',
        'imgurl'
      ]),
    },
    methods: {
      ...mapMutations([
          'setUser',
          'updateLoading'
      ]),
      ...mapActions([
          'onSure',
          'onCancel',
          'TAlert',
      ]),
      tab(type){
          this.activeTab = type;
      },
      valiteInfo(){
          let reg = /^1[3|4|5|7|8|9][0-9]{9}$/;
          let str = '';
          if(this.activeTab == 1){
              if(this.phone1 == ''){
                  str = '手机号不能为空';
                  this.getAlert(str)
                  return false;
              }else if(this.psw == ''){
                  str = '密码不能为空';
                  this.getAlert(str)
                  return false;
              }
              if(!reg.test(this.phone1)){
                  str = '手机号的格式不正确';
                  this.getAlert(str)
                  return false;
              }
              if(!/^\w{6,12}$/.test(this.psw)){
                  str ='密码的格式不正确';
                  this.getAlert(str)
                  return false;
              } 
          }
          if(this.activeTab == 2){
              if(this.phone2 == ''){
                  str = '手机号不能为空';
                  this.getAlert(str)
                  return false;
              }else if(this.code == ''){
                  str = '验证码不能为空';
                  this.getAlert(str)
                  return false;
              }
              if(!reg.test(this.phone2)){
                  str = '手机号的格式不正确';
                  this.getAlert(str)
                  return false;
              }
              if(!/^\d{4}$/.test(this.code)){
                  str = '验证码的格式不正确';
                  this.getAlert(str)
                  return false;
              }
          }
          return true;
      },
      getAlert(str){
          this.TAlert({
              show: true,
              content: str,
              cancel: false,
              onSure: function (){}
          })
      },
      sendCode(){
          let obj = {
              mobile:this.phone2,
              noteType:1,
          };
          this.updateLoading(true);
          API.code(obj).then(res => {
              this.updateLoading(false);
              if (res.success) {
                  this.colorActive = true;
                  let a = 60;
                  let that = this;
                  this.decrease = setInterval(function(){
                      that.msg = "重新获取 ("+a+") ";
                      a--;
                      if(a==-1){
                          clearInterval(that.decrease)
                          that.colorActive = false;
                          that.msg = '获取验证码';
                          that.getCodeFlag = true;
                      }
                  },1000)
              } else if(res.code == -1) {
                  this.getAlert(res.msg)
              }else{
                  this.getAlert('服务器出错了，请稍后再试')
              }
          }).catch(error => {
              this.updateLoading(false);
              // this.getAlert('服务器出错了，请稍后再试')
          });
      },
      getCode(){
          let reg = /^1[3|4|5|7|8|9][0-9]{9}$/;
          let str = '';
          if(this.phone2 == ''){
              str = '手机号不能为空';
              this.getAlert(str)
              return;
          }
          if(!reg.test(this.phone2)){
              str = '手机号的格式不正确';
              this.getAlert(str)
              return;
          }
          if(this.getCodeFlag){
              this.getCodeFlag = false;
              this.isRegist(this.phone2)
          }
      },
      isRegist(phone,obj){
          let _this= this;
          this.updateLoading(true);
          API.isRegister({mobile:phone}).then(res => {
            if (res.success) {
                this.updateLoading(false);
                this.TAlert({
                    show: true,
                    content: '您还没有注册，请先去注册',
                    cancel: false,
                    onSure: function (){
                        if(JSON.stringify(_this.$route.query) != '{}'){
                            _this.$router.push({
                               path: '/regist',
                               query:_this.$route.query
                            });
                        }else{
                            _this.$router.push({
                                path:'/regist'
                            })
                        }
                    }
                })           
            }else{
                if(obj){
                    this.loginings(obj)
                }else{
                    this.sendCode()
                }
            }
          }).catch(error => {
              this.updateLoading(false);
              // this.getAlert('服务器出错了，请稍后再试')
          })
      },
      login(){
          var _this = this;
          console.log(this)
          if (this.valiteInfo()) {  
              if(this.logining){
                  this.logining = false;
                  let prarm = {};
                  if(this.activeTab == 1){
                      prarm.mobile = this.phone1;
                      prarm.password = this.psw;
                      prarm.loginType = 0;
                      this.isRegist(this.phone1,prarm)
                  }else{
                      prarm.loginType = 1;
                      prarm.mobile = this.phone2;
                      prarm.noteCode = this.code;
                      this.loginings(prarm)
                  }
              }  
          } else {
              return false;
          }
      },
      loginings(prarm){
          this.updateLoading(true);
          API.login(prarm)
          .then(res => {
              this.logining = true;
              this.updateLoading(false);
              if (res.success) {
                  this.setUser(res.data);
                  window.sessionStorage.setItem('user',JSON.stringify(res.data))
                  if(JSON.stringify(this.$route.query) != '{}'){
                      this.$router.push({
                         path: '/'+this.$route.query.path,
                         query:{
                            id:this.$route.query.id
                         }
                      });
                  }else{
                      this.$router.push({
                         path: '/index' 
                      });
                  }   
              }else if(res.code == -1) {
                  this.getAlert(res.msg)
              }else{
                  //this.getAlert('服务器出错了，请稍后再试')
              }
          })
          .catch(error => {
              // this.getAlert('服务器出错了，请稍后再试')
          });
      },
      forget(){
          if(JSON.stringify(this.$route.query) != '{}'){
              this.$router.push({
                 path: '/forgetPwd',
                 query:this.$route.query
              });
          }else{
              this.$router.push({
                  path:'/forgetPwd'
              })
          }
      },
      delect(){
          this.psw = '';
      },
      changeType(){
          this.changeTypeFlag = !this.changeTypeFlag;
      },
    },
    created(){
        this.from = this.$route.query;
    }
  }

</script>
<style type="text/css">
  
</style>
<style lang="scss" scoped>
    #login{
        width:100%;
        height:100%;
        font-size:28px;
        background-color:#fff;
        padding-top:80px;
        box-sizing:border-box;
        .login-con{
            padding:0 80px;
            margin-top:-50px;
            .title {
                padding-top:25px;
                height:144px;
                position: relative;
                span{
                    position: absolute;
                    top:0;
                    display:block;
                    width:50%;
                    line-height:144px;
                    text-align:center;
                    color:#333;
                    &:after{
                      content:'';
                      position: absolute;
                      left:50%;
                      margin-left:-37px;
                      top:96px;
                      width:75px;
                      height:3px;
                      background-color:transparent;
                    }
                }
                span:nth-of-type(1){
                  left:0;
                }
                span:nth-of-type(2){
                  right:0;
                }
                .active{
                    &:after{
                        background-color:#1c7cff;
                    }
                }
            }
            .item{
                width:100%;
                p{
                    position: relative;
                    &:after{
                        content:'';
                        position: absolute;
                        left:0;
                        right:0;
                        bottom:0;
                        width:100%;
                        height:1px;
                        background-color:#d3d3d3;
                    }
                    input{
                        padding:29px 0;
                        line-height:60px;
                        color:#666;
                        font-size:30px;
                        position: relative;

                    }
                    .delect{
                        position: absolute;
                        right:72px;
                        bottom:40px;
                        width:28px;
                        height:28px;
                        background:url('http://zhujiaapp.oss-cn-hangzhou.aliyuncs.com/img/login-del.png') no-repeat center;
                    }
                    .eyes{
                        position: absolute;
                        right:2px;
                        bottom:46px;
                        width:41px;
                        height:17px;
                        background:url('http://zhujiaapp.oss-cn-hangzhou.aliyuncs.com/img/login_eye_close.png') no-repeat center;
                    }
                    .activeeyes{
                        width:39px;
                        height:21px;
                        background:url('http://zhujiaapp.oss-cn-hangzhou.aliyuncs.com/img/login_eye_open.png') no-repeat center;
                    }
                    .code{
                        position: absolute;
                        right:0;
                        top:0;
                        line-height:98px;
                        padding-left:20px;
                        color:#4697fb;
                        &:after{
                            content:'';
                            position: absolute;
                            left:0;
                            top:40px;
                            width:1px;
                            height:30px;
                            background-color:#d3d3d3;
                        }
                    }
                    .color{
                      color:#999;
                    }
                }     
            }
            .foot{
              padding-top:40px;
              text-align:center;
                .btn1{
                    width:100%;
                    line-height:100px;
                    color:#fff;
                    font-size:34px;
                    background-color:#1c7cff;
                    border-radius:10px;
                }
                span{
                    display:block;
                    line-height:50px;
                    text-align:right;
                    color:#ff5751;
                    font-size:22px;
                    margin-left:74%;
                    margin-top:16px;
                }
            }
        }
    }
</style>