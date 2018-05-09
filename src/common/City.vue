<template>
    <div id="city">
        <popup-picker :show.sync="showPopupPicker" v-model="formatDemoValue" :data="list3" :columns="3" show-name placeholder="请选择地区" @on-change="onChange" @on-shadow-change="onShadowChange" @on-hide="onHide" value-text-align="left"></popup-picker>
    </div>
</template>

<script>
/* var s = parseInt(window.screen.width) / 375;
        var vp = '<meta name="viewport" content="width=750, minimum-scale = ' + s + ', maximum-scale = ' + s + ', target-densitydpi=device-dpi">';
        document.write(vp);*/
import CityObj from '../api/city.json'
import { PopupPicker,Picker } from 'vux'
import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'
export default {
    name:'city',
    data() {
        return {
            list3: [],
            showPopupPicker:false,
            formatDemoValue: ["330000", "330100", "330108"],
            name:'',
            communityAreaCode:'',
        };
    },
    components:{
        PopupPicker,
        Picker
    },
    computed:{
        ...mapState([
            'user',
            'communityInfo'
        ]),
    },
    methods: {
        ...mapMutations([
            'setUser',
            'setCommunityInfo'
        ]),
        ...mapActions([
            'onSure',
            'onCancel',
            'TAlert',
        ]),
        onChange (value) {
            if(value[value.length-1]){
                this.communityAreaCode = value[value.length-1];
            }else{
                this.communityAreaCode = value[value.length-2];
            }
            // console.log('value', this.communityAreaCode)
        },
        onShadowChange(value,name){
            let newArr = Array.from(new Set(name));
            this.name = newArr.join('');
            // console.log('name',this.name)
        },
        onHide(closeType){
            // console.log(closeType)//判断点击确定按钮还是取消按钮，true为确定按钮
            if(closeType){
                this.setCommunityInfo({
                    key:"communityArea",
                    val:this.name
                })
                this.setCommunityInfo({
                    key:"communityAreaCode",
                    val:this.communityAreaCode
                })
            }
        }
    },
    created(){
        let cityObj = CityObj;
        let cityList = [];
        for(let i in cityObj){
            let item = cityObj[i];
            let obj = {};
            obj.value = item.areaId;
            obj.name = item.areaName;
            obj.parent = 0;
            cityList.push(obj)
            if(item.cities){
                let citiesArr = item.cities;
                let len = citiesArr.length;
                for(let j=0;j<len;j++){
                    let citiesItem = citiesArr[j];
                    let citiesObj = {};
                    citiesObj.value = citiesItem.areaId;
                    citiesObj.name = citiesItem.areaName;
                    citiesObj.parent = item.areaId;
                    cityList.push(citiesObj)
                    if(citiesItem.counties){
                        let countiesArr = citiesItem.counties;
                        let lens = countiesArr.length;
                        for(let n=0;n<lens;n++){
                            let countiesItem = countiesArr[n];
                            let countiesObj = {};
                            countiesObj.value = countiesItem.areaId;
                            countiesObj.name = countiesItem.areaName;
                            countiesObj.parent = citiesItem.areaId;
                            cityList.push(countiesObj)
                        }
                    }
                }
            }
        } 
        this.list3 = cityList;
    },
    mounted() {
        
    },
}

</script>
<style>
    .vux-popup-picker-select{
        line-height:84px;
        font-size:24px;
    }
</style>
<style lang="scss" scoped>
    #city{
        width:100%;
        height:100%;
    }
</style>