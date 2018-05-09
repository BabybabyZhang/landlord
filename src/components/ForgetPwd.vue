<template>
    <div id="login">
        <div class="head">
            <img :src="imgurl+'login-pic.png'" />
        </div>
        <div class="login-con">
            <div>
                <div class="item">
                    <p><input type="text" v-model="phone" placeholder="请输入手机号码" /><i class="code" :class="{color:colorActive}" @click="getCode">{{msg}}</i></p>
                    <p><input type="text" v-model="code" placeholder="请输入验证码" /></p>
                    <p><input :type="changeTypeFlag1?'password':'text'" v-model="psw1"  placeholder="请输入6-12位新密码" /><i class="delect" @click="delect(1)"></i><i class="eyes" @click="changeType(1)" :class="{activeeyes:!changeTypeFlag1}"></i></p>
                    <p><input :type="changeTypeFlag2?'password':'text'" v-model="psw2"  placeholder="请重新输入密码" /><i class="delect" @click="delect(2)"></i><i class="eyes" @click="changeType(2)" :class="{activeeyes:!changeTypeFlag2}"></i></p>
                </div>
            </div>
            <div class="foot">
                <span @click="gologin">已有账户，请登陆</span>
                <button class="btn1" @click="registInfo">确认</button>
            </div>
        </div>
    </div>
</template>

