<template>
	<div style="margin-top: 80px;">
		<tab v-model="index01" prevent-default @on-before-index-change="switchTabItem" custom-bar-width="60px" :scroll-threshold="5">
			<tab-item selected>待签约</tab-item>
			<tab-item>出租中</tab-item>
			<tab-item>退租</tab-item>
			<tab-item>已完成</tab-item>
			<tab-item>已关闭</tab-item>
		</tab>
		<scroller lock-x height="-100" use-pullup :pullup-config="pullupDefaultConfig" @on-pullup-loading="onScrollBottom" ref="scrollerBottom" >
		<div class="ren_order_list">
			<ul>
				<li v-for="(items,index) in item" :key=index @click="gotodetail(items.id,items.showtext,items.communityName,items.houseName ,items.name,items.startDate ,items.endDate ,items.contractSubmitDate ,items.houseId ,items.id)">
					<div class="ren_order_list_top">
						<img src="../assets/img/actor.png" />
						<span class="name">{{items.name}}</span>
						<span class="ysm">已实名</span>
						<span class="ren_order_list_top_top">{{items.showtext}}</span>
					</div>
					<div class="ren_order_list_content">
						<img :src="items.houseFilePath" />
						<span class="ren_order_qxname">{{items.communityName}}</span>
						<span class="ren_rder_sname">{{items.houseName}}&nbsp;&nbsp;{{items.area}}m<sup>2</sup></span>
						<span class="ren_order_zf" v-if="items.rentType === 1" >支付方式&nbsp;<em>月付</em></span>
						<span class="ren_order_zf" v-else-if="items.rentType === 2" >支付方式&nbsp;<em>季付</em></span>
						<span class="ren_order_zf" v-else >支付方式&nbsp;<em>年付</em></span>
						<span class="ren_order_zj">租金&nbsp;<em>￥&nbsp;{{items.monthPrice}}</em></span>
						
					</div>
					<div v-if="index01 === 0" class="ren_order_list_foot">
						<span @click="doagree(items.id,4)">拒绝</span>
						<span @click="doagree(items.id,3)" class="ren_order_btn_active">签约</span>
					</div>
					<div v-else-if="index01 === 1" class="ren_order_list_foot">
						<span class="ren_order_btn_active" style="float:right;margin-right:8%;" @click="tolink(items.id)">出租账单</span>
					</div>
					<div v-else-if="index01 === 2" class="ren_order_list_foot">
						<span @click="doagree(items.id,2)">拒绝</span>
						<span @click="doagree(items.id,1)" class="ren_order_btn_active">同意</span>
					</div>
				</li>
			</ul>
		</div>
		<divider v-show="isshow">我是有底线的</divider>
	</scroller>
	
	</div>
</template>

