/**
 * Created by 2144 on 2016/10/25.
 */
;(function (win, doc, _a, undefined) {
    var options,
        DEFAULT = {
            speed:3000,
            index:0,
            isRound:false,
            isRandom:false
        };
    function ajuanFade(opt){
        options = opt || {};
        this.boxEle = options.boxEle;
        this.speed = options.speed || DEFAULT.speed;
        this.triggerEle = options.triggerEle;
        this.isRandom = options.isRandom || DEFAULT.isRandom;
        this.index = options.index || DEFAULT.index;
        this.isRound = options.isRound || DEFAULT.isRound;
    }
    ajuanFade.prototype = {
        init: function () {
            if(!this.boxEle) return this;
            achieveEleData(this);
            if(this.triggerEle) addEvent(this);
            if(this.isRound){
                var that = this;
                this.temp = setInterval(function () {
                    nextFun(that);
                },this.speed);
            }
            if(this.isRandom){
                initFirstPic(this);
            }
            return this;
        }
    };
    //初始化第一张图片
    function initFirstPic(that){
        _a(that.liEleArr).forEach(function (item,index) {
            if(index == that.index){
                _a(that.triEleArr[index]).addClass('cur');
                item.style.display = 'block'
            }else{
                _a(that.triEleArr[index]).removeClass('cur');
                item.style.display = 'none'
            }
        });
    }
    //下一张
    function nextFun(that){
        if(that.index >= that.liEleArr.length) that.index = 0;
        _a(that.liEleArr).forEach(function (item,index) {
            if(index == that.index){
                _a(that.triEleArr[index]).addClass('cur');
                item.style.display = 'block'
            }else{
                _a(that.triEleArr[index]).removeClass('cur');
                item.style.display = 'none'
            }
        });
        that.index ++;
    }
    //获取元素
    function achieveEleData(that){
        that.liEleArr = _a(that.boxEle.getElementsByTagName('li')).reduceDimension();
        if(that.triggerEle)
            that.triEleArr = _a(that.triggerEle.getElementsByTagName('i')).reduceDimension();
    }
    //绑定事件
    function addEvent(that){
        var clickEvent = function (event) {
            var target = _a(event).target();
            if(target.parentNode == that.triggerEle){
                slideWrapper(that,target);
                return;
            }
        };
        _a(that.triggerEle).addEventListener('click',clickEvent);
    }
    //轮播
    function slideWrapper(that,target){
        _a(that.triEleArr).forEach(function (item,index) {
            if(target == item){
                that.index = index;
                that.liEleArr[index].style.display = 'block';
                _a(item).addClass('cur');
            }else{
                that.liEleArr[index].style.display = 'none';
                _a(item).removeClass('cur');
            }
        });
    }
    window.ajuanFade = function(options) {
        return new ajuanFade(options).init();
    };
}(this,document,_a));
;(function () {
    ajuanFade({
        boxEle:_a('header-carousel').getEle(),
        triggerEle:_a().getByClass('carousel-trigger')[0],
        isRound:false,
        index:Math.floor(Math.random()*4),
        isRandom:true
    });
}());
