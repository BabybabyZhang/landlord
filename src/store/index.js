import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let userObj = '';
if(window.sessionStorage.getItem('user')){
	userObj = JSON.parse(window.sessionStorage.getItem('user'));
}

const state = {
	url:'http://192.168.1.10:2002',
	isLoading:false,
	tAlert: {
    	show: false,
    	content: '',
    	cancel: false,
    	onSure: function (){
    	},
    	onCancel: function (){
    	}
    },
    user:userObj,//登录时返回的用户信息
    imgurl:'./src/assets/img/',//图片地址
    sildeFlag:false,//控制首页侧边栏的显示
    landlordInfo:null,
    communityInfo:{
    	communityArea:'浙江省杭州市滨江区',
    	communityAreaCode:'330108'
    },//添加小区是选择的小区所在区域
};
const mutations = {
	updateLoading(state,flag){
		state.isLoading = flag;
	},
	setUser(state,obj){
		state.user = obj;
	},
	setSildeFlag(state,flag){
		state.sildeFlag = flag;
	},
	setLandlordInfo(state,obj){
		state.landlordInfo = obj;
	},
	setCommunityInfo({communityInfo},props){
		communityInfo[props.key]=props.val;
	}
};
const getters = {
	
};
const actions = {
	TAlert({state},val){
		state.tAlert = {...val}
	},
	onSure({state}){
		state.tAlert.show = false;
		state.tAlert.onSure();
	},
	onCancel({state}){
		state.tAlert.show = false;
		state.tAlert.onCancel();
	},
};
export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})