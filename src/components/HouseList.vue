<template>
	<div style="margin-top: 80px;">
		<tab v-model="index01" prevent-default @on-before-index-change="switchTabItem"  custom-bar-width="100px" :scroll-threshold="5">
		    <tab-item selected>已发布</tab-item>
		    <tab-item>未发布</tab-item>
	    </tab>
	    <scroller lock-x height="-100" use-pullup :pullup-config="pullupDefaultConfig" @on-pullup-loading="onScrollBottom" ref="scrollerBottom" >
		    <div class="house_list">
		    	<ul>
		    		<li v-for="(items,index) in item" :key=index @click="getid(items.resourceId)">
		    			<div class="house_list_content">
		    				<img :src="items.resourcePictures[0]" />
		    				<span class="house_qxname">{{items.communityName}}</span>
		    				<span class="house_stuat house_stuat1" v-if="items.resourceStatus  === 3" >预约</span>
		    				<span class="house_stuat house_stuat2" v-else-if="items.resourceStatus  === 4" >已出租</span>
		    				<span class="house_stuat house_stuat2" v-else-if="items.resourceStatus  === 0" >待审核</span>
		    				<span class="house_stuat house_stuat2" v-else-if="items.resourceStatus  === 1" >已发布</span>
		    				<span class="house_stuat house_stuat2" v-else-if="items.resourceStatus  === 2" >审核失败</span>
		    				<span class="house_stuat house_stuat2" v-else-if="items.resourceStatus  === 5" >退租中</span>
		    				<span class="house_stuat house_stuat3" v-else >审核失败</span>
		    				<span class="house_sname">{{items.resourceName}}&nbsp;&nbsp;</span>
		    				<span class="house_zf">面积&nbsp;{{items.resourceArea}}m<sup>2</sup></span>
		    				<span class="house_zj"><em>￥&nbsp;{{items.monthPrice}}</em></span>
		    			</div>
		    		</li>
		    			
		    	</ul>
		    </div>

	    	<divider v-show="isshow">我是有底线的</divider>
	 	</scroller>
	</div>
</template>

<script>
	import { Tab, TabItem,Scroller,Divider   } from 'vux'
	import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'
	import API from '@/api/index'
	import Vue from 'vue'
	
	export default {
		name:'RentingOrder',
	  components: {
	    Tab,
	    TabItem,
	  	Scroller,
	  	Divider 
	  },
	  data () {
	    return {
	      index01: 0,
	      communityId:'',
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
	      pageNum:1,
	      item:[],
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
	    switchTabItem (index) {
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
	    getid(id){
	    	this.$router.push({
	            path: '/housedetail', 
	            name: 'housedetail',
	            query: { 
	                resourceId:id,
	                type:this.index01
	            }
	        })
	    },
	    ajax (){
	    	this.updateLoading(true);
	    	let _this = this;
	  	  	let obj = {};
			if( this.communityId == '' ){
				obj = {
		  	  		landlordId:JSON.parse(window.sessionStorage.getItem('user')).id,
		  	  		resourceStatus:this.index01 === 0 ? 1:0,
		  	  		pageNum:this.pageNum
		  	  	}
			}else{
				obj = {
		  	  		landlordId:JSON.parse(window.sessionStorage.getItem('user')).id,
		  	  		resourceStatus:this.index01=== 0 ? 1:0,
			  		communityId:this.communityId,
		  	  		pageNum:this.pageNum
		  	  	}
			}
			API.resourceList(obj).then( res=> { 
				res.data.forEach(function( e,i ){
					_this.item.push(e);
				});
				_this.updateLoading(false);
				if( res.data.length == 20 ){
					_this.isshow = false;
					_this.$refs.scrollerBottom.reset();
					_this.$refs.scrollerBottom.donePullup()
				}else{
					_this.$refs.scrollerBottom.reset();
					_this.$refs.scrollerBottom.disablePullup();
					_this.isshow = true;
				}
			})
			.catch( error => {
				console.log(error);
				_this.updateLoading(false);
				_this.$refs.scrollerBottom.donePullup();
				_this.$refs.scrollerBottom.reset();
			})
	    }
//	   getAlert(str){
//        this.TAlert({
//            show: true,
//            content: str,
//            cancel: false,
//            onSure: function (){}
//        })
//    },
	 },
	 computed:{
      ...mapState([
        'user',
        'isLoading',
        'imgurl'
      ]),
    },
  	  created () {
	  	this.ajax();
      }
	}
</script>

<style lang="less">
	@import '~vux/src/styles/1px.less';
	@import '~vux/src/styles/center.less';
	.house_list{
		width:100%;
		background: #fff;
		ul{
			li{
				height:195px;
			}
		}
	}
	
	.vux-tab .vux-tab-item.vux-tab-selected{
		color: #3288ff !important;
    	/*border-bottom: 3px solid #3288ff !important;*/
    	
	}
	.vux-tab-bar-inner{
		background-color: #3288ff !important;
	}
	.xs-plugin-pullup-container{
		line-height: 80px;
		font-size: 23px;
		color:#666;
	}
	.vux-divider{
		font-size:23px;
		padding: 25px 0px !important;
	}
	.house_list_content{
		width:90%;
		float:right;
		height:195px;
		border-bottom:1px solid #e5e5e5;
		margin-right:5%;
		clear: both;
		img{
			width:200px;
			height:130px;
			display:block;
			float:left;
			margin-top:32px;
		}
		.house_stuat{
			font-size:20px;
			padding:5px 10px;
			border-radius: 4px;
			color:#fff;
			float:right;
			margin-top:32px;
		}
		.house_stuat1{	
			background: #3288ff;
		}
		.house_stuat2{
			background: #dc9100;
		}
		.house_stuat3{
			background: #adabab;
		}
		.house_qxname{
			font-size:30px;
			color:#333;
			padding-top:35px;
			display:inline-block;
			padding-left:35px;
		}
		.house_sname{
			font-size:26px;
			color:#666;
			padding-top:20px;
			display:block;
			padding-left:235px;
		}
		.house_zf{
			font-size:24px;
			color:#666;
			padding-top:20px;
			display:inline-block;
			padding-left:35px;
			
		}
		.house_zj{
			font-size:24px;
			color:#666;
			padding-top:17px;
			display:inline-block;
			padding-left:35px;
			float: right;
			em{
				color:#ff7a19;
			}
		}
	}
	.vux-tab-wrap{
		padding-top: 80px !important;
	}
	.vux-tab-container{
		height:80px !important;
	}
	.vux-tab{
		height:80px !important;
	}
	.vux-tab .vux-tab-item{
		font-size: 28px !important;
		line-height: 80px !important;
	}
</style>