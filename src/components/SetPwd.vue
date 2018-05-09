<template>
    <div id="login">
        <div class="head">
            <img :src="imgurl+'login-pic.png'" />
        </div>
        <div class="login-con">
            <div>
                <div class="item">
                    <p><input type="text" v-model="user.account" placeholder="请输入手机号码" readonly /></p>
                    <p><input :type="changeTypeFlag1?'password':'text'" v-model="psw1" placeholder="请输入旧密码"  /><i class="delect" @click="delect(1)"></i><i class="eyes" @click="changeType(1)" :class="{activeeyes:!changeTypeFlag1}"></i></p>
                    <p><input :type="changeTypeFlag2?'password':'text'" v-model="psw2"  placeholder="请输入新密码" /><i class="delect" @click="delect(2)"></i><i class="eyes" @click="changeType(2)" :class="{activeeyes:!changeTypeFlag2}"></i></p>
                </div>
            </div>
            <div class="foot">
                <button class="btn1" @click="registInfo">确认</button>
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
    name:'setPwd',
    data() {
      return {
        logining: true,
        psw1:'',
        psw2:'',
        colorActive:false,
        decrease:null,
        msg:'获取验证码',
        changeTypeFlag1:true,
        changeTypeFlag2:true,
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
      valiteInfo(){
          let reg = /^1[3|4|5|7|8|9][0-9]{9}$/;
          let flag = true;
          let str = '';
          if(this.psw1 == ''){
              flag = false;
              str = '旧密码不能为空';
              this.getAlert(str)
              return flag;
          }else if(this.psw2 == ''){
              flag = false;
              str = '新密码不能为空';
              this.getAlert(str)
              return flag;
          }
          if(!/^\w{6,12}$/.test(this.psw1)){
              flag = false;
              str ='旧密码的格式不正确';
              this.getAlert(str)
              return flag;
          }
          if(!/^\w{6,12}$/.test(this.psw2)){
              flag = false;
              str ='新密码的格式不正确';
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
                  mobile:this.user.account,
                  oldPwd:this.psw1,
                  password:this.psw2,
              };
              if(this.logining){
                  this.logining = false;
                  NProgress.start();
                  this.updateLoading(true);
                  API.setPwd(prarm).then(res => {
                      this.updateLoading(false);
                      this.logining = true;
                      NProgress.done();
                      if (res.success) {
                          this.$router.push({
                              path:'/login'
                          }) 
                      }else if(res.code == -1){
                          this.getAlert(res.msg)
                      }else {
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
            margin-top:-50px;
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
            }
        }
    }
</style>