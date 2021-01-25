<template>
  <div class="details">
    <div class="topName flexd">
      <div @click="detailsFun">{{info.name}}</div>
      <img v-if="info.showType === 0" class="runimg" src="@/assets/map/Unchecked/run.png" />
      <div class="flexd rightVr" v-if="info.showType === 0 && vrShow" @click="vrGoto">
        <img class="arimg" src="@/assets/map/ar.png" />
        <div class="arText">VR看景</div>
      </div>
      <div class="labelB" v-if="info.showType === 1">{{info.lableText}}</div>
      <div v-if="info.showType === 2">
          <div class="flexd navRight" @click="goNavFun">
            <img class="bottomImg1" src="@/assets/map/nav.png" />
            <div class="bottomText">导航</div>
          </div>
      </div>
      <div v-if="info.stopShow" class="stopNum">
        <span class="freeColor">20</span>
        <span>/100</span>
      </div>
    </div>
    <div class="positionT pl mt5">{{info.address || '200m | 南浔古镇东大街38号'}}</div>
    <div v-if="info.showType === 0" class="overText describe pl mt5">{{info.intro || '南浔金家，位于南浔古镇东大街38号，为南浔近代丝商“八牛”之一，人称小金山'}}</div>
    <div class="pl graded" v-if="info.showType === 1">
      <img class="grade" src="@/assets/map/star1.png" />
      <img class="grade" src="@/assets/map/star1.png" />
      <img class="grade" src="@/assets/map/star1.png" />
      <img class="grade" src="@/assets/map/star1.png" />
      <img class="grade" src="@/assets/map/star2.png" />
    </div>
    <div class="flexd pl" v-if="info.showType === 0 || info.showType === 1">
      <div class="flexd" @click="shareFun">
        <img class="bottomImg" src="@/assets/map/share.png" />
        <div class="bottomText">分享</div>
      </div>
      <div class="flexd statL">
        <img class="bottomImg" src="@/assets/map/star.png" />
        <div class="bottomText">收藏</div>
      </div>
      <div class="flexd" @click="goNavFun">
        <img class="bottomImg" src="@/assets/map/nav.png" />
        <div class="bottomText">导航</div>
      </div>
    </div>
    <div v-if="!show" style="height: 18px;"></div>
  </div>
</template>
<script>
export default {
  props: {
    info: {
      type: Object,
      default: ()=>{
        return {}
      }
    }
  },
  data(){
    return {
      lable: '特色店铺',
      index: 1,
      show: false,
      stop: false,
      vrShow: true
    }
  },
  watch:{
    'info.vrUrl': {
        handler(val) {
            if(this.info.showType === 0){
              if(val.indexOf("https://") != -1){
                this.vrShow = true;
              }else{
                this.vrShow = false;
              }
            }
        },
        immediate: true,
        deep: true
    }
  },
  methods: {
    // 分享
    shareFun(){
      wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
        wx.updateAppMessageShareData({ 
          title: '分享', // 分享标题
          desc: '分享', // 分享描述
          link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: '', // 分享图标
          success: function () {
            // 设置成功
          }
        })
      });
    },
    // 导航
    goNavFun(){
      wx.miniProgram.navigateTo({
        url:'/pages/Navigation/Navigation?latitude='+this.info.latitude+'&longitude='+this.info.longitude+'&address='+this.info.address,
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
    // vr
    vrGoto(){
      console.log('vr---',this.info.vrUrl)
      if(this.info.vrUrl){
        wx.miniProgram.navigateTo({
          url:'/pages/web/web?url='+this.info.vrUrl,
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
      }
    },
    detailsFun(){
      if(this.info.type === '景点'){
        wx.miniProgram.navigateTo({
          url:'/pages/tourist-detail/tourist-detail?id='+ this.info.id,
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
      }
      if(this.info.type === '美食餐饮'){
        wx.miniProgram.navigateTo({
          url:'/pages/food-detail/food-detail?sort=餐馆&id='+ this.info.id,
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
      }
      if(this.info.type === '度假酒店'){
        wx.miniProgram.navigateTo({
          url:'/pages/ticket-detail/ticket-detail?id='+ this.info.id+'&sort=度假酒店',
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
      }
      
    },
    goforFun(){
      wx.miniProgram.navigateTo({
        url:'/pages/food-detail/food-detail?id=66',
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
    }
  },
  mounted(){
    // console.log('组件内部----',this.info)
  }
};
</script>
<style scoped>
.details{
  position: absolute;
  /* width: 357px; */
  width: calc(100% - 20px);
  padding-bottom: 14px;
  background: #FFFFFF;
  box-shadow: 0px 2px 6px 0px rgba(51, 51, 51, 0.42);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  z-index: 999;
  bottom: 0;
  left: 10px;
}
.topName{
  font-weight: 500;
  color: #000000;
  font-size: 18px;
  padding-left: 23px;
  padding-top: 16px;
}
.pl{
  padding-left: 23px;
  margin-top: 10px;
}
.mt10{
  margin-top: 10px;
}
.mt5{
  margin-top: 5px;
}
.runimg{
  width: 17px;
  height: 17px;
  margin-left: 9px;
  margin-top: 5px;
}
.arimg{
  width: 20px;
  height: 20px;
}
.arText{
  font-size: 10px;
  font-weight: 400;
  margin-left: 5px;
  margin-top: 2px;
  color: #000000;
}
.flexd{
  display: flex;
}
.rightVr{
  position: absolute;
  right: 18px;
}
.positionT{
  font-size: 10px;
  font-weight: 500;
  color: rgba(51, 51, 51, 0.62);
  line-height: 14px;
}
.describe{
  color: #000000;
  font-weight: 500;
  font-size: 10px;
  /* width: 321px; */
  height: 45px;
  padding-right: 23px;
}
.bottomImg{
  width: 16px;
  height: 16px;
}
.bottomText{
  font-size: 10px;
  font-weight: 400;
  color: #333333;
  margin-left: 8px;
}
.statL{
  /* margin-left: 85px;
  margin-right: 85px; */
  margin-left: 20%;
  margin-right: 20%;
}
/* 饭店 */
.labelB{
  padding: 0 10px;
  height: 19px;
  line-height: 19px;
  border-radius: 10px;
  border: 1px solid #FA6400;
  font-size: 9px;
  font-weight: 400;
  color: #FA6400;
  text-align: center;
  margin-left: 13px;
  margin-top: 2px;
}
.graded{
  margin-bottom: 12px;
}
.grade{
  width: 10px;
  height: 10px;
  margin-right: 4px;
}
.navRight{
  position: absolute;
  right: 32px;
  margin-top: 10px;
}
.bottomImg1{
  width: 17px;
  height: 17px;
}
.stopNum{
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-left: 10px;
  margin-top: 5px;
}
.freeColor{
 color: #60ABFF;
}
.overText{
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp:3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    word-break: break-all;
}
</style>
