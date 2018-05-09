<template>
    <div id="areaHouse">
        <div class="part">
            <div class="info-wrap">
                <div class="info">
                    <p>门牌号</p>
                    <div class="input-wrap input2">
                        <input type="number" v-model="nameInfo.no" placeholder="几幢" readonly /><i>室</i>
                        <input type="number" v-model="nameInfo.floor" placeholder="几单元" readonly /><i>单元</i>
                        <input type="number" v-model="nameInfo.room" placeholder="几室" readonly /><i>室</i>
                    </div>
                </div>
                <div class="info">
                    <p>租赁类型</p>
                    <div class="input-wrap input4">
                        <div class="item" v-for="(item,index) in rentType" :key="item.type">
                            <div :class="[currentRentIndex == index ? 'active' : '']">
                                <i></i><span>{{item.name}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="info">
                    <p>房源楼层</p>
                    <div class="input-wrap input1">
                        <input type="number" v-model="floorInfo.num" placeholder="请输入房间楼层" readonly /><i>楼</i>
                        <input type="number" v-model="floorInfo.allNum" placeholder="请输入总楼层" readonly /><i>楼</i>
                    </div>
                </div>
                <div class="info">
                    <p>房源户型</p>
                    <div class="input-wrap input2">
                        <input type="number" v-model="houseTypeInfo.room" placeholder="几室" readonly /><i>室</i>
                        <input type="number" v-model="houseTypeInfo.hall" placeholder="几厅" readonly /><i>厅</i>
                        <input type="number" v-model="houseTypeInfo.guard" placeholder="几卫" readonly /><i>卫</i>
                    </div>
                </div>
            </div>
        </div>
        <ul class="part-list">
            <li v-for="item in roomList" :key="item.id" @click="addRoom">
                <h3>房间号 {{item.name}}</h3>
                <div class="list-item">
                    <p>
                        <span>租金</span>
                        <b v-show="item.monthPrice">{{item.monthPrice}}元/月</b>
                    </p>
                    <p>
                        <span>面积</span>
                        <b v-show="item.area">{{item.area}}m²</b>
                    </p>
                    <p>
                        <span>朝向</span>
                        <b v-show="item.toword">{{item.toword}}</b>
                    </p>
                    <p>
                        <span>付款方式</span>
                        <b v-show="item.payWay">{{item.payWay}}</b>
                    </p>
                </div>
            </li>
        </ul>
        <div class="foot">
            <button class="btn1" @click="save">{{resourceId?'保存':'完成'}}</button>
        </div>
    </div>
</template>

<script>
import API from '@/api/index';
import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'
export default {
    name:'roomDetail',
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
                    name:'合租',
                    type:1
                }
            ],
            currentRentIndex:0,
            roomList:[],
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
        valiteInfo(){
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
            return true;
        },
        setValue(){
            let obj = this.houseInfo;
        },
        save(){
            //this.$router.replace({ path: '/index' });
            if(this.valiteInfo()){
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
                this.saveInfo(obj)
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
            let nameInfo = obj.resourceName || obj.name;
            let houseTypeInfo = obj.resourceHouseType || obj.houseType;
            let floor = obj.resourceFloor || obj.floor;
            let pictureArr = obj.resourcePicturesUrl || obj.pictureUrl;
            let picArr = [];
            if(pictureArr.length){
                for(let i=0;i<pictureArr.length;i++){
                    let objs = {
                        src:pictureArrUrl[i],
                        name:pictureArr[i]
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
            this.houseInfo.area = obj.resourceArea || obj.area;
            this.houseTypeInfo.room = roomss[0];
            this.houseTypeInfo.hall = halls[0];
            this.houseTypeInfo.guard = guards[0];
            this.floorInfo.num = floor.split('/')[0];
            this.floorInfo.allNum = floor.split('/')[1];
            this.pictureArr = picArr;//图片列表
            if(obj.resourceFaclity){
                delete obj.resourceFaclity.id;
                delete obj.resourceFaclity.houseResourceId;
                this.resourceFaclity = obj.resourceFaclity;
            }
            
            let arr = [];
            for(let i = 0; i < roomss[0]; i++){
                let objs = {};
                objs.name = '';
                objs.area = '';
                objs.monthPrice = '';
                objs.payWay = '';
                objs.toword = '';
                objs.id = i;
                arr.push(objs)
            }
            this.roomList = arr;
        },
        addRoom(){
            this.$router.push({
                path: '/addRoom' 
            });
        }
    },
    created(){
        let obj = window.sessionStorage.getItem('roomDetail');
        this.resourceId = this.$route.query.resourceId;
        if(this.resourceId){
            this.getDetail()
        }else if(obj){
            obj = JSON.parse(obj);
            this.setInfo(obj)
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
        .part-list{
            padding:30px;
            background-color:#f5f5f5;
            li{
                padding:30px;
                margin-bottom:30px;
                background-color:#fff;
                h3{
                    height:50px;
                    font-size:28px;
                    position: relative;
                    &:before{
                        content:'';
                        position: absolute;
                        left:0;
                        right:0;
                        bottom:0;
                        height:1px;
                        background-color:#dfdfdf;
                    }
                    &:after{
                        content:'';
                        position: absolute;
                        right:0;
                        top:12px;
                        width:11px;
                        height:17px;
                        background:url('../assets/img/room-arrow@2x.png') no-repeat center;
                    }
                }
                .list-item{
                    padding-top:10px;
                    width:100%;
                    p{
                        width:50%;
                        line-height:50px;
                        font-size:26px;
                        span,b{
                            display:inline-block;
                            line-height:50px;
                        }
                        span{
                            color:#333;
                        }
                        b{
                            font-weight:100;
                            font-size:24px;
                            color:#444;
                            text-indent:10px;
                        }
                    }
                    p:nth-child(odd){
                        float:left;
                    }
                    p:nth-child(even){
                        margin-left:50%;
                    }
                }
            }
            li:last-child{
                margin-bottom:0;
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