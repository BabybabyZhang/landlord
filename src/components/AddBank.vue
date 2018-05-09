<template>
	<div id="addBank" class="container">
		<div class="info user-info">
			<p>
				<span>姓名</span>
				<input type="text" v-model="responseObj.name" placeholder="请输入姓名" />
			</p>
			<p>
				<span>身份证号</span>
				<input type="text" v-model="responseObj.number" placeholder="请输入身份证号" />
			</p>
		</div>
		<div class="info bank-info">
			<p class="ps">
				<span>银行卡号</span>
				<input type="text" v-model="bankNo" placeholder="请输入您的银行卡号" />
				
			</p>
			<!-- <p>
				<span>所属银行</span>
				<input type="text" v-model="bankName" readonly />
			</p> -->
			<p>
				<span>手机号</span>
				<input type="text" v-model="phone" placeholder="请输入银行卡预留手机号" />
			</p>
			<p class="code">
				<span>验证码</span>
				<input type="text" v-model="code" placeholder="请输入短信验证码" />
				<i :class="{color:colorActive}" @click="getCode" class="code">{{msg}}</i>
			</p>
		</div>
		<div class="foot">
			<button @click="add">添加</button>
		</div>
	</div>
</template>

<script>
import API from '@/api/index';
import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'
export default {
	name:'addBank',
	data() {
		return {
			bankNo:'',
			bankName:'',
			phone:'',
			code:'',
			msg:'获取验证码',
			colorActive:false,
			decrease:null,
			getCodeFlag:true,
			responseObj:{},
			num:0,
			id:'',
		}
	},
	computed:{
		...mapState([
			'item',
			'user',
			'isLoading',
			'landlordInfo'
		]),
		...mapGetters([
	      	'itemAdd'
	    ])
	},
	created() {
		if(this.landlordInfo){
			this.responseObj = this.landlordInfo;
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
          'getWinHeight'
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
		add(){
			this.addBanks()
			/*this.$router.push({
				path:'/addResult'
			})*/
		},
		sendCode(){
          	let obj = {
	    		userId:this.user.id,
	    		cardNumber:this.bankNo,
	    		phone:this.phone
	    	};
	    	let that = this;
	    	this.updateLoading(true);
          	API.addBank(obj).then(res => {
          		this.updateLoading(false);
              	if (res.success) {
              		this.id = res.data.requestno;
                  	this.colorActive = true;
                  	let a = 60;
                  	let that = this;
                  	this.decrease = setInterval(function(){
                      	that.msg = "重新获取 ("+a+") ";
                      	a--;
                      	if(a==-1){
                          	clearInterval(that.decrease)
                          	that.colorActive = false;
                          	that.msg = '获取验证码';
                          	that.getCodeFlag = true;
                      	}
                  	},1000)
              	} /*else if(res.code == 0) {
              		that.getCodeFlag = true;
                  	this.getAlert(res.msg)
              	}*/else{
              		that.getCodeFlag = true;
                  	this.getAlert(res.msg)
              	}
          	}).catch(error => {
          		this.updateLoading(false);
          		that.getCodeFlag = true;
              	this.getAlert('服务器出错了，请稍后再试')
          	});
      	},
	    getCode(){
	        if(this.vilateInfo()){
	        	if(this.getCodeFlag){
	        		this.getCodeFlag = false;
	        		this.num++;
	        		this.sendCode()
	        		/*if(this.num == 1){
	        			this.sendCode()
	        		}else{
	        			this.sendAgain()
	        		}*/
	        	}
	        }
	    },
      	getAlert(str){
	        this.TAlert({
	            show: true,
	            content: str,
	            cancel: false,
	            onSure: function (){}
	        })
	    },
	    vilateInfo(){
	    	let str = '';
	    	let reg = /^1[3|4|5|7|8|9][0-9]{9}$/;
	    	let reg1 = /^\d{16,19}$/;
	    	if(!this.bankNo){
	    		str = '银行卡号不能为空';
	            this.getAlert(str)
	            return false;
	    	}else if(!this.phone){
	    		str = '银行预留手机号不能为空';
	            this.getAlert(str)
	            return false;
	    	}
	    	if(!reg1.test(this.bankNo)){
	    		str = '请输入正确的银行卡号';
	    		this.getAlert(str)
	            return false;
	    	}else if(!reg.test(this.phone)){
	    		str = '请输入正确的手机号';
	    		this.getAlert(str)
	            return false;
	    	}
	    	return true;
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
							path:'/login'
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
		                 	this.responseObj = res.data;
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
	    addBanks(){
	    	if(this.vilateInfo()){
	    		if(!this.id){
	    			this.TAlert({
			            show: true,
			            content: '请先获取验证码',
			            cancel: false,
			            onSure: function (){
			            	
			            }
			        })
			        return false;
	    		}else if(!this.code){
		    		this.TAlert({
			            show: true,
			            content: '请输入验证码',
			            cancel: false,
			            onSure: function (){
			            	
			            }
			        })
		    	}else if(!/^\d{6}$/.test(this.code)){
		    		this.TAlert({
			            show: true,
			            content: '请输入正确的验证码',
			            cancel: false,
			            onSure: function (){
			            	
			            }
			        })
		    	}else{
		    		this.vilateCode()
		    	}
	    	}		
	    },
	    vilateCode(){
	    	let obj = {
	    		requestno:this.id,
	    		validatecode:this.code,
	    		userId:this.user.id,
	    	};
	    	let _this = this;
	    	this.updateLoading(true);
	    	API.smsDelivery(obj)
			.then(res => {
				this.updateLoading(false);
	            if (res.success) { 
	                 if(JSON.stringify(this.$route.query) != '{}'){
						this.$router.replace({
							path:'/addResult',
							query:this.$route.query
							/*path: '/'+this.$route.query.path,
	                        query:{
	                            id:this.$route.query.id
	                        }*/
						})
					}else{
						this.$router.replace({
							path:'/addResult'
						})
					}
	            } else if(res.code == 0) {
	                this.TAlert({
			            show: true,
			            content: res.msg,
			            cancel: false,
			            onSure: function (){
			            	/*_this.$router.push({
								path:'/user'
							})*/
			            }
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
	    },
	    sendAgain(){
	    	let obj = {
	    		requestno:this.id,
	    		advicesmstype:'MESSAGE',
	    	};
	    	let _this = this;
	    	API.smsResend(obj)
			.then(res => {
	            if (res.success) {
	            	this.id = res.data.requestno; 
	                this.colorActive = true;
                  	let a = 60;
                  	let _this = this;
                  	this.decrease = setInterval(function(){
                      	_this.msg = "重新获取 ("+a+") ";
                      	a--;
                      	if(a==-1){
                          	clearInterval(_this.decrease)
                          	_this.colorActive = false;
                          	_this.msg = '获取验证码';
                          	_this.getCodeFlag = true;
                      	}
                  	},1000)
	            } else if(res.code == -1) {
	            	_this.getCodeFlag = true;
	                this.TAlert({
			            show: true,
			            content: res.msg,
			            cancel: false,
			            onSure: function (){
			            	/*_this.$router.push({
								path:'/user'
							})*/
			            }
			        })
	            }
	        })
	        .catch(error => {
	        	_this.getCodeFlag = true;
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
#addBank {
	height:100%;
	padding-top:80px;
	overflow:hidden;
	box-sizing:border-box;
	.info{
		margin-top:20px;
		padding:0 30px;
		background-color:#fff;
		p{
			height:88px;
			border-bottom:1px solid #e6e6e6;
			span,input{
				display:inline-block;
				height:88px;
				color:#666;
				
			}
			span{
				line-height:88px;
				width:20%;
				font-size:28px;
			}
			input{
				width:78%;
				box-sizing:border-box;
				padding:20px 0;
				line-height:48px;
				font-size:26px;
			}
		}
		.code{
			position: relative;
			i{
				position: absolute;
				right:0;
				top:0;
				display:block;
				line-height:88px;
				padding-left:20px;
				font-size:24px;
				color:#1a7bf2;
				&:before{
					content:'';
					position: absolute;
					left:0;
					top:50%;
					width:1px;
					height:25px;
					margin-top:-12px;
					background-color:#e6e6e6;
				}
			}
			.color{
              color:#999;
            }
		}
		.ps{
			position: relative;
			i{
				position: absolute;
				right:0;
				top:50%;
				margin-top:-15px;
				width:30px;
				height:30px;
				background:url('../assets/img/addbank-info.png') no-repeat center;
				z-index:3;
			}
		}
	}
	.foot{
		margin-top:70px;
		padding:0 35px;
		height:90px;
		button{
			width:100%;
			text-align:center;
			line-height:90px;
			background-color:#1c7cff;
			border-radius:10px;
			font-size:28px;
			color:#fff;
		}	
	}
}
</style>