<template>
    <div id="areaHouse">
        <div class="part">
            <h3>基本信息：</h3>
            <div class="info-wrap">
                <div class="info">
                    <p>门牌号</p>
                    <div class="input-wrap input2">
                        <input type="number" v-model="nameInfo.no" placeholder="几幢" /><i>幢</i>
                        <input type="number" v-model="nameInfo.floor" placeholder="几单元" /><i>单元</i>
                        <input type="number" v-model="nameInfo.room" placeholder="几室" /><i>室</i>
                    </div>
                </div>
                <div class="info">
                    <p>租赁类型</p>
                    <div class="input-wrap input4">
                        <div class="item" v-for="(item,index) in rentType" :key="item.type">
                            <div @click="rentClick($event,item,index)" :class="[currentRentIndex == index ? 'active' : '']">
                                <i></i><span>{{item.name}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="info" v-show="shareShow">
                    <p>房源租金（元）</p>
                    <div class="input-wrap input2">
                        <input type="number" v-model="houseInfo.monthPrice" placeholder="月付价" /><i>元</i>
                        <input type="number" v-model="houseInfo.quarterPrice" placeholder="季付价" /><i>元</i>
                        <input type="number" v-model="houseInfo.yearPrice" placeholder="年付价" /><i>元</i>
                    </div>
                </div>
                <div class="info">
                    <p>房源信息</p>
                    <div class="input-wrap input3">
                        <input type="number" v-model="houseInfo.area" placeholder="请输入房屋面积（m²）" /><i>m²</i>
                    </div>
                </div>
                <div class="info">
                    <div class="input-wrap input1">
                        <input type="number" v-model="floorInfo.num" placeholder="请输入房间楼层" /><i>楼</i>
                        <input type="number" v-model="floorInfo.allNum" placeholder="请输入总楼层" /><i>楼</i>
                    </div>
                </div>
                <div class="info">
                    <div class="input-wrap input2">
                        <input type="number" v-model="houseTypeInfo.room" placeholder="几室" /><i>室</i>
                        <input type="number" v-model="houseTypeInfo.hall" placeholder="几厅" /><i>厅</i>
                        <input type="number" v-model="houseTypeInfo.guard" placeholder="几卫" /><i>卫</i>
                    </div>
                </div>
                <div class="info" v-show="shareShow">
                    <p>房间朝向</p>
                    <div class="input-wrap input4">
                        <div class="item" v-for="(item,index) in list" :key="item.value">
                            <div @click="toClick($event,item,index)" :class="[currentToIndex == index ? 'active' : '']">
                                <i></i><span>{{item.name}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="part" v-show="shareShow">
            <h3>房屋配置：</h3>
            <div class="info-wrap">
                <div class="item" v-for="(item,key) in faclityObj" :key="item">
                    <div @click="faclityClick($event,key)" :class="[resourceFaclity[key] ? 'active' : '']">
                        <i></i><span>{{item}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="part" v-show="shareShow">
            <h3>房源照片：</h3>
            <div class="info-wrap anit">
                <div class="pic" v-for="(item,index) in pictureArr" :key="index"><i @click="deleteImg(index)"></i><img :src="item.src"></div>
                <div class="pic" @click="addPic"><img :src="imgurl+'house-pic@2x.png'"></div>
                <input type="file" style="display:none" ref="file" @change="fileChange($event)" multiple accept="image/jpeg,image/jpg,image/png" />
            </div>
        </div>
        <div class="foot">
            <button class="btn1" @click="save" v-show="shareShow">{{resourceId?'保存':'提交审核'}}</button>
            <button v-show="!shareShow" @click="save('step')">下一步</button>
        </div>
    </div>
</template>

<script>
import API from '@/api/index';
import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'
export default {
    name:'areaHouse',
    data() {
        return {
            nameInfo:{
                room:'',
                floor:'',
                no:'' 
            },
            houseInfo:{
                monthPrice:'',
                quarterPrice:'',
                yearPrice:'',
                area:''
            },
            houseTypeInfo:{
                room:'',
                hall:'',
                guard:''
            },
            floorInfo:{
                num:'',
                allNum:''
            },
            pictureArr:[],
            faclityObj:{},
            resourceFaclity:{},
            resourceId:'',
            rentType:[
                {
                    name:'整租',
                    type:0
                },{
                    name:'合租',
                    type:1
                }
            ],
            currentRentIndex:0,
            shareShow:true,
            list:[
                {
                    name:'东',
                    value:0
                },{
                    name:'南',
                    value:1
                },{
                    name:'西',
                    value:2
                },{
                    name:'北',
                    value:3
                }
            ],
            currentToIndex:0,
        };
    },
    computed:{
        ...mapState([
            'user',
            'imgurl',
            'isLoading',
            'url'
        ]),
    },
    methods: {
        ...mapMutations([
            'setUser',
            'updateLoading'
        ]),
        ...mapActions([
            'onSure',
            'onCancel',
            'TAlert',
        ]),
        addPic(){
            this.$refs.file.click()
        },
        fileChange(e){
            let file = this.$refs.file.files;
            if (!file.length)return;
            this.createImage(file)
            this.token()
            console.log(this.pictureArr)
        },
        createImage(file){
            var image = new Image();         
            var vm = this;
            var leng=file.length;
            for(var i=0;i<leng;i++){
                var reader = new FileReader();
                reader.readAsDataURL(file[i]); 
                reader.onload =function(e){
                    let obj = {
                        src:e.target.result
                    };
                    let objs = Object.assign(obj,file[i])
                    vm.pictureArr.push(objs);                              
                };                 
            }  
        },
        deleteImg(index){
            this.pictureArr.splice(index,1)
        },
        token(){
            let _this = this;
            _this.updateLoading(true)
            OSS.urllib.request(_this.url+"/file/getToken",
                        {method: 'GET'}, 
                        function (err, response) {
                            if (err) {
                                _this.updateLoading(false)
                                return alert(err);
                            }
                            try {
                                var result = JSON.parse(response);
                            } catch (e) {
                                _this.updateLoading(false)
                                return alert('parse sts response info error: ' + e.message);
                            }
                            if(result.StatusCode == 200){
                                _this.updateOss(result)
                            }else{
                                _this.updateLoading(false)
                            }
                            
                        });
        },
        updateOss(obj){
            let _this = this;
            let file = this.$refs.file.files;
            //let storeAs = 'contract/'+file.name;
            // eslint-disable-next-line
            let client = new OSS.Wrapper({
                accessKeyId: obj.AccessKeyId,
                accessKeySecret: obj.AccessKeySecret,
                stsToken: obj.SecurityToken,
                endpoint: 'http://oss-cn-qingdao.aliyuncs.com',
                bucket: 'zhujiatest'
            });
            if(file.length){
                for (let i = 0; i < file.length; i++) {
                    const files = file[i];
                    var date = new Date();
                    let storeAs = 'houseProperty/'+file[i].name;
                    _this.updateLoading(true)
                    client.multipartUpload(storeAs, files,{
                        progress: function* (percentage, cpt) {
                            // 上传进度
                            // _this.uploadImg.percentage = percentage*100+'%';
                            console.log(percentage);
                        }
                    }).then((results) => {
                        _this.updateLoading(false)
                        /*_this.uploadImg.url=results.url;
                        _this.uploadImg.name=results.name;
                        _this.uploadImg.status=true;
                        _this.show=true;
                        console.log(results.url);
                        console.log(results.name);*/
                    }).catch((err) => {
                        _this.updateLoading(false)
                        alert('上传图片失败，请重试!');
                    });
                }
            }
            /*client.multipartUpload(storeAs, file).then(function (result) {
                if(result.res.statusCode == 200){
                    //_this.sendInfo(index,params)
                }else{
                    _this.updateLoading(false)
                }
            }).catch(function (err) {
                _this.updateLoading(false)
            });*/
        },
        valiteInfo(type){
            let _this = this;
            let nameInfos = this.nameInfo;
            let houseTypeInfos = this.houseTypeInfo;
            let floorInfos = this.floorInfo;
            for(let item in nameInfos){
                if(!nameInfos[item]){
                    _this.TAlert({
                        show: true,
                        content: '请把门牌号补充完整',
                        cancel: false,
                        onSure: function (){}
                    })
                    return false;
                }
            } 
            for(let item in floorInfos){
                if(!floorInfos[item]){
                    _this.TAlert({
                        show: true,
                        content: '请把楼层信息补充完整',
                        cancel: false,
                        onSure: function (){}
                    })
                    return false;
                }
            }
            if(Number(floorInfos.num) > Number(floorInfos.allNum)){
                _this.TAlert({
                    show: true,
                    content: '请输入正确的楼层信息',
                    cancel: false,
                    onSure: function (){}
                })
                return false;
            }
            /*当房源类型为整租时，必须验证*/
            if(!type){
                for(let item in houseTypeInfos){
                    if(!houseTypeInfos[item]){
                        _this.TAlert({
                            show: true,
                            content: '请把房源信息补充完整',
                            cancel: false,
                            onSure: function (){}
                        })
                        return false;
                    }
                }
                if(!this.houseInfo.monthPrice){
                    this.TAlert({
                        show: true,
                        content: '请输入月租金',
                        cancel: false,
                        onSure: function (){}
                    })
                    return false;
                }
                if(Number(this.houseInfo.monthPrice) > Number(this.houseInfo.quarterPrice)){
                    this.TAlert({
                        show: true,
                        content: '请输入正确的租金信息',
                        cancel: false,
                        onSure: function (){}
                    })
                    return false;
                }
                if(Number(this.houseInfo.quarterPrice) > Number(this.houseInfo.yearPrice)){
                    this.TAlert({
                        show: true,
                        content: '请输入正确的租金信息',
                        cancel: false,
                        onSure: function (){}
                    })
                    return false;
                }
                if(!this.houseInfo.area || this.houseInfo.area>1000){
                    this.TAlert({
                        show: true,
                        content: '请输入正确房屋面积',
                        cancel: false,
                        onSure: function (){}
                    })
                    return false;
                }
                if(!this.pictureArr.length){
                    this.TAlert({
                        show: true,
                        content: '请上传房源照片',
                        cancel: false,
                        onSure: function (){}
                    })
                    return false;
                }
                if(this.pictureArr.length>8){
                    this.TAlert({
                        show: true,
                        content: '房源照片最多上传8张',
                        cancel: false,
                        onSure: function (){}
                    })
                    return false;
                }
                let flag = true;
                for(let i in this.resourceFaclity){
                    if(this.resourceFaclity[i]){
                        flag = false;
                        break;
                    }
                }
                if(flag){
                    this.TAlert({
                        show: true,
                        content: '至少选择一个房屋配置',
                        cancel: false,
                        onSure: function (){}
                    })
                    return false;
                }
            }  
            return true;
        },
        setValue(){
            let obj = this.houseInfo;
        },
        save(type){
            //this.$router.replace({ path: '/index' });
            if(this.valiteInfo(type)){
                let pictureName = [];
                for(let i=0;i<this.pictureArr.length;i++){
                    pictureName.push(this.pictureArr[i].name)
                }
                let obj = {...this.houseInfo};
                obj.landlordId = this.user.id;
                obj.communityId = this.$route.query.id;
                obj.name = this.nameInfo.no +'幢'+ this.nameInfo.floor +'单元'+ this.nameInfo.room +'室';
                obj.houseType = this.houseTypeInfo.room +'室'+ this.houseTypeInfo.hall +'厅'+ this.houseTypeInfo.guard +'卫';
                obj.floor = this.floorInfo.num +'/'+ this.floorInfo.allNum;
                obj.resourceFaclity = this.resourceFaclity;
                obj.pictureUrl = pictureName;
                if(this.resourceId){
                    obj.resourceId = this.resourceId;
                }
                // console.log(obj)
                if(type){
                    console.log(obj)
                    window.sessionStorage.setItem('roomDetail',JSON.stringify(obj))
                    this.$router.push({
                        path: '/roomDetail' 
                    });
                }else{
                    this.saveInfo(obj)
                }
            }
        },
        saveInfo(obj){
            this.updateLoading(true);
            API.createHouse(obj).then(res => {
                this.updateLoading(false);
                if(res.success){
                    this.$router.push({
                        path: '/index' 
                    });
                }else{
                    this.TAlert({
                        show: true,
                        content: res.msg,
                        cancel: false,
                        onSure: function (){
                           
                        },
                    })
                }
            }).catch(error => {
                this.updateLoading(false);
            })
        },
        faclityClick(e,id){
            /*let event = e.currentTarget;
            let list = Array.from(event.classList);
            if(list.indexOf('active') != -1){//判断元素当前是否有active类名
                event.classList.remove('active')
                this.resourceFaclity[id] = 0;
            }else{
                event.classList.add('active')
                this.resourceFaclity[id] = 1;
            }*/
            this.resourceFaclity[id] = this.resourceFaclity[id]==0?1:0;
        },
        rentClick(e,item,index){
            this.currentRentIndex = index;
            if(index){
                this.shareShow = false;
            }else{
                this.shareShow = true;
            }
        },
        getFaclityInfo(){
            this.updateLoading(true);
            API.faclityInfo().then(res => {
                this.updateLoading(false);
                if(res.success){
                    this.faclityObj = res.data;
                    let aList = res.data;
                    let json={};
                    for(let i in aList){
                        json[i] = 0;
                    }
                    this.resourceFaclity=json;
                }else{
                    this.TAlert({
                        show: true,
                        content: res.msg,
                        cancel: false,
                        onSure: function (){
                           
                        },
                    })
                }
            }).catch(error => {
                this.updateLoading(false);
            })
        },
        getDetail(){
            let obj = {
                resourceId:this.resourceId,
                landlordId:this.user.id
            };
            this.updateLoading(true);
            API.houseDetail(obj).then(res => {
                this.updateLoading(false);
                if(res.success){
                    this.setInfo(res.data)
                }else{
                    this.TAlert({
                        show: true,
                        content: res.msg,
                        cancel: false,
                        onSure: function (){
                           
                        },
                    })
                }
            }).catch(error => {
                this.updateLoading(false);
            })
        },
        setInfo(obj){
            let nameInfo = obj.resourceName;
            let houseTypeInfo = obj.resourceHouseType;
            let picArr = [];
            if(obj.resourcePictures.length){
                for(let i=0;i<obj.resourcePictures.length;i++){
                    let objs = {
                        src:obj.resourcePicturesUrl[i],
                        name:obj.resourcePictures[i]
                    };
                    picArr.push(objs)
                }
            }
            let rooms = nameInfo.split('幢');
            let floors = rooms[1].split('单元');
            let nos = floors[1].split('室');

            let roomss = houseTypeInfo.split('室');
            let halls = roomss[1].split('厅');
            let guards = halls[1].split('卫');

            this.nameInfo.room = nos[0]; //室
            this.nameInfo.floor = floors[0]; //单元
            this.nameInfo.no = rooms[0]; //幢
            this.houseInfo.monthPrice = obj.monthPrice;
            this.houseInfo.quarterPrice = obj.quarterPrice;
            this.houseInfo.yearPrice = obj.yearPrice;
            this.houseInfo.area = obj.resourceArea;
            this.houseTypeInfo.room = roomss[0];
            this.houseTypeInfo.hall = halls[0];
            this.houseTypeInfo.guard = guards[0];
            this.floorInfo.num = obj.resourceFloor.split('/')[0];
            this.floorInfo.allNum = obj.resourceFloor.split('/')[1];
            this.pictureArr = picArr;//图片列表
            delete obj.resourceFaclity.id;
            delete obj.resourceFaclity.houseResourceId;
            this.resourceFaclity = obj.resourceFaclity;
        },
        step(){
            this.$router.push({
                path: '/roomDetail' 
            });
        },
        toClick(e,item,index){
            this.currentToIndex = index;
        },
    },
    created(){
        this.getFaclityInfo()
        this.resourceId = this.$route.query.resourceId;
        if(this.resourceId){
            this.getDetail()
        }
    },
    mounted(){
        
    }
}
</script>

<style lang="scss" scoped>
    #areaHouse{
        width:100%;
        height:100%;
        padding-top:80px;
        font-size:28px;
        background-color:#fff;
        box-sizing:border-box;
        overflow:auto;
        .part{
            padding-bottom:20px;
            h3{
                padding-top:20px;
                line-height:66px;
                font-size:26px;
                background-color:#f3f3f3;
                color:#666;
                text-indent:30px;
                position: relative;
                &:after{
                    position: absolute;
                    content:'';
                    left:0;
                    right:0;
                    bottom:0;
                    height:1px;
                    background-color:#e4e8eb;
                }
            }
            .info-wrap{
                padding:0 30px;
                overflow:hidden;
                .info{
                    p{
                        padding-top:20px;
                        line-height:70px;
                        font-size:28px;
                        color:#666;  
                    }
                    .input-wrap{
                        height:70px;
                        position: relative;
                        input{
                            width:92%;
                            padding:15px 0;
                            line-height:39px;
                            font-size:26px;
                            color:#333;
                            border-bottom:1px solid #e7e7e7;
                            text-indent:20px;
                        }
                        i{
                            display:block;
                            position: absolute;
                            top:0;
                            line-height:70px;
                            color:#333;
                            font-size:28px;
                        }
                        i:nth-of-type(1){
                            left:27%;
                        }
                        i:nth-of-type(2){
                            left:60%;
                        }
                        i:nth-of-type(3){
                            left:96%;
                        }
                    }
                    .input1{
                        margin:20px 0;
                        input{
                            width:42%;
                        }
                        input:nth-of-type(2){
                            margin-left:8%;
                        }
                        i:nth-of-type(1){
                            left:43%;
                        }
                        i:nth-of-type(2){
                            left:94%;
                        }
                    }
                    .input2{
                        input{
                            width:25%;
                        }
                        input:nth-of-type(2){
                            margin:0 10% 0 8%;
                        }
                    }
                    .input3{
                        i:nth-of-type(1){
                            left:93%;
                        }
                    }
                    .input4{
                        i{
                            left:0!important;
                        }
                    }
                }
                .item{
                    float:left;
                    margin-top:30px;
                    width:20%;
                    height:30px;
                    position: relative;
                    div{
                        display:inline-block;
                    }
                    i{
                        position: absolute;
                        left:0;
                        top:0;
                        width:30px;
                        height:30px;
                        background:url('../assets/img/config@2x.png') no-repeat center;
                    }
                    span{
                        display:inline-block;
                        line-height:30px;
                        text-indent:48px;
                        font-size:24px;
                        color:#666;
                    }
                }
                .active{
                    i{
                        background:url('../assets/img/active-config@2x.png') no-repeat center;
                    }
                }
                .pic{
                    width:120px;
                    height:120px;
                    margin:30px 18px 0 0;
                    background-color:#f2f2f2;
                    overflow:hidden;
                    position: relative;
                    float: left; 
                    img{
                        position: absolute;
                        top:50%; 
                        left:50%;
                        transform: translate(-50%,-50%);
                    }
                    i{
                        display:block;
                        position: absolute;
                        right:0;
                        top:0;
                        width:30px;
                        height:30px;
                        background:url('../assets/img/close@2x.png') center no-repeat;
                        z-index:2;
                    }
                }
            }
            .anit{
                transition: all 0.5s linear;
                -moz-transition: all 0.5s linear; /* Firefox 4 */
                -webkit-transition: all 0.5s linear; /* Safari 和 Chrome */
                -o-transition: all 0.5s linear; /* Opera */
            }
        }
        .foot{
            padding:10px 35px;
            button{
                width:100%;
                line-height:100px;
                color:#fff;
                font-size:34px;
                background-color:#1c7cff;
                border-radius:10px;
            }
        }
    }
</style>