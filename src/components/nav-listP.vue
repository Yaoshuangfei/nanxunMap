<template>
  <div class="details">
    <div class="flexd touTab">
      <div class="w20" @click="tabCheck(1)">
        <div>停车</div>
        <div class="test_b" v-show="index === 1"></div>
      </div>
      <div class="w20" @click="tabCheck(2)">
        <div>高铁</div>
        <div class="test_b" v-show="index === 2"></div>
      </div>
      <div class="w20" @click="tabCheck(3)">
        <div>飞机</div>
        <div class="test_b" v-show="index === 3"></div>
      </div>
    </div>
    <div class="listB" v-if="index === 1" v-for="(item,i) in cureeList" :key="i">
      <div class="content" @click="showAll" >
        <div class="topName">{{item.name}}</div>
        <div class="positionT">{{item.address? item.address: '200m | 南浔古镇东大街38号'}}</div>
      </div>
      <img class="navImg" @click="goNavFun(item)" src="@/assets/map/Unchecked/nav.png" />
    </div>
    <div class="listB" v-if="index === 2" v-for="(item,i) in cureeList" :key="i">
      <div class="content" @click="showAll" >
        <div class="topName">{{item.name}}</div>
        <div class="positionT">{{item.address? item.address: '200m | 南浔古镇东大街38号'}}</div>
      </div>
      <img class="navImg" @click="goNavFun(item)" src="@/assets/map/Unchecked/nav.png" />
    </div>
    <div class="listB" v-if="index === 3" v-for="(item,i) in cureeList" :key="i">
      <div class="content" @click="showAll" >
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
      index: 1,
      show: false,
      stop: false
    }
  },
  methods:{
    tabCheck(i){
      this.index = i;
    },
    showAll(){
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
      // console.log(data.name)
      // wx.openLocation({
      //   latitude: 0, // 纬度，浮点数，范围为90 ~ -90
      //   longitude: 0, // 经度，浮点数，范围为180 ~ -180。
      //   name: '小莲庄', // 位置名
      //   address: 'xxxx', // 地址详情说明
      //   scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
      //   infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
      // });
      wx.getLocation({
        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res) {
            var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            var speed = res.speed; // 速度，以米/每秒计
            var accuracy = res.accuracy; // 位置精度
            console.log(res)
        }
      });
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
.touTab{
  font-weight: 500;
  color: #333333;
  font-size: 16px;
  margin-top: 12px;
}
.w20{
  width: 117px;
  height: 40px;
  flex-direction:column;
  align-items: center;
  justify-content: center;
  display: flex;
}
.test_b{
  width: 37px;
  height: 4px;
  background: #FFC645;
  border-radius: 3px;
  margin-top: 4px;
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
}
</style>
