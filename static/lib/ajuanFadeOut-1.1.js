/**
 * Created by zhigang.chen on 2016/3/24.
 *  ajuanFadeOut-1.1版本轮播插件
 *  使用性能：
 *      支持手势渐隐轮播；
 *      支持上下张图片渐隐轮播；
 *      支持无限渐隐轮播；
 *      支持导航条显示以及触发渐隐
 *  使用条件：
 *      需结合jQuery或者Zepto使用;
 *  默认参数及参数值：
 *      "speed":3000,           //渐隐的速度，默认是3000，单位ms(毫秒)
 *      "fadeTime":0.6,         //渐隐动画的速度，默认是0.6，单位s(秒)
 *      "direction":"down",     //无限渐隐动画方向，可选("down"或者"up")默认是"down"，向下渐隐
 *      "prevBtn":null,         //上一张滚动按钮
 *      "nextBtn":null,         //下一张滚动按钮
 *      "device":"pc",          //设备
 *      "nav": null,            //导航条
 *      "navCss": null,         //导航条的样式
 *      "navEvent":"hover"      //导航条的触发形式，可选("hover"或"click"或"touch")，默认是"hover"
 *  使用示例：
 *      $(".main").ajuanCarousel({
 *          "speed":3000,
 *          "fadeTime":0.6,
 *          "direction":"down",
 *          "prevBtn":".left-arrow",
 *          "nextBtn":".right-arrow",
 *          "nav":"#nav",
 *          "navCss":"checked",
 *          "device":"wap",
 *          "navEvent":"hover"
 *      });
 *  插件缺陷：
 *      1.手指放在图片上，依然可以渐隐轮播图片
 *      2.必须使用ul li布局
 *  注意事项：
 *      1.使用本插件，书写css样式时，滚动容器里面li的样式不要采用nth-child()和；
 *      first-child()以及last-child()选择器；
 *      2.会存在一定未检测出来的bug；
 */
