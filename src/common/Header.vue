<template>
	<div id="heads">
      	<h3>{{pathObj.meta.title}}</h3>
      	<i v-show="backFlag" class="back" @click="back"><img :src="imgurl+'back.png'" /></i>
      	<i v-show="menuFlag" class="back menu" @click="menu"><img :src="imgurl+'menu.png'" /></i>
      	<i v-show="areaFlag" class="back area-icon" @click="menu"><img :src="imgurl+'area-icon.png'" /></i>
		<!-- <div  class="head-icon">
			<i><img :src="imgurl+'index-city.png'" /></i>
			<i><img :src="imgurl+'index-msg.png'" /></i>
		</div> -->
	</div>
</template>

<script>
import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'
export default {
  	name: 'heads',
  	props:['pathObj'],
  	data(){
  		return {
  			fromName:'',
  			backFlag:false,
  			menuFlag:false,
  			areaFlag:false,
  		}
  	},
  	computed:{
        ...mapState([
            'user',
            'imgurl',
            'sildeFlag'
        ])
    },
	methods:{
		...mapMutations([
	        'setSildeFlag'
	    ]),
		back(){
			if((this.$route.name == 'contractInfo') || (this.$route.name == 'RecognitionResult') || (this.$route.name == 'Recognition') || (this.$route.name == 'Identity') || (this.$route.name == 'AddBank') || (this.$route.name == 'AddResult') || (this.$route.name == 'MyFlatList')){
				this.$router.push({
					path:'/user'
				})
			}else if((this.$route.name == 'user') || (this.$route.name == 'find') || (this.$route.name == 'weihu') || (this.$route.name == 'login')){
				this.$router.push({
					path:'/index',
				})
			}else if(this.$route.name == 'MyFlat'){
				this.$router.replace({
					path:'/myFlatList',
				})
			}else{
				this.$router.go(-1)
			}
		},
		getIconState(obj){
			if(obj.name == 'login'){
				this.backFlag = false;
			}else{
				this.backFlag = true;
			}

			if(obj.name == 'home'){
				this.menuFlag = true;
				this.backFlag = false;
			}else{
				this.menuFlag = false;
			}

			if(obj.name == 'house'){
				this.areaFlag = true;
			}else{
				this.areaFlag = false;
			}
		},
		menu(){
			this.setSildeFlag(true)
		}
	},
 	created() {
		this.getIconState(this.pathObj)	
	},
	watch:{
	    pathObj(){
	    	this.getIconState(this.pathObj)
	    }
 	},
}
</script>

<style lang="scss">
#heads {
	// padding-top:40px;
	// height:120px;
	margin:0 auto;
	width:100%;
	height:80px;
	max-width:750px;
	background-color:#fff;
	position:relative;
	box-sizing:border-box;
	border-bottom:1px solid #e9e9e9;
	h3{
		width:100%;
		line-height:80px;
		text-align:center;
		font-size:32px;
	}
	.back{
		display:block;
		position:absolute;
		left:30px;
		bottom:20px;
		width:20px;
		height:35px;
	}
	.area-icon{
		right:30px;
	}
}
</style>
