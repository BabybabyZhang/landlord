<template>
    <div id="money">
        <div class="head">
            <p>累计收租</p>
            <h3>￥8888.00</h3>
        </div>
        <div class="set-con">
            <div class="item">
                <p @click="bank"><i></i><span>银行卡管理</span><b>可进行所有银行卡操作</b></p>
                <p @click="checkOrder"><i></i><span>账单</span><b>可查看相关收还款记录</b></p>
            </div>
        </div>
    </div>
</template>

<script>
import API from '@/api/index';
import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'
var routers = [];
export default {
    name:'money',
    data() {
        return {
            
        };
    },
    computed:{
		...mapState([
			'imgurl',
			'user',
			'isLoading',
		]),
		...mapGetters([
	      	
	    ])
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
        checkOrder(){
            this.$router.push({ path: '/bill' });
        },
        bank(){
            this.$router.push({ path: '/bankList' });
        }
    },
    created(){
        
    }
  }

</script>

<style lang="scss" scoped>
    #money{
        width:100%;
        height:100%;
        padding-top:80px;
        font-size:28px;
        background-color:#fff;
        box-sizing:border-box;
        .head{
            height:286px;
            background-color:#0f98fd;
            padding-left:30px;
            color:#fff;
            overflow:hidden;
            p{
                margin-top:130px;
                font-size:32px;
            }
            h3{
                font-size:44px;
                line-height:120px;
            }
        }
        .set-con{
            padding:0 30px;
            .item{
                padding-top:20px;
                width:100%;
                p{
                    height:160px;
                    position: relative;
                    text-indent:70px;
                    &:after{
                        content:'';
                        position: absolute;
                        left:70px;
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
                        bottom:73px;
                        width:14px;
                        height:25px;
                        background:url('http://zhujiaapp.oss-cn-hangzhou.aliyuncs.com/img/user-arrow.png') no-repeat center;
                    }
                    span{
                        display:block;
                        line-height:128px;
                        font-size:30px;
                    }
                    b{
                        position: absolute;
                        left:0px;
                        bottom:30px;
                        color:#666;
                        font-size:22px;
                        font-weight:100;
                    }
                }
                p:nth-of-type(1){
                    i{
                        position: absolute;
                        left:0;
                        top:50px;
                        width:34px;
                        height:26px;
                        background:url('../assets/img/bank-icon@2x.png') no-repeat center;
                    }
                }
                p:nth-of-type(2){
                    i{
                        position: absolute;
                        left:0;
                        top:50px;
                        width:33px;
                        height:34px;
                        background:url('../assets/img/check-icon@2x.png') no-repeat center;
                    }
                }     
            }
        }
    }
</style>