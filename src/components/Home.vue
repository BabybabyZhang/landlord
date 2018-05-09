<template>
	<div id="home" class="container">
		<div class="header" :style="{backgroundImage: 'url(' + imgurl+bgImg + ')'}">
			<div class="home-top">
				<p>待收房租</p>
				<h3>￥{{infoObj.amount}}</h3>
			</div>
			<div class="home-info">
				<p><span>发布房源</span><b>{{infoObj.totalNum}}套</b></p>
				<p><span>出租中</span><b>{{infoObj.rentNum}}套</b></p>
			</div>
		</div>
		<ul class="home-list">
			<li @click="clickItem('add')"><img :src="imgurl+'add@2x.png'" /><span>添加房源</span></li>
			<li @click="clickItem('order')"><img :src="imgurl+'chuzu@2x.png'" /><span>出租订单</span></li>
			<li @click="clickItem('fangyuan')"><img :src="imgurl+'fangyuan@2x.png'" /><span>房源管理</span></li>
			<li @click="clickItem('fangzu')"><img :src="imgurl+'fangzu@2x.png'" /><span>预收房租</span></li>
			<li @click="clickItem('money')"><img :src="imgurl+'money@2x.png'" /><span>钱包</span></li>
			<li @click="clickItem('more')"><img :src="imgurl+'more@2x.png'" /><span>更多</span></li>
		</ul>
		<div class="silde" @click="menuClose" :class="{sildeAdd:sildeFlag}">
      		<div class="s-con">
      			<div class="s-head">
      				<div class="s-ab-head">
      					<div class="pic"><img :src="imgurl+'actor.png'"></div>
      					<div class="info">
      						<h3>{{userName}}</h3>
      						<span :class="userFlag?'active':'gray'">{{userFlag?'已实名':'未实名'}}</span>
      					</div>
      				</div>
      			</div>
      			<ul class="s-list">
      				<li @click="identity">实名认证</li>
      				<li @click="set">设置</li>
      			</ul>
      		</div>
      	</div>
	</div>
</template>

<script>
import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'
import API from '@/api/index';
/*import loadingImg  from 'http://zhujiaapp.oss-cn-hangzhou.aliyuncs.com/img/index-pic.png'*/

export default {
	name:'home',
	data() {
		return {
			userFlag:false,
			userName:'姓名',
			bgImg:'home-pic.png',
			infoObj:{
				amount:0,
				rentNum:0,
				totalNum:0,
			},
		}
	},
	components:{
         
    },
	computed:{
		...mapState([
			'sildeFlag',
			'imgurl',
			'user',
			'landlordInfo',
		]),
		...mapGetters([
	      	
	    ])
	},
	beforeCreate(){
		
	},
	created() {
		if(this.landlordInfo){
			this.userName = this.landlordInfo.name;
		}else{
			this.findUser()
		}
		this.getInfo()
	},
	methods: {
		...mapMutations([
	      	'setSildeFlag',
	      	'setLandlordInfo'
	    ]),
	    ...mapActions([
	        
	    ]),
	    menuClose(){
	    	this.setSildeFlag(false)
	    },
	    set(){
	    	this.$router.push({
	            path: '/set' 
	        });
	    },
	    identity(){
	    	this.$router.push({
	            path: '/recognition'
	        });
	    },
	    clickItem(type){
	    	let path = "index";
	    	switch(type){
	    		case 'add':
	    			path = 'areaList';
	    			break;
	    		case 'order':
	    			path = 'rentingorder';
	    			break;
	    		case 'fangyuan':
	    			path = 'houselist';
	    			break;
	    		case 'fangzu':
	    			//path = '';
	    			break;
	    		case 'money':
	    			path = 'money';
	    			break;
	    		case 'more':
	    			path = 'termsservice';
	    			break;
	    		default :
	    			break;
	    	}
	    	this.$router.push({
	            path: '/'+path 
	        });
	    },
	    findUser(){
	    	let _this = this;
	    	let obj = {
	    		id:this.user.id
	    	};
	    	API.findUser(obj)
	    	.then(res => {
	    		if(res.success){
	    			_this.userFlag = true;
	    			_this.userName = res.data.name;
	    			_this.setLandlordInfo(res.data)
	    		}
	    	})
	    	.catch(error => {

	    	})
	    },
	    getInfo(){
	    	let obj = {
	    		landlordId:this.user.id
	    	};
	    	API.homeInfo(obj)
	    	.then(res => {
	    		if(res.success){
	    			this.infoObj = res.data;
	    		}
	    	})
	    	.catch(error => {

	    	})
	    }
	},
	mounted(){
        
    },
    beforeRouterLeave(to, from, next){
 		
 	},
	watch:{
	    $route(to,from){
	      	
	    },
	    sildeFlag(){
	    	//console.log(this.sildeFlag)
	    	if(this.sildeFlag){
	    		//this.findUser()
	    	}
	    }
 	}
}
</script>
<style>
	.home-list{
		height:-moz-calc(100% - 432px);
	    height:-webkit-calc(100% - 432px); 
	    height:-o-calc(100% - 432px);
	    height:-ms-calc(100% - 432px);
	   	height:calc(100% - 432px);
		overflow: hidden;
	}
	.home-list li{
		padding-top:33px;
		height:-moz-calc((100% - 432px) / 3);
	    height:-webkit-calc((100% - 432px) / 3); 
	    height:-o-calc((100% - 432px) / 3);
	    height:-ms-calc((100% - 432px) / 3);
		height:calc((100% - 432px) / 3);
	}
