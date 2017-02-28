/**
 * Created by 2144 on 2016/9/22.
 */
;(function (window, doc, undefind) {

    var ajuanSpread = function (opt) {

        var options = opt || {};

        this.spreadBoxEle = options.spreadBoxEle;

        this.spreadEleName = options.spreadEleName;

        this.spreadWidth = options.spreadWidth;

        this.spreadHeight = options.spreadHeight;

        this.spreadRowNum = options.spreadRowNum;

        this.spreadEleSum = options.spreadEleSum;

    };

    ajuanSpread.prototype = {

        init: function () {

            if(!this.spreadBoxEle || !this.spreadEleName) return;

            achieveEleData(this);

            setPositionFun(this);

        }

    };

    //获取数据
    function achieveEleData(that){

        that.spreadEles = _a(that.spreadBoxEle.getElementsByTagName(that.spreadEleName)).reduceDimension();

        if(!that.spreadWidth){

            that.spreadWidth =  that.spreadEles[0].offsetWidth;

        }

        if(!that.spreadHeight){

            that.spreadHeight =  that.spreadEles[0].offsetHeight;

        }

        if(!that.spreadRowNum){

            that.spreadRowNum = Math.floor(that.spreadBoxEle.offsetWidth / that.spreadWidth);

        }

        if(!that.spreadEleSum){

            that.spreadEleSum = that.spreadEles.length;

        }

    }

    //设置元素的位置
    function setPositionFun(that){

        _a(that.spreadEles).forEach(function (item,index) {

            if( 'transform' in document.documentElement.style){

                item.style.transform = 'translate3d('+ (index % that.spreadRowNum) * that.spreadWidth + 'px' +'' +
                ','+ (Math.floor(index / that.spreadRowNum) * that.spreadHeight) + 'px' +',0)';

            }else{

                item.style.top = (Math.floor(index / that.spreadRowNum) * that.spreadHeight) + 'px';

                item.style.left = (index % that.spreadRowNum) * that.spreadWidth + 'px';

            }

        });

    }

    if(typeof define === 'function' && define.amd){

        define('ajuanSpread',[],function(){return ajuanSpread});

    }else{

        window.ajuanSpread = function (options) {

            return new ajuanSpread(options).init();

        };

    }

}(this,document));