(function (doc, win) {
    console.log(doc, win)
    var docEl = doc.documentElement,
        //console.log(docEl)
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        //mobile
        pW = 750,//设计稿的宽度
        recalc = function () {
            var cW = docEl.clientWidth < 750 ? docEl.clientWidth : 750;
            //判断页面宽度，即当前设备的分辨率
            if (!cW) {
                return;
            }
            docEl.style.cssText = 'font-size:' + 100 * (cW / pW) + 'px ';
        };
    recalc();
    win.addEventListener(resizeEvt, recalc, false);//添加监听事件，监听用户是否横屏
})(document, window);