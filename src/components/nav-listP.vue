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
    <div style="overflow: auto;height: 251px;">
      <div class="listB" v-if="index === 1" v-for="(item,i) in cureeList" :key="i">
        <div class="content" @click="showAll" >
          <div class="topName">{{item.name}} <span style="font-size: 14px;color: #999;">{{item.jl}} km</span></div>
          <div class="positionT">{{item.address? item.address: '暂无地址'}}</div>
        </div>
          <div class="navs" @click="goNavFun(item)">
              <img class="navImg"  src="@/assets/map/Unchecked/nav.png" />
          </div>
      </div>
      <div class="listB" v-if="index === 2" v-for="(item,i) in cureeList" :key="i">
        <div class="content" @click="showAll" >
          <div class="topName">{{item.name}} 
            <!-- <span style="font-size: 14px;color: #999;">{{item.jl}}</span> -->
          </div>
          <div class="positionT"  style="width: 90%;">{{item.content? item.content: '暂无地址'}}</div>
        </div>
        <img class="navImg" @click="goNavFun(item)" src="@/assets/map/Unchecked/nav.png" />
      </div>
      <div class="listB" v-if="index === 3" v-for="(item,i) in cureeList" :key="i">
        <div class="content" @click="showAll" >
          <div class="topName">{{item.name}} 
            <!-- <span style="font-size: 14px;color: #999;">{{item.jl}} km</span> -->
          </div>
          <div class="positionT" style="width: 90%;">{{item.content? item.content: '暂无地址'}}</div>
        </div>
        <img class="navImg" @click="goNavFun(item)" src="@/assets/map/Unchecked/nav.png" />
      </div>
    </div>
  </div>
</template>
<script>
    import AMap from 'AMap';
    import axios from 'axios';
export default {
  // watch: {
  //   list: {
  //     handler(val) {
  //       this.cureeList = [];
  //       val.forEach((item,i)=>{
  //           var lj = this.distance(this.latitude,this.longitude,item.latitude,item.longitude)
  //           item['jl'] = lj
  //             this.cureeList.push(item)
  //       })
  //     }
  //   }
  // },
  data(){
    return {
      cureeList: [],
      index: 1,
        type:'停车场',
      show: false,
      stop: false,
        latitude:'',
        longitude:'',
    }
  },
  methods:{
      getList(){
        // /api/com/comInfo/getInfoByName?name
        // api/com/comPlace/getAll
          axios.get('/api/com/comPlace/getAll?type='+this.type).then(res=>{
              let list = res.data.data;
                    this.cureeList = [];
              list.forEach((item,i)=>{
                        var lj = this.distance(this.latitude,this.longitude,item.latitude,item.longitude)
                        item['jl'] = lj
                          this.cureeList.push(item)
                    })
          }).catch(error=>{

          })
      },
    tabCheck(i){
      this.index = i;
      this.cureeList = [];
      if(i === 1){
        this.type = '停车场';
        this.getList();
        this.$emit('checkType','停车场')
      }else if(i === 2){
        this.type = '高铁';
        this.getNameInfo();
        this.$emit('checkType','高铁')
      }else if(i === 3){
        this.type = '飞机';
        this.getNameInfo();
        this.$emit('checkType','飞机')
      }
    },
    getNameInfo(){
        
        axios.get('/api/com/comInfo/getInfoByName?name='+this.type).then(res=>{
          console.log('-----',res)
          this.cureeList.push(res.data.data);
        }).catch(error=>{

        })
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
      this.getList();
      if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(
              function (position) {
                  var latitude = position.coords.latitude;
                  var longitude = position.coords.longitude;
                  this.latitude = latitude;
                  this.longitude = longitude;
              },
              function (err) {
                  alert("您的浏览器不支持此项技术")
              },
              {timeout : 6000}
          )
      }
  }
};
</script>
<style scoped>
    .navs {position: absolute;z-index: 9999;width: 80px;right:0;top:0;height:100%;}
.details{
  position: absolute;
  /* width: 357px; */
   /* height: 278px; */
  width: calc(100% - 20px);
  /* overflow: auto; */
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
