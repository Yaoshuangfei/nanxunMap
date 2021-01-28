<template>
  <div class="home">
	<div class="topTitle flexd">
		<!-- <div class="swiperW"> -->
			<swiper class="swiperW" :options="swiperOption">
				<swiper-slide class="adder" :class="{activeNav: activeIndex === 0}" >
					<div @click="activeFun(0)">景点</div>
				</swiper-slide>
				<swiper-slide class="adder" :class="{activeNav: activeIndex === 1}" >
					<div @click="activeFun(1)">美食</div>
				</swiper-slide>
				<swiper-slide class="adder" :class="{activeNav: activeIndex === 2}" >
					<div @click="activeFun(2)">住宿</div>
				</swiper-slide>
				<swiper-slide class="adder" :class="{activeNav: activeIndex === 6}">
					<div  @click="activeFun(6)">厕所</div>
				</swiper-slide>
				<swiper-slide class="adder" :class="{activeNav: activeIndex === 7}" >
					<div @click="activeFun(7)">停车场</div>
				</swiper-slide>
				<swiper-slide class="adder" :class="{activeNav: activeIndex === 4}">
					<div  @click="activeFun(4)">演出点</div>
				</swiper-slide>
				<swiper-slide class="adder" :class="{activeNav: activeIndex === 5}">
					<div  @click="activeFun(5)">游船码头</div>
				</swiper-slide>
				<swiper-slide class="adder" :class="{activeNav: activeIndex === 12}">
					<div  @click="activeFun(12)">服务</div>
				</swiper-slide>
				<swiper-slide class="adder" :class="{activeNav: activeIndex === 8}">
					<div  @click="activeFun(8)" style="font-size: 12px;">游客休息点</div>
				</swiper-slide>
				<swiper-slide class="adder" :class="{activeNav: activeIndex === 9}">
					<div  @click="activeFun(9)">报警柱</div>
				</swiper-slide>
				<swiper-slide class="adder" :class="{activeNav: activeIndex === 10}">
					<div  @click="activeFun(10)">AED急救</div>
				</swiper-slide>
				<swiper-slide class="adder" :class="{activeNav: activeIndex === 11}">
					<div  @click="activeFun(11)">游客中心</div>
				</swiper-slide>
				<swiper-slide class="adder" :class="{activeNav: activeIndex === 13}">
					<div  @click="activeFun(13)">出入口</div>
				</swiper-slide>
			</swiper>
		<!-- </div> -->
		<div class="adder" style="width: 80px;padding: 0 3px;">
			<div @click="clearModel(true)">更多</div>
			<!-- <img    src="@/assets/map/more.png" /> -->
		</div>
	</div>
	<div class="modelMore" v-show="modelShow">
		<div class="closeH">
			<img @click="clearModel(false)" class="closeW" src="@/assets/map/x.png" />
		</div>
		<div class="flexd btb">
			<div class="modelAdder brb textLin" :class="{activeBg: activeIndex === 0}" @click="activeFun(0)">景点</div>
			<div class="modelAdder brb textLin" :class="{activeBg: activeIndex === 1}" @click="activeFun(1)">美食</div>
			<div class="modelAdder textLin" :class="{activeBg: activeIndex === 2}" @click="activeFun(2)">住宿</div>
			<!-- <div class="modelAdder brb dobleL" :class="{activeBg: activeIndex === 2}" @click="activeFun(2)">
				<div class="mt15">酒店</div>
				<div>民宿</div>
			</div> -->
		</div>
		<div class="flexd btb">
			<!-- <div class="modelAdder brb dobleL" :class="{activeBg: activeIndex === 3}" @click="activeFun(3)">
				<div class="mt15">语音</div>
				<div>导览</div>
			</div> -->
			<div class="modelAdder brb textLin" :class="{activeBg: activeIndex === 7}" @click="activeFun(7)">停车场</div>
			<div class="modelAdder brb textLin" :class="{activeBg: activeIndex === 4}" @click="activeFun(4)">演出点</div>
			<div class="modelAdder textLin" :class="{activeBg: activeIndex === 5}" @click="activeFun(5)">游船码头</div>
			<!-- <div class="modelAdder brb dobleL" :class="{activeBg: activeIndex === 5}" @click="activeFun(5)">
				<div class="mt15">游船</div>
				<div>码头</div>
			</div> -->
		</div>
		<div class="flexd btb">
			<div class="modelAdder brb textLin" :class="{activeBg: activeIndex === 6}" @click="activeFun(6)">厕所</div>
			<div class="modelAdder brb textLin" :class="{activeBg: activeIndex === 8}" @click="activeFun(8)">游客休息点</div>
			<div class="modelAdder textLin" :class="{activeBg: activeIndex === 13}" @click="activeFun(13)">出入口</div>
		</div>
		<div class="flexd btb">
			<div class="modelAdder brb textLin" :class="{activeBg: activeIndex === 11}" @click="activeFun(11)">游客中心</div>
			<div class="modelAdder brb textLin" :class="{activeBg: activeIndex === 12}" @click="activeFun(12)">志愿服务站</div>
			<div class="modelAdder textLin" :class="{activeBg: activeIndex === 9}" @click="activeFun(9)">报警柱</div>
			<!-- <div class="modelAdder brb textLin" :class="{activeBg: activeIndex === 10}" @click="activeFun(10)">AED急救</div> -->
			<!-- <div class="modelAdder brb dobleL" :class="{activeBg: activeIndex === 11}" @click="activeFun(11)">
				<div class="mt15">游客</div>
				<div>中心</div>
			</div> -->
		</div>
		<div class="flexd btb">
			<div style="width: calc(100% / 3.01);" class="modelAdder brb textLin" :class="{activeBg: activeIndex === 10}" @click="activeFun(10)">AED急救</div>
		</div>
	</div>
	<markers-details v-if="details" :info="formData"></markers-details>
	<nav-list :list="navInfoList" v-if="navListShow"></nav-list>
    <div id="container" style="width: 100%;height: 100%;">
	</div>
	<div class="selectDrap defientD" v-if="dropShow">
		<div class="drap-topTitle" @click="dropBtn(false)">{{topName}}</div>
	</div>
	<div class="selectDrap downL" v-else>
		<div class="drap-topTitle" @click="contentFun(1)">{{topName}}</div>
		<div class="drap-ctitle" @click="contentFun(2)">{{bottomName}}</div>
		<div class="drap-bottom" @click="resetWx">手绘地图</div>
	</div>
	<div class="periphery mapTuli">
		<img class="peripheryImg" @click="periphery = false" v-if="periphery" src="@/assets/map/fun/periphery.png" />
		<img class="peripheryImg" @click="periphery = true" v-else src="@/assets/map/fun/periphery1.png" />
		<div class="peripheryText">周边</div>
	</div>
	<div class="live mapTuli">
		<img class="peripheryImg" @click="live = false" v-if="live" src="@/assets/map/fun/live.png" />
		<img class="peripheryImg" @click="live = true" v-else src="@/assets/map/fun/live1.png" />
		<div class="peripheryText">实况</div>
	</div>
	<div class="headset mapTuli">
		<img class="peripheryImg" @click="headset = false" v-if="headset" src="@/assets/map/fun/periphery.png" />
		<img class="peripheryImg" @click="headset = true" v-else src="@/assets/map/fun/periphery1.png" />
		<div class="headsetText">边走边游</div>
	</div>
	<div class="position mapTuli">
		<img class="peripheryImg" @click="position = false" v-if="position" src="@/assets/map/fun/position.png" />
		<img class="peripheryImg" @click="position = true" v-else src="@/assets/map/fun/position1.png" />
	</div>
	<div class="refresh mapTuli">
		<img class="peripheryImg" @click="refresh = false" v-if="refresh" src="@/assets/map/fun/refresh.png" />
		<img class="peripheryImg" @click="refresh = true" v-else src="@/assets/map/fun/refresh1.png" />
	</div>
      <div class="alert" v-if="fixeds">
          <div class="alertMain">
              <div class="alertMain01">提示</div>
              <div class="alertMain02">暂无无数据！</div>
          </div>
      </div>
  </div>
