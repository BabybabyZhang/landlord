<template>
	<div id="app">
		<div class="app-header">
			<HouseTitle :pathObj="obj" ></HouseTitle>
		</div>
		<transition>
      		<!--<router-view></router-view>-->
      		<router-view v-wechat-title="$route.meta.title"></router-view> 
      	</transition>
      	
	    <div class="t-alert" v-show="tAlert.show" @touchmove.stop.prevent>
	        <div class="t-mask"></div>
	        <div></div>
	        <div class="t-dialog">
	            <div class="t-dialog-hd">提示</div>
	            <div class="t-dialog-bd">{{ tAlert.content }}</div>
	            <div class="t-dialog-ft">
	                <div class="cancel" @click="onCancel" v-show="tAlert.cancel">取消</div>
	                <div @click="onSure">确定</div>
	            </div>
	        </div>
	        <div></div>
	    </div>
	    <loading v-model="isLoading"></loading>
	</div>
</template>

<script>
import HouseTitle from '@/common/Header.vue'
import { Loading } from 'vux'
import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
export default {
  	name: 'app',
  	components:{
        Loading,
        HouseTitle 
    },
    computed:{
        ...mapState([
            'isLoading',
            'tAlert',
            
        ])
    },
  	data(){
  		return {
  			obj:''
  		}
  	},
	methods:{
		...mapActions([
	        'onSure',
	        'onCancel',
	        'TAlert'
      	]),
      	...mapMutations([
	        'updateLoading',
	        
	    ]),
	},
	created(){
		this.obj = this.$router.history.current;
    },
    mounted(){
    	//console.log(this.$router)
    },
  	watch:{
	    $route(to,from){
	    	this.obj = to;
	    	//console.log(to)
	    }
 	},
 	beforerouterLeave(){
 		//console.log(to)
 	},
 	beforeRouteEnter(to, from, next){
	    //console.log(to)
	}
}
</script>
<style>
	.weui-toast{
		width: 10.6em!important;
	    min-height: 10.6em!important;
	    top: 50%!important;
	}
	.weui-toast p{
		font-size:26px;
	}
	.weui-mask_transparent{
		z-index:9999999!important;
		background:rgba(0,0,0,.3);
	}
	.vux-loading .weui-toast{
		z-index:10000000!important;
	}
    .weui-icon_toast.weui-loading{
        margin:40px 0 0!important;
    }
</style>
<style lang="scss">
#app {
	height:100%;
	width: 100%;
}
.app-header {
	// height:120px;
	height:80px;
	position:fixed;
	left:0;
	top:0;
	right:0;
	z-index:9999;
}
.t-alert {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    min-width: 320px;
    max-width: 750px;
    margin:0 auto;
    width: 100%;
    height: 100%;
    display: -moz-box;
    display: -webkit-box;
    display: box;               
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    z-index: 9999999999999;
}
.t-alert div {
    -moz-box-flex:1;
    -webkit-box-flex:1;
    flex: 1;
    -webkit-flex:1;
}
.t-alert .t-mask {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0,0,0,.5);
}

.t-alert .t-dialog {
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    -webkit-transform: translate(-50%,-50%);
    width:30rem;
    text-align: center;
    background: #fff;
    border-radius: 8px;
}
.t-alert .t-dialog >div:nth-child(1) {
    padding: 1.5em 1.6em 1em;
    font-size:28px;
}

.t-alert .t-dialog >div:nth-child(2) {
    font-size: 24px;
    padding: 0 1.6em 2em;
    line-height: 2;
    word-wrap: break-word;
    word-break: break-all;
    color: #999999;
}

.t-alert .t-dialog .t-dialog-ft {
    border-top: 1px solid #ccc;
    font-size: 24px;
    line-height: 70px;
    color: #3da3ff;
    display: -moz-box;
    display: -webkit-box;
    display: box;               
    display: flex;
    display: -webkit-flex;
}

.t-alert .t-dialog .t-dialog-ft div {
    -moz-box-flex:1;
    -webkit-box-flex:1;
    flex: 1;
    -webkit-flex:1;
}
.t-alert .t-dialog .t-dialog-ft .cancel {
    color: #666;
    border-right: 1px solid #ccc;
}
.t-dialog-bd{
	overflow:hidden; 
	text-overflow:ellipsis;
	display:-webkit-box; 
	-webkit-box-orient:vertical;
	-webkit-line-clamp:3; 
}

</style>
