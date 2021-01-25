<template>
  <div class="details">
    <div class="listB" v-for="(item,i) in cureeList" :key="i">
      <div class="content" @click="showAll">
        <div class="topName">{{item.name}}</div>
        <div class="positionT">{{item.address? item.address: '200m | 南浔古镇东大街38号'}}</div>
      </div>
      <img class="navImg" @click="goNavFun(item)" src="@/assets/map/Unchecked/nav.png" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: ()=>{
        return []
      }
    }
  },
  watch: {
    list: {
      handler(val) {
        this.cureeList = [];
        val.forEach((item,i)=>{
          if(i<3){
              this.cureeList.push(item)
            }
        })
      }
    }
  },
  data(){
    return {
      cureeList: [],
      index: 3,
      show: false,
      stop: false
    }
  },
  methods:{
    showAll(){
      // this.cureeList = this.list;
      if(this.cureeList.length === this.list.length){
        this.cureeList = [
          this.list[0],
          this.list[1],
          this.list[2]
        ]
      }else{
        this.cureeList = this.list;
      }
    },
    goNavFun(data){
      console.log(data)
      wx.miniProgram.navigateTo({
        url:'/pages/Navigation/Navigation?latitude='+data.latitude+'&longitude='+data.longitude+'&address='+data.address,
        success: function(){
          console.log('success')
        },
        fail: function(){
          console.log('fail');
        },
        complete:function(){
          console.log('complete');
        }
      });
      // console.log(data.name)
      // wx.openLocation({
      //   latitude: 0, // 纬度，浮点数，范围为90 ~ -90
      //   longitude: 0, // 经度，浮点数，范围为180 ~ -180。
      //   name: '小莲庄', // 位置名
      //   address: 'xxxx', // 地址详情说明
      //   scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
      //   infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
      // });
      // wx.getLocation({
      //   type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      //   success: function (res) {
      //       var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
      //       var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
      //       var speed = res.speed; // 速度，以米/每秒计
      //       var accuracy = res.accuracy; // 位置精度
      //       console.log(res)
      //   }
      // });
    }
  },
  created() {
      this.cureeList = [];
      this.list.forEach((item,i)=>{
        if(i<3){
            this.cureeList.push(item)
          }
      })
  }
};
</script>
<style scoped>
.details{
  position: absolute;
  /* width: 357px; */
  /* height: 246px; */
  width: calc(100% - 20px);
  overflow: auto;
  max-height: 550px;
  padding-bottom: 14px;
  background: #FFFFFF;
  box-shadow: 0px 2px 6px 0px rgba(51, 51, 51, 0.42);
  border-radius: 10px 10px 0px 0px;
  z-index: 999;
  bottom: 0;
  left: 10px;
}
.listB{
  height: 60px;
  border-bottom: 1px solid #F1F1F1;
  position: relative;
}
.content{
  margin-left: 18px;
  margin-top: 19px;
}
.topName{
  font-weight: 500;
  color: #000000;
  font-size: 18px;
  /* padding-left: 23px; */
  /* padding-top: 16px; */
}
.positionT{
  font-size: 14px;
  font-weight: 500;
  color: rgba(51, 51, 51, 0.62);
  line-height: 14px;
  margin-top: 4px;
}
.mt10{
  margin-top: 10px;
}
.mt5{
  margin-top: 5px;
}
.flexd{
  display: flex;
}
.navImg{
  width: 16px;
  height: 16px;
  position: absolute;
  right: 20px;
  top: 12px;
  z-index: 99;
}
</style>