</template>

<script>
import AMap from 'AMap';
import markersDetails from '@/components/markers-details';
import navList from '@/components/nav-list';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
export default {
  name: "Home",
  components: {
	markersDetails,
	navList,
	Swiper,
    SwiperSlide
  },
  data(){
    return {
        fixeds: false,
		periphery: true,
		live: true,
		headset: true,
		position: true,
		refresh: true,
		swiperOption: {
          slidesPerView: 5,
          spaceBetween: 5,
          freeMode: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        },
		markerIMg: '',
		topName: '电子地图',
		bottomName: '影像地图',
		dropShow: true,
		modelShow: false,
		activeIndex: 0,
		details:false,
		navListShow: false,
		trafficLayer: null,
		checkImg: false,
		map: null,
		markers: [],
		navInfoList:[],
		type: '景点',
		showType: 0,
        lhg:'',
		formData:{
			showType: 0,
			lableText: '',
			stopShow: false
		},
        latitude:'',
        longitude:'',
     }
  },
  methods: {
	resetWx(){
		// this.$router.push({path:'/shamap'})
		// window.location.href="https://nanxun.zjtoprs.com/drawing"
		wx.miniProgram.navigateTo({
			url:'/pages/webMap/map',
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
	/**
	 * 地图切换
	 */
	dropBtn(key){
		this.dropShow = key;
	},
	contentFun(i){
		if(i===1){
			// this.trafficLayer.show();
			this.dropBtn(true)
		}
		if(i === 2){
			const name = JSON.parse(JSON.stringify(this.topName));
			this.topName = this.bottomName;
			this.bottomName = name;
			if(this.topName === '电子地图'){
				this.trafficLayer.hide();
			}else{
				this.trafficLayer.show();
			}
			this.dropBtn(true)
		}
		// else{
		// 	this.trafficLayer.hide();
		// 	// this.xxxx = false;
		// }
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
	/**
	 * 
	 * type点击
	 */
	typeClick(type,key){
		if(this.addMarkers.length > 0){
			this.removeMarkers()
		}
		this.type = type;
		this.navInfoList = [];
		if(key){
			this.getList();
		}else{
			this.facilitiesFun();
		}
	},
	/**
	 * 设施查询
	 */
	facilitiesFun(){
		axios.get('/api/com/comPoi/getAll?type='+this.type).then(res=>{
			if(res.data.data.length > 0){
				let list = res.data.data;
				this.addMarkers(list);
			}else{
				// alert('无数据');
                this.fixeds = true;
			}
		}).catch(error=>{

		})
	},
	/**
	 * 场所查询
	 * 根据场所类型查询marker集合
	 */
	getList(){
      axios.get('/api/com/comPlace/getAll?type='+this.type).then(res=>{
			let list = res.data.data;
			this.addMarkers(list);
      }).catch(error=>{

      })
	},
	// 地图初始化
	getPstion(){
		const _this = this;
		if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                function (position) {
					console.log(position)
                    _this.latitude = position.coords.latitude;
					_this.longitude = position.coords.longitude;
					_this.initMap();
                },
                function (err) {
					// _this.longitude = 120.42575639;
					// _this.latitude = 30.87733871;
					alert("您的浏览器不支持此项技术")
					// _this.initMap();
                },
                {timeout : 6000}
            )
		}
	},
    initMap() {
		let center = [this.longitude,this.latitude];
		// let center = [120.42575639,30.87733871]
		console.log(center)
      	this.map = new AMap.Map('container', {
			resizeEnable: true,
			center: center,//[120.42575639,30.87733871]
			zoom: 30, //地图显示的缩放级别
			// zoom: 18, //地图显示的缩放级别
			// mapStyle: "amap://styles/fc6491ecfa687b17c510ef443229e034",
		});
		this.trafficLayer = new AMap.TileLayer.Satellite({
			zIndex: 10
		});
		this.trafficLayer.setMap(this.map);
		this.trafficLayer.hide();
		this.getList();
		// let imgss = require('./../assets/map/Unchecked/p.png');
		// var markerContent = `<div class="custom-content-marker">
		// 			<img class="markerImg" src="${imgss}">
		// 		</div>`
		// var marker = new AMap.Marker({
		// 	position: center,
		// 	// 将 html 传给 content
		// 	content: markerContent,
		// 	// 以 icon 的 [center bottom] 为原点
		// 	offset: new AMap.Pixel(0, 0)
		// });
		// this.map.add(marker);
	},
	// markerImg 删选
	initImg(){
		// let img = '';
		if(this.activeIndex === 0){
			//景点
			this.markerIMg = require('./../assets/map/Unchecked/scenic_spot.png');
		}else if(this.activeIndex === 1){
			//美食
			this.markerIMg = require('./../assets/map/Unchecked/restaurant.png');
		}else if(this.activeIndex === 2){
			//酒店
			this.markerIMg = require('./../assets/map/Unchecked/hotel.png');
		}else if(this.activeIndex === 3){
			//语音
			this.markerIMg = require('./../assets/map/Unchecked/yuyin.png');
		}else if(this.activeIndex === 4){
			//演出点
			this.markerIMg = require('./../assets/map/Unchecked/yanchu.png');
		}else if(this.activeIndex === 5){
			//游船
			this.markerIMg = require('./../assets/map/Unchecked/matou.png');
		}else if(this.activeIndex === 6){
			//厕所
			this.markerIMg = require('./../assets/map/Unchecked/wc.png');
		}else if(this.activeIndex === 7){
			//停车场
			this.markerIMg = require('./../assets/map/Unchecked/p.png');
		}else if(this.activeIndex === 8){
			//游客休息点
			this.markerIMg = require('./../assets/map/Unchecked/qixi.png');
		}else if(this.activeIndex === 9){
			//报警柱
			this.markerIMg = require('./../assets/map/Unchecked/bj.png');
		}else if(this.activeIndex === 10){
			//AED急救
			this.markerIMg = require('./../assets/map/Unchecked/sos.png');
		}else if(this.activeIndex === 11){
			//游客
			this.markerIMg = require('./../assets/map/Unchecked/zhong.png');
		}else if(this.activeIndex === 12){
			//志愿服务站
			this.markerIMg = require('./../assets/map/Unchecked/server.png');
		}else if(this.activeIndex === 13){
			//c出入口icon更换
			this.markerIMg = require('./../assets/map/Unchecked/server.png');
		}
	},
	// 添加marker集合
	async addMarkers(list){
		let _this = this;
		this.navInfoList = list;
		this.navListShow = true;
		this.markers = [];
		await this.initImg();
		// if(list.length > 0){
		// 	if(list[0].longitude && list[0].latitude){
		// 		AMap.setPointToCenter(list[0].longitude, list[0].latitude)
		// 	}
		// }
		list.forEach((item)=>{
			if(item.longitude && item.latitude){
				let point = [item.longitude,item.latitude]
                var lj = this.distance(this.latitude,this.longitude,item.latitude,item.longitude)
                item['jl'] = lj
				var markerContent =  '' +
				// '<div class="custom-content-marker">' +
				//  '   <div class="" onclick="clearMarker()">11111</div>' +
				// '   <img src="~@/assets/map/Unchecked/hotel.png">' +
				// '</div>';
				`<div class="custom-content-marker">
					<div class="markerText" style="width: ${12*item.name.length+55}px">${item.name} 
					<span style="color: #F47668;position: absolute;right: -5px;">${item.jl} km</span>
					</div>
					<img class="markerImg" src="${this.markerIMg}">
				</div>`
				var marker = new AMap.Marker({
					position: [item.longitude,item.latitude],
					map: this.map,
					// 将 html 传给 content
					content: markerContent,
					// 以 icon 的 [center bottom] 为原点
					offset: new AMap.Pixel(-13, -30)
				});
				marker.data = item;
				marker.on('click', function(e) {
					_this.getTypeDetails(e.target.data);
				});
				this.markers.push(marker);
			}
		})
	},
	/**
	 * 根据markerID获取详情
	 */
	getTypeDetails(obj){
		let listIndex = [3,4,6,9,10,12,13];
		
		if(listIndex.indexOf(this.activeIndex) >= 0){
			axios.get('/api/com/comPoi/getById?id='+obj.id).then(res=>{
				console.log(res.data.data)
				if(res.data.data){
					let list = res.data.data.records;
					this.details = true;
					this.navListShow = false;
					this.formData = {...this.formData,...res.data.data,showType: this.showType};
				}else{
					alert('无数据');
				}
			}).catch(error=>{

			})
		}else{
			axios.get('/api/com/comPlace/getById?id='+obj.id).then(res=>{
				console.log(res.data.data)
				if(res.data.data){
					let list = res.data.data.records;
					this.details = true;
					this.navListShow = false;
					this.formData = {...this.formData,...res.data.data,showType: this.showType};
				}else{
					alert('无数据');
				}
			}).catch(error=>{

			})
		}
	},
	initMap1(){
      	this.map = new AMap.Map('container', {
			resizeEnable: true,
			center: [116.405467, 39.907761],
			zoom: 13, //地图显示的缩放级别
			// mapStyle: "amap://styles/fc6491ecfa687b17c510ef443229e034",
		  });
		// 以 icon URL 的形式创建一个途经点
		var positions = [[116.405467, 39.907761], [116.415467, 39.907761], [116.415467, 39.917761], [116.425467, 39.907761],
			[116.385467, 39.907761]];
		let deviceUrl = require('./..//assets/map/Unchecked/hotel.png');
		var markerContent =  '' +
        // '<div class="custom-content-marker">' +
        //  '   <div class="" onclick="clearMarker()">11111</div>' +
        // '   <img src="~@/assets/map/Unchecked/hotel.png">' +
		// '</div>';
		`<div class="custom-content-marker">
			<div style="width: 100px;position: absolute;top: -20px;left: -10px;">龙门客栈</div>
			<img style="width:30px;height:30px;" src="${deviceUrl}">
		</div>`
		
		positions.forEach((item,index)=>{
			var marker = new AMap.Marker({
				position: item,
				map: this.map,
				// 将 html 传给 content
				content: markerContent,
				// 以 icon 的 [center bottom] 为原点
				offset: new AMap.Pixel(-13, -30)
			});
			marker.zIndex = '我是第'+index;
			marker.on('click', function(e) {
				console.log(e.target.zIndex);
			});
			// var clickHandle = AMap.event.addListener(marker, 'click', function(e) {
			// 	console.log('dianji',e.target.getExtData())
			// 	// thit.cur =JSON.parse(JSON.stringify(e.target.getExtData()));
			// 	// console.
			// 	//得到的数据
			// });
			this.markers.push(marker);
		})

		// var marker = new AMap.Marker({
		// 	position: [116.4,39.92],
		// 	// 将 html 传给 content
		// 	content: markerContent,
		// 	// 以 icon 的 [center bottom] 为原点
		// 	offset: new AMap.Pixel(-13, -30)
		// });

		// var clickHandle = AMap.event.addListener(marker, 'click', function(e) {
		// 	console.log('dianji',e.target.getExtData())
		// 	// thit.cur =JSON.parse(JSON.stringify(e.target.getExtData()));
		// 	// console.
		// 	//得到的数据
		// });
		// this.map.add(marker);
	},
	// 清楚markers
	removeMarkers(){
		this.map.remove(this.markers);
	},
	clearModel(e){
		this.modelShow = e;
	},
	activeFun(i){
		console.log(i);
        this.fixeds = false;
		this.activeIndex = i;
		this.formData.stopShow = false;
		this.details = false;
		let type = '景点';
		let key = false;
		switch(i){
			case 0:
				type = '景点';
				key = true;
				this.showType = 0;
				break;
			case 1:
				type = '美食餐饮';
				key = true;
				this.showType = 1;
				this.formData.lableText = '特色店铺';
				break;
			case 2:
				type = '度假酒店';
				key = true;
				this.showType = 1;
				this.formData.lableText = '五星级酒店';
				// type = '精品民宿'  
				break;
			case 3:
				key = false;
				type = '语音导览服务站';
				this.showType = 2;
				break;
			case 4:
				// 222
				key = false;
				type = '演出点';
				this.showType = 2;
				break;
			case 5:
				type = '码头';
				key = true;
				this.showType = 2;
				break;
			case 6:
				// 2222
				key = false;
				type = '厕所';
				this.showType = 2;
				break;
			case 7:
				type = '停车场';
				key = true;
				this.showType = 2;
				this.formData.stopShow = true;
				break;
			case 8:
				type = '游客休息点';
				key = true;
				this.showType = 2;
				break;
			case 9:
				// 2222 
				key = false;
				type = '报警柱';
				this.showType = 2;
				break;
			case 10:
				// 2222
				key = false;
				type = 'AED急救箱';
				this.showType = 2;
				break;
			case 11:
				type = '游客中心';
				key = true;
				this.showType = 2;
				break;
			case 12:
				key = false;
				type = '志愿服务站';
				this.showType = 2;
				break;
			case 13:
				key = false;
				type = '出入口';
				this.showType = 2;
				break;
		}
		this.typeClick(type,key);
	}
  },
  mounted() {
	// wx.config({
	// 	debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	// 	appId: 'wx24fda5cd9917d177', // 必填，公众号的唯一标识
	// 	timestamp: , // 必填，生成签名的时间戳
	// 	nonceStr: '', // 必填，生成签名的随机串
	// 	signature: '',// 必填，签名
	// 	jsApiList: [
	// 		'updateAppMessageShareData',
	// 		'updateTimelineShareData'
	// 	] // 必填，需要使用的JS接口列表
	// });
	this.getPstion();
  }
};
</script>
<style scoped>
    .alert {position: fixed;z-index: 999999;width: 100%;height:100%;background: rgba(0,0,0,.4);top:43px;left:0;}
    .alertMain {width: 300px;height:150px;position: relative;margin:-150px auto 0;background: #fff;border-radius: 10px;top:50%;}
    .alertMain01 {width: 100%;text-align: center;line-height: 90px;}
    .alertMain02 {width: 100%;text-align: center;font-size: 18px;}
.topTitle{
	width: 100%;
	height: 43px;
	background: #FFC645;
	color: #333;
	font-weight: 500;
	font-size: 14px;
}
.activeNav{

background: #FFFFFF;
border-radius: 13px;
}
.flexd{
	display: flex;
}
.swiperW{
	width: calc(100% -80px);
	padding-left: 10px;
}
.adder{
	/*width: 80px;*/
	height: 25px;
    line-height: 25px;
	text-align: center;
	/* background: #fff; */
	border-radius: 13px;
	margin: 0 auto;
    margin-top: 9px;
}
.morew{
	height: 12px;
	width: 12px;
	margin-top: 6px;
}
.modelMore{
	position: absolute;
	top: 0;
	width: 100%;
	/* height: 423px; */
	z-index: 999999;
	background: #fff;
}
.closeH{
	width: 100%;
	height: 33px;
	line-height: 34px;
    text-align: right;
	border-bottom: 1px solid #ddd;
}
.closeW{
	width: 14px;
	height: 14px;
	margin-right: 19px;
}
.modelAdder{
	/* width: calc(100% / 3.1); */
	width: 100%;
	height: 50px;
	font-size: 14px;
	font-weight: 500;
	color: #333333;
}
.textLin{
	text-align: center;
	line-height: 50px;
}
.mt15{
	margin-top: 15px;
}
.dobleL{
	text-align: center;
}
.btb{
	border-bottom: 1px solid #ddd;
}
.brb{
	border-right: 1px solid #ddd;
}
.activeBg{
	background: #FFC645;
}
.home{
	width: 100%;
	height: 100%;
	overflow-y: hidden;
}
.mapTuli{
	width: 38px;
    height: 45px;
	right: 19px;
    position: absolute;
}
.periphery{
    top: 61px;
}
.live{
	top: 115px;
}
.headset{
	top: 165px;
}
.position{
	top: 300px;
}
.refresh{
	top: 350px;
}
.peripheryImg{
	width: 38px;
	height: 38px;
}
.peripheryText{
	font-size: 12px;
	font-weight: 400;
	color: #333333;
	text-align: center;
    margin-top: -10px;
}
.headsetText{
	font-size: 12px;
	font-weight: 400;
	color: #333333;
	text-align: center;
    margin-top: -10px;
	width: 50px;
    margin-left: -4px;
}
.selectDrap{
	z-index: 999;
	width: 93px;
	height: 97px;
	position: absolute;
	left: 11px;
	top: 55px;
	background-size: 100%;
	background-repeat: no-repeat;
	cursor: pointer;
}

.defientD{
	background-image:url(./../assets/images/currentShow.png);
}
.downL{
	background-image:url(./../assets/images/drop-down.png);
}
.drap-topTitle{
	width: 100%;
	font-size: 12px;
	font-weight: 500;
	color: #333333;
	line-height: 34px;
    text-align: center;
    margin-left: -6px;
}
.drap-ctitle{
	width: 100%;
    font-size: 12px;
    font-weight: 500;
    color: #fff;
    line-height: 20px;
    text-align: center;
}
.drap-bottom{
	width: 100%;
    font-size: 12px;
    font-weight: 500;
    color: #fff;
    line-height: 38px;
    text-align: center;
}
</style>
<style>
.markerText{
	text-align: left;
	/* width: 200px; */
	color:#333;
	font-weight: 500;
	font-size: 12px;
	position: absolute;
	top: -22px;
	/* left: -85px; */

	background: #fff;
    height: 20px;
    line-height: 20px;
    width: 100px;
    border-radius: 12px;
    padding-left: 10px;
}
.markerImg{
	width:31px;height:38px;
}
.custom-content-marker {
	position: relative;
	width: 25px;
	height: 34px;
}

.custom-content-marker img {
	width: 100%;
	height: 100%;
}
</style>