<script>
import API from '@/api/index';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import MenuUtils from '@/utils/MenuUtils'
import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'
var routers = [];
export default {
    name:'login',
    data() {
      return {
        logining: true,
        phone:'',
        code:'',
        psw1:'',
        psw2:'',
        colorActive:false,
        decrease:null,
        msg:'获取验证码',
        changeTypeFlag1:true,
        changeTypeFlag2:true,
        getCodeFlag:true,
      };
    },
    computed:{
      ...mapState([
        'user',
        'headHeight',
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
      valiteInfo(){
          let reg = /^1[3|4|5|7|8|9][0-9]{9}$/;
          let flag = true;
          let str = '';
          if(this.phone == ''){
              flag = false;
              str = '手机号不能为空';
              this.getAlert(str)
              return flag;
          }else if(this.code == ''){
              flag = false;
              str = '验证码不能为空';
              this.getAlert(str)
              return flag;
          }else if(this.psw1 == ''){
              flag = false;
              str = '密码不能为空';
              this.getAlert(str)
              return flag;
          }
          if(!reg.test(this.phone)){
              flag = false;
              str = '手机号的格式不正确';
              this.getAlert(str)
              return flag;
          }
          if(!/^\d{4}$/.test(this.code)){
              flag = false;
              str = '验证码的格式不正确';
              this.getAlert(str)
              return flag;
          }
          if(!/^\w{6,12}$/.test(this.psw1)){
              flag = false;
              str ='密码的格式不正确';
              this.getAlert(str)
              return flag;
          }
          if(this.psw1 != this.psw2){
              flag = false;
              str ='请重新确认两次输入的密码';
              this.getAlert(str)
              return flag;
          }
          return flag;
      },
      getAlert(str){
          this.TAlert({
              show: true,
              content: str,
              cancel: false,
              onSure: function (){}
          })
      },
      registInfo(){
          let _this = this;
          if(this.valiteInfo()){
              let prarm = {
                  mobile:this.phone,
                  password:this.psw1,
                  noteCode:this.code,
              };
              if(this.logining){
                  this.logining = false;
                  this.updateLoading(true);
                  NProgress.start();
                  API.forgetPwd(prarm).then(res => {
                      this.logining = true;
                      NProgress.done();
                      this.updateLoading(false);
                      if (res.success) {
                          if(JSON.stringify(this.$route.query) != '{}'){
                              this.$router.push({
                                 path: '/login',
                                 query:this.$route.query
                              });
                          }else{
                              this.$router.push({
                                  path:'/login'
                              })
                          }  
                      }else if(res.code == -1) {
                          this.getAlert(res.msg)
                      }else{
                         this.getAlert('服务器出错了，请稍后再试') 
                      }
                  }).catch(error => {
                      this.getAlert('服务器出错了，请稍后再试') 
                  })
              }else{
                  this.getAlert('请稍后再试')
              } 
          }else {
              console.log('error submit!!');
              return false;
          }
      },
      sendCode(){
          let obj = {
              mobile:this.phone,
              noteType:2,
          };
          API.code(obj).then(res => {
              /*this.logining = false;*/
              /*NProgress.done();*/
              
              if (res.success) {
                  this.colorActive = true;
                  let a = 60;
                  let that = this;
                  this.decrease = setInterval(function(){
                      that.msg = "重新获取 ("+a+") ";
                      a--;
                      if(a==-1){
                          that.getCodeFlag = true;
                          clearInterval(that.decrease)
                          that.colorActive = false;
                          that.msg = '获取验证码';
                      }
                  },1000)
              } else if(res.code == -1) {
                  this.getAlert(res.msg)
              }else{
                  this.getAlert('服务器出错了，请稍后再试') 
              }
          }).catch(error => {
              this.getAlert('服务器出错了，请稍后再试')
          });
      },
      getCode(){
          let reg = /^1[3|4|5|7|8|9][0-9]{9}$/;
          let str = '';
          if(this.phone == ''){
              str = '手机号不能为空';
              this.getAlert(str)
              return;
          }
          if(!reg.test(this.phone)){
              str = '手机号的格式不正确';
              this.getAlert(str)
              return;
          }
          if(this.getCodeFlag){
              this.getCodeFlag = false;
              this.isRegist()
          }
          
      },
      regists(data){
        window.sessionStorage.setItem('user',JSON.stringify(data))
      },
      isRegist(){
          API.isRegister({mobile:this.phone}).then(res => {
            if (res.success) {
                if(JSON.stringify(this.$route.query) != '{}'){
                    this.$router.push({
                       path: '/regist',
                       query:this.$route.query
                    });
                }else{
                    this.$router.push({
                        path:'/regist'
                    })
                }   
            }else {
                this.sendCode()
            }
        }).catch(error => {
          console.log(error)
        })
      },
      handleSubmit2(ev) {
          var _this = this;
          if (this.valiteInfo()) {
              this.logining = true;
              NProgress.start();
              let prarm = {
                  phone:this.phone,
                  code:this.code,
                  psw:this.psw,
              }
              API.requestLogin(prarm).then(res => {
                  this.logining = false;
                  NProgress.done();
                  if (res.code !== 1000000) { 
                      this.getAlert(res.msg)
                  } else {
                      this.regist()
                      this.$router.push({ path: '/main' });
                  }
              });
          } else {
              console.log('error submit!!');
              return false;
          }
      },
      delect(type){
        if(type == 1){
          this.psw1 = '';
        }else{
          this.psw2 = '';
        }
      },
      changeType(type){
        if(type == 1){
          this.changeTypeFlag1 = !this.changeTypeFlag1;
        }else{
          this.changeTypeFlag2 = !this.changeTypeFlag2;
        }
      },
      gologin(){
          this.$router.push({ path: '/login' });
      }
    },
    created(){
      
    }
  }

</script>

<style lang="scss" scoped>
    #login{
        width:100%;
        height:100%;
        padding-top:80px;
        font-size:28px;
        background-color:#fff;
        box-sizing:border-box;
        .login-con{
            padding:0 80px;
            padding-top:50px;
            margin-top:-70px;
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
                        line-height:40px;
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
              padding-top:90px;
              text-align:center;
              position: relative;
                .btn1{
                    width:100%;
                    line-height:100px;
                    color:#fff;
                    font-size:34px;
                    background-color:#1c7cff;
                    border-radius:10px;
                }
                .btn2{
                    width:198px;
                    line-height:60px;
                    color:#666;
                    font-size:34px;
                    border:1px solid #7e818b;
                    border-radius:60px;
                }
                span{
                    display:block;
                    position: absolute;
                    left:50%;
                    top:10px;
                    margin-left:-100px;
                    line-height:44px;
                    text-align:center;
                    color:#4697fb;
                    font-size:22px;
                }
            }
        }
    }
</style>