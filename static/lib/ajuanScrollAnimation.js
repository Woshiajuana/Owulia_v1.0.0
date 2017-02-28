/**
 * Created by 2144 on 2016/9/30.
 * zhigang.chen@owulia.com
 */
;(function (window,doc,_a,undefined) {

    var DEFAULT = {

        repeat : false

    };

    function ajuanScrollAnimation(opt){

        var options = opt || DEFAULT;

        this.eleObjectArr = options.eleObjectArr;

        this.repeat = options.repeat || DEFAULT.repeat;
    }

    ajuanScrollAnimation.prototype = {

        init: function () {

            if(!this.eleObjectArr) return this;

            addEvent(this);//绑定事件

            return this;

        }

    };

    //绑定事件
    function addEvent(that){

        var scrollEvent = function () {

            var top = +(doc.documentElement.scrollTop || doc.body.scrollTop);

            _a(that.eleObjectArr).forEach(function (item) {

                if(that.repeat){

                    item.ele.style.display = top > item.top ? 'block' : 'none';

                }else{

                    if( top > item.top){

                        item.ele.style.display = 'block';

                    }

                }

            });

        };

        _a(window).addEventListener('scroll',scrollEvent);

    }

    if(typeof define === 'function' && define.amd){

        define('ajuanScrollAnimation',[],function(){return ajuanScrollAnimation});

    }else{

        window.ajuanScrollAnimation = function (options) {

            return new ajuanScrollAnimation(options).init();

        };

    }

}(this,document,_a));
