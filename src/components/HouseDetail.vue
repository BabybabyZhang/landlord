<template>
	<div id="homedetail" class="container">
		<div class="header">
			<swiper auto loop height="400px" :interval=2000 dots-class="custom-bottom" dots-position="center" v-if="imgList.length">
			    <swiper-item class="swiper-demo-img" v-for="(item, index) in imgList" :key="index"><img :src="item.url" /></swiper-item>
		    </swiper>
		    <swiper auto height="400px" :interval=2000 dots-class="custom-bottom" dots-position="center" v-else>
			    <swiper-item>
			    	<img v-lazy='resultObj.apartmentImgFileURL' width="100%" />
			    </swiper-item>
		    </swiper>
		</div>
		<div class="container">
			<div class="title after">
				<p>{{resultObj.caption?resultObj.caption:resultObj.resourceName}}<!-- <br>独门独户天然气 随时看房 --></p>
			</div>
			<div class="section2 after">
				<p class="price"><i>{{Number(resultObj.monthPrice).toFixed(2)}}</i><span>元/月</span><span class="price-right">月付价</span></p>
				<div class="tag">
					<span class="price_bottom" v-show="resultObj.houseModel">{{resultObj.houseModel}}</span>
					<span style="text-align: left;" v-show="resultObj.roomArea">{{resultObj.roomArea?resultObj.roomArea+'㎡':''}}</span>
					<span style="text-align: center;" v-show="resultObj.resourceHouseType">{{resultObj.resourceHouseType?resultObj.resourceHouseType:''}}</span>
					<span style="text-align: right;" v-show="resultObj.floor">{{resultObj.floor?resultObj.floor+'层':''}}</span>
					<span v-show="resultObj.areaCode">地址：{{resultObj.areaCode}}</span>
				</div>
			</div>
			<div class="section3 after">
				<h3>房屋配置</h3>
				<div class="tag">
					<!-- <i v-show="listObj.shafa"><img :src="imgurl+'img/shafa.png'" /></i>
					<i v-show="listObj.yigui"><img :src="imgurl+'img/yigui.png'" /></i>
					<i v-show="listObj.bingxiang"><img :src="imgurl+'img/bingxiang.png'" /></i>
					<i v-show="listObj.dianshi"><img :src="imgurl+'img/dianshi.png'" /></i>
					<i v-show="listObj.kuandai"><img :src="imgurl+'img/kuandai.png'" /></i>
					<i v-show="listObj.kongtiao"><img :src="imgurl+'img/kongtiao.png'" /></i>
					<i v-show="listObj.nuanqi"><img :src="imgurl+'img/nuanqi.png'" /></i>
					<i v-show="listObj.reshuiqi"><img :src="imgurl+'img/reshuiqi.png'" /></i>
					<i v-show="listObj.xiyiji"><img :src="imgurl+'img/xiyiji.png'" /></i>
					<i v-show="listObj.fan"><img :src="imgurl+'img/fan.png'" /></i>
					<i v-show="listObj.yangtai"><img :src="imgurl+'img/yangtai.png'" /></i>
					<i v-show="listObj.duwei"><img :src="imgurl+'img/duwei.png'" /></i> -->
					<i v-show="listObj.houseBed" class="chuang"><img :src="imgurl+'chuang.png'" /><span>床</span></i>
					<i v-show="listObj.houseTable" class="shuzhuo"><img :src="imgurl+'shuzhuo.png'" /><span>书桌</span></i>
					<i v-show="listObj.houseChair" class="yizi"><img :src="imgurl+'yizi.png'" /><span>椅子</span></i>
					<i v-show="listObj.airConditioner" class="kongtiao"><img :src="imgurl+'kongtiao.png'" /><span>空调</span></i>
					<i v-show="listObj.closet" class="yigui"><img :src="imgurl+'yigui.png'" /><span>衣柜</span></i>
					<i v-show="listObj.refrigerator" class="bingxiang"><img :src="imgurl+'bingxiang.png'" /><span>冰箱</span></i>
					<i v-show="listObj.television" class="dianshi"><img :src="imgurl+'dianshi.png'" /><span>电视</span></i>
					<i v-show="listObj.broadband" class="kuandai"><img :src="imgurl+'kuandai.png'" /><span>宽带</span></i>
					<i v-show="listObj.sofa" class="shafa"><img :src="imgurl+'shafa.png'" /><span>沙发</span></i>
					<i v-show="listObj.heat" class="nuanqi"><img :src="imgurl+'nuanqi.png'" /><span>暖气</span></i>
					<i v-show="listObj.waterHeater" class="reshuiqi"><img :src="imgurl+'reshuiqi.png'" /><span>热水器</span></i>
					<i v-show="listObj.washer" class="xiyiji"><img :src="imgurl+'xiyiji.png'" /><span>洗衣机</span></i>
					<i v-show="listObj.cook" class="fan"><img :src="imgurl+'fan.png'" /><span>做饭</span></i>
					<i v-show="listObj.balcony" class="yangtai"><img :src="imgurl+'yangtai.png'" /><span>阳台</span></i>
					<i v-show="listObj.bathroom" class="duwei"><img :src="imgurl+'duwei.png'" /><span>独卫</span></i>
				</div>
			</div>
			
		</div>
		<div class="foot" v-show="type === 1 ">
			<button @click="setorder" >编辑详情</button>
		</div>		
		<a :href="'tel:'+(resultObj.mobile?resultObj.mobile:'057186039712')" ref="phone" style="display:none;"></a>	
	</div>
