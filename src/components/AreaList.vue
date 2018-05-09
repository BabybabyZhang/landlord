<template>
    <div id="areaList">
        <div class="set-con">
            <ul class="list">
                <li @click="houseDetail(item)" v-for="(item,index) in list" :key="index"><p>{{item.landlordCommunity.name}}</p><span>{{item.landlordCommunity.area}}</span></li>
            </ul>
            <div class="foot">
                <button class="btn1" @click="add">新增小区</button>
            </div>
        </div>
    </div>
</template>

<script>
import API from '@/api/index';
import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'
export default {
    name:'areaList',
    data() {
        return {
            list:[],
        };
    },
    computed:{
        ...mapState([
            'user',
        ]),
    },
    methods: {
        ...mapMutations([
            'setUser'
        ]),
        ...mapActions([
            'onSure',
            'onCancel',
            'TAlert',
        ]),
        add(){
            this.$router.push({ path: '/addArea'});
        },
        houseDetail(obj){
            this.$router.push({
                path: '/addHouse',
                query:{
                    id:obj.landlordCommunity.id
                }
            });
        },
        getList(){
            let obj = {
                landlordId:this.user.id
            };
            API.areaList(obj)
            .then(res => {
                if(res.success){
                    this.list = res.data;
                }
            })
            .catch(error => {

            })
        }
    },
    created(){
        this.getList()
    }
}

</script>

<style lang="scss" scoped>
    #areaList{
        width:100%;
        height:100%;
        padding-top:80px;
        font-size:28px;
        background-color:#fff;
        box-sizing:border-box;
        .set-con{
            padding:0 30px;
            .list{
                width:100%;
                padding-bottom:120px;
                li{
                    position: relative;
                    &:after{
                        content:'';
                        position: absolute;
                        left:0;
                        right:0;
                        bottom:0;
                        height:1px;
                        background-color:#c9c9c9;
                    }
                    p{
                        padding-top:40px;
                        font-size:30px;
                        line-height:30px;
                        color:#666;
                    }
                    span{
                        display:block;
                        line-height:84px;
                        font-size:22px;
                        color:#d5d5d5;
                    }
                }     
            }
            .foot{
              position: fixed;
              left:35px;
              right:35px;
              bottom:10px;
              text-align:center;
                .btn1{
                    width:100%;
                    line-height:100px;
                    color:#fff;
                    font-size:34px;
                    background-color:#1c7cff;
                    border-radius:10px;
                }
            }
        }
    }
</style>