<script>
	import { Tab, TabItem, Scroller,Divider  } from 'vux'
	import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
	import API from '@/api/index'
	import Vue from 'vue'
	export default {
		name: 'RentingOrder',
		components: {
			Tab,
			TabItem,
			Scroller,
	  		Divider 
		},
		data() {
			return {
				index01: 0,
				pageNum:1,
				datalength:true,
			    isshow:false,
			    pullupDefaultConfig: {
			      	content: '上拉加载更多',
				    pullUpHeight: 60,
				    height: 80,
				    autoRefresh: false,
				    downContent: '释放后加载',
				    upContent: '上拉加载更多',
				    loadingContent: '加载中...',
				    clsPrefix: 'xs-plugin-pullup-'
			    },
				item: []
			}
		},
		mounted () {
	    	this.$nextTick(() => {
		      	this.$refs.scrollerBottom.reset({top: 0})
		    })
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
			switchTabItem(index) {
				this.item = [];
		        this.index01 = index;
		        this.datalength = true;
		        this.pageNum = 1;
		        this.ajax();
			},
			onScrollBottom () {
		    	if( this.datalength ){
		    		this.pageNum ++ ;
		        	this.ajax();
		    	}else{
		    		
		    	};
		    },
		    doagree(id,type){
		    	let str = '';
		    	if( type == 1 ){
		    		str = '确定退租吗？'
		    	}else if( type == 2 ){
		    		str = '确定拒绝退租吗？';
		    	}else if( type == 3 ){
		    		str = '确定签约吗？';
		    	}else if( type == 4 ){
		    		str = '确定拒绝签约吗？';
		    	};
		    	this.getAlert(id,type,str);
		    },
		    getAlert(id,type,str){
		    	let _this = this;
		        this.TAlert({
		            show: true,
		            content: str,
		            cancel: false,
		            onSure: function (){
		            	_this.updateLoading(true);
		            	if( type == 1 || type == 2 ){
					    	let obj = {
					    		contractRentId:id,
					    		status :type
					    	};
					    	API.backRentAffirm(obj).then(res => {
					    		console.log(res);
					    		if( res.success == true ){
					    			_this.TAlert({
					    				show: true,
							            content: type == 1 ? '退租成功':'拒绝退租成功',
							            cancel: false,
							            onSure:function(){
							            	_this.$router.push({
									             path: '/rentingorder', 
									            name: 'rentingorder',
									        })
							            }
					    			})
					    		}else{
					    			_this.TAlert({
					    				show: true,
							            content: type == 1 ? '退租失败':'拒绝退租失败',
							            cancel: false,
							            onSure:function(){
							            	_this.$router.push({
									             path: '/rentingorder', 
									            name: 'rentingorder',
									        })
							            }
					    			})
					    		}
					    		_this.updateLoading(false);
					    	})
					    	.catch( error => {
					    		console.log(error);
					    		_this.updateLoading(false);
					    	})
		            	}else if( type == 3 || type == 4 ){
					    	let obj = {
					    		id:id,
					    		type :type-2
					    	};
					    	API.leaseConfirm(obj).then(res => {
					    		console.log(res);
					    		if( res.success == true ){
					    			_this.TAlert({
					    				show: true,
							            content: type == 3 ? '签约成功':'拒绝签约成功',
							            cancel: false,
							            onSure:function(){
							            	_this.$router.push({
									             path: '/rentingorder', 
									            name: 'rentingorder',
									        })
							            }
					    			})
					    		}else{
					    			_this.TAlert({
					    				show: true,
							            content: type == 3 ? '签约失败':'拒签约失败',
							            cancel: false,
							            onSure:function(){
							            	_this.$router.push({
									             path: '/rentingorder', 
									            name: 'rentingorder',
									        })
							            }
					    			})
					    		}
					    		_this.updateLoading(false);
					    	})
					    	.catch( error => {
					    		console.log(error);
					    		_this.updateLoading(false);
					    	})
		            	}
		            }
		        })
		    },
		    tolink(id){
		    	this.$router.push({
		            path: '/rentalbill', 
		            name: 'RentalBill',
		            query: { 
		                id:id
		            }
		        })
		    },
		    gotodetail(id,showtext,communityName ,houseName,name,startDate,endDate,contractSubmitDate,houseId,detailid){
		    	this.$router.push({
		            path: '/orderdetails', 
		            name: 'OrderDetails',
		            query: { 
		                id:id,
		                type:this.index01,
		                showtext:showtext,
		                communityName :communityName ,
		                houseName:houseName,
		                name:name,
		                startDate:startDate,
		                endDate:endDate,
		                contractSubmitDate:contractSubmitDate,
		                houseId:houseId,
		                detailid:detailid
		            }
		        })
		    },
			ajax (){
		    	this.updateLoading(true);
		    	let _this = this;
		  	  	let obj = {
		  	  		landlordId:JSON.parse(window.sessionStorage.getItem('user')).id,
		  	  		type:_this.index01,
		  	  		pageNum:_this.pageNum
			  	};
				API.rentOrderList(obj).then( res=> {
					if( res.data != null ){
						res.data.forEach(function( e,i ){
							let showtext = '';
							if( _this.index01 == 0 ){
								showtext = '';
							}else if( _this.index01 == 1 ){
								showtext = '已签约';
							}else if( _this.index01 == 2 ){
								showtext = '申请退租';
							}else if( _this.index01 == 3 ){
								if( e.status == 9 ){
									showtext = '租赁到期';
								}else if( e.status == 12 ){
									showtext = '已退租';
								};
							}else if( _this.index01 == 4 ){
								if( e.status == 8 ){
									showtext = '拒绝签约';
								}else if( e.status == 7 ){
									showtext = '拒绝退租';
								};
							};
							e.showtext = showtext;
							_this.item.push(e);
						});
					};
					_this.updateLoading(false);
					if( res.data != null ){
						if( res.data.length == 20 ){
							_this.isshow = false;
							_this.$refs.scrollerBottom.reset();
							_this.$refs.scrollerBottom.donePullup()
						}else{
							_this.$refs.scrollerBottom.reset();
							_this.$refs.scrollerBottom.disablePullup();
							_this.isshow = true;
						};
					}else{
						_this.$refs.scrollerBottom.reset();
						_this.$refs.scrollerBottom.disablePullup();
						_this.isshow = true;
					};
				})
				.catch( error => {
					console.log(error);
					_this.updateLoading(false);
					_this.$refs.scrollerBottom.donePullup();
					_this.$refs.scrollerBottom.reset();
				})
		    }
			

		},
		
		created () {
		  	this.ajax();
	    }
	}