</template>

<script>
import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'
import { Swiper, SwiperItem  } from 'vux'
import API from '@/api/index';
/*import loadingImg  from '../assets/img/homedetail-pic.png'
import loadingImgs  from '../assets/img/zhanwei.png'*/
export default {
	name:'houseDetail',
	data() {
		return {
			startyear:'',
			endyear:'',
			value1:'',
			id:'',
			resultObj:{},
			loadingImg:'http://zhujiaapp.oss-cn-hangzhou.aliyuncs.com/img/index-pic.png',
			loadingImgs:'http://zhujiaapp.oss-cn-hangzhou.aliyuncs.com/img/zhanwei.png',
			listObj:{},
			imgList:[],
			communityId:'',
			type:0,
		}
	},
	components:{
         Swiper,
         SwiperItem,
    },
	computed:{
		...mapState([
			'item',
			'user',
			'houseItem',
			'rentDetail',
			'imgurl',
			'yunyuImgUrl',
			'isLoading'
		]),
		...mapGetters([
	      	'itemAdd'
	    ])
	},
	created() {
		if(JSON.stringify(this.$route.query) != '{}'){
			this.id = this.$route.query.resourceId;
			this.type=this.$route.query.type;
			console.log(this.type);
			let _this = this;
			let obj = {
				landlordId:JSON.parse(window.sessionStorage.getItem('user')).id,
				resourceId:this.id,
			}
			this.updateLoading(true)
			API.resourceInfo(obj)
			.then(res => {
				this.updateLoading(false)
	            if (res.success) {
	            	_this.resultObj.monthPrice = res.data.monthPrice;
					_this.resultObj.houseModel = res.data.communityName;	
					_this.resultObj.roomArea = res.data.resourceArea;	
					_this.resultObj.floor = res.data.resourceFloor;	
					_this.resultObj.resourceHouseType = res.data.resourceHouseType;	
					_this.communityId = res.data.communityId;
	                if(res.data.resourcePicturesUrl){
	                	let imgListss = res.data.resourcePicturesUrl;
	                	for(let i = 0; i<imgListss.length; i++){
							_this.imgList.push({
								url: imgListss[i],
							})
	               		}
	                	console.log(_this);

	                }
	                this.listObj = res.data.resourceFaclity	;
	            } else {
	                this.TAlert({
			            show: true,
			            content: res.msg,
			            cancel: false,
			            onSure: function (){
//			            	_this.$router.replace({
//								path:'/index',
//							})
			            }
			        })
	            }
	        })
	        .catch(error => {
	        	this.updateLoading(false)
	            this.TAlert({
		            show: true,
		            content: '服务器出错了，请稍后再试',
		            cancel: false,
		            onSure: function (){
//		            	_this.$router.replace({
//							path:'/index',
//						})
		            }
		        })
	        });
		}	
	},
	methods: {
		...mapMutations([
	      	'updataItem',
	      	'setHouseItem',
	      	'setRentDetail',
	      	'updateLoading'
	    ]),
	    ...mapActions([
	        'onSure',
	        'onCancel',
	        'TAlert',
	    ]),
		setorder(){
			let _this = this;
			if(!this.user){
				this.TAlert({
		            show: true,
		            content: '请先登录',
		            cancel: false,
		            onSure: function (){
		            	_this.$router.replace({
							path:'/login',
							query:{
								path:'houseDetail',
								id:_this.$route.query.id
							}
						})
		            }
		        })		
			}else{
				console.log(this.$route.query.resourceId)
				this.$router.push({
					path:'/addHouse',
					query:{
						resourceId:this.$route.query.resourceId,
						id:this.communityId
					}
				})
//				this.getRentInfo()	
			}	
		},
		phone(){
			let phoneNum = '';
			if(this.resultObj.mobile){
				phoneNum = this.resultObj.mobile;
			}else{
				phoneNum = '057186039712';
			}
			let _this = this;
			this.TAlert({
	            show: true,
	            content: '请拨打电话:'+phoneNum,
	            cancel: true,
	            onCancel:function(){

	            },
	            onSure: function (){
	            	_this.$refs.phone.click()
	            }
	        })
		},
		change(){

		},
		log (str1, str2, e) {

	    },
	    setToWord(type){

	    	let str = '';
	    	switch(type){
	    		case '1':
	    			str = '朝东';
	    			break;
	    		case '2':
	    			str = '朝南';
	    			break;
	    		case '3':
	    			str = '朝西';
	    			break;
	    		case '4':
	    			str = '朝北';
	    			break;
	    		default:
	    			break;
	    	}
	    	return str;
	    },
	    findU(){
			let _this = this;
			let obj = {
	   			userId:this.user.id
	   		};
	    	API.findUser(obj)
			.then(res => {
	            if (res.success) { 
	                 if((res.data.status == 1)||(res.data.status == -1)){
	                 	if(res.data.bankcardStatus != 1){//没有绑定银行卡
	                 		this.TAlert({
					            show: true,
					            content: '请绑定银行卡',
					            cancel: false,
					            onSure: function (){
					            	_this.$router.push({
										path:'/addBank',
										query:{
											path:'houseDetail',
											id:_this.$route.query.id
										}
									})
					            }
					        })
	                 	}else{
	                 		this.$router.push({
								path:'/previewHouse',
								query:{
									id:this.$route.query.id
								}
							})
	                 	}
		                 	
	                 }else{
	                 	this.TAlert({
				            show: true,
				            content: '请先进行身份认证',
				            cancel: false,
				            onSure: function (){
				            	_this.$router.push({
									path:'/identity',
									query:{
										path:'houseDetail',
										id:_this.$route.query.id
									}
								})
				            }
				        })	
	                 }
	            } else if(res.code == -1) {
	                this.TAlert({
			            show: true,
			            content: res.msg,
			            cancel: false,
			            onSure: function (){
			            	_this.$router.push({
								path:'/identity',
								query:{
									path:'houseDetail',
									id:_this.$route.query.id
								}
							})
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
//	    getRentInfo(){
//	    	let _this = this;
//			let obj = {
//	   			userId:this.user.id
//	   		};
//	    	API.hasRent(obj)
//			.then(res => {
//	            if (res.success) { 
//	                this.TAlert({
//			            show: true,
//			            content: '您已有一笔有效订单',
//			            cancel: false,
//			            onSure: function (){
//			            	
//			            }
//			        })
//	            }else{
//	            	this.findU()
//	            }
//	        })
//	        .catch(error => {
//	            this.updateLoading(false);
//	            this.TAlert({
//		            show: true,
//		            content: '服务器出错了，请稍后再试',
//		            cancel: false,
//		            onSure: function (){}
//		        })
//	        });	
//	    }
	},
	mounted() {

	},
	watch:{
	    $route(to,from){
	      	
	    }
 	}
}
</script>
<style>
	.dp-header .dp-item{
		font-size:30px!important;
		line-height:60px!important;
		height:60px!important;
	}
	.scroller-component{
		height:450px!important;
	}
	.scroller-item{
		font-size: 28px!important;
	    height: 60px!important;
	    line-height: 60px!important;
	}
	.scroller-indicator{
		height: 60px!important;
	    line-height: 60px!important;
	    top: 180px!important;
	    background-repeat:repeat!important;
	}
	.scroller-content{
		top: -60px!important;
	}
	.weui-cells:after{
		border:0!important;
	}
	.weui-cells:before{
		border:0!important;
	}
</style>
<style scoped lang="scss">
#homedetail {
	height:100%;
	width: 100%;
	overflow:auto;
	box-sizing:border-box;
	padding-top:80px;
	.header {
		width:100%;
		height: 400px;
		text-align:center;
		.header-item{
			display:inline-block;
			max-width:100%;
			height:400px;
		}
	}
	.container{
		width:100%;
		background-color:#fff;
		padding-bottom:80px;
		.after {
			position:relative;
			&:after{
				position:absolute;
				bottom:0;
				left:10px;
				right:20px;
				height:1px;
				background-color:#f0f0f0;
				content:'';
			}
		}
		.title {
			padding:23px 50px;
			
			p {
				line-height:42px;
				text-align:center;
				font-size:30px;
				color:#333;
			}
		}
		.section2 {
			padding:0 20px;
			.price{
				line-height:114px;
				font-size:24px;
				color:#747474;
				i {
					font-size:30px;
					color:#ff6500;
				}
			}
			.price-right{
				float:right;
			}
			.tag {
				min-height:50px;
				span {
					display:inline-block;
					min-width:33%;
					line-height:32px;
					font-size:24px;
					color:#333333;
					padding-bottom:20px;
					padding-top: 20px;
				}
				.price_bottom{
					width: 100%;
					border-bottom: 1px solid #e5e5e5;
				}
			}
		}
		.section3 {
			padding:0 20px;
			h3{
				line-height:94px;
				font-size:30px;
				font-weight:900;
			}
			.tag {
				display: flex;
	            align-items:center;
	            flex-wrap:wrap;
	            justify-content:flex-start;
	            i {
	            	display:block;
	            	width:16%;
	            	height:120px;
	            	text-align:center;
	            	position: relative;
	            	span{
	            		position: absolute;
	            		bottom:40px;
	            		left:0;
	            		right:0;
	            		margin:0 auto;
	            		display:block;
	            		line-height:30px;
	            		font-size:22px;
	            		color:#666;
	            	}
	            	img{
	            		position: absolute;
	            		left:0;
	            		right:0;
	            		top:0;
	            		margin:auto;
	            	}
	            }
	            i.chuang{
	            	top:5px;
	            	img{
	            		width:37px;
	            		height:34px;
	            	}
	            	
	            }
	            i.shuzhuo{
	            	top:2px;
	            	img{
	            		width:40px;
	            		height:33px;
	            	}
	            }
	            i.yizi{
	            	top:-1px;
	            	img{
	            		width:30px;
	            		height:36px;
	            	}
	            }
	            i.kongtiao{
	            	top:-2px;
	            	img{
	            		width:34px;
	            		height:38px;
	            	}
	            }
	            i.yigui{
	            	img{
	            		width:28px;
	            		height:37px;
	            	}
	            }
	            i.bingxiang{
	            	img{
	            		width:25px;
	            		height:38px;
	            	}
	            }
	            i.dianshi{
	            	img{
	            		width:37px;
	            		height:39px;
	            	}
	            }
	            i.kuandai{
	            	img{
	            		width:37px;
	            		height:37px;
	            	}
	            }
	            i.shafa{
	            	img{
	            		width:38px;
	            		height:33px;
	            	}
	            }
	            i.nuanqi{
	            	img{
	            		width:36px;
	            		height:34px;
	            	}
	            }
	            i.reshuiqi{
	            	img{
	            		width:36px;
	            		height:36px;
	            	}
	            }
	            i.xiyiji{
	            	img{
	            		width:28px;
	            		height:39px;
	            	}
	            }
	            i.fan{
	            	img{
	            		width:41px;
	            		height:33px;
	            	}
	            }
	            i.yangtai{
	            	img{
	            		width:41px;
	            		height:36px;
	            	}
	            }
	            i.duwei{
	            	img{
	            		width:31px;
	            		height:36px;
	            	}
	            }
			}
		}
		.section4{
			padding:0 20px 36px;
			position:relative;
			.detail{
				padding:40px 0;
				line-height:42px;
				font-size:26px;
				color:#666666;
				text-align:justify;
			}
			&:after{
				position:absolute;
				left:0;
				right:0;
				bottom:23px;
				margin:auto;
				width:27px;
				height:15px;
				content:'';
				// background:url('../assets/img/homedetail-up.png') no-repeat center;
			}
		}
	}
	.text-wrap{
		.text {
			line-height:116px;
			font-size:20px;
			text-align:center;
			color:#666;
			position:relative;
			text-indent:40px;
			span{
				color:#1a7bf2;
				cursor: pointer;
			}
			&:before{
				content:'';
				position:absolute;
				left:50%;
				top:50%;
				width:24px;
				height:25px;
				background:url('http://zhujiaapp.oss-cn-hangzhou.aliyuncs.com/img/active-text.png') no-repeat center;
				margin-left:-130px;
				margin-top:-10px;
			}
		}
		.active-text{
			&:before{
				background-image:url('http://zhujiaapp.oss-cn-hangzhou.aliyuncs.com/img/active-text.png');
			}
		}
	}
	.foot{
		width:100%;
		height:100px;
		position: fixed;
		left:0;
		right:0;
		bottom:0;
		box-shadow: 0px 30px 60px 5px rgba(0,0,0,.7);
		-webkit-box-shadow: 0px 30px 60px 5px rgba(0,0,0,.7);
		background-color:#fff;
		button{
			width:95%;
			line-height:80px;
			font-size:28px;
			text-align:center;
			color:#fff;
			margin: 0 auto;
			background: #3288ff;
			margin-top: 10px;
			border-radius: 4px;
			display: block;
		}
	}
}
</style>