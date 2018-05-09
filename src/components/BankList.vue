<template>
	<div id="bankList" class="container">
		<ul class="lists">
			<li v-for="item in list">
				<div class="pic">
					<img :src="imgurl+'banklist-icon@2x.png'">
				</div>
				<div class="top">
					<h3>{{item.bankName}}</h3>
					<p>{{item.cardType == 'DEBIT' ? '借记卡' : (item.cardType == 'CREDIT' ? '信用卡' : '')}}</p>
					<div>{{item.bankCardNumber}}</div>
				</div>
			</li>
		</ul>
		<div class="foot" v-show="!(list.length == 1)">
			<button @click="addBank"></button>
			<span>添加银行卡</span>
		</div>
	</div>
</template>

<script>
// import MenuTree from '@/components/MenuTree'
import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'
import API from '@/api/index';
export default {
	name:'bankList',
	data() {
		return {
			nodes: this.$router.options.routes,
			list:[]
		}
	},
	computed:{
		...mapState([
			'user',
			'isLoading',
			'imgurl',
			'landlordInfo'
		]),
		...mapGetters([
	      	'itemAdd'
	    ])
	},
	created() {
		if(this.landlordInfo){
			this.getList()
		}else{
			this.findU()
		}
	},
	methods: {
		...mapMutations([
	      	'updataItem',
	      	'updateLoading',
	      	'setLandlordInfo'
	    ]),
	    ...mapActions([
	        'onSure',
	        'onCancel',
	        'TAlert',
	    ]),
		onSubmit() {
			console.log('submit!');
		},
		handleopen() {
			//console.log('handleopen');
		},
		handleclose() {
			//console.log('handleclose');
		},
		handleselect: function(a, b) {
		},
		addBank(){
			this.$router.push({
				path:'/addBank'
			})
		},
		findU(){
			let _this = this;
			if(!this.user){
				this.TAlert({
		            show: true,
		            content: '当前未登录，请先登录',
		            cancel: false,
		            onSure: function (){
		            	_this.$router.push({
							path:'/login',
							query:{
			                    path:'bankList'
			                }
						})
		            }
		        })
			}else{
				let obj = {
		   			id:this.user.id
		   		};
		    	API.findUser(obj)
				.then(res => {
		            if (res.success) { 
		                if((res.data.status == 1)||(res.data.status == -1)){
		                 	this.setLandlordInfo(res.data)
		                 	this.getList()
		                }
		            }
		        })
		        .catch(error => {
		            this.updateLoading(false);
		            this.TAlert({
			            show: true,
			            content: '服务器出错了，请稍后再试',
			            cancel: false,
			            onSure: function (){}
			        })
		        });
			}	
	    },
	    getList(){
	    	let obj = {
				userId:this.user.id
			};
			this.updateLoading(true);
			let _this = this;
			API.bankList(obj)
			.then(res => {
				this.updateLoading(false);
	            if (res.success) { 
	            	this.list = res.data;
	                // this.pay(res.data[0].id)
	            } else if(res.code == -1) {
	                this.TAlert({
			            show: true,
			            content: res.msg,
			            cancel: false,
			            onSure: function (){
			            	_this.$router.push({
								path:'/addBank'
							})
			            }
			        })
	            }else{
	            	this.TAlert({
			            show: true,
			            content: '服务器出错了，请稍后再试',
			            cancel: false,
			            onSure: function (){}
			        })
	            }
	        })
	        .catch(error => {
	            this.updateLoading(false);
	            this.TAlert({
		            show: true,
		            content: '服务器出错了，请稍后再试',
		            cancel: false,
		            onSure: function (){}
		        })
	        });
	    }
	},
	mounted() {

	},
	/*components: {
		MenuTree
	},*/
	watch:{
	    $route(to,from){
	      	
	    }
 	}
}
</script>

<style scoped lang="scss">
#bankList {
	height:100%;
	padding: 80px 30px 30px;
	background-color:#fff;
	box-sizing:border-box;
	.lists{
		width:100%;
		padding-bottom:38px;
		padding-top:38px;
		box-sizing:border-box;
		li{
			padding-top:55px;
			padding-left:40px;
			height:280px;
			width:100%;
			background:url('../assets/img/bank-bg@2x.png') no-repeat center;
			box-sizing:border-box;
			.pic{
				float:left;
				width:44px;
				height:32px;
			}
			.top{
				padding-left:75px;
				height:226px;
				color:#fff;
				position:relative;
				h3{
					font-size:36px;
				}
				p{
					line-height:60px;
					font-size:22px;
					color:#dfeaff;
				}
				div{
					color:#dfeaff;
					line-height:86px;
					font-size:44px;
				}
			}
		}
	}
	.foot{
		width:100%;
		height:280px;
		border-radius:10px;
		background-color:#f0f0f0;
		position: relative;
		button{
			position: absolute;
			top:42px;
			left:50%;
			margin-left:-70px;
			width:140px;
			height:140px;
			border-radius:100%;
			background:url('../assets/img/bank-add.png') no-repeat center;
		}
		span{
			position: absolute;
			left:0;
			right:0;
			bottom:30px;
			line-height:66px;
			text-align:center;
			color:#666666;
			font-size:24px;
		}	
	}
}
</style>