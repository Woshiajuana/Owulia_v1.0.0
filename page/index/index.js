/**
 * Created by 2144 on 2016/9/22.
 */
__inline('../../static/lib/ajuanCommon.js');//工具js类
__inline('../../widget/carousel/_carousel.js');//轮播js
__inline('../../widget/header/_header.js');//头部js类
__inline('../../widget/toolbar/_toolbar.js');//返回顶部js类
__inline('../../static/lib/ajuanSpread.js');//图形散开工具js类
__inline('../../widget/nav/_nav.js');//导航条控制js类
__inline('../../static/lib/ajuanLazyLoad.js');//工具js类
;(function () {
    var doc = document,
        scrollTop = '',
        carouselBtn = doc.getElementById('carousel_1'),
        ajuan = ajuanCarousel(carouselBtn,{
            triggerBox: doc.getElementById('trigger1'),
            triCss: 'cur',
            times: 600,
            noAlwaysType:true,
            direction:'vertical',
            callback: function () {
                ajuanSpread({
                    spreadBoxEle:_a('wu-li-ren').getElementsByClassName()[ajuan.index],
                    spreadEleName : 'a',
                    spreadWidth : 310,
                    spreadHeight : 210,
                    spreadRowNum : 3,
                    spreadEleSum : 6
                });
            }
        });
    ajuanSpread({
        spreadBoxEle:_a().getByClass('wu-li-ren')[0],
        spreadEleName : 'a',
        spreadWidth : 310,
        spreadHeight : 210,
        spreadRowNum : 3,
        spreadEleSum : 6
    });
    //懒加载
    ajuanLazyLoad();
}());