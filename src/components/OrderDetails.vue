<template>
	<div style="margin-top:100px;">
		<div class="order_content">
			<ul>
				<li>
					<span class="order_fl" >租赁信息</span>
					<span class="order_fr" style="color:#ff9872"  >{{data.showtext}}</span>
				</li>
				<li>
					<span class="order_fl">房屋地址</span>
					<span class="order_fr">{{data.communityName}}{{data.houseName}}</span>
				</li>
				<li>
					<span class="order_fl">承租人</span>
					<span class="order_fr">{{data.name}}</span>
				</li>
				<li>
					<span class="order_fl">承租周期</span>
					<span class="order_fr">{{data.startDate}}-{{data.endDate}}</span>
				</li>
				<li>
					<span class="order_fl">提交日期</span>
					<span class="order_fr">{{data.contractSubmitDate}}</span>
				</li>
			</ul>
		</div>
		<div>
			<Group>
	   			<cell class="sub_item" title="房源详情"  @cell-font-size="12" :link="{path:'/housedetail',name: 'housedetail',query:{resourceId:data.houseId}}" ></cell>
			</Group>
			
			<Group v-if="data.type != 0">
	   			<cell class="sub_item" title="出租账单" :link="{path:'/rentalbill',name: 'RentalBill',query:{id:data.id}}" ></cell>
			</Group>
		</div>
		
		<flexbox class="order_button_content" v-show=" data.type === 2  ">
      		<flexbox-item><div class="order_qx order_button" @click="doagree(data.detailid,2)">拒绝</div></flexbox-item>
      		<flexbox-item><div class="order_qr order_button" @click="doagree(data.detailid,1)" >同意</div></flexbox-item>
    	</flexbox>
		<flexbox class="order_button_content" v-show=" data.type === 0 ">
			<flexbox-item><div class="order_qx order_button"  @click="doagree(data.detailid,4)" >拒绝</div></flexbox-item>
			<flexbox-item><div class="order_qr order_button" @click="doagree(data.detailid,3)" >签约</div></flexbox-item>
		</flexbox>
	</div>
</template>

<script>
	import { Cell, Group ,Flexbox, FlexboxItem,} from 'vux'
	import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
	import base from '../utils/index'
	import API from '../api'
	export default {
		name: 'OrderDetails',
	    components: {
	    	Group,
	    	Cell,
	    	Flexbox,
    		FlexboxItem,
	    },
	    data () {
	    	return{
	    		
	    		data:{},
	    	}
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
			viewdom(){
				this.data = this.$route.query;
				console.log(this.$route.query);
				let start = this.$route.query.startDate;
				let end = this.$route.query.endDate;
				let cc = this.$route.query.contractSubmitDate;
				this.data.startDate = base.getTimes(Number(start),'days');
				this.data.endDate = base.getTimes(Number(end),'days');
				this.data.contractSubmitDate = base.getTimes(Number(cc),'days');
				this.data.type = Number(this.data.type);
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
		    	console.log(id);
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
			
		},
		created () {
	  		this.viewdom();
   		},
	    
	}
</script>

<style lang="less">
	@import '~vux/src/styles/1px.less';
	.order_content{
		margin-top:20px;
		background: #fff;
		border-top:1px solid #e5e5e5;
		border-bottom:1px solid #e5e5e5;
		ul{
			li{
				width:100%;
				display:block;
				height: 60px;
				line-height: 60px;;
				.order_fl{
					float:left;
					font-size:28px;
					color:#666;
					padding-left:20px;
					display:block;
				}
				.order_fr{
					float:right;
					display:block;
					font-size:28px;
					color:#333;
					padding-right:20px;
				}
			}
		}
	}
	

	.sub_item{
    	height:60px;
    }
    .vux-label{
    	font-size:28px;
    }
    .weui-cell_access .weui-cell__ft:after{
	    content: " ";
	    display: inline-block;
	    height: 12px !important;
	    width: 12px !important;
	    border-width: 2px 2px 0 0;
	    border-color: #C8C8CD;
	    border-style: solid;
	    -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
	    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
	    position: relative;
	    top: -2px;
	    position: absolute;
	    top: 50%;
	    margin-top: -4px;
	    right: 2px;
	}
	.order_button_content{
		width:100%;
		height:130px;
		background-color: #fff;
		border-top:1px solid #e5e5e5;
		position: fixed;
		bottom: 0px;
		left: 0px;
		
		
	}
	.order_button{
		display: block;
		width: 80%;
		height: 90px;
		border:1px solid #e5e5e5;
		border-radius: 8px;
		font-size: 32px;
		line-height: 90px;
		text-align: center;
		margin-left:10%;
	}
	.order_qx{
		color: #666;
	}
	.order_qr{
		color:#fff;
		background-color:#3288ff ;
	}
	
</style>