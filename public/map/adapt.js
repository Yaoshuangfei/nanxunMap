// 通过js适配不同的屏幕大小
(function(doc, win) {
  var whdef = 100 / 1920;// 表示1920的设计图,使用100PX的默认值
  var docEl = doc.documentElement,
      resizeEvt = 'orientationchange' in window
          ? 'orientationchange'
          : 'resize',
      recalc = function() {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        // 根据设备的比例调整初始font-size大小
        // if(clientWidth>640) clientWidth = document.body.clientWidth;
        docEl.style.fontSize = clientWidth * whdef + 'px';
      };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);