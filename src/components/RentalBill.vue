<template>
	<div style="margin-top:80px;" v-if="isshow === true">
		<card :header="{title:'出租期数'+hasAlsoNum+'/'+totalNum+''}">
	        <div slot="content" class="card-demo-flex card-demo-content01">
		        <div class="vux-1px-r">
		            <span>{{Receivables}}</span>
		            <br/>
		                        已付租金（元）
		        </div>
		        <div class="vux-1px-r">
		            <span>{{repayment}}</span>
		            <br/>
		                       租金总额（元）
		        </div>
	        </div>
	    </card>
	    <div class="ren_list" >
	    	<ul>
	    		<li v-for="(items,index) in item" :key=index >
	    			<label>第{{items.number}}期</label>
	    			<span class="ren_list_text1" v-if="items.accountDate ===null " >待支付</span>
	    			<span class="ren_list_text2" v-else>{{items.accountDate}}支付</span>
	    			<span class="ren_list_text3">+{{Number(items.amount).toFixed(2)}}</span>
	    		</li>
	    	</ul>
	    </div>
	</div>
	<div v-else>
		asd
	</div>
</template>

<script>
import Vue from 'vue'
import { Card } from 'vux'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import base from '../utils/index'
import API from '../api'
export default {
	name: 'RentalBill',
	components: {
	    Card
	},
	data() {
		return {
			isshow:false,
			Receivables:0,
			repayment:0,
			hasAlsoNum:0,
			totalNum :0,
			item:[]
		};
		
	},
	methods: {
		...mapMutations([
			'updateLoading'
		]),
		...mapActions([
			'onSure',
			'onCancel',
			'TAlert',
		]),
	ajax (){
    	this.updateLoading(true);
    	let _this = this;
  	  	let obj = {
  	  		id:_this.$route.query.id
	  	};
		API.statisticsBill(obj).then( res=> {
			if( res.success == true ){
				_this.hasAlsoNum = res.data.hasAlsoNum;
				_this.totalNum = res.data.totalNum;
				_this.Receivables = base.fixed(res.data.hasAlsoAmount);
				_this.repayment = base.fixed(res.data.yearAmount);
				_this.isshow=true;
			}
			
			_this.updateLoading(false);

		})
		.catch( error => {
			console.log(error);
			_this.updateLoading(false);
		});
		API.houseBillList(obj).then( res=> {
			
			if( res.list.length != 0 && res.success == true ){
				res.list.forEach(function(e,i){
					_this.item.push({
						number:e.number,
						accountDate:base.getTimes(e.accountDate,'minutes'),
						amount: e.amount
					})
				});
				_this.isshow=true;
			}
			_this.updateLoading(false);
		})
		.catch( error => {
			console.log(error);
			_this.updateLoading(false);
		});
		
   },
	//	   getAlert(str){
	//        this.TAlert({
	//            show: true,
	//            content: str,
	//            cancel: false,
	//            onSure: function (){}
	//        })
	//    },

	},
	
	created () {
	  	this.ajax();
   	},
}
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
	.weui-panel__hd{
		height:70px;
		font-size:26px !important;
		line-height: 70px;
		padding-top:10px !important;
		padding-left:20px !important;
		color:#ff643e !important;
	}
	.weui-panel__hd:after{
		border-bottom:none !important ;
	}
	.weui-panel__bd{
		height:120px;
	}
    .card-demo-flex {
	    display: flex;
	}
	.card-demo-content01 {
	    padding: 10px 0;
	}
	.card-padding {
	    padding: 15px;
	}
	.card-demo-flex > div {
	    flex: 1;
	    text-align: center;
	    font-size: 26px;
	}
	.card-demo-flex span {
	    color: #f74c31;
	    display:block;
	}
	.weui-panel{
		margin-top:20px !important;
	}
	.ren_list{
		margin-top:20px;
		border-bottom: 1px solid #e5e5e5;
		border-top: 1px solid #e5e5e5;
		background: #fff;
		ul{
			li{
				height:120px;
				width:95%;
				border-bottom:1px solid #e5e5e5;
				margin:0 auto;
				label{
					font-size:28px;
					color:#333;
					padding-top:25px;
					display:block;
				}
				.ren_list_text1{
					color:#ff8b74;
					font-size:28px;
					padding-top:20px;
					display:inline-block;
					float:left;
				}
				.ren_list_text2{
					color:#999;
					font-size:28px;
					padding-top:20px;
					display:inline-block;
					float:left;
				}
				.ren_list_text3{
					color:#333;
					font-size:30px;
					padding-top:20px;
					display:inline-block;
					float:right;
				}
			}
		}
	}
</style>