<template>
    <div id="set">
        <div class="set-con">
            <div class="item">
                <p @click="goAcount">账号管理</p>
            </div>
            <div class="foot">
                <button class="btn1" @click="registInfo">退出登录</button>
            </div>
        </div>
    </div>
</template>

<script>
import API from '@/api/index';
import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'
var routers = [];
export default {
    name:'set',
    data() {
        return {
            
        };
    },
    computed:{
        ...mapState([
            'user',
        ]),
    },
    methods: {
        ...mapMutations([
            'setUser'
        ]),
        ...mapActions([
            'onSure',
            'onCancel',
            'TAlert',
        ]),
        goAcount(){
            this.$router.push({ path: '/acount' });
        },
        registInfo(){
            window.sessionStorage.removeItem('user')
            this.setUser(null)
            this.$router.replace({ path: '/index' });
        }
    },
    created(){
        
    }
  }

</script>

<style lang="scss" scoped>
    #set{
        width:100%;
        height:100%;
        padding-top:80px;
        font-size:28px;
        background-color:#fff;
        box-sizing:border-box;
        .set-con{
            padding:0 30px;
            .item{
                line-height:120px;
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
                    &:before{
                        content:'';
                        position: absolute;
                        right:0;
                        bottom:50px;
                        width:14px;
                        height:25px;
                        background:url('http://zhujiaapp.oss-cn-hangzhou.aliyuncs.com/img/user-arrow.png') no-repeat center;
                    }
                }     
            }
            .foot{
              position: fixed;
              left:30px;
              right:30px;
              bottom:30px;
              text-align:center;
                .btn1{
                    width:100%;
                    line-height:100px;
                    color:#fff;
                    font-size:34px;
                    background-color:#ff4e48;
                    border-radius:10px;
                }
            }
        }
    }
</style>