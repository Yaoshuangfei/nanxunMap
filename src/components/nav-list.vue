<template>
  <div class="details">
    <div class="listB" v-for="(item,i) in cureeList" :key="i">
      <div class="content" @click="shareFun(item)">
        <div class="topName">{{item.name}} <span style="font-size: 14px;color: #999;">{{item.jl}} km</span></div>
        <div class="positionT">{{item.address? item.address: '暂无地址'}}</div>
      </div>
      <div class="navs" @click="goNavFun(item)">
          <img class="navImg"  src="@/assets/map/Unchecked/nav.png" />
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
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
            var lj = this.distance(this.latitude,this.longitude,item.latitude,item.longitude)
            item['jl'] = lj
              this.cureeList.push(item)
        })
      }
    }
  },
  data(){
    return {
      cureeList: [],
      show: false,
      stop: false,
        latitude:'',
        longitude:'',
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
      goDetail(data){
        var id = data.id;
        var type = data.type;
        var url = '/pages/tourist-detail/tourist-detail?id='+id;
        if(type == '景点'){
            url = '/pages/tourist-detail/tourist-detail?id='+id
        }else if(type == '美食餐饮'){
            url = '/pages/food-detail/food-detail?id='+id+'&sort=美食餐饮'
        }else if(type == '度假酒店'){
            url = '/pages/ticket-detail/ticket-detail?id='+id+'&sort=度假酒店'
        }

        wx.miniProgram.navigateTo({
              url:url,
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
      },
      shareFun(){

      // let wxConfigSignUrl = window.sessionStorage.getItem('wxConfigSignUrl')
      // const isAdnroid = /Android/i.test(navigator.userAgent)
      // let url = window.sessionStorage.getItem('firstEntryUrl').split('#')[0]
      // alert(wxConfigSignUrl,isAdnroid)
      let wxConfigSignUrl = window.sessionStorage.getItem('wxConfigSignUrl')
      const isAdnroid = /Android/i.test(navigator.userAgent)
      // 获取微信JS-SDK配置信息
      let getUrl = isAdnroid ? location.href.split('#')[0] : wxConfigSignUrl
      
      // let url = this.getCaption(getUrl)
      // getUrl = null;
      console.log(getUrl)
      // alert(url);
      axios.get('/api/com/comInfo/getXcxConfig?secret=wxxcx&url='+getUrl).then(res=>{
            let data = res.data.data;
            console.log('noncestr',data.noncestr);
            wx.config({
              debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: data.appId, // 必填，公众号的唯一标识
              timestamp: data.timestamp, // 必填，生成签名的时间戳
              nonceStr: data.noncestr, // 必填，生成签名的随机串
              signature: data.signature,// 必填，签名
              jsApiList: ['updateAppMessageShareData','updateTimelineShareData'] // 必填，需要使用的JS接口列表
            });
            this.shareBtn();
        }).catch(error=>{

        })
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
    },
      distance(la1, lo1, la2, lo2){
          var La1 = la1 * Math.PI / 180.0;
          var La2 = la2 * Math.PI / 180.0;
          var La3 = La1 - La2;
          var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
          var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
          s = s * 6378.137;
          s = Math.round(s * 10000) / 10000;
          s = s.toFixed(2);
          return s;
      },
  },
  created() {
      this.cureeList = [];
      this.list.forEach((item,i)=>{
          var lj = this.distance(this.latitude,this.longitude,item.latitude,item.longitude)
          item['jl'] = lj
            this.cureeList.push(item)
      })
      // if(navigator.geolocation){
      //     navigator.geolocation.getCurrentPosition(
      //         function (position) {
      //             var latitude = position.coords.latitude;
      //             var longitude = position.coords.longitude;
      //             this.latitude = latitude;
      //             this.longitude = longitude;
      //         },
      //         function (err) {
      //             alert("您的浏览器不支持此项技术")
      //         },
      //         {timeout : 6000}
      //     )
      // }
  }
};
</script>
<style scoped>
    .navs {position: absolute;z-index: 9999;width: 80px;right:0;top:0;height:100%;}
.details{
  position: absolute;
  /* width: 357px; */
   height: 246px;
    overflow-y: scroll;
  width: calc(100% - 20px);
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
    width: 80%;
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
