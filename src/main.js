import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
// window.sessionStorage.setItem('firstEntryUrl', window.location.href)
Vue.config.productionTip = false;
Vue.use(VueAwesomeSwiper)
new Vue({
  router,
  store,
  created(){
    router.afterEach((to, from) => {
      // 记录最初进入路由的第一个页面的url
      if (!sessionStorage.wxConfigSignUrl ) {
        let wxConfigSignUrl = location.protocol + '//' + location.host + to.fullPath
        window.sessionStorage.setItem('wxConfigSignUrl ', wxConfigSignUrl)
      }
    })
  },
  render: h => h(App)
}).$mount("#app");

