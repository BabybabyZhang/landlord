<template>
	<div id="addResult" class="container">
		<div class="result">
			<div><img :src="imgurl+'add-success.png'"></div>
			<span>绑定成功</span>
			<button @click="goIndex">返回</button>
		</div>
	</div>
</template>

<script>
// import MenuTree from '@/components/MenuTree'
import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'
export default {
	name:'addResult',
	data() {
		return {
			nodes: this.$router.options.routes,
		}
	},
	computed:{
		...mapState([
			'item',
			'imgurl'
		]),
		...mapGetters([
	      	'itemAdd'
	    ])
	},
	created() {
		
	},
	methods: {
		...mapMutations([
	      	'updataItem'
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
		goIndex(){
			if(JSON.stringify(this.$route.query) != '{}'){
				this.$router.replace({
					path:'/'+this.$route.query.path,
					query:{
						id:this.$route.query.id
					}
				})
			}else{
				this.$router.replace({
					path:'/index'
				})
			}
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
#addResult {
	height:100%;
	box-sizing:border-box;
	padding-top:80px;
	.result{
		height:100%;
		position: relative;
		div{
			position: absolute;
			left:50%;
			top:50%;
			width:162px;
			height:162px;
			margin-left:-81px;
			margin-top:-300px;
		}
		span{
			position: absolute;
			left:50%;
			top:50%;
			margin-left:-60px;
			margin-top:-120px;
			display:block;
			line-height:40px;
			font-size:32px;
			color:#666;
		}
		button{
			position: absolute;
			left:50%;
			top:50%;
			margin-left:-150px;
			display:block;
			line-height:90px;
			font-size:32px;
			color:#fff;
			width:300px;
			text-align:center;
			background-color:#1c7cff;
			border-radius:10px;
		}
	}
}
</style>