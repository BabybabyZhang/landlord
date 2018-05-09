<template>
    <div id="areaList">
        <div class="set-con">
            <ul class="list">
                <li><p>小区名称：</p><input v-model="name" placeholder="请填写房屋所在小区" /></li>
                <li><p>地区：</p><City></City></li>
            </ul>
            <div class="foot">
                <button class="btn1" @click="save">保存</button>
            </div>
        </div>
    </div>
</template>

<script>
import City from '@/common/City'
import API from '@/api/index';
import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'
export default {
    name:'areaList',
    data() {
        return {
            name:'',
            btnFlag:true,
        };
    },
    components:{
        City,
    },
    computed:{
        ...mapState([
            'user',
            'communityInfo',
            'isLoading'
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
        save(){
            //this.$router.replace({ path: '/index' });
            let that = this;
            if(!this.name){
                this.TAlert({
                    show: true,
                    content: '请填写小区名称',
                    cancel: false,
                    onSure: function (){
                       
                    },
                })
                return ;
            }else{
                that.updateLoading(true);
                let obj = this.communityInfo;
                obj.communityName = this.name;
                obj.landlordId = this.user.id;
                console.log(obj)
                if(this.btnFlag){
                    this.btnFlag = false;
                    API.addArea(obj).then(res => {
                        that.updateLoading(false);
                        that.btnFlag = true;
                        if(res.success){
                            this.$router.replace({
                                path:'/areaList'
                            })
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
                        that.updateLoading(false);
                        that.btnFlag = true;
                    });
                }
                    
            }
        }
    },
    created(){
        
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
                    input{
                        display:block;
                        padding:20px 0;
                        line-height:44px;
                        font-size:24px;
                        color:#333;
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