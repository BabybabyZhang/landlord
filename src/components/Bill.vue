<template>
	<div id="app" style="margin-top:80px">
		<div class="bill_nav">
			<p>2018年4月</p>
			<div>
				<label>收款&nbsp;￥<span>{{Receivables}}</span></label>
				<label>还款&nbsp;￥<span>{{repayment}}</span></label>
			</div>
		</div>
		<div class="bill_content" v-for="(items,index) in item" :key=index >
			<!--<div :style="{background:'url(https://cn.vuejs.org/images/logo.png)'}" ></div>-->
			<div :style="{background:'url('+ items.img +') no-repeat',backgroundSize:'100% 100%'}" class="bill_content_img" ></div>
			<div>
				<span class="xq_name">{{items.text1}}</span>
				<em class="date_month">{{items.text2}}</em>
				<span class="cz_name">承租人：{{items.text3}}</span>
				<span class="date">{{items.text4}}</span>
				<span class="money">{{items.text5}}</span>
			</div>
			<!--<div>{{item}}</div>-->
		</div>
	</div>
</template>






<script>
//import { Cell, CellBox, CellFormPreview, Group, Badge } from 'vux'
import base from '../utils/index'
import API from '../api'
export default {
	name: 'Bill',
	data() {
		return {
			Receivables:base.fixed(24232342),
			repayment:base.fixed(34534),
			item:[
				{
					img:'https://www.baidu.com/img/bd_logo1.png',
					text1:'大关小区6zhuang6',
					text2:'3三月租房',
					text3:'张三',
					text4:'04-12 25:L22:22',
					text5:'+123456'
				},{
					img:'https://www.baidu.com/img/bd_logo1.png',
					text1:'大关小区6zhuang6',
					text2:'3三月租房',
					text3:'张三',
					text4:'04-12 25:L22:22',
					text5:'+123456'
				},{
					img:'https://www.baidu.com/img/bd_logo1.png',
					text1:'大关小区6zhuang6',
					text2:'3三月租房',
					text3:'张三',
					text4:'04-12 25:L22:22',
					text5:'+'+base.fixed(132),
				}
			]
		};
		
	},
   
//	computed:{
//		
//	},
//	beforeCreate(){
//		API.BillList(obj).then( res=> {
//			console.log(res);
//		})
//		.catch( error=> {
//			console.log(error)
//		})
//	},
//	created() {
//
//	},
//	methods: {
//		
//	},
//	mounted(){
//      
//  },
//  beforeRouterLeave(to, from, next){
// 		
// 	},
//	watch:{
//	    
// 	}
 
}
</script>

<style scoped lang="less">
    .bill_nav{
   	    width:100%;
   	    height:145px;
   	    background-color: #f3f3f3;
   	    p{
   	    	font-size: 32px;
   	    	padding-top: 40px;
   	    	padding-left: 25px;
   	    	color: #333333;
   	    }
   	    div{
   	    	padding-left: 25px;
   	    	margin-top: 20px;
   	    	label{
   	    		font-size:28px;
   	    		color:#999999;
   	    		padding-right: 30px;
   	    		span{
   	    			
   	    		}
   	    	}
   	    }
    } 
    #app{
		background-color: #fff !important;
    }
    .bill_content{
    	height: 170px;
    	width: 95%;
    	margin: 0 auto;
    	.bill_content_img{
    		border-radius: 50%;
    		width: 80px;
    		height: 80px;
    		display: block;
    		margin-top:45px;
    		float:left;
    	}
    	div{
    		.xq_name{
    			font-size:28px;
    			color:#333;
    			display:inline-block;
    			padding-top: 55px;
    			padding-left:20px;
    		}
    		.date_month{
    			color:#999;
    			font-size:26px;
    			display: block;
    			float:right;
    			padding-top: 60px;
    		}
    		.cz_name{
    			font-size:26px;
    			color:#999;
    			display:block;
    			padding-left:100px;
    			padding-top:15px;
    		}
    		.date{
    			font-size:26px;
    			color:#999;
    			display:block;
    			padding-left:100px;
    			padding-top:15px;
    			padding-bottom: 15px;
    			border-bottom:1px solid #e7e7e6 ;
    		}
    		.money{
    			font-size:30px;
    			color:#ff8042;
    			display:block;
    			padding-left:100px;
    			padding-top:15px;
    			float:right;
			    margin-top: -65px;
    		}
    	}
    }
</style>