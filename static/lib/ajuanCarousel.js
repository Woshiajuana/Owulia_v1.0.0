/**
 * Created by 2144 on 2016/8/3.
 * zhigang.chen@owulia.com
 * 轮播滚动插件
 */
;(function (window,doc,_a,undefined) {
    var Carousel = function (ele,opt) {
        var options = opt || {};//参数设置
        this.ele = ele;//需要滚动的大盒子，默认是ID为carousel的元素
        this.carBoxName = options.carBoxName || 'li';
        this.carEleName = options.carEleName || 'li';
        this.sleep = options.sleep || 3000;//每隔多少秒滚动一次，默认是3000ms
        this.times = options.times || 300;//滚动一次需要的时间，默认是300ms
        this.nextBtn = options.nextBtn;//向下按钮
        this.prevBtn = options.prevBtn;//向上按钮
        this.triggerBox = options.triggerBox;//触发的按钮
        this.triCss = options.triCss;//触发的样式
        this.callback = options.callback;//回调函数
        this.boxHover = options.boxHover || false;
        this.triHover = options.triHover || false;
        this.noAlwaysType = options.noAlwaysType || false;//是否自动轮播，默认连续自动轮播
        this.direction = options.direction || 'across'; //vertical
        this.triSlider = options.triSlider;
        this.index = options.index || 0;//标记位置
        this.type = true;
    };

    Carousel.prototype.init = function () {

        if(!this.ele){console.log('没有需要滚动的元素');return;}

        getEleDataFun(this);//获取元素数据

        reviseEleFun(this);//操作元素

        addEventFun(this);//绑定事件

        alwaysNextFun(this);//触发连续滚动

        return this;

    };

        //获取元素数据
    var getEleDataFun = function (that) {

            that.ulEle = that.ele.getElementsByTagName('ul')[0];//获取ul元素

            that.liEleArr = that.ulEle.getElementsByTagName('li');//获取li元素数组

            that.len = that.liEleArr.length;//获取总个数

            if(that.direction == 'across'){

                that.width = that.ele.offsetWidth;//获取宽度

            }else if(that.direction == 'vertical'){

                that.height = that.liEleArr[0].offsetHeight;//获取高度

            }

        },

        //操作元素的方法
        reviseEleFun = function (that) {

            if(that.direction == 'across'){

                var ulHtml = that.ulEle.innerHTML;

                that.ulEle.innerHTML = ulHtml + ulHtml; //复制ul下面的所以内容再追加进去

                that.ulEle.style['width'] = that.width * that.len * 2 + 'px'; //初始化ul的宽度

                //复制i标签到trigger里面
                if(that.triggerBox && !that.triggerBox.children.length){

                    var oFragment = document.createDocumentFragment();

                    for(var i = 0; i < that.len ; i++){

                        var triEle = document.createElement('i');

                        if(i == 0) triEle.className += ' ' + that.triCss;

                        oFragment.appendChild(triEle);
                    }

                    that.triggerBox.appendChild(oFragment);

                    that.triEle = _a(that.triggerBox.getElementsByTagName('i')).reduceDimension();

                }else if(that.triggerBox && that.triggerBox.childNodes.length){

                    that.triEle = _a(that.triggerBox.getElementsByTagName('i')).reduceDimension();

                }

            }else if(that.direction == 'vertical'){

                that.triEle = _a(that.triggerBox.getElementsByTagName('li')).reduceDimension();

            }
            
        },
        
        //连续切换下一张的方法
        alwaysNextFun = function (that) {

            if(that.noAlwaysType) return;

            var that = that;
          
            that.setTr = setInterval(function () {

                nextFun(that);

            },that.sleep);

        },
        
        //上一张的方法
        prevFun = function (that) {

            animationFun(that,0);

        },
        
        //下一张的方法
        nextFun = function (that) {

            animationFun(that,1);

        },
        
        //事件绑定
        addEventFun = function (that) {

            //下一页的按钮监听事件
            if(that.nextBtn){//下一张按钮点击事件

                _a(that.nextBtn).addEventListener('click', function () {

                    clearInterval(that.setTr);

                    nextFun(that);

                    if(that.sleep) alwaysNextFun(that);//触发连续滚动

                });

            }

            //上一页的按钮监听事件
            if(that.prevBtn){//上一张按钮点击事件

                _a(that.prevBtn).addEventListener('click', function () {

                    clearInterval(that.setTr);

                    prevFun(that);

                    if(that.sleep) alwaysNextFun(that);//触发连续滚动

                });

            }

            //鼠标悬停的时候是否停止滚动的监听事件
            if(that.boxHover){

                _a(that.ele).addEventListener('mouseover', function (event) {

                    var target = _a(event).target();

                    if(target.parentNode.parentNode.parentNode.parentNode.id == that.ele.id){

                        clearInterval(that.setTr);

                        return;

                    }

                });

                _a(that.ele).addEventListener('mouseout', function (event) {

                    var target = _a(event).target();

                    if(target.parentNode.parentNode.parentNode.parentNode.id == that.ele.id){

                        clearInterval(that.setTr);

                        if(that.sleep) alwaysNextFun(that);

                        return;

                    }

                });

            }

            //鼠标悬停的时候是否停止滚动的监听事件
            if(that.triHover && that.triggerBox){

                _a(doc.triggerBox).addEventListener('mouseover', function (event) {

                    var target = _a(event).target();

                    if(target.parentNode.id == that.triggerBox.id){

                        clearInterval(that.setTr);

                        return;

                    }

                    if(target.parentNode.parentNode.id == that.triggerBox.id){

                        clearInterval(that.setTr);

                        return;

                    }

                });

                _a(that.triggerBox).addEventListener('mouseout', function () {

                    clearInterval(that.setTr);

                    if(that.sleep) alwaysNextFun(that);

                });

            }

            //小按钮的监听事件
            if(that.triggerBox){//小按钮点击事件

                if(that.direction == 'across'){

                    _a(that.triggerBox).addEventListener('click', function (e) {

                        if(!that.type) return;

                        that.type = false;

                        var target = _a(e).target();

                        if(target.nodeName.toLocaleLowerCase() == 'i' && target.parentNode.id == that.triggerBox.getAttribute('id')){

                            clearInterval(that.setTr);

                            for(var i = 0,len = that.triEle.length; i < len; i++){

                                if(target == that.triEle[i]){

                                    that.index = i + 1;

                                    if(that.triSlider){

                                        packMove(that.triSlider,{'left':that.triSlider.offsetWidth * (that.index-1)},{duration:that.times}, function () {

                                            i = that.index-1;

                                            that.triEle[i].className = that.triEle[i].className.indexOf('cur') >-1 ?  that.triEle[i].className :  that.triEle[i].className + 'cur';

                                        });

                                    }else{

                                        that.triEle[i].className = that.triEle[i].className.indexOf('cur') >-1 ?  that.triEle[i].className :  that.triEle[i].className + 'cur';

                                    }

                                    packMove(that.ulEle,{'left':-that.width * (that.index)},{duration:that.times},function(){

                                        that.type = true;

                                        if(that.callback) that.callback();

                                    });

                                }else{

                                    that.triEle[i].className = that.triEle[i].className.replace('cur','');

                                }

                            }

                            alwaysNextFun(that);

                            return;

                        }

                        if(target.parentNode.nodeName.toLocaleLowerCase() == 'i' && target.parentNode.parentNode.id == that.triggerBox.getAttribute('id')){

                            var targets = target.parentNode;

                            clearInterval(that.setTr);

                            for(var i = 0,len = that.triEle.length; i < len; i++){

                                if(targets == that.triEle[i]){

                                    that.index = i + 1;

                                    if(that.triSlider){

                                        packMove(that.triSlider,{'left':that.triSlider.offsetWidth * (that.index-1)},{duration:that.times}, function () {

                                            i = that.index-1;

                                            that.triEle[i].className = that.triEle[i].className.indexOf('cur') >-1 ?  that.triEle[i].className :  that.triEle[i].className + 'cur';

                                        });

                                    }else{

                                        that.triEle[i].className = that.triEle[i].className.indexOf('cur') >-1 ?  that.triEle[i].className :  that.triEle[i].className + 'cur';

                                    }

                                    //that.triEle[i].className = that.triEle[i].className.indexOf('cur') >-1 ?  that.triEle[i].className :  that.triEle[i].className + 'cur';

                                    packMove(that.ulEle,{'left':-that.width * (that.index)},{duration:that.times},function(){

                                        that.type = true;

                                        if(that.callback) that.callback();

                                    });

                                }else{

                                    that.triEle[i].className = that.triEle[i].className.replace('cur','');

                                }

                            }

                            alwaysNextFun(that);

                            return;

                        }

                    });

                }else if(that.direction == 'vertical'){

                    _a(that.triggerBox).addEventListener('click', function (e) {

                        if(!that.type) return;

                        that.type = false;

                        var target = _a(e).target();

                        if(target.nodeName.toLocaleLowerCase() == 'li' && target.parentNode.id == that.triggerBox.getAttribute('id')){

                            clearInterval(that.setTr);

                            for(var i = 0,len = that.triEle.length; i < len; i++){

                                if(target == that.triEle[i]){

                                    that.index = i;

                                    that.triEle[i].className = that.triEle[i].className.indexOf('cur') >-1 ?  that.triEle[i].className :  that.triEle[i].className + 'cur';

                                    if(that.callback) that.callback();

                                    packMove(that.ulEle,{'top':-that.height * (that.index)},{duration:that.times},function(){

                                        that.type = true;

                                    });

                                }else{

                                    that.triEle[i].className = that.triEle[i].className.replace('cur','');

                                }

                            }

                            alwaysNextFun(that);

                            return;

                        }

                        if(target.parentNode.nodeName.toLocaleLowerCase() == 'li' && target.parentNode.parentNode.id == that.triggerBox.getAttribute('id')){

                            var targets = target.parentNode;

                            clearInterval(that.setTr);

                            for(var i = 0,len = that.triEle.length; i < len; i++){

                                if(targets == that.triEle[i]){

                                    that.index = i;

                                    if(that.callback) that.callback();

                                    that.triEle[i].className = that.triEle[i].className.indexOf('cur') >-1 ?  that.triEle[i].className :  that.triEle[i].className + 'cur';

                                    packMove(that.ulEle,{'top':-that.height * (that.index)},{duration:that.times},function(){

                                        that.type = true;

                                    });

                                }else{

                                    that.triEle[i].className = that.triEle[i].className.replace('cur','');

                                }

                            }

                            alwaysNextFun(that);

                            return;

                        }

                    });

                }

            }
            
        },

        //滚动动画
        animationFun = function (that,str) {

            if(!that.type) return;

            that.type = false;

            if(str == 1) {

                ++that.index;

                if(that.triEle){

                    _a(that.triEle).forEach(function (item,index) {

                        if(that.index > that.len){

                            item.className = '';

                            if(that.triSlider){

                                packMove(that.triSlider,{'left':that.triSlider.offsetWidth * 0},{duration:that.times}, function () {

                                    item.className = index == (1 - 1) ? 'cur' : '';

                                });

                            }else{

                                item.className = index == (1 - 1) ? 'cur' : '';

                            }

                        }else{

                            if(that.triSlider){

                                item.className = '';

                                packMove(that.triSlider,{'left':that.triSlider.offsetWidth * (that.index-1)},{duration:that.times}, function () {

                                    item.className = index == (that.index - 1) ? 'cur' : '';

                                });

                            }else{

                                item.className = index == (that.index - 1) ? 'cur' : '';

                            }

                        }

                    });

                }

                packMove(that.ulEle, {'left': -(that.index) * that.width}, {duration: that.times}, function () {

                    if (that.index > that.len) {

                        that.index = 1;

                        that.ulEle.style.left = '-' + that.width + 'px';

                    };

                    that.type = true;

                    if(that.callback) that.callback();

                });

            }else{

                if (that.index <= 1) {

                    that.index = that.len + 1;

                    that.ulEle.style.left = '-' + that.index * that.width + 'px';

                }

                --that.index;

                if(that.triEle){

                    _a(that.triEle).forEach(function (item,index) {

                        if(that.triSlider){

                            item.className = '';

                            packMove(that.triSlider,{'left':that.triSlider.offsetWidth * (that.index-1)},{duration:that.times}, function () {

                                item.className = index == (that.index - 1) ? 'cur' : '';

                            });

                        }else{

                            item.className = index == (that.index - 1) ? 'cur' : '';

                        }

                    });

                }

                packMove(that.ulEle, {'left': -(that.index) * that.width}, {duration: that.times}, function () {

                    that.type = true;

                    if(that.callback) that.callback();

                });

            }

        },

        //动画库
        packMove = (function(){
            var getStyle = function(el, style){
                if(/msie/i.test(navigator.userAgent)){
                    style = style.replace(/\-(\w)/g, function(all, letter){
                        return letter.toUpperCase();
                    });
                    var value = el.currentStyle[style];
                    (value == "auto")&&(value = "0px" );
                    return value;
                }else{
                    return document.defaultView.getComputedStyle(el,null).getPropertyValue(style);
                }
            };


            var tween = {
                easeInQuad: function(pos){
                    return Math.pow(pos, 2);
                },

                easeOutQuad: function(pos){
                    return -(Math.pow((pos-1), 2) -1);
                },

                easeInOutQuad: function(pos){
                    if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,2);
                    return -0.5 * ((pos-=2)*pos - 2);
                },

                easeInCubic: function(pos){
                    return Math.pow(pos, 3);
                },

                easeOutCubic: function(pos){
                    return (Math.pow((pos-1), 3) +1);
                },

                easeInOutCubic: function(pos){
                    if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,3);
                    return 0.5 * (Math.pow((pos-2),3) + 2);
                },

                easeInQuart: function(pos){
                    return Math.pow(pos, 4);
                },

                easeOutQuart: function(pos){
                    return -(Math.pow((pos-1), 4) -1)
                },

                easeInOutQuart: function(pos){
                    if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,4);
                    return -0.5 * ((pos-=2)*Math.pow(pos,3) - 2);
                },

                easeInQuint: function(pos){
                    return Math.pow(pos, 5);
                },

                easeOutQuint: function(pos){
                    return (Math.pow((pos-1), 5) +1);
                },

                easeInOutQuint: function(pos){
                    if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,5);
                    return 0.5 * (Math.pow((pos-2),5) + 2);
                },

                easeInSine: function(pos){
                    return -Math.cos(pos * (Math.PI/2)) + 1;
                },

                easeOutSine: function(pos){
                    return Math.sin(pos * (Math.PI/2));
                },

                easeInOutSine: function(pos){
                    return (-.5 * (Math.cos(Math.PI*pos) -1));
                },

                easeInExpo: function(pos){
                    return (pos==0) ? 0 : Math.pow(2, 10 * (pos - 1));
                },

                easeOutExpo: function(pos){
                    return (pos==1) ? 1 : -Math.pow(2, -10 * pos) + 1;
                },

                easeInOutExpo: function(pos){
                    if(pos==0) return 0;
                    if(pos==1) return 1;
                    if((pos/=0.5) < 1) return 0.5 * Math.pow(2,10 * (pos-1));
                    return 0.5 * (-Math.pow(2, -10 * --pos) + 2);
                },

                easeInCirc: function(pos){
                    return -(Math.sqrt(1 - (pos*pos)) - 1);
                },

                easeOutCirc: function(pos){
                    return Math.sqrt(1 - Math.pow((pos-1), 2))
                },

                easeInOutCirc: function(pos){
                    if((pos/=0.5) < 1) return -0.5 * (Math.sqrt(1 - pos*pos) - 1);
                    return 0.5 * (Math.sqrt(1 - (pos-=2)*pos) + 1);
                },

                easeOutBounce: function(pos){
                    if ((pos) < (1/2.75)) {
                        return (7.5625*pos*pos);
                    } else if (pos < (2/2.75)) {
                        return (7.5625*(pos-=(1.5/2.75))*pos + .75);
                    } else if (pos < (2.5/2.75)) {
                        return (7.5625*(pos-=(2.25/2.75))*pos + .9375);
                    } else {
                        return (7.5625*(pos-=(2.625/2.75))*pos + .984375);
                    }
                },

                easeInBack: function(pos){
                    var s = 1.70158;
                    return (pos)*pos*((s+1)*pos - s);
                },

                easeOutBack: function(pos){
                    var s = 1.70158;
                    return (pos=pos-1)*pos*((s+1)*pos + s) + 1;
                },

                easeInOutBack: function(pos){
                    var s = 1.70158;
                    if((pos/=0.5) < 1) return 0.5*(pos*pos*(((s*=(1.525))+1)*pos -s));
                    return 0.5*((pos-=2)*pos*(((s*=(1.525))+1)*pos +s) +2);
                },

                elastic: function(pos) {
                    return -1 * Math.pow(4,-8*pos) * Math.sin((pos*6-1)*(2*Math.PI)/2) + 1;
                },

                swingFromTo: function(pos) {
                    var s = 1.70158;
                    return ((pos/=0.5) < 1) ? 0.5*(pos*pos*(((s*=(1.525))+1)*pos - s)) :
                    0.5*((pos-=2)*pos*(((s*=(1.525))+1)*pos + s) + 2);
                },

                swingFrom: function(pos) {
                    var s = 1.70158;
                    return pos*pos*((s+1)*pos - s);
                },

                swingTo: function(pos) {
                    var s = 1.70158;
                    return (pos-=1)*pos*((s+1)*pos + s) + 1;
                },

                bounce: function(pos) {
                    if (pos < (1/2.75)) {
                        return (7.5625*pos*pos);
                    } else if (pos < (2/2.75)) {
                        return (7.5625*(pos-=(1.5/2.75))*pos + .75);
                    } else if (pos < (2.5/2.75)) {
                        return (7.5625*(pos-=(2.25/2.75))*pos + .9375);
                    } else {
                        return (7.5625*(pos-=(2.625/2.75))*pos + .984375);
                    }
                },

                bouncePast: function(pos) {
                    if (pos < (1/2.75)) {
                        return (7.5625*pos*pos);
                    } else if (pos < (2/2.75)) {
                        return 2 - (7.5625*(pos-=(1.5/2.75))*pos + .75);
                    } else if (pos < (2.5/2.75)) {
                        return 2 - (7.5625*(pos-=(2.25/2.75))*pos + .9375);
                    } else {
                        return 2 - (7.5625*(pos-=(2.625/2.75))*pos + .984375);
                    }
                },

                easeFromTo: function(pos) {
                    if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,4);
                    return -0.5 * ((pos-=2)*Math.pow(pos,3) - 2);
                },

                easeFrom: function(pos) {
                    return Math.pow(pos,4);
                },

                easeTo: function(pos) {
                    return Math.pow(pos,0.25);
                },

                linear:  function(pos) {
                    return pos;
                },

                sinusoidal: function(pos) {
                    return (-Math.cos(pos*Math.PI)/2) + 0.5;
                },

                reverse: function(pos) {
                    return 1 - pos;
                },

                mirror: function(pos, transition) {
                    transition = transition || tween.sinusoidal;
                    if(pos<0.5)
                        return transition(pos*2);
                    else
                        return transition(1-(pos-0.5)*2);
                },

                flicker: function(pos) {
                    var pos = pos + (Math.random()-0.5)/5;
                    return tween.sinusoidal(pos < 0 ? 0 : pos > 1 ? 1 : pos);
                },

                wobble: function(pos) {
                    return (-Math.cos(pos*Math.PI*(9*pos))/2) + 0.5;
                },

                pulse: function(pos, pulses) {
                    return (-Math.cos((pos*((pulses||5)-.5)*2)*Math.PI)/2) + .5;
                },

                blink: function(pos, blinks) {
                    return Math.round(pos*(blinks||5)) % 2;
                },

                spring: function(pos) {
                    return 1 - (Math.cos(pos * 4.5 * Math.PI) * Math.exp(-pos * 6));
                },

                none: function(pos){
                    return 0;
                },

                full: function(pos){
                    return 1;
                }
            };


            function move(elem,json,options,callback){
                options = options || {};
                options.duration = options.duration || 2000;
                options.ease = options.ease || tween.easeOutQuad;

                var start = {},distance = {};
                for(var atrr in json){
                    if(atrr == "opacity"){
                        start[atrr] = parseInt(100 * getStyle(elem, "opacity"));
                    }else{
                        start[atrr] = parseInt(getStyle(elem, atrr));
                    }
                    distance[atrr] = json[atrr] - start[atrr];
                    var speed = (json[atrr] - start[atrr])/options.duration;
                    speed=speed>0?Math.ceil(speed):Math.floor(speed);
                    var startTime = new Date().getTime();
                    (function(atrr){
                        setTimeout(function(){
                            var newTime = new Date().getTime();
                            var easetime = (newTime - startTime)/options.duration;
                            if (atrr == "opacity") {
                                elem.style.filter = "alpha(opacity:" + (start[atrr] + options.ease(easetime) * distance[atrr]) + ")";
                                elem.style.opacity = start[atrr]/100 + options.ease(easetime) * distance[atrr]/100;
                            }else{
                                elem.style[atrr] = Math.ceil(start[atrr] + options.ease(easetime) * distance[atrr]) + "px";
                            }
                            if(options.duration <= (newTime - startTime)){
                                elem.style[atrr] = json[atrr] + "px";
                                if(callback){
                                    callback();
                                }
                            }else{
                                setTimeout(arguments.callee,25);
                            }
                        },25)
                    })(atrr)
                }
            }

            return move;
        })();

    window.ajuanCarousel = function(ele,options) {

        return new Carousel(ele,options).init();

    };

}(window,document,_a));