;(function($,window,document,undefined){
    /*
        创建FadeOut渐隐的构造函数
     */
    var _this = null;
    var FadeOut = function(ele,opt){
        this.defaults = {           //默认参数
            "speed":3000,           //渐隐的速度
            "fadeTime":0.6,         //渐隐动画的速度
            "direction":"down",     //无限渐隐动画方向
            "prevBtn":null,         //上一张滚动按钮
            "nextBtn":null,         //下一张滚动按钮
            "device":"pc",          //设备
            "nav": null,            //导航条
            "navCss": null,         //导航条的样式
            "navEvent":"hover"      //导航条的触发形式
        };
        this.options = $.extend({},this.defaults,opt);          //参数设置
        this.$ele = ele;                                        //主容器元素
        this._maxNum = this.$ele.find("li").length;             //li的个数
        this._index = 0;                                        //标记
        this._direction = this.fadeDn;                          //渐隐方向
        this._event = "click";                                  //事件
        this._flag = true;                                      //标记
        this._navEvent = "click";                               //事件
    };
    //FadeOut的方法
    FadeOut.prototype = {
        //执行渐隐效果
        startFadeOut: function(){
            //判断li的个数
            if(_this._maxNum <= 1){
                return;
            }
            //判断渐隐方向
            if(_this.options.direction == "up"){
                _this._direction = _this.fadeUp;
            }
            //初始化元素
            _this.init();
            //无限循环渐隐轮播
            var _timer = setInterval(_this._direction,_this.options.speed);
            //判断设备
            if(_this.options.device == "wap"){
                _this._event = "touchstart";
            }
            //判断是否有按钮
            if(_this.options.nextBtn != null && _this.options.prevBtn != null){
                //监听上下按钮事件
                $(_this.options.nextBtn).on(_this._event,function(e){
                    clearInterval(_timer);
                    _this.fadeDn();
                    if(_this._flag){
                        _this._flag = false;
                        setTimeout(function(){
                            _this._flag = true;
                            _timer=setInterval(_this._direction,_this.options.speed);
                        },_this.options.fadeTime*1010);
                    }
                    e.stopPropagation();
                });
                $(_this.options.prevBtn).on(_this._event,function(e){
                    clearInterval(_timer);
                    _this.fadeUp();
                    if(_this._flag){
                        _this._flag = false;
                        setTimeout(function(){
                            _this._flag = true;
                            _timer=setInterval(_this._direction,_this.options.speed);
                        },_this.options.fadeTime*1010);
                    }
                    e.stopPropagation();
                });
                //阻止默认事件
                $(_this.options.nextBtn).on("touchstart",function(e){
                    e.stopPropagation();
                });
                $(_this.options.nextBtn).on("touchmove",function(e){
                    e.stopPropagation();
                });
                $(_this.options.nextBtn).on("touchend",function(e){
                    e.stopPropagation();
                });
                //阻止默认事件
                $(_this.options.prevBtn).on("touchstart",function(e){
                    e.stopPropagation();
                });
                $(_this.options.prevBtn).on("touchmove",function(e){
                    e.stopPropagation();
                });
                $(_this.options.prevBtn).on("touchend",function(e){
                    e.stopPropagation();
                });
            }
            //处理滑动事件
            var startX, startY;
            var endX, endY;
            _this.$ele.get(0).addEventListener("touchstart",function(ev){
                startX = ev.targetTouches[0].pageX;
                startY = ev.targetTouches[0].pageY;
            },false);
            _this.$ele.get(0).addEventListener("touchend",function(ev){
                endX = ev.changedTouches[0].pageX;
                endY = ev.changedTouches[0].pageY;
                var direction = _this.GetSlideDirection(startX, startY, endX, endY);
                switch (direction){
                    case 0:
                        //没有滑动
                        break;
                    case 1:
                        //向上滑动
                        break;
                    case 2:
                        //向下滑动
                        break;
                    case 3:
                        //向左滑动
                        clearInterval(_timer);
                        _this.fadeDn();
                        if(_this._flag){
                            _this._flag = false;
                            setTimeout(function(){
                                _this._flag = true;
                                _timer=setInterval(_this._direction,_this.options.speed);
                            },_this.options.rollTime*1010);
                        }
                        break;
                    case 4:
                        //向右滑动
                        clearInterval(_timer);
                        _this.fadeUp();
                        if(_this._flag){
                            _this._flag = false;
                            setTimeout(function(){
                                _this._flag = true;
                                _timer=setInterval(_this._direction,_this.options.speed);
                            },_this.options.rollTime*1010);
                        }
                        break;
                    default:
                }
            },false);
            //判断是否有导航条
            if(_this.options.nav != null && _this.options.navCss != null){
                //判断导航条触发事件
                if(_this.options.navEvent == "hover"){
                    _this._navEvent = "mouseover";
                }else if(_this.options.navEvent == "touch"){
                    _this._navEvent = "touchstart";
                }else{
                    _this._navEvent = "click";
                }
                //处理导航监听事件
                $(_this.options.nav).find("li").each(function(index){
                    $(this).on(_this._navEvent,function(){
                        clearInterval(_timer);
                        $(_this.options.nav).find("li").eq(index).addClass(_this.options.navCss);
                        $(_this.options.nav).find("li").eq(index).siblings().removeClass(_this.options.navCss);
                        _this.$ele.find("li").eq(index).css({
                            "opacity": 1,
                            "z-index":9,
                            "-webkit-transition":"opacity "+_this.options.fadeTime+"s",
                            "transition":"opacity "+_this.options.fadeTime+"s"
                        });
                        _this.$ele.find("li").eq(index).siblings().css({
                            "opacity": 0,
                            "z-index":1,
                            "-webkit-transition":"opacity "+_this.options.fadeTime+"s",
                            "transition":"opacity "+_this.options.fadeTime+"s"
                        });
                        _this._index = index;
                        if(_this._flag){
                            _this._flag = false;
                            setTimeout(function(){
                                _this._flag = true;
                                _timer=setInterval(_this._direction,_this.options.speed);
                            },_this.options.fadeTime*1000);
                        }
                    });
                });
            }
        },
        //初始化元素
        init: function(){
            //初始化li的位置
            _this.$ele.find("li").css({
                "opacity":0,
                "z-index":1,
                "-webkit-transition":"opacity "+_this.options.fadeTime+"s",
                "transition":"opacity 0s"
            });
            _this.$ele.find("li").eq(0).css({
                "opacity":1,
                "z-index":9
            });
        },
        //向下渐隐
        fadeDn: function(){
            if(_this._index >= _this._maxNum-1){
                _this._index = 0;
            }
            else{
                _this._index++;
            }
            _this.$ele.find("li").eq(_this._index).css({
                "opacity": 1,
                "z-index":9,
                "-webkit-transition":"opacity "+_this.options.fadeTime+"s",
                "transition":"opacity "+_this.options.fadeTime+"s"
            });
            _this.$ele.find("li").eq(_this._index).siblings().css({
                "opacity": 0,
                "z-index":1,
                "-webkit-transition":"opacity "+_this.options.fadeTime+"s",
                "transition":"opacity "+_this.options.fadeTime+"s"
            });
            //处理导航条
            $(_this.options.nav).find("li").eq(_this._index).addClass(_this.options.navCss);
            $(_this.options.nav).find("li").eq(_this._index).siblings().removeClass(_this.options.navCss);
        },
        //向上渐隐
        fadeUp: function(){
            if(_this._index <= 0){
                _this._index = _this._maxNum-1;
            }
            else{
                _this._index--;
            }
            _this.$ele.find("li").eq(_this._index).css({
                "opacity": 1,
                "z-index":9,
                "-webkit-transition":"opacity "+_this.options.fadeTime+"s",
                "transition":"opacity "+_this.options.fadeTime+"s"
            });
            _this.$ele.find("li").eq(_this._index).siblings().css({
                "opacity": 0,
                "z-index":1,
                "-webkit-transition":"opacity "+_this.options.fadeTime+"s",
                "transition":"opacity "+_this.options.fadeTime+"s"
            });
            //处理导航条
            $(_this.options.nav).find("li").eq(_this._index).addClass(_this.options.navCss);
            $(_this.options.nav).find("li").eq(_this._index).siblings().removeClass(_this.options.navCss);
        },
        //返回角度
        GetSlideAngle: function(dx, dy){
            return Math.atan2(dy, dx) * 180 / Math.PI;
        },
        //根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
        GetSlideDirection: function(startX, startY, endX, endY){
            var dy = startY - endY;
            var dx = endX - startX;
            var result = 0;
            //如果滑动距离太短
            if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
                return result;
            }
            var angle = _this.GetSlideAngle(dx, dy);
            if (angle >= -45 && angle < 45) {
                result = 4;
            } else if (angle >= 45 && angle < 135) {
                result = 1;
            } else if (angle >= -135 && angle < -45) {
                result = 2;
            }
            else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
                result = 3;
            }
            return result;
        }
    };
    //在插件里面调用FadeOut渐隐方法
    $.fn.ajuanFadeOut = function(options){
        //创建一个FadeOut渐隐实体
        _this = new FadeOut(this,options);
        //执行渐隐效果
        _this.startFadeOut();
    }
})(window.Zepto || window.jQuery,window,document);


//$(document).ready(function(){
//    $("#container").ajuanFadeOut({
//        "speed":3000,                   //渐隐的速度
//        "fadeTime":0.6,                 //渐隐动画的速度
//        "direction":"down",             //无限渐隐动画方向
//        "prevBtn":".left-arrow",        //上一张滚动按钮
//        "nextBtn":".right-arrow",       //下一张滚动按钮
//        "nav":"#nav",
//        "navCss":"checked",
//        "device":"wap",                  //默认设备
//        "navEvent":"touch"
//    });
//});