import axios from './http'
const crypto = require('crypto-js');
// let url = 'http://192.168.1.176:2001';
/*开发环境*/

/*let basePath = 'http://192.168.1.11:2002';*/

/*测试环境*/
/*let basePath1 = 'http://192.168.1.197:2002';*/

/*阿里云环境*/
/*let basePath = 'http://47.96.190.157:2002';*/

/*登陆*/
export const login = params => { 
	return axios.post('/landlord/login', JSON.stringify(params))
		.then(res => res.data)
		.catch(error => error ); 
};
/*手机验证码*/
export const code = params => { 
	return axios.post('/landlord/sendNodeCode', JSON.stringify(params))
		.then(res => res.data)
		.catch(error => error ); 
};
/*忘记密码*/
export const forgetPwd = params => { 
	return axios.post('/landlord/forgoPwd', JSON.stringify(params))
		.then(res => res.data)
		.catch(error => error ); 
};
/*重置密码*/
export const setPwd = params => { 
	return axios.post('/landlord/updatePwd', JSON.stringify(params))
		.then(res => res.data)
		.catch(error => error ); 
};
/*验证手机号是否已注册*/
export const isRegister = params => { 
	return axios.post('/landlord/isRegister', JSON.stringify(params))
		.then(res => res.data)
		.catch(error => error ); 
};
/*----------------------------新增-----------------------------------*/

/*查找用户认证信息*/
export const findUser = params => { 
	return axios.post('/landlordReal/findUser', params)
		.then(res => res.data)
		.catch(error => error );  
};

/*绑定银行卡信息*/
export const addBank = params => { 
	return axios.post('/landlordApp/bindcardreq', JSON.stringify(params))
		.then(res => res.data)
		.catch(error => error ); 
};
/*获取银行卡信息*/
export const bankList = params => { 
	return axios.post('/landlordApp/bankCardInfo', JSON.stringify(params))
		.then(res => res.data)
		.catch(error => error ); 
};
/*绑定银行卡短信验证*/
export const smsDelivery = params => { 
	return axios.post('/landlordApp/smsDelivery', JSON.stringify(params))
		.then(res => res.data)
		.catch(error => error ); 
};
/*-------------------------------------------------------------------------------------*/
/*首页信息*/
export const homeInfo = params => { 
	return axios.post('/indexApp/indexStatistics', JSON.stringify(params))
		.then(res => res.data)
		.catch(error => error ); 
};
/*小区列表*/
export const areaList = params => { 
	return axios.post('/community/communityList', JSON.stringify(params))
		.then(res => res.data)
		.catch(error => error ); 
};
/*新增小区*/
export const addArea = params => { 
	return axios.post('/community/insert', JSON.stringify(params))
		.then(res => res.data)
		.catch(error => error ); 
};
/*房屋设施*/
export const faclityInfo = params => { 
	return axios.post('/landlordResource/resourceFaclityInfo', JSON.stringify(params))
		.then(res => res.data)
		.catch(error => error ); 
};
/*新增房源*/
export const createHouse = params => { 
	return axios.post('/landlordResource/create', JSON.stringify(params))
		.then(res => res.data)
		.catch(error => error ); 
};
/**/
/*房源详情*/
export const houseDetail = params => { 
	return axios.post('/landlordResource/resourceInfo', JSON.stringify(params))
		.then(res => res.data)
		.catch(error => error ); 
};




export const BillList = (params) => { 
	return axios.post(basePath2+'/agent/smartMeter/acquireMeterBalance',params)
		.then(res => res.data)
		.catch(error => error ); 
};


/*---------------房源管理------------*/
//房源列表
export const resourceList = (params) => { 
	return axios.post('/landlordResource/resourceList',JSON.stringify(params))
		.then(res => res.data)
		.catch(error => error ); 
};

//房源详情

export const resourceInfo = (params) => { 
	return axios.post('/landlordResource/resourceInfo',JSON.stringify(params))
		.then(res => res.data)
		.catch(error => error ); 
};

/*----------------出租------------------*/
//出租房屋列表
export const rentOrderList = (params) => { 
	return axios.post('/landlordAffirm/rentOrderList',JSON.stringify(params))
		.then(res => res.data)
		.catch(error => error ); 
};

//房源出租账单统计
export const statisticsBill = (params) => { 
	return axios.post('/landlordBill/statisticsBill',JSON.stringify(params))
		.then(res => res.data)
		.catch(error => error ); 
};
//房源出租账单列表
export const houseBillList = (params) => { 
	return axios.post('/landlordBill/houseBillList',JSON.stringify(params))
		.then(res => res.data)
		.catch(error => error ); 
};
//退租动作
export const backRentAffirm = (params) => { 
	return axios.post('/landlordAffirm/backRentAffirm',JSON.stringify(params))
		.then(res => res.data)
		.catch(error => error ); 
};
//房东的租赁确认
export const leaseConfirm = (params) => { 
	return axios.post('/landlord/leaseConfirm',JSON.stringify(params))
		.then(res => res.data)
		.catch(error => error ); 
};



/*远程开门*/
export const openDoor = (params) => { 
	return axios.post('/yunyu/openTheDoor', JSON.stringify(params))
		.then(res => res.data)
		.catch(error => error ); 
};
/*查询电表余额*/
export const waterYu = (params) => { 
	return axios.post('/agent/smartMeter/acquireMeterBalance',params)
		.then(res => res.data)
		.catch(error => error ); 
};


function authorize() {
  var signatureArray = []
  var timeStamp = Date.now()
  var nonce = (Math.random().toString(36).substr(2))
  var apiId = 'c9fc70e6aea14185b1bb448227e9bb7e';
  var apiSecret = 'c359e572ca7041cbaa0f6ed964a41d69';
  signatureArray.push(timeStamp, nonce, apiId)
  var signatureString = signatureArray.sort().join('')
  var hmac = crypto.HmacSHA256(signatureString, apiSecret);
  var authorization = 'key=' + apiId + ',timestamp=' + timeStamp + ',nonce=' + nonce + ',signature=' + hmac
  return authorization
}