</style>
<style scoped lang="scss">
#home {
	width: 100%;
	padding-top:80px;
	background-color:#fff;
	box-sizing:border-box;
	height:100%;
	.header{
		width:100%;
		height:432px;
		background-size:cover;
		position: relative;
		.home-top{
			position: absolute;
			top:84px;
			left:30px;
			color:#fff;
			p{
				font-size:32px;
			}
			h3{
				line-height:96px;
				font-size:60px;
			}
		}
		.home-info{
			position: absolute;
			left:30px;
			bottom:66px;
			height:80px;
			width:240px;
			p{
				line-height:26px;
				font-size:26px;
				position: relative;
				color:#fff;
				text-indent:45px;
				b{
					float: right;
				}
			}
			p:nth-of-type(1){
				&:before{
					content:'';
					position: absolute;
					left:0;
					top:0;
					width:25px;
					height:25px;
					background:url('../assets/img/home-fabu.png') no-repeat center;
				}
			}
			p:nth-of-type(2){
				margin-top:25px;
				&:before{
					content:'';
					position: absolute;
					left:0;
					top:-1px;
					width:26px;
					height:27px;
					background:url('../assets/img/home-chuzu.png') no-repeat center;
				}
			}
		}
	}
	.home-list{
		width:100%;
		display: -webkit-flex; /* Safari */
  		display: flex;
  		flex-wrap:wrap;
  		justify-content:space-around;
  		background-color:#f7f7f7;
  		position: relative;
  		&:before,&:after{
  			content:'';
			position: absolute;
			top:50px;
			bottom:40px;
			width:1px;
			z-index:2;
  		}
  		&:before{
			left:50%;
			margin-left:-1px;
			background-color:#fff;
  		}
  		&:after{
			right:50%;
			margin-right:-1px;
			background-color:#dcdcdc;
  		}
		li{
			width:50%;
			text-align:center;
			position: relative;
			span{
				position: absolute;
				left:0;
				right:0;
				bottom:-85px;
				margin:auto;
				font-size:24px;
			}
		}
		li:nth-of-type(1),li:nth-of-type(2),li:nth-of-type(3),li:nth-of-type(4){
			&:after,&:before{
				content:'';
				position: absolute;
				left:30px;
				right:0;
				height:1px;
				z-index:1;
			}
			&:after{
				bottom:-115px;
				background-color:#dcdcdc;
			}
			&:before{
				bottom:-116px;
				background-color:#fff;
			}
		}
		li:nth-of-type(2),li:nth-of-type(4){
			&:after,&:before{
				right:30px;
				left:0;
			}
		}
	}
	.silde{
		position: fixed;
		left:0;
		right:0;
		bottom:0;
		top:80px;
		margin:auto;
		background:rgba(0,0,0,0);
		z-index:-1;
		transition-duration: 0.2s;
		-moz-transition-duration: 0.2s; /* Firefox 4 */
		-webkit-transition-duration: 0.2s; /* Safari 和 Chrome */
		-o-transition-duration: 0.2s; 
		.s-con{
			margin-left:-84%;
			width:84%;
			height:100%;
			background-color:#fff;
			.s-head{
				height:432px;
				background:#119bfe; /* #1ca4ff一些不支持背景渐变的浏览器 */  
			    background:-webkit-linear-gradient(#0c97fc,#1ca4ff);
			    background:-o-linear-gradient(#0c97fc,#1ca4ff);
			    background:linear-gradient(#0c97fc,#1ca4ff);
			    position: relative;     
			}
		}
	}
	.silde,.s-con{
		transition: all 0.5s linear;
		-moz-transition: all 0.5s linear; /* Firefox 4 */
		-webkit-transition: all 0.5s linear; /* Safari 和 Chrome */
		-o-transition: all 0.5s linear; /* Opera */
	}
	.sildeAdd{
		background:rgba(0,0,0,.5);
		z-index:2;
		.s-con{
			margin-left:0;
		}
	}
	.s-ab-head{
		position: absolute;
		bottom:0;
		left:0;
		margin:auto;
		padding-left:40px;
		height:172px;
		width:100%;
		box-sizing:border-box;
		.pic{
			float:left;
		}
		.info{
			margin-left:94px;
			h3{
				line-height:70px;
				font-size:50px;
				color:#fff;
			}
			span{
				display:inline-block;
				margin-top:10px;
				padding:0 20px;
				line-height:36px;
				font-size:28px;
				&.gray{
					color:#999;
					background-color:#ccc;
				}
				&.active{
					color:#fff;
					background-color:#ec8415;
				}
			}
		}
	}
	.s-list{
		padding-top:30px;
		padding-left:40px;
		li{
			text-indent:70px;
			line-height:90px;
			color:#000;
			font-size:30px;
			position: relative;
			&:before{
				content:'';
				position: absolute;
				left:0;
				display:block;
			}
		}
		li:nth-of-type(1){
			&:before{
				top:30px;
				width:41px;
				height:29px;
				background:url('../assets/img/user-icon.png') no-repeat center;
			}
		}
		li:nth-of-type(2){
			&:before{
				left:6px;
				top:26px;
				width:32px;
				height:37px;
				background:url('../assets/img/set-icon.png') no-repeat center;
			}
		}
	}
}
</style>