</script>

<style lang="less">
	@import '~vux/src/styles/1px.less';
	@import '~vux/src/styles/center.less';
	.ren_order_list {
		width: 100%;
		background: #fff;
		margin-top: 20px;
		ul {
			li {
				height: 370px;
			}
		}
	}
	
	.ren_order_btn_active {
		border: 1px solid #3288ff !important;
		color: #3288ff;
	}
	.xs-plugin-pullup-container{
		line-height: 80px;
		font-size: 23px;
		color:#666;
	}
	.vux-divider{
		font-size:23px;
		padding: 25px 0px !important;
		width:100%;
	}
	.vux-tab .vux-tab-item.vux-tab-selected {
		color: #3288ff !important;
		/*border-bottom: 3px solid #3288ff !important;*/
	}
	
	.vux-tab-bar-inner {
		background-color: #3288ff !important;
	}
	
	.ren_order_list_top {
		width: 90%;
		margin: 0 auto;
		height: 95px;
		img {
			width: 65px;
			height: 65px;
			display: block;
			float: left;
			margin-left: 10px;
			border-radius: 50%;
			margin-top: 15px;
		}
		.name {
			font-size: 23px;
			color: #333;
			padding-left: 20px;
			line-height: 95px;
			display: inline-block;
			float: left;
			padding-right: 15px;
		}
		.ysm {
			font-size: 20px;
			color: #333;
			padding: 8px 15px;
			display: inline-block;
			float: left;
			border-radius: 10px;
			background-color: #ff7a19;
			color: #fff;
			text-align: center;
			margin-top: 27px;
		}
		.ren_order_list_top_top {
			color: #ff7a19;
			font-size: 23px;
			float: right;
			display: inline-block;
			line-height: 95px;
		}
	}
	
	.ren_order_list_content {
		width: 77%;
		float: right;
		height: 165px;
		border-top: 1px solid #e5e5e5;
		border-bottom: 1px solid #e5e5e5;
		margin-right: 5%;
		clear: both;
		img {
			width: 160px;
			height: 120px;
			display: block;
			float: left;
			margin-top: 23px;
		}
		.ren_order_qxname {
			font-size: 30px;
			color: #333;
			padding-top: 23px;
			display:block;
			padding-left: 195px;
		}
		.ren_rder_sname {
			font-size: 24px;
			color: #666;
			padding-top: 15px;
			display: inline-block;
			padding-left: 35px;
		}
		.ren_order_zf {
			font-size: 24px;
			color: #666;
			padding-top: 15px;
			display: inline-block;
			padding-left: 35px;
			em {
				color: #ff7a19;
			}
		}
		.ren_order_zj {
			font-size: 24px;
			color: #666;
			padding-top: 15px;
			display: inline-block;
			padding-left: 35px;
			em {
				color: #ff7a19;
			}
		}
	}
	
	.ren_order_list_foot {
		height: 110px;
		float: right;
		width: 60%;
		span {
			width: 40%;
			float: left;
			border: 1px solid #e5e5e5;
			font-size: 28px;
			height: 50px;
			line-height: 50px;
			display: inline-block;
			border-radius: 5px;
			text-align: center;
			margin-left: 5%;
			margin-top: 30px;
		}
	}
	
	.vux-tab-wrap {
		padding-top: 80px !important;
	}
	
	.vux-tab-container {
		height: 80px !important;
	}
	
	.vux-tab {
		height: 80px !important;
	}
	
	.vux-tab .vux-tab-item {
		font-size: 28px !important;
		line-height: 80px !important;
	}
</style>