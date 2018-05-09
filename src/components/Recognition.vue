<template>
	<div id="recognition" class="container">
		<div class="info">
			<div class="info-pic"><img :src="imgurl+'id-pic1.png'" /></div>
			<div class="info-con">
				<p>
					<span>姓名</span>
					<span>{{landlordInfo.name}}</span>
				</p>
				<p>
					<span>性别</span>
					<span>{{landlordInfo.gender}}</span>
				</p>
				<p>
					<span>出生日期</span>
					<span>{{landlordInfo.dateBirth}}</span>
				</p>
				<p>
					<span>地址</span>
					<span>{{landlordInfo.address}}</span>
				</p>
				<p>
					<span>身份证号</span>
					<span>{{landlordInfo.number}}</span>
				</p>
			</div>
		</div>
		<p class="tip">我们将依法保障你的个人信息安全</p>
	</div>
</template>

<script>
// import MenuTree from '@/components/MenuTree'
import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'
import API from '@/api/index';
export default {
	name:'recognition',
	data() {
		return {
			nodes: this.$router.options.routes,
			t:0,
			saveFlag:false,
			info:{},
			video:{},
			list:[],
			backInfo:{},
		}
	},
	computed:{
		...mapState([
			'isLoading',
			'user',
			'imgurl',
			'landlordInfo'
		]),
		...mapGetters([
	      	'itemAdd'
	    ])
	},
	created() {
		/*this.info = this.front.infoFront;
		this.backInfo = this.back.infoBack;*/
		if(this.landlordInfo){
			
		}else{
			this.findU()
		}
	},
	methods: {
		...mapMutations([
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
		findU(){
	   		let obj = {
	   			id:this.user.id
	   		};
	    	API.findUser(obj)
			.then(res => {
	            if (res.success) { 
	                 if((res.data.status == 1)||(res.data.status == -1)){
	                 	this.setLandlordInfo(res.data)
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
#recognition {
	box-sizing:border-box;
	padding-top:80px;
	height:100%;
	.info{
		margin-top:20px;
		padding:346px 35px 20px;
		position: relative;
		background-color:#fff;
		.info-con{
			p{
				line-height:66px;
				width:100%;
				font-size:28px;
				color:#666;
				span{
					display:inline-block;
				}
				span:nth-of-type(1){
					width:25%;
				}
				span:nth-of-type(2){
					width:73%;
				}
			}
		}
		.info-pic{
			position: absolute;
			left:50%;
			top:50px;
			width:493px;
			height:277px;
			margin-left:-247px;
			img{
				max-width:100%;
				height:auto;
			}
		}
	}
	.btn{
		margin:50px 35px 0;
		padding-top:100px;
		height:64px;
		position: relative;
		button{
			position: absolute;
			left:0;
			top:0;
			width:100%;
			line-height:100px;
			color:#fff;
			text-align:center;
			background-color:#ff643e;
			font-size:34px;
			border-radius:10px;
		}
		.btn-test{
			top:120px;
		}
		p{
			line-height:64px;
			text-align:center;
			font-size:22px;
			color:#666;
			span{
				color:#1a7bf2;
			}
		}
	}
	.tip{
		position: fixed;
		left:0;
		bottom:0;
		right:0;
		width:100%;
		max-width:750px;
		margin:auto;
		line-height:82px;
		color:#666;
		font-size:22px;
		text-align:center;
	}
}
</style>