<template>
    <div id="set">
        <div class="set-con">
            <div class="item">
                <p>手机号<span>{{user.account}}</span></p>
                <p @click="setPwd">修改密码</p>
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
        setPwd(){
            this.$router.push({ path: '/setPwd' });
        },
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
                    span{
                        display:inline-block;
                        float:right;
                    }
                }
                p:nth-of-type(2){
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
        }
    }
</style>