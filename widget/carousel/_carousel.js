/**
 * Created by 2144 on 2016/9/22.
 * 轮播部分的js
 */
__inline('../../static/lib/ajuanCarousel-1.0.js');//轮播工具js类
;(function () {

    var doc = document,

        carouselBtn = doc.getElementById('carousel');

    ajuanCarousel(carouselBtn,{

        triggerBox: doc.getElementById('trigger'),

        triCss: 'cur',

        times: 500,

        nextBtn: doc.getElementById('next-btn'),

        prevBtn: doc.getElementById('prev-btn'),

        sleep: 3000,

        triHover:true,

        boxHover:true,

        triSlider:_a().getByClass('trigger-slider')[0],

        index:1

    });

}());